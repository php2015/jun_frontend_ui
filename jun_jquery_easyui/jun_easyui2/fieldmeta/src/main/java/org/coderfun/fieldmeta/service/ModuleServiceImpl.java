package org.coderfun.fieldmeta.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import klg.j2ee.common.dataaccess.BaseServiceImpl;
import org.coderfun.fieldmeta.dao.ModuleDAO;
import org.coderfun.fieldmeta.entity.Module;

@Service
public class ModuleServiceImpl  extends BaseServiceImpl<Module, Long> implements ModuleService{
	@Autowired
	ModuleDAO moduleDAO;
}
