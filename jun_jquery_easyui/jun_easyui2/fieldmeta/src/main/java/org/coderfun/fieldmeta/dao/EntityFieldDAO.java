package org.coderfun.fieldmeta.dao;

import klg.j2ee.common.dataaccess.BaseRepository;
import org.coderfun.fieldmeta.entity.EntityField;

public interface EntityFieldDAO extends BaseRepository<EntityField, Long> {
	public static final String UPDATE_SORT="update_sort";
}
