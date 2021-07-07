package com.simple.test;

import org.jbpm.graph.def.ProcessDefinition;
import org.jbpm.graph.exe.ProcessInstance;

import com.util.JbpmUtil;

public class SimpleProcessTest {
	static String fileName = "com/simple/jpdl/processdefinition.xml";
	
	//通过读取配置文件测试
	public static void testSimpleProcess() {
		ProcessInstance instance = JbpmUtil.getProcessInstance(fileName);
		
		System.out.println("start流程的名称 = " + instance.getRootToken().getNode().getName());
		System.out.println("Message variable should not exist yet:" + instance.getContextInstance().getVariable("message"));

		instance.signal();//执行到下一个流程
		System.out.println("当前流程的名称 = " + instance.getRootToken().getNode().getName());
		System.out.println("message = " + instance.getContextInstance().getVariable("message"));

		instance.signal();
		System.out.println("当前流程的名称 = " + instance.getRootToken().getNode().getName());
		System.out.println("message = " + instance.getContextInstance().getVariable("message"));
		System.out.println("Instance has ended:" + instance.hasEnded());
		
		if(!instance.hasEnded()) instance.signal();

	}
	
	//通过读取数据库测试
	public static void testSimpleProcess2() {
		
	}
	
	public static void main(String[] args) {
		JbpmUtil.deployProcessDefinition("/" + fileName);
		//testSimpleProcess();
	}

}
