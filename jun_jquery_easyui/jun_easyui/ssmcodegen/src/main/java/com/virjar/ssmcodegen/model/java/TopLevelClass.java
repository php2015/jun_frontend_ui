package com.virjar.ssmcodegen.model.java;

import java.util.*;

import static com.virjar.ssmcodegen.util.OutputUtilities.calculateImports;
import static org.mybatis.generator.internal.util.StringUtility.stringHasValue;

/**
 * 描述一个java类,注意一个文件中只能存在一个java类 Created by virjar on 16/7/20.
 */
public class TopLevelClass extends InnerClass implements CompilationUnit {
    private Set<FullyQualifiedJavaType> importedTypes;

    private Set<String> staticImports;

    private List<String> fileCommentLines;

    /**
     *
     */
    public TopLevelClass(FullyQualifiedJavaType type) {
        super(type);
        importedTypes = new TreeSet<FullyQualifiedJavaType>();
        fileCommentLines = new ArrayList<String>();
        staticImports = new TreeSet<String>();
    }

    public TopLevelClass(String typeName) {
        this(new FullyQualifiedJavaType(typeName));
    }

    /**
     * @return Returns the importedTypes.
     */
    public Set<FullyQualifiedJavaType> getImportedTypes() {
        return Collections.unmodifiableSet(importedTypes);
    }

    public void addImportedType(String importedType) {
        addImportedType(new FullyQualifiedJavaType(importedType));
    }

    public void addImportedType(FullyQualifiedJavaType importedType) {
        if (importedType != null && importedType.isExplicitlyImported()
                && !importedType.getPackageName().equals(getType().getPackageName())) {
            importedTypes.add(importedType);
        }
    }

    public String getFormattedContent() {
        StringBuilder sb = new StringBuilder();

        for (String fileCommentLine : fileCommentLines) {
            sb.append(fileCommentLine);
            org.mybatis.generator.api.dom.OutputUtilities.newLine(sb);
        }

        if (stringHasValue(getType().getPackageName())) {
            sb.append("package ");
            sb.append(getType().getPackageName());
            sb.append(';');
            org.mybatis.generator.api.dom.OutputUtilities.newLine(sb);
            org.mybatis.generator.api.dom.OutputUtilities.newLine(sb);
        }

        for (String staticImport : staticImports) {
            sb.append("import static ");
            sb.append(staticImport);
            sb.append(';');
            org.mybatis.generator.api.dom.OutputUtilities.newLine(sb);
        }

        if (staticImports.size() > 0) {
            org.mybatis.generator.api.dom.OutputUtilities.newLine(sb);
        }

        Set<String> importStrings = calculateImports(importedTypes);
        for (String importString : importStrings) {
            sb.append(importString);
            org.mybatis.generator.api.dom.OutputUtilities.newLine(sb);
        }

        if (importStrings.size() > 0) {
            org.mybatis.generator.api.dom.OutputUtilities.newLine(sb);
        }

        sb.append(super.getFormattedContent(0));

        return sb.toString();
    }

    public boolean isJavaInterface() {
        return false;
    }

    public boolean isJavaEnumeration() {
        return false;
    }

    public void addFileCommentLine(String commentLine) {
        fileCommentLines.add(commentLine);
    }

    public List<String> getFileCommentLines() {
        return fileCommentLines;
    }

    public void addImportedTypes(Set<FullyQualifiedJavaType> importedTypes) {
        this.importedTypes.addAll(importedTypes);
    }

    public Set<String> getStaticImports() {
        return staticImports;
    }

    public void addStaticImport(String staticImport) {
        staticImports.add(staticImport);
    }

    public void addStaticImports(Set<String> staticImports) {
        this.staticImports.addAll(staticImports);
    }
}
