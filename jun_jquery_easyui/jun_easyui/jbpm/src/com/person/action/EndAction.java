package com.person.action;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.jbpm.graph.def.ActionHandler;
import org.jbpm.graph.exe.ExecutionContext;

public class EndAction implements ActionHandler {

    private static final long serialVersionUID = -3161235991642461706L;

    private static final Log logger = LogFactory.getLog(EndAction.class);

    public void execute(ExecutionContext executionContext) throws Exception {
        
        logger.info("善哉,终成正果,往生极乐!");
    }
}
