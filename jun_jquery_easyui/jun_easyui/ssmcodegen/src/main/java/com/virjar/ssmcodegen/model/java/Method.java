package com.virjar.ssmcodegen.model.java;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.ListIterator;

import com.google.common.collect.Lists;
import com.virjar.ssmcodegen.util.OutputUtilities;

/**
 * Created by virjar on 16/7/20.
 */
public class Method extends JavaElement {

    private List<String> bodyLines;

    private boolean constructor;

    private FullyQualifiedJavaType returnType;

    private String name;

    private List<Parameter> parameters;

    private List<FullyQualifiedJavaType> exceptions;

    private boolean isSynchronized;

    private boolean isNative;

    private boolean isAbstract;

    private List<String> typeParameters;

    /**
     *
     */
    public Method() {
        // use a default name to avoid malformed code
        this("bar");
    }

    public Method(String name) {
        super();
        bodyLines = new ArrayList<String>();
        parameters = new ArrayList<Parameter>();
        exceptions = new ArrayList<FullyQualifiedJavaType>();
        this.name = name;
        typeParameters = new ArrayList<String>();
    }

    /**
     * Copy constructor. Not a truly deep copy, but close enough for most purposes.
     *
     * @param original
     */
    public Method(Method original) {
        super(original);
        bodyLines = new ArrayList<String>();
        parameters = new ArrayList<Parameter>();
        exceptions = new ArrayList<FullyQualifiedJavaType>();
        typeParameters = Lists.newArrayList();
        this.bodyLines.addAll(original.bodyLines);
        this.constructor = original.constructor;
        this.exceptions.addAll(original.exceptions);
        this.name = original.name;
        this.parameters.addAll(original.parameters);
        this.typeParameters.addAll(original.typeParameters);
        this.returnType = original.returnType;
        this.isNative = original.isNative;
        this.isAbstract = original.isAbstract;
        this.isSynchronized = original.isSynchronized;
    }

    /**
     * @return Returns the bodyLines.
     */
    public List<String> getBodyLines() {
        return bodyLines;
    }

    public void addBodyLine(String line) {
        bodyLines.add(line);
    }

    public void addBodyLine(int index, String line) {
        bodyLines.add(index, line);
    }

    public void addBodyLines(Collection<String> lines) {
        bodyLines.addAll(lines);
    }

    public void addBodyLines(int index, Collection<String> lines) {
        bodyLines.addAll(index, lines);
    }

    public String getFormattedContent(int indentLevel, boolean interfaceMethod) {
        StringBuilder sb = new StringBuilder();

        addFormattedJavadoc(sb, indentLevel);
        addFormattedAnnotations(sb, indentLevel);

        OutputUtilities.javaIndent(sb, indentLevel);

        if (!interfaceMethod) {
            sb.append(getVisibility().getValue());

            if (isStatic()) {
                sb.append("static ");
            }

            if (isFinal()) {
                sb.append("final ");
            }

            if (isSynchronized()) {
                sb.append("synchronized ");
            }

            if (isNative()) {
                sb.append("native ");
            } else if (isAbstract()) {
                sb.append("abstract ");
            }
        }

        if (this.typeParameters.size() > 0) {
            sb.append("<");
            for (String type : typeParameters) {
                sb.append(type);
                sb.append(",");
            }
            sb.setLength(sb.length() - 1);
            sb.append("> ");
        }

        if (!constructor) {
            if (getReturnType() == null) {
                sb.append("void");
            } else {
                sb.append(getReturnType().getShortName());
            }
            sb.append(' ');
        }

        sb.append(getName());
        sb.append('(');

        boolean comma = false;
        for (Parameter parameter : getParameters()) {
            if (comma) {
                sb.append(", ");
            } else {
                comma = true;
            }

            sb.append(parameter.getFormattedContent());
        }

        sb.append(')');

        if (getExceptions().size() > 0) {
            sb.append(" throws ");
            comma = false;
            for (FullyQualifiedJavaType fqjt : getExceptions()) {
                if (comma) {
                    sb.append(", ");
                } else {
                    comma = true;
                }

                sb.append(fqjt.getShortName());
            }
        }

        // if no body lines, then this is an abstract method
        if (isAbstract() || isNative()) {
            sb.append(';');
        } else {
            sb.append(" {");
            indentLevel++;

            ListIterator<String> listIter = bodyLines.listIterator();
            while (listIter.hasNext()) {
                String line = listIter.next();
                if (line.startsWith("}")) {
                    indentLevel--;
                }

                OutputUtilities.newLine(sb);
                OutputUtilities.javaIndent(sb, indentLevel);
                sb.append(line);

                if ((line.endsWith("{") && !line.startsWith("switch")) //$NON-NLS-2$
                        || line.endsWith(":")) {
                    indentLevel++;
                }

                if (line.startsWith("break")) {
                    // if the next line is '}', then don't outdent
                    if (listIter.hasNext()) {
                        String nextLine = listIter.next();
                        if (nextLine.startsWith("}")) {
                            indentLevel++;
                        }

                        // set back to the previous element
                        listIter.previous();
                    }
                    indentLevel--;
                }
            }

            indentLevel--;
            OutputUtilities.newLine(sb);
            OutputUtilities.javaIndent(sb, indentLevel);
            sb.append('}');
        }

        return sb.toString();
    }

    /**
     * @return Returns the constructor.
     */
    public boolean isConstructor() {
        return constructor;
    }

    /**
     * @param constructor The constructor to set.
     */
    public void setConstructor(boolean constructor) {
        this.constructor = constructor;
    }

    /**
     * @return Returns the name.
     */
    public String getName() {
        return name;
    }

    /**
     * @param name The name to set.
     */
    public void setName(String name) {
        this.name = name;
    }

    public List<Parameter> getParameters() {
        return parameters;
    }

    public void addParameter(Parameter parameter) {
        parameters.add(parameter);
    }

    public void addParameter(int index, Parameter parameter) {
        parameters.add(index, parameter);
    }

    /**
     * @return Returns the returnType.
     */
    public FullyQualifiedJavaType getReturnType() {
        return returnType;
    }

    /**
     * @param returnType The returnType to set.
     */
    public void setReturnType(FullyQualifiedJavaType returnType) {
        this.returnType = returnType;
    }

    /**
     * @return Returns the exceptions.
     */
    public List<FullyQualifiedJavaType> getExceptions() {
        return exceptions;
    }

    public void addException(FullyQualifiedJavaType exception) {
        exceptions.add(exception);
    }

    public boolean isSynchronized() {
        return isSynchronized;
    }

    public void setSynchronized(boolean isSynchronized) {
        this.isSynchronized = isSynchronized;
    }

    public boolean isNative() {
        return isNative;
    }

    public void setNative(boolean isNative) {
        this.isNative = isNative;
    }

    public boolean isAbstract() {
        return isAbstract;
    }

    public void setAbstract(boolean isAbstract) {
        this.isAbstract = isAbstract;
    }

    public void addTypeParameter(String s) {
        this.typeParameters.add(s);
    }
}
