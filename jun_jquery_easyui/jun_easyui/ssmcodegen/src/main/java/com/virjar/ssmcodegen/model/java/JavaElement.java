package com.virjar.ssmcodegen.model.java;

import org.mybatis.generator.api.dom.OutputUtilities;

import java.util.ArrayList;
import java.util.List;

/**
 * java元素:class,interface,annotation,enum,method,field
 */
public abstract class JavaElement {
    private List<String> javaDocLines;

    private JavaVisibility visibility = JavaVisibility.DEFAULT;

    private boolean isStatic;

    private boolean isFinal;

    private List<String> annotations;

    /**
     *
     */
    public JavaElement() {
        super();
        javaDocLines = new ArrayList<String>();
        annotations = new ArrayList<String>();
    }

    /**
     * Copy Constructor.
     *
     * @param original
     */
    public JavaElement(JavaElement original) {
        this();
        this.annotations.addAll(original.annotations);
        this.isFinal = original.isFinal;
        this.isStatic = original.isStatic;
        this.javaDocLines.addAll(original.javaDocLines);
        this.visibility = original.visibility;
    }

    /**
     * @return Returns the javaDocLines.
     */
    public List<String> getJavaDocLines() {
        return javaDocLines;
    }

    public void addJavaDocLine(String javaDocLine) {
        javaDocLines.add(javaDocLine);
    }

    public List<String> getAnnotations() {
        return annotations;
    }

    public void addAnnotation(String annotation) {
        annotations.add(annotation);
    }

    /**
     * @return Returns the visibility.
     */
    public JavaVisibility getVisibility() {
        return visibility;
    }

    /**
     * @param visibility The visibility to set.
     */
    public void setVisibility(JavaVisibility visibility) {
        this.visibility = visibility;
    }

    public void addSuppressTypeWarningsAnnotation() {
        addAnnotation("@SuppressWarnings(\"unchecked\")");
    }

    public void addFormattedJavadoc(StringBuilder sb, int indentLevel) {
        for (String javaDocLine : javaDocLines) {
            OutputUtilities.javaIndent(sb, indentLevel);
            sb.append(javaDocLine);
            OutputUtilities.newLine(sb);
        }
    }

    public void addFormattedAnnotations(StringBuilder sb, int indentLevel) {
        for (String annotation : annotations) {
            OutputUtilities.javaIndent(sb, indentLevel);
            sb.append(annotation);
            OutputUtilities.newLine(sb);
        }
    }

    public boolean isFinal() {
        return isFinal;
    }

    public void setFinal(boolean isFinal) {
        this.isFinal = isFinal;
    }

    public boolean isStatic() {
        return isStatic;
    }

    public void setStatic(boolean isStatic) {
        this.isStatic = isStatic;
    }
}
