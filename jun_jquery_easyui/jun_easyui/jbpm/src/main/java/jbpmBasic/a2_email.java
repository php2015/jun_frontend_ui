package jbpmBasic;

import org.drools.KnowledgeBase;
import org.drools.builder.KnowledgeBuilder;
import org.drools.builder.KnowledgeBuilderFactory;
import org.drools.builder.ResourceType;
import org.drools.io.ResourceFactory;
import org.drools.runtime.StatefulKnowledgeSession;
import org.jbpm.process.workitem.email.EmailWorkItemHandler;

public class a2_email {

	public static void main(String[] args) {
		// ��������
		KnowledgeBuilder kbuilder = KnowledgeBuilderFactory
				.newKnowledgeBuilder();
		kbuilder.add(ResourceFactory.newClassPathResource("a2_email.bpmn"),
				ResourceType.BPMN2);
		//�õ��Ự
		KnowledgeBase kbase = kbuilder.newKnowledgeBase();
		StatefulKnowledgeSession ksession = kbase.newStatefulKnowledgeSession();
		//ע��һ��hander
		ksession.getWorkItemManager().registerWorkItemHandler("Email", new EmailWorkItemHandler("www.126.com", "123", "123", "123"));
		//��������
		ksession.startProcess("com.sample.bpmn");
	}
}
