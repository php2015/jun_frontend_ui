package org.coderfun.fieldmeta.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import klg.j2ee.common.dataaccess.BaseServiceImpl;
import org.coderfun.fieldmeta.dao.ProjectDAO;
import org.coderfun.fieldmeta.entity.Project;

@Service
public class ProjectServiceImpl  extends BaseServiceImpl<Project, Long> implements ProjectService{
	@Autowired
	ProjectDAO projectDAO;
}
