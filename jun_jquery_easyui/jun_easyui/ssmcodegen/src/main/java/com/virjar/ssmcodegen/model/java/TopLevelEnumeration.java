package com.virjar.ssmcodegen.model.java;

import java.util.*;

import static com.virjar.ssmcodegen.util.OutputUtilities.calculateImports;
import static com.virjar.ssmcodegen.util.OutputUtilities.newLine;
import static org.mybatis.generator.internal.util.messages.Messages.getString;

/**
 * Created by virjar on 16/7/24.
 */
public class TopLevelEnumeration extends InnerEnum implements CompilationUnit {
    private Set<FullyQualifiedJavaType> importedTypes;

    private Set<String> staticImports;

    private List<String> fileCommentLines;

    /**
     * @param type
     */
    public TopLevelEnumeration(FullyQualifiedJavaType type) {
        super(type);
        importedTypes = new TreeSet<FullyQualifiedJavaType>();
        fileCommentLines = new ArrayList<String>();
        staticImports = new TreeSet<String>();
    }

    public String getFormattedContent() {
        StringBuilder sb = new StringBuilder();

        for (String fileCommentLine : fileCommentLines) {
            sb.append(fileCommentLine);
            newLine(sb);
        }

        if (getType().getPackageName() != null && getType().getPackageName().length() > 0) {
            sb.append("package "); 
            sb.append(getType().getPackageName());
            sb.append(';');
            newLine(sb);
            newLine(sb);
        }

        for (String staticImport : staticImports) {
            sb.append("import static "); 
            sb.append(staticImport);
            sb.append(';');
            newLine(sb);
        }

        if (staticImports.size() > 0) {
            newLine(sb);
        }

        Set<String> importStrings = calculateImports(importedTypes);
        for (String importString : importStrings) {
            sb.append(importString);
            newLine(sb);
        }

        if (importStrings.size() > 0) {
            newLine(sb);
        }

        sb.append(super.getFormattedContent(0));

        return sb.toString();
    }

    public Set<FullyQualifiedJavaType> getImportedTypes() {
        return Collections.unmodifiableSet(importedTypes);
    }

    public FullyQualifiedJavaType getSuperClass() {
        throw new UnsupportedOperationException(getString("RuntimeError.11")); 
    }

    public boolean isJavaInterface() {
        return false;
    }

    public boolean isJavaEnumeration() {
        return true;
    }

    public void addImportedType(FullyQualifiedJavaType importedType) {
        if (importedType.isExplicitlyImported() && !importedType.getPackageName().equals(getType().getPackageName())) {
            importedTypes.add(importedType);
        }
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
