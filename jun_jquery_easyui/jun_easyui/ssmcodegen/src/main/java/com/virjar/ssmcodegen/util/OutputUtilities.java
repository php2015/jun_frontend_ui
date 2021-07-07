package com.virjar.ssmcodegen.util;

import com.virjar.ssmcodegen.model.java.FullyQualifiedJavaType;

import java.util.Set;
import java.util.TreeSet;

import static com.virjar.ssmcodegen.util.StringUtils.stringHasValue;

/**
 * @author Jeff Butler
 */
public class OutputUtilities {
    private static final String lineSeparator;

    static {
        String ls = System.getProperty("line.separator");
        if (ls == null) {
            ls = "\n";
        }
        lineSeparator = ls;
    }

    /**
     * Utility class - no instances allowed
     */
    private OutputUtilities() {
        super();
    }

    /**
     * Utility method that indents the buffer by the default amount for Java (four spaces per indent level).
     *
     * @param sb a StringBuilder to append to
     * @param indentLevel the required indent level
     */
    public static void javaIndent(StringBuilder sb, int indentLevel) {
        for (int i = 0; i < indentLevel; i++) {
            sb.append("    ");
        }
    }

    /**
     * Utility method that indents the buffer by the default amount for XML (two spaces per indent level).
     * xml的缩进也应该是4个空格
     *
     * @param sb a StringBuilder to append to
     * @param indentLevel the required indent level
     */
    public static void xmlIndent(StringBuilder sb, int indentLevel) {
        for (int i = 0; i < indentLevel; i++) {
            sb.append("    ");
        }
    }

    /**
     * Utility method. Adds a newline character to a StringBuilder.
     *
     * @param sb the StringBuilder to be appended to
     */
    public static void newLine(StringBuilder sb) {
        sb.append(lineSeparator);
    }

    public static void newLines(StringBuilder sb, int count) {
        for (int i = 0; i < count; i++) {
            newLine(sb);
        }
    }

    /**
     * returns a unique set of "import xxx;" Strings for the set of types
     *
     * @param importedTypes
     * @return
     * @deprecated 不使用这个规则进行排序
     */
    public static Set<String> calculateImports(Set<FullyQualifiedJavaType> importedTypes) {
        StringBuilder sb = new StringBuilder();
        Set<String> importStrings = new TreeSet<String>();
        for (FullyQualifiedJavaType fqjt : importedTypes) {
            for (String importString : fqjt.getImportList()) {
                sb.setLength(0);
                sb.append("import ");
                sb.append(importString);
                sb.append(';');
                importStrings.add(sb.toString());
            }
        }

        return importStrings;
    }

    public static void appendPackage(FullyQualifiedJavaType fullyQualifiedJavaType, StringBuilder sb) {
        if (stringHasValue(fullyQualifiedJavaType.getPackageName())) {
            sb.append("package ");
            sb.append(fullyQualifiedJavaType.getPackageName());
            sb.append(';');
            newLines(sb, 2);
        }
    }

    public static void appendLine(StringBuilder sb, String priffx, String content, String suffix) {
        sb.append(priffx);
        sb.append(content);
        sb.append(suffix);
        newLine(sb);
    }
}
