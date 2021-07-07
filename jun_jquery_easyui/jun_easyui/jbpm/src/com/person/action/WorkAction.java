package com.person.action;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.jbpm.graph.def.ActionHandler;
import org.jbpm.graph.exe.ExecutionContext;

public class WorkAction implements ActionHandler{

    private static final long serialVersionUID = 9112792586877839879L;

    private static final Log logger = LogFactory.getLog(WorkAction.class);
   
    public void execute(ExecutionContext executionContext) throws Exception{
        
        logger.info("Å¬Á¦¹¤×÷×¬Ç®...");
    }
}