<#include "include/head.ftl">
<#macro mapperEl value>${r"#{"}${value}}</#macro>
<#macro conditionMapperEl value>${r"#{condition."}${value}}</#macro>
<#macro jspEl value>${r"${"}${value}}</#macro>
<#assign idJavaType="java.lang.Long">
<#list table.columnList as column>
    <#if column.columnName?lower_case=='id'>
        <#assign idJavaType = column.columnClassName>
    </#if>
</#list>
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="${NamespaceDao}.I${Po}DAO">

    <sql id="Base_Column_List">
        <#list table.columnList as column>
        ${column.fieldName}<#if column_has_next>,</#if>
        </#list>
    </sql>
    <insert id="insert" parameterType="${NamespaceDomain}.${Po}">
        INSERT INTO ${tableName} (
        	<#assign hasData=false>
		    <#list table.columnList as column>
		    <#if column.primaryKey==false>
		    	<#if hasData==false>
		    ${column.fieldName}
	  		<#assign hasData=true>
	  			<#else>
		    ,${column.fieldName}
		    	</#if>
		    </#if>
		    </#list>
        ) VALUES (
        	<#assign hasData=false>
		    <#list table.columnList as column>
		    <#if column.primaryKey=false>
		    	<#if hasData==false><#assign hasData=true><#else>,</#if>${'#'}{${column.columnName?uncap_first}}
		    </#if>
		    </#list>
        )
        <selectKey resultType="java.lang.Long" keyProperty="id">
        	SELECT LAST_INSERT_ID() AS ID
        </selectKey>
    </insert>

    <insert id="insertMap" >
        INSERT INTO ${tableName} (
            <#assign hasData=false>
		    <#list table.columnList as column>
		    <#if column.primaryKey==false>
		    	<#if hasData==false>
		    ${column.fieldName}
	  		<#assign hasData=true>
	  			<#else>
		    ,${column.fieldName}
		    	</#if>
		    </#if>
		    </#list>
        ) VALUES (
            <#assign hasData=false>
		    <#list table.columnList as column>
		    <#if column.primaryKey=false>
		    	<#if hasData==false><#assign hasData=true><#else>,</#if><@mapperEl 'map.'+column.columnName?uncap_first />
            </#if>
            </#list>
        )
    </insert>
    
    <!-- 更新 -->
    <update id="update" parameterType="${NamespaceDomain}.${Po}">
        UPDATE ${tableName}
        <trim prefix="SET" suffixOverrides=",">
            <#list table.columnList as column>
		    <#if column.primaryKey=false>
		    ${column.fieldName}=${'#'}{${column.columnName?uncap_first}},
		    </#if>
		    </#list>
        </trim>
        WHERE
        <#assign hasData=false>
        <#list table.columnList as column>
		<#if column.primaryKey>
        ${column.fieldName} = ${'#'}{${column.columnName?uncap_first}}<#if hasData==false><#assign hasData=true><#else> AND </#if>
        </#if>
		</#list>
    </update>
	
	<update id="updateMap">
        UPDATE ${tableName}
        <trim prefix="SET" suffixOverrides=",">
            <#list table.columnList as column>
		    <#if column.primaryKey=false>
            <if test="map.${column.columnName?uncap_first}!=null">
                ${column.fieldName} = <@mapperEl 'map.'+column.columnName?uncap_first />,
            </if>
            </#if>
		    </#list>
        </trim>
        WHERE
        id = <@mapperEl 'map.id'/>
    </update>

    <update id="updateByCondition">
        UPDATE ${tableName}
        <trim prefix="SET" suffixOverrides=",">
            <#list table.columnList as column>
		    <#if column.primaryKey=false>
            <if test="update.${column.columnName?uncap_first}!=null">
                ${column.fieldName} = <@mapperEl 'update.'+column.columnName?uncap_first />,
            </if>
            </#if>
		    </#list>
        </trim>

        <trim prefix="WHERE" prefixOverrides="AND | OR">
            <#list table.columnList as column>
		    <#if column.primaryKey=false>
            <if test="condition.${column.columnName?uncap_first}!=null">
                AND ${column.fieldName} = <@mapperEl 'condition.' + column.columnName?uncap_first />
            </if>
            </#if>
		    </#list>
        </trim>
    </update>

    <update id="updateNull" parameterType="${NamespaceDomain}.${Po}">
        UPDATE ${tableName}
        <trim prefix="SET" suffixOverrides=",">
            <#list table.columnList as column>
		    <#if column.primaryKey=false>
            ${column.fieldName} = <@mapperEl column.columnName?uncap_first />,
            </#if>
		    </#list>
        </trim>
        WHERE
        <#assign hasData=false>
        <#list table.columnList as column>
		<#if column.primaryKey>
        ${column.fieldName} = <@mapperEl column.columnName?uncap_first /><#if hasData==false><#assign hasData=true><#else> AND </#if>
        </#if>
		</#list>
    </update>
    
    
    <!-- 按Id删除 -->
    <delete id="deleteById" parameterType="${idJavaType}">
        DELETE FROM ${tableName}
        <trim prefix="WHERE" prefixOverrides="AND | OR">
            <#list table.columnList as column>
			<#if column.primaryKey>
            AND ${column.fieldName} = <@mapperEl 'id'/>
            </#if>
			</#list>
        </trim>
    </delete>

    <!--根据list(ids)删除对象-->
    <delete id="deleteByIds">
        DELETE FROM ${tableName}
        WHERE id in
        <foreach collection="list" item="id" open="(" separator="," close=")"><@mapperEl 'id'/></foreach>
    </delete>

    <delete id="deleteByCondition" parameterType="java.util.Map">
        DELETE FROM ${tableName}
        <trim prefix="WHERE" prefixOverrides="AND | OR">
            <#list table.columnList as column>
            <if test="${column.columnName?uncap_first}!=null">
                AND ${column.fieldName} = <@mapperEl column.columnName?uncap_first/>
            </if>
            </#list>
        </trim>
    </delete>

    <delete id="deleteByProperty" parameterType="java.util.Map">
        DELETE FROM ${tableName} WHERE
        <@jspEl 'property'/> = <@mapperEl 'value'/>
    </delete>
    
    <!--查询相关 -->
    <select id="fetch" parameterType="${idJavaType}" resultType="${NamespaceDomain}.${Po}">
        SELECT
        <include refid="Base_Column_List" />
        FROM ${tableName}
        <trim prefix="WHERE" prefixOverrides="AND | OR">
            <#list table.columnList as column>
			<#if column.primaryKey>
            AND ${column.fieldName} = <@mapperEl 'id'/>
            </#if>
			</#list>
        </trim>
    </select>

    <select id="findOne" parameterType="java.util.Map" resultType="${NamespaceDomain}.${Po}">
        SELECT
        <include refid="Base_Column_List" />
        FROM ${tableName} WHERE
        <@jspEl 'property'/> = <@mapperEl 'value'/>
        LIMIT 0,1
    </select>

    <select id="findList" parameterType="java.util.Map" resultType="${NamespaceDomain}.${Po}">
        SELECT
        <include refid="Base_Column_List" />
        FROM ${tableName} WHERE
        <@jspEl 'property'/> = <@mapperEl 'value'/>
        <if test="orderBy!=null">
            ORDER BY <@jspEl 'orderBy'/> <@jspEl 'sortBy'/>
        </if>
    </select>

    <select id="findAll" resultType="${Po}">
        SELECT
        <include refid="Base_Column_List" />
        FROM ${tableName}
        <if test="orderBy!=null">
            ORDER BY <@jspEl 'orderBy'/> <@jspEl 'sortBy'/>
        </if>
    </select>

    <select id="queryPage" resultType="${NamespaceDomain}.${Po}">
        SELECT
        <include refid="Base_Column_List" />
        FROM ${tableName}
        <where>

            <if test="condition.whereSql != null">
                and id in (<@mapperEl 'condition.whereSql'/>)
            </if>

            <#list table.columnList as column>
            <if test="condition.${column.columnName?uncap_first}!=null">
                <@jspEl 'condition.groupOp'/>   ${column.fieldName}  <@jspEl 'condition.' + column.columnName?uncap_first+'.op'/>  <@mapperEl 'condition.' + column.columnName?uncap_first+'.data'/>
            </if>
           </#list>


    </where>

        <if test="orderBy!=null">
        ORDER BY <@jspEl 'orderBy'/> <@jspEl 'sortBy'/>
        </if>
        <if test="offset != null">
            limit <@jspEl 'offset'/>, <@jspEl 'rows'/>
        </if>
    </select>

    <select id="like" parameterType="java.util.Map" resultType="${NamespaceDomain}.${Po}">
        SELECT
        <include refid="Base_Column_List" />
        FROM ${tableName}
        <trim prefix="WHERE" prefixOverrides="AND | OR">
            <#list table.columnList as column>
            <if test="${column.columnName?uncap_first}!=null">
                AND ${column.fieldName} like CONCAT('%', <@mapperEl column.columnName?uncap_first/> , '%')
            </if>
            </#list>
        </trim>
        <if test="orderBy!=null">
        ORDER BY <@jspEl 'orderBy'/> <@jspEl 'sortBy'/>
        </if>
    </select>


    <select id="queryList" parameterType="java.util.Map" resultType="${NamespaceDomain}.${Po}">
        SELECT
        <include refid="Base_Column_List" />
        FROM ${tableName}
        <trim prefix="WHERE" prefixOverrides="AND | OR">
            <#list table.columnList as column>
            <if test="condition.${column.columnName?uncap_first}!=null">
                AND ${column.fieldName} = <@conditionMapperEl column.columnName?uncap_first/>
            </if>
            </#list>
        </trim>
        <if test="orderBy!=null">
        ORDER BY <@jspEl 'orderBy'/> <@jspEl 'sortBy'/>
        </if>
    </select>

    <select id="queryOne" parameterType="java.util.Map" resultType="${NamespaceDomain}.${Po}">
        SELECT
        <include refid="Base_Column_List" />
        FROM ${tableName}
        <trim prefix="WHERE" prefixOverrides="AND | OR">
            <#list table.columnList as column>
            <if test="condition.${column.columnName?uncap_first}!=null">
                AND ${column.fieldName} = <@conditionMapperEl column.columnName?uncap_first/>
            </if>
            </#list>
        </trim>
        limit 0,1
    </select>

    <select id="count" resultType="java.lang.Integer">
        SELECT count(1) FROM ${tableName}
       <where>
           <#list table.columnList as column>
           <if test="${column.columnName?uncap_first}!=null">
               <@jspEl 'groupOp'/> ${column.fieldName} <@jspEl column.columnName?uncap_first+'.op'/>  <@mapperEl column.columnName?uncap_first+'.data'/>
           </if>
       </#list>

       </where>
    <if test="orderBy!=null">
        ORDER BY <@jspEl 'orderBy'/> <@jspEl 'sortBy'/>
    </if>
    </select>

    <select id="selectMaxId" resultType="${idJavaType}">
        SELECT
        MAX(id)
        FROM ${tableName}
    </select>
   
</mapper>