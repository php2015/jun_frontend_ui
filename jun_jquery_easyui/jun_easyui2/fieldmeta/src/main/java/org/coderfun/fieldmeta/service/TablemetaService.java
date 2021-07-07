package org.coderfun.fieldmeta.service;

import klg.j2ee.common.dataaccess.BaseService;

import java.util.List;

import org.coderfun.fieldmeta.entity.EntityField;
import org.coderfun.fieldmeta.entity.PageField;
import org.coderfun.fieldmeta.entity.Tablemeta;

public interface TablemetaService extends BaseService<Tablemeta, Long>{
	
	public void saveFields(String tableName,List<EntityField> entityFields,List<PageField> pageFields);

}
