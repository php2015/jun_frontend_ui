package com.virjar.ssmcodegen.model.java;

import com.virjar.ssmcodegen.util.ImportsSorter;
import org.mybatis.generator.api.dom.OutputUtilities;

import java.util.*;

import static com.virjar.ssmcodegen.util.StringUtils.stringHasValue;
import static org.mybatis.generator.api.dom.OutputUtilities.javaIndent;
import static org.mybatis.generator.api.dom.OutputUtilities.newLine;

public class Annotation extends JavaElement implements CompilationUnit {
    private Set<FullyQualifiedJavaType> importedTypes;

    private Set<String> staticImports;

    private FullyQualifiedJavaType type;

    private List<Method> methods;

    private List<String> fileCommentLines;

    /**
     *
     */
    public Annotation(FullyQualifiedJavaType type) {
        super();
        this.type = type;
        // superInterfaceTypes = new LinkedHashSet<FullyQualifiedJavaType>();
        methods = new ArrayList<Method>();
        importedTypes = new TreeSet<FullyQualifiedJavaType>();
        fileCommentLines = new ArrayList<String>();
        staticImports = new TreeSet<String>();
    }

    public Annotation(String type) {
        this(new FullyQualifiedJavaType(type));
    }

    public String getFormattedContent() {
        StringBuilder sb = new StringBuilder();
        for (String commentLine : fileCommentLines) {
            sb.append(commentLine);
            newLine(sb);
        }

        if (stringHasValue(getType().getPackageName())) {
            sb.append("package ");
            sb.append(getType().getPackageName());
            sb.append(';');
            newLine(sb);
            newLine(sb);
        }
        // 这里重写import排序
        List<String> imports = new ArrayList<>();
        for (String staticImport : staticImports) {
            imports.add("import static " + staticImport + ";");
        }
        // imports.addAll(calculateImports(importedTypes));
        List<String> sorted = new ImportsSorter(null).sort(imports);
        for (String sortedImport : sorted) {
            sb.append(sortedImport);
        }

        int indentLevel = 0;

        addFormattedJavadoc(sb, indentLevel);
        addFormattedAnnotations(sb, indentLevel);

        sb.append(getVisibility().getValue());
        sb.append("@interface ");
        sb.append(getType().getShortName());

        sb.append(" {");
        indentLevel++;

        Iterator<Method> mtdIter = getMethods().iterator();
        while (mtdIter.hasNext()) {
            newLine(sb);
            Method method = mtdIter.next();
            sb.append(method.getFormattedContent(indentLevel, true));
            if (mtdIter.hasNext()) {
                newLine(sb);
            }
        }

        indentLevel--;
        newLine(sb);
        javaIndent(sb, indentLevel);
        sb.append('}');

        return sb.toString();
    }

    @Override
    public Set<FullyQualifiedJavaType> getImportedTypes() {
        // TODO Auto-generated method stub
        return Collections.unmodifiableSet(importedTypes);
    }

    @Override
    public Set<String> getStaticImports() {
        // TODO Auto-generated method stub
        return staticImports;
    }

    @Override
    public FullyQualifiedJavaType getSuperClass() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public boolean isJavaInterface() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean isJavaEnumeration() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public Set<FullyQualifiedJavaType> getSuperInterfaceTypes() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public FullyQualifiedJavaType getType() {
        // TODO Auto-generated method stub
        return type;
    }

    @Override
    public void addImportedType(FullyQualifiedJavaType importedType) {
        // TODO Auto-generated method stub
        this.importedTypes.add(importedType);
    }

    @Override
    public void addImportedTypes(Set<FullyQualifiedJavaType> importedTypes) {
        // TODO Auto-generated method stub
        this.importedTypes.addAll(importedTypes);
    }

    @Override
    public void addStaticImport(String staticImport) {
        // TODO Auto-generated method stub
        staticImports.add(staticImport);
    }

    @Override
    public void addStaticImports(Set<String> staticImports) {
        // TODO Auto-generated method stub
        this.staticImports.addAll(staticImports);
    }

    @Override
    public void addFileCommentLine(String commentLine) {
        // TODO Auto-generated method stub
        fileCommentLines.add(commentLine);
    }

    @Override
    public List<String> getFileCommentLines() {
        // TODO Auto-generated method stub
        return fileCommentLines;
    }

    /**
     * @return Returns the methods.
     */
    public List<Method> getMethods() {
        return methods;
    }

    public void addMethod(Method method) {
        methods.add(method);
    }

    /**
     * 注解方法和和mybatis codegen中定义得方法不一致，不过注解方法格式简单，通过本内部类来实现, 本类将注解成员表达式转换成String，将枚举声明表达式转换成String
     */
    public static class Method extends JavaElement {
        // public static Method newMethod(){}
        private String methodLine;

        public String getMethodLine() {
            return methodLine;
        }

        public String getFormattedContent(int indentLevel, boolean b) {
            StringBuilder sb = new StringBuilder();
            addFormattedJavadoc(sb, indentLevel);
            OutputUtilities.javaIndent(sb, indentLevel);
            sb.append(methodLine);
            indentLevel--;
            OutputUtilities.newLine(sb);

            return sb.toString();
        }

        public void setMethodLine(String methodLine) {
            this.methodLine = methodLine;
        }
    }
}