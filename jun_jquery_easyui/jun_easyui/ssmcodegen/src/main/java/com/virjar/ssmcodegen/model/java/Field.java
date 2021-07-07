package com.virjar.ssmcodegen.model.java;

import org.mybatis.generator.api.dom.OutputUtilities;

/**
 * Created by virjar on 16/7/20.
 */
public class Field extends JavaElement {
    private FullyQualifiedJavaType type;
    private String name;
    private String initializationString;
    private boolean isTransient;
    private boolean isVolatile;

    /**
     *
     */
    public Field() {
        // use a default name to avoid NPE
        this("foo", FullyQualifiedJavaType.getIntInstance());
    }

    public Field(String name, FullyQualifiedJavaType type) {
        super();
        this.name = name;
        this.type = type;
    }

    public Field(Field field) {
        super(field);
        this.type = field.type;
        this.name = field.name;
        this.initializationString = field.initializationString;
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

    /**
     * @return Returns the type.
     */
    public FullyQualifiedJavaType getType() {
        return type;
    }

    /**
     * @param type The type to set.
     */
    public void setType(FullyQualifiedJavaType type) {
        this.type = type;
    }

    /**
     * @return Returns the initializationString.
     */
    public String getInitializationString() {
        return initializationString;
    }

    /**
     * @param initializationString The initializationString to set.
     */
    public void setInitializationString(String initializationString) {
        this.initializationString = initializationString;
    }

    public String getFormattedContent(int indentLevel) {
        StringBuilder sb = new StringBuilder();

        addFormattedJavadoc(sb, indentLevel);
        addFormattedAnnotations(sb, indentLevel);

        OutputUtilities.javaIndent(sb, indentLevel);
        sb.append(getVisibility().getValue());

        if (isStatic()) {
            sb.append("static ");
        }

        if (isFinal()) {
            sb.append("final ");
        }

        if (isTransient()) {
            sb.append("transient ");
        }

        if (isVolatile()) {
            sb.append("volatile ");
        }

        sb.append(type.getShortName());

        sb.append(' ');
        sb.append(name);

        if (initializationString != null && initializationString.length() > 0) {
            sb.append(" = ");
            sb.append(initializationString);
        }

        sb.append(';');

        return sb.toString();
    }

    public boolean isTransient() {
        return isTransient;
    }

    public void setTransient(boolean isTransient) {
        this.isTransient = isTransient;
    }

    public boolean isVolatile() {
        return isVolatile;
    }

    public void setVolatile(boolean isVolatile) {
        this.isVolatile = isVolatile;
    }
}
