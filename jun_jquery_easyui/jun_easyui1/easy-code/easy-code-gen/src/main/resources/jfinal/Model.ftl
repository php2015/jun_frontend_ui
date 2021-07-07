package ${conf.basePackage}.${table.camelName}.model;

<#list table.columns as col>
<#if (col.classImport != "")>
import ${col.classImport};
</#if>
</#list>

import com.jeasy.AnnotationValidable;
import com.jfinal.plugin.activerecord.Model;

import java.io.Serializable;

/**
 * ${table.comment}
 * @author ${conf.author}
 * @version ${conf.version}
 * @since ${conf.createDate}
 */
@SuppressWarnings("serial")
public class ${table.className} extends Model<${table.className}> implements AnnotationValidable, Serializable {

	private static final long serialVersionUID = 5409185459234711691L;

    public static final ${table.className} me = new ${table.className}();

	<#list table.columns as col>

	/**
	 * ${col.comment}
	 */
	public ${col.javaType} get${col.className}() {
		return get("${col.name}");
	}
    public void set${col.className}(${col.javaType} ${col.camelName}) {
    	set("${col.name}", ${col.camelName});
    }
	</#list>
}