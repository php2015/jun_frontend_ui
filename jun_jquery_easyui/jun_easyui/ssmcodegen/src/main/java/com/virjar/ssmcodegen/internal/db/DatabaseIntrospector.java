/*
 * Copyright 2005 The Apache Software Foundation Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific language governing permissions and limitations under the
 * License.
 */
package com.virjar.ssmcodegen.internal.db;

import com.google.common.collect.Lists;
import com.virjar.ssmcodegen.config.*;
import com.virjar.ssmcodegen.exception.FeatureUnsupportException;
import com.virjar.ssmcodegen.internal.ObjectFactory;
import com.virjar.ssmcodegen.model.java.FullyQualifiedJavaType;
import com.virjar.ssmcodegen.mybatis.JavaTypeResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.virjar.ssmcodegen.internal.util.JavaBeansUtil.getCamelCaseString;
import static com.virjar.ssmcodegen.internal.util.JavaBeansUtil.getValidPropertyName;
import static com.virjar.ssmcodegen.internal.util.StringUtility.*;
import static com.virjar.ssmcodegen.internal.util.messages.Messages.getString;

/**
 * 
 * @author Jeff Butler
 */
public class DatabaseIntrospector {

    private DatabaseMetaData databaseMetaData;
    private JavaTypeResolver javaTypeResolver;
    private List<String> warnings;
    private Context context;
    private static Logger logger = LoggerFactory.getLogger(DatabaseIntrospector.class);

    public DatabaseIntrospector(Context context, DatabaseMetaData databaseMetaData, JavaTypeResolver javaTypeResolver,
            List<String> warnings) {
        super();
        this.context = context;
        this.databaseMetaData = databaseMetaData;
        this.javaTypeResolver = javaTypeResolver;
        this.warnings = warnings;
    }

    private void calculatePrimaryKey(FullyQualifiedTable table, IntrospectedTable introspectedTable) {
        ResultSet rs = null;

        try {
            rs = databaseMetaData.getPrimaryKeys(table.getIntrospectedCatalog(), table.getIntrospectedSchema(),
                    table.getIntrospectedTableName());
            if (rs.next()) {
                String columnName = rs.getString("COLUMN_NAME");
                introspectedTable.setPrimaryKeyColumn(columnName);
            } else {
                throw new FeatureUnsupportException("");
            }
            if (rs.next()) {
                throw new FeatureUnsupportException("not support composite keys for table:"
                        + table.getIntrospectedSchema() + "." + table.getIntrospectedTableName());
            }

        } catch (SQLException e) {
            // ignore the primary key if there's any error
        } finally {
            closeResultSet(rs);
        }
    }

    private void closeResultSet(ResultSet rs) {
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                // do nothing
            }
        }
    }

    private void reportIntrospectionWarnings(IntrospectedTable introspectedTable, TableConfiguration tableConfiguration,
            FullyQualifiedTable table) {
        // make sure that every column listed in column overrides
        // actually exists in the table
        for (ColumnOverride columnOverride : tableConfiguration.getColumnOverrides()) {
            if (introspectedTable.getColumn(columnOverride.getColumnName()) == null) {
                warnings.add(getString("Warning.3", columnOverride.getColumnName(), table.toString()));
            }
        }

        // make sure that every column listed in ignored columns
        // actually exists in the table
        for (String string : tableConfiguration.getIgnoredColumnsInError()) {
            warnings.add(getString("Warning.4", string, table.toString()));
        }

        GeneratedKey generatedKey = tableConfiguration.getGeneratedKey();
        if (generatedKey != null && introspectedTable.getColumn(generatedKey.getColumn()) == null) {
            if (generatedKey.isIdentity()) {
                warnings.add(getString("Warning.5", generatedKey.getColumn(), table.toString()));
            } else {
                warnings.add(getString("Warning.6", generatedKey.getColumn(), table.toString()));
            }
        }
    }

    /**
     * Returns a List<IntrospectedTable> that matches the specified table configuration.
     * 
     * @param tc
     * @return a list of introspected tables
     * @throws SQLException
     */
    public List<IntrospectedTable> introspectTables(TableConfiguration tc) throws SQLException {

        // get the raw columns from the DB
        Map<ActualTableName, List<IntrospectedColumn>> columns = getColumns(tc);

        if (columns.isEmpty()) {
            warnings.add(getString("Warning.19", tc.getCatalog(), tc.getSchema(), tc.getTableName()));
            return null;
        }

        removeIgnoredColumns(tc, columns);
        calculateExtraColumnInformation(tc, columns);
        applyColumnOverrides(tc, columns);
        calculateIdentityColumns(tc, columns);

        List<IntrospectedTable> introspectedTables = calculateIntrospectedTables(tc, columns);

        // now introspectedTables has all the columns from all the
        // tables in the configuration. Do some validation...

        Iterator<IntrospectedTable> iter = introspectedTables.iterator();
        while (iter.hasNext()) {
            IntrospectedTable introspectedTable = iter.next();

            if (!introspectedTable.hasAnyColumns()) {
                // add warning that the table has no columns, remove from the
                // list
                String warning = getString("Warning.1", introspectedTable.getFullyQualifiedTable().toString());
                warnings.add(warning);
                iter.remove();
            }  else {
                // now make sure that all columns called out in the
                // configuration
                // actually exist
                reportIntrospectionWarnings(introspectedTable, tc, introspectedTable.getFullyQualifiedTable());
            }
        }

        return introspectedTables;
    }

    /**
     * @param tc
     * @param columns
     */
    private void removeIgnoredColumns(TableConfiguration tc, Map<ActualTableName, List<IntrospectedColumn>> columns) {
        for (Map.Entry<ActualTableName, List<IntrospectedColumn>> entry : columns.entrySet()) {
            Iterator<IntrospectedColumn> tableColumns = (entry.getValue()).iterator();
            while (tableColumns.hasNext()) {
                IntrospectedColumn introspectedColumn = tableColumns.next();
                if (tc.isColumnIgnored(introspectedColumn.getActualColumnName())) {
                    tableColumns.remove();
                    if (logger.isDebugEnabled()) {
                        logger.debug(getString("Tracing.3", introspectedColumn.getActualColumnName(),
                                entry.getKey().toString()));
                    }
                }
            }
        }
    }

    private void calculateExtraColumnInformation(TableConfiguration tc,
            Map<ActualTableName, List<IntrospectedColumn>> columns) {
        StringBuilder sb = new StringBuilder();
        Pattern pattern = null;
        String replaceString = null;
        if (tc.getColumnRenamingRule() != null) {
            pattern = Pattern.compile(tc.getColumnRenamingRule().getSearchString());
            replaceString = tc.getColumnRenamingRule().getReplaceString();
            replaceString = replaceString == null ? "" : replaceString;
        }

        for (Map.Entry<ActualTableName, List<IntrospectedColumn>> entry : columns.entrySet()) {
            for (IntrospectedColumn introspectedColumn : entry.getValue()) {
                String calculatedColumnName;
                if (pattern == null) {
                    calculatedColumnName = introspectedColumn.getActualColumnName();
                } else {
                    Matcher matcher = pattern.matcher(introspectedColumn.getActualColumnName());
                    calculatedColumnName = matcher.replaceAll(replaceString);
                }

                if (isTrue(tc.getProperty(PropertyRegistry.TABLE_USE_ACTUAL_COLUMN_NAMES))) {
                    introspectedColumn.setJavaProperty(getValidPropertyName(calculatedColumnName));
                } else if (isTrue(tc.getProperty(PropertyRegistry.TABLE_USE_COMPOUND_PROPERTY_NAMES))) {
                    sb.setLength(0);
                    sb.append(calculatedColumnName);
                    sb.append('_');
                    sb.append(getCamelCaseString(introspectedColumn.getRemarks(), true));
                    introspectedColumn.setJavaProperty(getValidPropertyName(sb.toString()));
                } else {
                    introspectedColumn.setJavaProperty(getCamelCaseString(calculatedColumnName, false));
                }

                FullyQualifiedJavaType fullyQualifiedJavaType = javaTypeResolver.calculateJavaType(introspectedColumn);

                if (fullyQualifiedJavaType != null) {
                    introspectedColumn.setFullyQualifiedJavaType(fullyQualifiedJavaType);
                    introspectedColumn.setJdbcTypeName(javaTypeResolver.calculateJdbcTypeName(introspectedColumn));
                } else {
                    // type cannot be resolved. Check for ignored or overridden
                    boolean warn = true;
                    if (tc.isColumnIgnored(introspectedColumn.getActualColumnName())) {
                        warn = false;
                    }

                    ColumnOverride co = tc.getColumnOverride(introspectedColumn.getActualColumnName());
                    if (co != null) {
                        if (stringHasValue(co.getJavaType()) && stringHasValue(co.getJavaType())) {
                            warn = false;
                        }
                    }

                    // if the type is not supported, then we'll report a warning
                    if (warn) {
                        introspectedColumn.setFullyQualifiedJavaType(FullyQualifiedJavaType.getObjectInstance());
                        introspectedColumn.setJdbcTypeName("OTHER");

                        String warning = getString("Warning.14", Integer.toString(introspectedColumn.getJdbcType()),
                                entry.getKey().toString(), introspectedColumn.getActualColumnName());

                        warnings.add(warning);
                    }
                }

                if (context.autoDelimitKeywords()) {
                    if (SqlReservedWords.containsWord(introspectedColumn.getActualColumnName())) {
                        introspectedColumn.setColumnNameDelimited(true);
                    }
                }

                if (tc.isAllColumnDelimitingEnabled()) {
                    introspectedColumn.setColumnNameDelimited(true);
                }
            }
        }
    }

    private void calculateIdentityColumns(TableConfiguration tc,
            Map<ActualTableName, List<IntrospectedColumn>> columns) {
        GeneratedKey gk = tc.getGeneratedKey();
        if (gk == null) {
            // no generated key, then no identity or sequence columns
            return;
        }

        for (Map.Entry<ActualTableName, List<IntrospectedColumn>> entry : columns.entrySet()) {
            for (IntrospectedColumn introspectedColumn : entry.getValue()) {
                if (isMatchedColumn(introspectedColumn, gk)) {
                    if (gk.isIdentity() || gk.isJdbcStandard()) {
                        introspectedColumn.setIdentity(true);
                        introspectedColumn.setSequenceColumn(false);
                    } else {
                        introspectedColumn.setIdentity(false);
                        introspectedColumn.setSequenceColumn(true);
                    }
                }
            }
        }
    }

    private boolean isMatchedColumn(IntrospectedColumn introspectedColumn, GeneratedKey gk) {
        if (introspectedColumn.isColumnNameDelimited()) {
            return introspectedColumn.getActualColumnName().equals(gk.getColumn());
        } else {
            return introspectedColumn.getActualColumnName().equalsIgnoreCase(gk.getColumn());
        }
    }

    private void applyColumnOverrides(TableConfiguration tc, Map<ActualTableName, List<IntrospectedColumn>> columns) {
        for (Map.Entry<ActualTableName, List<IntrospectedColumn>> entry : columns.entrySet()) {
            for (IntrospectedColumn introspectedColumn : entry.getValue()) {
                ColumnOverride columnOverride = tc.getColumnOverride(introspectedColumn.getActualColumnName());

                if (columnOverride != null) {
                    if (logger.isDebugEnabled()) {
                        logger.debug(getString("Tracing.4", introspectedColumn.getActualColumnName(),
                                entry.getKey().toString()));
                    }

                    if (stringHasValue(columnOverride.getJavaProperty())) {
                        introspectedColumn.setJavaProperty(columnOverride.getJavaProperty());
                    }

                    if (stringHasValue(columnOverride.getJavaType())) {
                        introspectedColumn
                                .setFullyQualifiedJavaType(new FullyQualifiedJavaType(columnOverride.getJavaType()));
                    }

                    if (stringHasValue(columnOverride.getJdbcType())) {
                        introspectedColumn.setJdbcTypeName(columnOverride.getJdbcType());
                    }

                    if (stringHasValue(columnOverride.getTypeHandler())) {
                        introspectedColumn.setTypeHandler(columnOverride.getTypeHandler());
                    }

                    if (columnOverride.isColumnNameDelimited()) {
                        introspectedColumn.setColumnNameDelimited(true);
                    }

                    introspectedColumn.setProperties(columnOverride.getProperties());
                }
            }
        }
    }

    /**
     * This method returns a Map<ActualTableName, List<ColumnDefinitions>> of columns returned from the database
     * introspection.
     *
     * @param tc
     * @return introspected columns
     * @throws SQLException
     */
    private Map<ActualTableName, List<IntrospectedColumn>> getColumns(TableConfiguration tc) throws SQLException {
        String localCatalog;
        String localSchema;
        String localTableName;

        boolean delimitIdentifiers = tc.isDelimitIdentifiers() || stringContainsSpace(tc.getCatalog())
                || stringContainsSpace(tc.getSchema()) || stringContainsSpace(tc.getTableName());

        if (delimitIdentifiers) {
            localCatalog = tc.getCatalog();
            localSchema = tc.getSchema();
            localTableName = tc.getTableName();
        } else if (databaseMetaData.storesLowerCaseIdentifiers()) {
            localCatalog = tc.getCatalog() == null ? null : tc.getCatalog().toLowerCase();
            localSchema = tc.getSchema() == null ? null : tc.getSchema().toLowerCase();
            localTableName = tc.getTableName() == null ? null : tc.getTableName().toLowerCase();
        } else if (databaseMetaData.storesUpperCaseIdentifiers()) {
            localCatalog = tc.getCatalog() == null ? null : tc.getCatalog().toUpperCase();
            localSchema = tc.getSchema() == null ? null : tc.getSchema().toUpperCase();
            localTableName = tc.getTableName() == null ? null : tc.getTableName().toUpperCase();
        } else {
            localCatalog = tc.getCatalog();
            localSchema = tc.getSchema();
            localTableName = tc.getTableName();
        }

        if (tc.isWildcardEscapingEnabled()) {
            String escapeString = databaseMetaData.getSearchStringEscape();

            StringBuilder sb = new StringBuilder();
            StringTokenizer st;
            if (localSchema != null) {
                st = new StringTokenizer(localSchema, "_%", true);
                while (st.hasMoreTokens()) {
                    String token = st.nextToken();
                    if (token.equals("_") || token.equals("%")) {
                        sb.append(escapeString);
                    }
                    sb.append(token);
                }
                localSchema = sb.toString();
            }

            if (localTableName != null) {
                sb.setLength(0);
                st = new StringTokenizer(localTableName, "_%", true);
                while (st.hasMoreTokens()) {
                    String token = st.nextToken();
                    if (token.equals("_") || token.equals("%")) {
                        sb.append(escapeString);
                    }
                    sb.append(token);
                }
                localTableName = sb.toString();
            }
        }

        Map<ActualTableName, List<IntrospectedColumn>> answer = new HashMap<ActualTableName, List<IntrospectedColumn>>();

        if (logger.isDebugEnabled()) {
            String fullTableName = composeFullyQualifiedTableName(localCatalog, localSchema, localTableName, '.');
            logger.debug(getString("Tracing.1", fullTableName));
        }

        ResultSet rs = databaseMetaData.getColumns(localCatalog, localSchema, localTableName, null);

        while (rs.next()) {
            IntrospectedColumn introspectedColumn = ObjectFactory.createIntrospectedColumn(context);

            introspectedColumn.setTableAlias(tc.getAlias());
            introspectedColumn.setJdbcType(rs.getInt("DATA_TYPE"));
            introspectedColumn.setLength(rs.getInt("COLUMN_SIZE"));
            introspectedColumn.setActualColumnName(rs.getString("COLUMN_NAME"));
            introspectedColumn.setNullable(rs.getInt("NULLABLE") == DatabaseMetaData.columnNullable);
            introspectedColumn.setScale(rs.getInt("DECIMAL_DIGITS"));
            introspectedColumn.setRemarks(rs.getString("REMARKS"));
            introspectedColumn.setDefaultValue(rs.getString("COLUMN_DEF"));

            ActualTableName atn = new ActualTableName(rs.getString("TABLE_CAT"), rs.getString("TABLE_SCHEM"),
                    rs.getString("TABLE_NAME"));

            List<IntrospectedColumn> columns = answer.get(atn);
            if (columns == null) {
                columns = Lists.newArrayList();
                answer.put(atn, columns);
            }

            columns.add(introspectedColumn);

            if (logger.isDebugEnabled()) {
                logger.debug(getString("Tracing.2", introspectedColumn.getActualColumnName(),
                        Integer.toString(introspectedColumn.getJdbcType()), atn.toString()));
            }
        }

        closeResultSet(rs);

        if (answer.size() > 1 && !stringContainsSQLWildcard(localSchema)
                && !stringContainsSQLWildcard(localTableName)) {
            // issue a warning if there is more than one table and
            // no wildcards were used
            ActualTableName inputAtn = new ActualTableName(tc.getCatalog(), tc.getSchema(), tc.getTableName());

            StringBuilder sb = new StringBuilder();
            boolean comma = false;
            for (ActualTableName atn : answer.keySet()) {
                if (comma) {
                    sb.append(',');
                } else {
                    comma = true;
                }
                sb.append(atn.toString());
            }

            warnings.add(getString("Warning.25", inputAtn.toString(), sb.toString()));
        }

        return answer;
    }

    private List<IntrospectedTable> calculateIntrospectedTables(TableConfiguration tc,
            Map<ActualTableName, List<IntrospectedColumn>> columns) {
        boolean delimitIdentifiers = tc.isDelimitIdentifiers() || stringContainsSpace(tc.getCatalog())
                || stringContainsSpace(tc.getSchema()) || stringContainsSpace(tc.getTableName());

        List<IntrospectedTable> answer = Lists.newArrayList();

        for (Map.Entry<ActualTableName, List<IntrospectedColumn>> entry : columns.entrySet()) {
            ActualTableName atn = entry.getKey();

            // we only use the returned catalog and schema if something was
            // actually
            // specified on the table configuration. If something was returned
            // from the DB for these fields, but nothing was specified on the
            // table
            // configuration, then some sort of DB default is being returned
            // and we don't want that in our SQL
            FullyQualifiedTable table = new FullyQualifiedTable(
                    stringHasValue(tc.getCatalog()) ? atn.getCatalog() : null,
                    stringHasValue(tc.getSchema()) ? atn.getSchema() : null, atn.getTableName(),
                    tc.getDomainObjectName(), tc.getAlias(),
                    isTrue(tc.getProperty(PropertyRegistry.TABLE_IGNORE_QUALIFIERS_AT_RUNTIME)),
                    tc.getProperty(PropertyRegistry.TABLE_RUNTIME_CATALOG),
                    tc.getProperty(PropertyRegistry.TABLE_RUNTIME_SCHEMA),
                    tc.getProperty(PropertyRegistry.TABLE_RUNTIME_TABLE_NAME), delimitIdentifiers, context);

            IntrospectedTable introspectedTable = ObjectFactory.createIntrospectedTable(tc, table, context);

            for (IntrospectedColumn introspectedColumn : entry.getValue()) {
                introspectedTable.addColumn(introspectedColumn);
            }

            calculatePrimaryKey(table, introspectedTable);

            answer.add(introspectedTable);
        }

        return answer;
    }
}
