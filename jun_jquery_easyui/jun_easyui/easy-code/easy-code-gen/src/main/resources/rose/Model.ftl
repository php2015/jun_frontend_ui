package ${conf.basePackage}.${table.camelName}.model;

import java.io.Serializable;
<#list table.columns as col>
<#if (col.classImport != "")>
import ${col.classImport};
</#if>
</#list>

import com.jeasy.AnnotationValidable;
import com.jeasy.doc.annotation.InitField;

import lombok.Data;

/**
 * ${table.comment}
 * @author ${conf.author}
 * @version ${conf.version}
 * @since ${conf.createDate}
 */
@Data
public class ${table.className} implements AnnotationValidable, Serializable {

	private static final long serialVersionUID = -990334519496260591L;

	<#list table.columns as col>
	/**
	 * ${col.comment}
	 */
    @InitField(value = "", desc = "${col.comment}")
	private ${col.javaType} ${col.camelName};

	</#list>
}