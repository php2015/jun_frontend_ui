package com.person.action;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.jbpm.graph.def.ActionHandler;
import org.jbpm.graph.exe.ExecutionContext;

public class StartAction implements ActionHandler {

    private static final long serialVersionUID = 7004254907848592166L;
    
    private static final Log logger = LogFactory.getLog(StartAction.class);

    public void execute(ExecutionContext executionContext) throws Exception{
        
        logger.info("¸Õ¿ªÊ¼Ç°Í¾Î´²·...");
    }
}
