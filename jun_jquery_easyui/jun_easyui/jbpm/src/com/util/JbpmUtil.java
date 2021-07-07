package com.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.List;
import java.util.zip.ZipInputStream;

import org.hibernate.Session;
import org.jbpm.JbpmConfiguration;
import org.jbpm.JbpmContext;
import org.jbpm.context.exe.ContextInstance;
import org.jbpm.db.TaskMgmtSession;
import org.jbpm.graph.def.ProcessDefinition;
import org.jbpm.graph.exe.ExecutionContext;
import org.jbpm.graph.exe.ProcessInstance;
import org.jbpm.taskmgmt.exe.Assignable;
import org.jbpm.taskmgmt.exe.TaskInstance;


public class JbpmUtil {
	private static JbpmConfiguration configuration = JbpmConfiguration.getInstance();
	
	public static JbpmContext getJbpmContext() {
		JbpmContext jbpmContext = configuration.getCurrentJbpmContext();
		if (jbpmContext == null) {
			jbpmContext = configuration.createJbpmContext();
		}
		return jbpmContext;
	}
	
	/**
	 * 作用：获取流程实例
	 * @param fileName:com/simple/jpdl/processdefinition.xml
	 * @return
	 */
	public static ProcessInstance getProcessInstance(String fileName){
		ProcessDefinition processDefinition = ProcessDefinition.parseXmlResource(fileName);
		ProcessInstance instance = new ProcessInstance(processDefinition);
		return instance;
	}
	
	/**
	 * 
	 * 作用：保存流程定义到数据库
	 * @param file:/com/simple/jpdl/processdefinition.xml
	 */
	public static void deployProcessDefinition(String xmlFile) { 

        // 从 jbpm.cfg.xml 取得 jbpm 的配置 
        //JbpmConfiguration config = JbpmConfiguration.getInstance(); 

        // 创建一个 jbpm 容器 
        //JbpmContext jbpmContext = config.createJbpmContext(); 
		JbpmContext jbpmContext = getJbpmContext();

        // 由 processdefinition.xml 生成相对应的流程定义类 ProcessDefinition 
        InputStream is = null;
        try {
			is = JbpmUtil.class.getResourceAsStream(xmlFile);
			
			ProcessDefinition processDefinition = ProcessDefinition.parseXmlInputStream(is); 

	        // 利用容器的方法将流程定义数据部署到数据库上 
	        jbpmContext.deployProcessDefinition(processDefinition); 
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			try {
				is.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			 // 关闭 jbpmContext 
	        jbpmContext.close(); 
		}
		System.out.println("流程部署成功！");

    } 
	
	/**
	 * 作用：保存流程定义到数据库(通过打包后的jpdl文件)
	 * @param jpdlFile:/com/simple/jpdl/simple.jpdl
	 */
	public static void deployProcessDefinitionByJpdl(String jpdlFile){
		InputStream is = JbpmUtil.class.getResourceAsStream(jpdlFile);
			
		ZipInputStream zipInputStream = new ZipInputStream(is);
        //JbpmContext jbpmContext = JbpmContext.getCurrentJbpmContext();
		JbpmContext jbpmContext = getJbpmContext();
		
		ProcessDefinition processDefinition = ProcessDefinition.parseParZipInputStream(zipInputStream);
        try {
             jbpmContext.deployProcessDefinition(processDefinition);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			try {
				zipInputStream.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			jbpmContext.close();
		}
        System.out.println("Deployed archive " + processDefinition.getName() + " successfully");
	}
	
	//ActionHandler中的执行方法
	public void execute(ExecutionContext executionContext){
		ContextInstance contextInstance = executionContext.getContextInstance();
		//通过contextInstance获取变量
		Long borrowId = (Long)contextInstance.getVariable("borrow_id");
	
		//Session session = executionContext.getJbpmContext().getSessionFactory().openSession();
		Session session = executionContext.getJbpmContext().getSession();
		


		//这句别漏了，否则流程不会向下走哒
		boolean hasEnd = executionContext.getContextInstance().getProcessInstance().hasEnded();
		if(!executionContext.getContextInstance().getProcessInstance().hasEnded()){
			executionContext.leaveNode();
		}
	}
	
	//DecisionHandler中的方法
	public String decide(ExecutionContext executionContext) throws Exception {
		//根据业务逻辑判断流程方向
		ContextInstance contextInstance = executionContext.getContextInstance();
		//通过contextInstance获取变量
		Long borrowId = (Long)contextInstance.getVariable("borrow_id");
	
		//Session session = executionContext.getJbpmContext().getSessionFactory().openSession();
		Session session = executionContext.getJbpmContext().getSession();
		
		//获取金额(从数据库里获取)
		int money = 4000;
		if(money > 5000){
			return "more 5000";//走向符合该条件的流程
		}else{
			return "less 5000";//走向符合该条件的流程
		}
	}
	
	//AssignmentHandler中的方法
	public void assign(Assignable assignable, ExecutionContext executionContext){
		//将审批任务分配给流程发起人的部门领导
		Session session = executionContext.getJbpmContext().getSession();
		String hql = "from com.gever.model.TUser u where u.userType = 2";
		List userList=session.createQuery(hql).list();
		String[] users = new String[userList.size()];
		
		assignable.setPooledActors(users);//可以分配多个人
	}
	
	public void createProcessInstance() {
		JbpmContext jbpmContext = getJbpmContext();

		Session session = jbpmContext.getSession();

		ProcessDefinition pd = jbpmContext.getGraphSession().findLatestProcessDefinition("borrow");
		ProcessInstance pi = pd.createProcessInstance();
		pi.getContextInstance().setVariable("username", "用户名");

		TaskInstance ti = pi.getTaskMgmtInstance().createStartTaskInstance();
		ti.setActorId("用户名");
		ti.end();
	}
	
	//根据任务id获取任务实例
	public static TaskInstance getTaskInstance(int taskId){
		JbpmContext jbpmContext = getJbpmContext();
		TaskInstance ti = jbpmContext.getTaskInstance(taskId);
		return ti;
	}
	
	//根据用户获取所有任务实例
	public List findAllTaskInstanceByUserId(String userid) {
		JbpmContext jbpmContext = JbpmUtil.getJbpmContext();
		List list = jbpmContext.getTaskMgmtSession().findTaskInstances(userid);
		
		return list;
	}
	public Collection findTaskInstancesByProcessInstanceId(long processInstanceId) {
		JbpmContext jbpmContext = JbpmUtil.getJbpmContext();
		ProcessInstance pi = jbpmContext.getProcessInstance(processInstanceId);
		TaskMgmtSession mgmtSession = jbpmContext.getTaskMgmtSession();
		Collection taskList = mgmtSession.findTaskInstancesByProcessInstance(pi);
		
		return taskList;
	}

	public static void main(String[] args) {
		//JbpmUtil.deployProcessDefinition("/com/simple/jpdl/processdefinition.xml");
		JbpmUtil.deployProcessDefinitionByJpdl("/com/simple/jpdl/simple.jpdl");
	}
}
