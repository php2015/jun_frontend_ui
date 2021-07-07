package com.person.action;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.jbpm.graph.def.ActionHandler;
import org.jbpm.graph.exe.ExecutionContext;

public class StudyAction implements ActionHandler {

    private static final long serialVersionUID = -4927790934014966410L;

    private static final Log logger = LogFactory.getLog(StudyAction.class);

    public void execute(ExecutionContext executionContext) throws Exception {
        
        logger.info("努力学习本领...");
    }
}
