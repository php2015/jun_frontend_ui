package jbpmBasic;

import org.drools.KnowledgeBase;
import org.drools.builder.KnowledgeBuilder;
import org.drools.builder.KnowledgeBuilderFactory;
import org.drools.builder.ResourceType;
import org.drools.io.ResourceFactory;
import org.drools.runtime.StatefulKnowledgeSession;

/**
 * This is a sample file to launch a process.
 */
public class ProcessMain {

	public static final void main(String[] args) throws Exception {

		KnowledgeBase kbase = readKnowledgeBase();
		// ��ȡsession�Ự����Ҫͨ��Ự�õ�����ʵ��
		StatefulKnowledgeSession ksession = kbase.newStatefulKnowledgeSession();
		// �������̣�������̵�ID��������
		ksession.startProcess("com.sample.bpmn.hello");
	}

	private static KnowledgeBase readKnowledgeBase() throws Exception {
		// ����KnowledgeBuilder
		KnowledgeBuilder kbuilder = KnowledgeBuilderFactory.newKnowledgeBuilder();
		// �������
		kbuilder.add(ResourceFactory.newClassPathResource("sample.bpmn"),ResourceType.BPMN2);
		return kbuilder.newKnowledgeBase();
	}

}