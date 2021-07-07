package com.virjar.ssmcodegen.model.java;

import java.util.List;
import java.util.Set;

/**
 * 编译单元抽象接口,为最顶层抽象,和mybatis code generator不同的是,他不再提供格式化的功能,原因是我们自己实现格式化弱爆了 最终我们需要描述的文件类型只有三种。枚举,java类,注解 Created by
 * virjar on 16/7/20.
 *
 */
public interface CompilationUnit {
    String getFormattedContent();

    Set<FullyQualifiedJavaType> getImportedTypes();

    Set<String> getStaticImports();

    FullyQualifiedJavaType getSuperClass();

    boolean isJavaInterface();

    boolean isJavaEnumeration();

    Set<FullyQualifiedJavaType> getSuperInterfaceTypes();

    FullyQualifiedJavaType getType();

    void addImportedType(FullyQualifiedJavaType importedType);

    void addImportedTypes(Set<FullyQualifiedJavaType> importedTypes);

    void addStaticImport(String staticImport);

    void addStaticImports(Set<String> staticImports);

    /**
     * Comments will be written at the top of the file as is, we do not append any start or end comment characters.
     *
     * Note that in the Eclipse plugin, file comments will not be merged.
     *
     * @param commentLine
     */
    void addFileCommentLine(String commentLine);

    List<String> getFileCommentLines();
}
