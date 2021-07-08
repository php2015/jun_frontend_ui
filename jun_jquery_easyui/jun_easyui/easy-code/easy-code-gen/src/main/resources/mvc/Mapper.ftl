<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="${conf.basePackage}.${table.camelName}.dao.${table.className}DAO">
    <resultMap id="BaseResultMap" type="${conf.basePackage}.${table.camelName}.model.${table.className}">
	<#list table.columns as col>
		<#if col.name=="id">
        <id column="${col.name}" property="${col.camelName}" jdbcType="${col.myBastisType}"/>
		<#else>
        <result column="${col.name}" property="${col.camelName}" jdbcType="${col.myBastisType}"/>
		</#if>
	</#list>
    </resultMap>

    <sql id="select_column_list">SELECT ${table.selectView}</sql>
    <sql id="order_by_sql">ORDER BY id DESC</sql>
    <sql id="insert_into_sql">INSERT INTO `${table.name}` (${table.insertView})</sql>
    <sql id="delete_from_sql">DELETE FROM `${table.name}`</sql>
    <sql id="update_table_sql">UPDATE `${table.name}`</sql>
    <sql id="select_count_sql">SELECT COUNT(1) FROM `${table.name}`</sql>
    <sql id="from_sql">FROM `${table.name}`</sql>
    <sql id="insert_table_sql">INSERT INTO `${table.name}`</sql>
    <sql id="limit_1_sql">LIMIT 1</sql>

    <insert id="insert" useGeneratedKeys="true" keyProperty="id" parameterType="${conf.basePackage}.${table.camelName}.model.${table.className}">
        <include refid="insert_into_sql"/>
        <trim prefix="VALUES (" suffix=")" suffixOverrides=",">
        <#list table.columns as col>
            <#if col.name!="id">
            ${r'#{'}${col.camelName},jdbcType=${col.myBastisType}},
            </#if>
        </#list>
        </trim>
    </insert>

    <insert id="insertBatch" parameterType="java.util.List">
        <include refid="insert_into_sql"/>
        <trim prefix="VALUES" suffixOverrides=",">
            <if test="list != null">
                <foreach collection="list" item="item" index="index" separator=",">
                    <trim prefix="(" suffix=")" suffixOverrides=",">
                    <#list table.columns as col>
                        <#if col.name!="id">
                        ${r'#{item.'}${col.camelName},jdbcType=${col.myBastisType}},
                        </#if>
                    </#list>
                    </trim>
                </foreach>
            </if>
        </trim>
    </insert>

    <insert id="insertSelective" useGeneratedKeys="true" keyProperty="id" parameterType="${conf.basePackage}.${table.camelName}.model.${table.className}">
        <include refid="insert_table_sql"/>
        <trim prefix="(" suffix=")" suffixOverrides=",">
		<#list table.columns as col>
			<#if col.name!="id">
            <if test="${col.camelName} != null">${col.name},</if>
			</#if>
		</#list>
        </trim>
        <trim prefix="VALUES (" suffix=")" suffixOverrides=",">
		<#list table.columns as col>
			<#if col.name!="id">
            <if test="${col.camelName} != null">${r'#{'}${col.camelName},jdbcType=${col.myBastisType}},</if>
			</#if>
		</#list>
        </trim>
    </insert>

    <select id="selectByPrimaryKey" resultMap="BaseResultMap" parameterType="java.lang.Long">
        <include refid="select_column_list"/>
        <include refid="from_sql"/>
        <where>
            id = ${r'#{'}id,jdbcType=BIGINT}
        </where>
    </select>

    <select id="selectBatchByPrimaryKey" resultMap="BaseResultMap" parameterType="java.util.List">
        <include refid="select_column_list"/>
        <include refid="from_sql"/>
        <where>
            <if test="list != null">
                <foreach collection="list" index="index" item="id" open=" id IN (" separator="," close=")">
                ${r'#{'}id,jdbcType=BIGINT}
                </foreach>
            </if>
        </where>
    </select>

    <select id="selectByParams" resultMap="BaseResultMap" parameterType="java.util.HashMap">
        <include refid="select_column_list"/>
        <include refid="from_sql"/>
        <where>
        <#list table.columns as col>
            <if test="${col.camelName} != null">
                AND ${col.name} = ${r'#{'}${col.camelName},jdbcType=${col.myBastisType}}
            </if>
        </#list>
            <if test="ids != null">
                <foreach collection="ids" index="index" item="id" open=" AND id IN (" separator="," close=")">
                ${r'#{'}id,jdbcType=BIGINT}
                </foreach>
            </if>
        </where>
        <include refid="order_by_sql"/>
        <if test="offset != null and size != null">LIMIT ${r'#{'}offset}, ${r'#{'}size}</if>
    </select>

    <select id="countByParams" resultType="java.lang.Integer" parameterType="java.util.HashMap">
        <include refid="select_count_sql"/>
        <where>
        <#list table.columns as col>
            <if test="${col.camelName} != null">
                AND ${col.name} = ${r'#{'}${col.camelName},jdbcType=${col.myBastisType}}
            </if>
        </#list>
            <if test="ids != null">
                <foreach collection="ids" index="index" item="id" open=" AND id IN (" separator="," close=")">
                ${r'#{'}id,jdbcType=BIGINT}
                </foreach>
            </if>
        </where>
    </select>

    <select id="selectFirstByParams" resultMap="BaseResultMap" parameterType="java.util.HashMap">
        <include refid="select_column_list"/>
        <include refid="from_sql"/>
        <where>
        <#list table.columns as col>
            <if test="${col.camelName} != null">
                AND ${col.name} = ${r'#{'}${col.camelName},jdbcType=${col.myBastisType}}
            </if>
        </#list>
            <if test="ids != null">
                <foreach collection="ids" index="index" item="id" open=" AND id IN (" separator="," close=")">
                ${r'#{'}id,jdbcType=BIGINT}
                </foreach>
            </if>
        </where>
        <include refid="order_by_sql"/>
        <include refid="limit_1_sql"/>
    </select>

    <update id="updateByPrimaryKeySelective" parameterType="${conf.basePackage}.${table.camelName}.model.${table.className}">
        <include refid="update_table_sql"/>
        <set>
        <#list table.columns as col>
        <#if col.name!="id">
            <if test="${col.camelName} != null">${col.name} = ${r'#{'}${col.camelName},jdbcType=${col.myBastisType}},</if>
        </#if>
        </#list>
        </set>
        <where>
            id = ${r'#{'}id,jdbcType=BIGINT}
        </where>
    </update>

    <update id="updateByPrimaryKey" parameterType="${conf.basePackage}.${table.camelName}.model.${table.className}">
        <include refid="update_table_sql"/>
        <set>
        <#list table.columns as col>
        <#if col.name!="id">
            ${col.name} = ${r'#{'}${col.camelName},jdbcType=${col.myBastisType}},
        </#if>
        </#list>
        </set>
        <where>
            id = ${r'#{'}id,jdbcType=BIGINT}
        </where>
    </update>

    <update id="deleteByPrimaryKey" parameterType="java.lang.Long">
        <include refid="delete_from_sql"/>
        <where>
            id = ${r'#{'}id,jdbcType=BIGINT}
        </where>
    </update>

    <update id="deleteBatchByPrimaryKey" parameterType="java.util.List">
        <include refid="delete_from_sql"/>
        <where>
        <if test="list != null">
            <foreach collection="list" index="index" item="id" open=" id IN (" separator="," close=")">
            ${r'#{'}id,jdbcType=BIGINT}
            </foreach>
        </if>
        </where>
    </update>

    <update id="deleteByParams" parameterType="java.util.HashMap">
        <include refid="delete_from_sql"/>
        <where>
        <#list table.columns as col>
        <if test="${col.camelName} != null">
            AND ${col.name} = ${r'#{'}${col.camelName},jdbcType=${col.myBastisType}}
        </if>
        </#list>
        </where>
    </update>
</mapper>