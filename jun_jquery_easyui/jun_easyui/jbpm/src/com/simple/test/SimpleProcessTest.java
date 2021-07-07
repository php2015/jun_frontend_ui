package com.simple.test;

import org.jbpm.graph.def.ProcessDefinition;
import org.jbpm.graph.exe.ProcessInstance;

import com.util.JbpmUtil;

public class SimpleProcessTest {
	static String fileName = "com/simple/jpdl/processdefinition.xml";
	
	//ͨ����ȡ�����ļ�����
	public static void testSimpleProcess() {
		ProcessInstance instance = JbpmUtil.getProcessInstance(fileName);
		
		System.out.println("start���̵����� = " + instance.getRootToken().getNode().getName());
		System.out.println("Message variable should not exist yet:" + instance.getContextInstance().getVariable("message"));

		instance.signal();//ִ�е���һ������
		System.out.println("��ǰ���̵����� = " + instance.getRootToken().getNode().getName());
		System.out.println("message = " + instance.getContextInstance().getVariable("message"));

		instance.signal();
		System.out.println("��ǰ���̵����� = " + instance.getRootToken().getNode().getName());
		System.out.println("message = " + instance.getContextInstance().getVariable("message"));
		System.out.println("Instance has ended:" + instance.hasEnded());
		
		if(!instance.hasEnded()) instance.signal();

	}
	
	//ͨ����ȡ���ݿ����
	public static void testSimpleProcess2() {
		
	}
	
	public static void main(String[] args) {
		JbpmUtil.deployProcessDefinition("/" + fileName);
		//testSimpleProcess();
	}

}
