package com.person;

import org.jbpm.graph.def.ProcessDefinition;
import org.jbpm.graph.exe.ProcessInstance;

public class Test {
	public static void main(String[] argv) {

		ProcessDefinition processDefinition = ProcessDefinition
				.parseXmlResource("com/person/processdefinition.xml");
		ProcessInstance ProcessInstance = new ProcessInstance(processDefinition);

		org.jbpm.graph.exe.Token token = ProcessInstance.getRootToken();

		System.out.println(token.getNode().getName());
		//token.signal("tr2");
		token.signal("tr1");
		
		System.out.println(token.getNode().getName());
		token.signal();
		System.out.println(token.getNode().getName());
	}
}
