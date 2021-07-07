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
	 * ���ã���ȡ����ʵ��
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
	 * ���ã��������̶��嵽���ݿ�
	 * @param file:/com/simple/jpdl/processdefinition.xml
	 */
	public static void deployProcessDefinition(String xmlFile) { 

        // �� jbpm.cfg.xml ȡ�� jbpm ������ 
        //JbpmConfiguration config = JbpmConfiguration.getInstance(); 

        // ����һ�� jbpm ���� 
        //JbpmContext jbpmContext = config.createJbpmContext(); 
		JbpmContext jbpmContext = getJbpmContext();

        // �� processdefinition.xml �������Ӧ�����̶����� ProcessDefinition 
        InputStream is = null;
        try {
			is = JbpmUtil.class.getResourceAsStream(xmlFile);
			
			ProcessDefinition processDefinition = ProcessDefinition.parseXmlInputStream(is); 

	        // ���������ķ��������̶������ݲ������ݿ��� 
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
			 // �ر� jbpmContext 
	        jbpmContext.close(); 
		}
		System.out.println("���̲���ɹ���");

    } 
	
	/**
	 * ���ã��������̶��嵽���ݿ�(ͨ��������jpdl�ļ�)
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
	
	//ActionHandler�е�ִ�з���
	public void execute(ExecutionContext executionContext){
		ContextInstance contextInstance = executionContext.getContextInstance();
		//ͨ��contextInstance��ȡ����
		Long borrowId = (Long)contextInstance.getVariable("borrow_id");
	
		//Session session = executionContext.getJbpmContext().getSessionFactory().openSession();
		Session session = executionContext.getJbpmContext().getSession();
		


		//����©�ˣ��������̲�����������
		boolean hasEnd = executionContext.getContextInstance().getProcessInstance().hasEnded();
		if(!executionContext.getContextInstance().getProcessInstance().hasEnded()){
			executionContext.leaveNode();
		}
	}
	
	//DecisionHandler�еķ���
	public String decide(ExecutionContext executionContext) throws Exception {
		//����ҵ���߼��ж����̷���
		ContextInstance contextInstance = executionContext.getContextInstance();
		//ͨ��contextInstance��ȡ����
		Long borrowId = (Long)contextInstance.getVariable("borrow_id");
	
		//Session session = executionContext.getJbpmContext().getSessionFactory().openSession();
		Session session = executionContext.getJbpmContext().getSession();
		
		//��ȡ���(�����ݿ����ȡ)
		int money = 4000;
		if(money > 5000){
			return "more 5000";//������ϸ�����������
		}else{
			return "less 5000";//������ϸ�����������
		}
	}
	
	//AssignmentHandler�еķ���
	public void assign(Assignable assignable, ExecutionContext executionContext){
		//�����������������̷����˵Ĳ����쵼
		Session session = executionContext.getJbpmContext().getSession();
		String hql = "from com.gever.model.TUser u where u.userType = 2";
		List userList=session.createQuery(hql).list();
		String[] users = new String[userList.size()];
		
		assignable.setPooledActors(users);//���Է�������
	}
	
	public void createProcessInstance() {
		JbpmContext jbpmContext = getJbpmContext();

		Session session = jbpmContext.getSession();

		ProcessDefinition pd = jbpmContext.getGraphSession().findLatestProcessDefinition("borrow");
		ProcessInstance pi = pd.createProcessInstance();
		pi.getContextInstance().setVariable("username", "�û���");

		TaskInstance ti = pi.getTaskMgmtInstance().createStartTaskInstance();
		ti.setActorId("�û���");
		ti.end();
	}
	
	//��������id��ȡ����ʵ��
	public static TaskInstance getTaskInstance(int taskId){
		JbpmContext jbpmContext = getJbpmContext();
		TaskInstance ti = jbpmContext.getTaskInstance(taskId);
		return ti;
	}
	
	//�����û���ȡ��������ʵ��
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
