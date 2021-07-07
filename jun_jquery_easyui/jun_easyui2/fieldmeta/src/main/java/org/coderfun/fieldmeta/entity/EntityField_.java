package org.coderfun.fieldmeta.entity;

import java.math.BigDecimal;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import org.coderfun.common.BaseEntity_;

@Generated(value="Dali", date="2018-05-28T23:32:34.122+0800")
@StaticMetamodel(EntityField.class)
public class EntityField_ extends BaseEntity_ {
	public static volatile SingularAttribute<EntityField, String> tableName;
	public static volatile SingularAttribute<EntityField, String> columnName;
	public static volatile SingularAttribute<EntityField, BigDecimal> columnSort;
	public static volatile SingularAttribute<EntityField, String> columnType;
	public static volatile SingularAttribute<EntityField, String> comments;
	public static volatile SingularAttribute<EntityField, String> attrName;
	public static volatile SingularAttribute<EntityField, String> attrType;
	public static volatile SingularAttribute<EntityField, Long> length;
	public static volatile SingularAttribute<EntityField, Long> decimalPlaces;
	public static volatile SingularAttribute<EntityField, String> pkRestrict;
	public static volatile SingularAttribute<EntityField, String> notNullRestrict;
	public static volatile SingularAttribute<EntityField, String> uniqueRestrict;
	public static volatile SingularAttribute<EntityField, String> notInsertRestrict;
	public static volatile SingularAttribute<EntityField, String> notUpdateRestrict;
}
