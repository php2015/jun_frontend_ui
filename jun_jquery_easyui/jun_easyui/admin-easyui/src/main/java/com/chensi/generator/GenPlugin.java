package com.chensi.generator;

import java.sql.Types;
import java.util.HashSet;
import java.util.List;
import java.util.Properties;
import java.util.Set;

import org.mybatis.generator.api.IntrospectedColumn;
import org.mybatis.generator.api.IntrospectedTable;
import org.mybatis.generator.api.PluginAdapter;
import org.mybatis.generator.api.dom.java.FullyQualifiedJavaType;
import org.mybatis.generator.api.dom.java.Interface;
import org.mybatis.generator.api.dom.java.Method;
import org.mybatis.generator.api.dom.java.TopLevelClass;
import org.mybatis.generator.api.dom.xml.Attribute;
import org.mybatis.generator.api.dom.xml.Document;
import org.mybatis.generator.api.dom.xml.TextElement;
import org.mybatis.generator.api.dom.xml.XmlElement;
import org.mybatis.generator.codegen.mybatis3.MyBatis3FormattingUtilities;
import org.mybatis.generator.config.CommentGeneratorConfiguration;
import org.mybatis.generator.config.Context;

/**
 * 自定义插件
 * 
 * @author Chensi
 */
public class GenPlugin extends PluginAdapter {

	private Set<String> mappers = new HashSet<String>();
	// 注释生成器
	private CommentGeneratorConfiguration commentCfg;

	@Override
	public boolean validate(List<String> warnings) {
		return true;
	}

	@Override
	public void setContext(Context context) {
		super.setContext(context);
		// 设置默认的注释生成器
		commentCfg = new CommentGeneratorConfiguration();
		commentCfg.setConfigurationType(GenCommentGenerator.class.getCanonicalName());
		context.setCommentGeneratorConfiguration(commentCfg);
		// 支持oracle获取注释#114
		context.getJdbcConnectionConfiguration().addProperty("remarksReporting", "true");
	}

	@Override
	public void setProperties(Properties properties) {
		super.setProperties(properties);
		String mappers = this.properties.getProperty("mappers");
		for (String mapper : mappers.split(",")) {
			this.mappers.add(mapper);
		}
	}

	/**
	 * 生成的Mapper接口
	 * 
	 * @param interfaze
	 * @param topLevelClass
	 * @param introspectedTable
	 * @return
	 */
	@Override
	public boolean clientGenerated(Interface interfaze, TopLevelClass topLevelClass, IntrospectedTable introspectedTable) {
		// 获取实体类
		FullyQualifiedJavaType entityType = new FullyQualifiedJavaType(introspectedTable.getBaseRecordType());
		// import接口
		for (String mapper : mappers) {
			interfaze.addImportedType(new FullyQualifiedJavaType(mapper));
			interfaze.addSuperInterface(new FullyQualifiedJavaType(mapper + "<" + entityType.getShortName() + ">"));
		}
		// import实体类
		interfaze.addImportedType(entityType);
		return true;
	}

	/**
	 * 拼装SQL语句生成Mapper接口映射文件
	 */
	@Override
	public boolean sqlMapDocumentGenerated(Document document, IntrospectedTable introspectedTable) {
		XmlElement rootElement = document.getRootElement();
		rootElement.addElement(new TextElement("<!-- ============sql常量================ -->"));
		// 数据库表名
		String tableName = introspectedTable.getFullyQualifiedTableNameAtRuntime();
		// 主键
		IntrospectedColumn pkColumn = introspectedTable.getPrimaryKeyColumns().get(0);
		// 公共字段
		StringBuilder columnSQL = new StringBuilder("  ");
		// IF判断语句
		StringBuilder ifSQL = new StringBuilder("");
		// 要插入的字段(排除自增主键)
		StringBuilder saveColumn = new StringBuilder("  insert into ").append(tableName).append("(\n");
		// 要保存的值
		StringBuilder saveValue = new StringBuilder("  (\n");
		// 拼装更新字段
		StringBuilder updateSQL = new StringBuilder("  update ").append(tableName).append("\n\t  <set> \n  ");
		// 数据库字段名
		String columnName = null;
		// java字段名
		String javaProperty = null;
		
		List<IntrospectedColumn> list=introspectedTable.getAllColumns();
		for (int i=0;i<list.size();i++) {
			columnName = MyBatis3FormattingUtilities.getEscapedColumnName(list.get(i));
			javaProperty = list.get(i).getJavaProperty();
			// 拼接字段
			columnSQL.append("A." + columnName).append(",");
			// 拼接IF语句
			if(i==0){
				if (Types.VARCHAR == list.get(i).getJdbcType()) {
					ifSQL.append("  <if test=\"null != entity.").append(javaProperty).append(" and '' != entity.").append(javaProperty).append("\">");
					ifSQL.append("and A.").append(columnName).append(" = #{entity.").append(javaProperty).append("}</if>\n");
				} else {
					ifSQL.append("  <if test=\"null != entity.").append(javaProperty).append("\">");
					ifSQL.append("and A.").append(columnName).append(" = #{entity.").append(javaProperty).append("}</if>\n");
				}
			}else{
				if (Types.VARCHAR == list.get(i).getJdbcType()) {
					ifSQL.append("  \t  <if test=\"null != entity.").append(javaProperty).append(" and '' != entity.").append(javaProperty).append("\">");
					ifSQL.append("and A.").append(columnName).append(" = #{entity.").append(javaProperty).append("}</if>\n");
				} else {
					ifSQL.append("  \t  <if test=\"null != entity.").append(javaProperty).append("\">");
					ifSQL.append("and A.").append(columnName).append(" = #{entity.").append(javaProperty).append("}</if>\n");
				}
			}
			// 拼接SQL
			if (!list.get(i).isAutoIncrement()) {
				saveColumn.append("\t    ,").append(columnName).append("\n");
				saveValue.append("\t    ,").append("#{entity.").append(javaProperty).append("}\n");
				updateSQL.append("\t    ").append(columnName).append(" = #{entity.").append(javaProperty).append("}").append(",\n");
			}
		}
		updateSQL.append("\t  </set>\n\t  where ").append(pkColumn.getActualColumnName()).append(" = #{entity.").append(pkColumn.getJavaProperty()).append("}");
		// common sql
		rootElement.addElement(createSql("sql_column", columnSQL.substring(0, columnSQL.length() - 1)));
		rootElement.addElement(createSql("sql_if", ifSQL.substring(0, ifSQL.length() - 1).toString()));
		rootElement.addElement(new TextElement("<!-- ============默认生成的SQL================ -->"));
		// list
		rootElement.addElement(createSelect(tableName, pkColumn, SqlType.list, true));
		// listByEntity
		rootElement.addElement(createSelect(tableName, pkColumn, SqlType.listByEntity, true));
		// countByEntity
		rootElement.addElement(createSelect(tableName, pkColumn, SqlType.countByEntity, true));
		// get
		rootElement.addElement(createSelect(tableName, pkColumn, SqlType.get, false));
		// getByEntity
		rootElement.addElement(createSelect(tableName, pkColumn, SqlType.getByEntity, false));
		// insert
		rootElement.addElement(createSave(SqlType.save.toString(), pkColumn, saveColumn.append("\t  ) values").toString().replaceFirst(",", " "), saveValue
				.append("\t  )").toString().replaceFirst(",", " ")));
		// update
		rootElement.addElement(createUpdate(SqlType.update.toString(), updateSQL.toString()));
		// del
		rootElement.addElement(createDels(tableName, pkColumn, SqlType.del));
		// delByEntity
		rootElement.addElement(createDels(tableName, pkColumn, SqlType.delByEntity));
		// delList
		rootElement.addElement(createDels(tableName, pkColumn, SqlType.delList));
		rootElement.addElement(new TextElement("<!-- ============自定义的SQL================ -->"));
		return super.sqlMapDocumentGenerated(document, introspectedTable);
	}

	/**
	 * 公共SQL
	 * 
	 * @param id
	 * @param sqlStr
	 * @return
	 */
	private XmlElement createSql(String id, String sqlStr) {
		XmlElement sql = new XmlElement("sql");
		sql.addAttribute(new Attribute("id", id));
		sql.addElement(new TextElement(sqlStr));
		return sql;
	}

	/**
	 * 查询
	 * 
	 * @param id
	 *            -sql名
	 * @param tableName
	 *            -表名
	 * @param pkColumn
	 *            -主键
	 * @param type
	 *            -where类型
	 * @param isPage
	 *            -是否分页
	 */
	private XmlElement createSelect(String tableName, IntrospectedColumn pkColumn, SqlType type, boolean isPage) {
		XmlElement select = new XmlElement("select");
		select.addAttribute(new Attribute("id", type.toString()));
		select.addAttribute(new Attribute("resultMap", "BaseResultMap"));
		StringBuilder selectStr = null;
		if (type == SqlType.countByEntity) {
			selectStr = new StringBuilder("  select count(1) \n\t  from ").append(tableName).append(" A");
		} else {
			selectStr = new StringBuilder("  select <include refid=\"sql_column\" /> \n\t  from ").append(tableName).append(" A");
		}
		if (type == SqlType.list) {
			selectStr.append("");
		} else if (type == SqlType.listByEntity) {
			selectStr.append("\n\t  <where>\n\t  ").append("\t  <include refid=\"sql_if\" />").append("\n\t  </where>\t ");
		} else if (type == SqlType.countByEntity) {
			selectStr.append("\n\t  <where>\n\t  ").append("\t  <include refid=\"sql_if\" />").append("\n\t  </where>\t ");
		} else if (type == SqlType.get) {
			selectStr.append("\n\t  where ").append(pkColumn.getActualColumnName()).append(" = #{").append(pkColumn.getJavaProperty())
					.append("} \n\t  limit 1 ");
		} else if (type == SqlType.getByEntity) {
			selectStr.append("\n\t  <where>\n\t  ").append("\t  <include refid=\"sql_if\" />").append("\n\t  </where>\n\t limit 1");
		}
		if (isPage) {
			selectStr.append("\n\t  <if test=\"page !=null \">limit ${page.start},${page.size}</if>");
		}
		select.addElement(new TextElement(selectStr.toString()));
		return select;
	}

	/**
	 * 保存
	 * 
	 * @param id
	 * @param pkColumn
	 * @return
	 */
	private XmlElement createSave(String id, IntrospectedColumn pkColumn, String saveColumn, String saveValue) {
		XmlElement save = new XmlElement("insert");
		save.addAttribute(new Attribute("id", id));
		save.addElement(new TextElement("  <selectKey keyProperty=\"entity.id\" order=\"AFTER\" resultType=\"Integer\">select last_insert_id()</selectKey>"));
		save.addAttribute(new Attribute("keyProperty", "entity." + pkColumn.getJavaProperty()));
		save.addAttribute(new Attribute("useGeneratedKeys", "true"));
		save.addElement(new TextElement(saveColumn + saveValue));
		return save;
	}

	/**
	 * 更新
	 * 
	 * @param id
	 * @return
	 */
	private XmlElement createUpdate(String id, String updateSQL) {
		XmlElement update = new XmlElement("update");
		update.addAttribute(new Attribute("id", id));
		update.addElement(new TextElement(updateSQL));
		return update;
	}

	/**
	 * 删除
	 * 
	 * @param tableName
	 * @param pkColumn
	 * @param method
	 * @param type
	 * @return
	 */
	private XmlElement createDels(String tableName, IntrospectedColumn pkColumn, SqlType type) {
		XmlElement delete = new XmlElement("delete");
		delete.addAttribute(new Attribute("id", type.toString()));
		StringBuilder deleteStr = new StringBuilder("  delete from ").append(tableName).append(" A");
		if (SqlType.del == type) {
			deleteStr.append(" where A.").append(pkColumn.getActualColumnName()).append(" = #{").append(pkColumn.getJavaProperty()).append("}");
		} else if (SqlType.delByEntity == type) {
			deleteStr.append("\n\t  <where>\n\t  ").append("\t  <include refid=\"sql_if\" />").append("\n\t  </where>\t ");
		} else {
			deleteStr.append(" where A.").append(pkColumn.getActualColumnName()).append(" in\n\t").append("  <foreach collection=\"").append("list")
					.append("\" index=\"index\" item=\"item\" open=\"(\" separator=\",\" close=\")\">#{item}</foreach>");
		}
		delete.addElement(new TextElement(deleteStr.toString()));
		return delete;
	}

	// 以下设置为false,取消生成默认增删查改xml
	@Override
	public boolean clientDeleteByPrimaryKeyMethodGenerated(Method method, Interface interfaze, IntrospectedTable introspectedTable) {
		return false;
	}

	@Override
	public boolean clientInsertMethodGenerated(Method method, Interface interfaze, IntrospectedTable introspectedTable) {
		return false;
	}

	@Override
	public boolean clientSelectAllMethodGenerated(Method method, Interface interfaze, IntrospectedTable introspectedTable) {
		return false;
	}

	@Override
	public boolean clientSelectByPrimaryKeyMethodGenerated(Method method, Interface interfaze, IntrospectedTable introspectedTable) {
		return false;
	}

	@Override
	public boolean clientUpdateByPrimaryKeyWithoutBLOBsMethodGenerated(Method method, Interface interfaze, IntrospectedTable introspectedTable) {
		return false;
	}

	@Override
	public boolean sqlMapDeleteByPrimaryKeyElementGenerated(XmlElement element, IntrospectedTable introspectedTable) {
		return false;
	}

	@Override
	public boolean sqlMapInsertElementGenerated(XmlElement element, IntrospectedTable introspectedTable) {
		return false;
	}

	@Override
	public boolean sqlMapSelectAllElementGenerated(XmlElement element, IntrospectedTable introspectedTable) {
		return false;
	}

	@Override
	public boolean sqlMapSelectByPrimaryKeyElementGenerated(XmlElement element, IntrospectedTable introspectedTable) {
		return false;
	}

	@Override
	public boolean sqlMapUpdateByPrimaryKeyWithoutBLOBsElementGenerated(XmlElement element, IntrospectedTable introspectedTable) {
		return false;
	}

}
