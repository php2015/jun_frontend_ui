package jbpmBasic;

import org.drools.KnowledgeBase;
import org.drools.builder.KnowledgeBuilder;
import org.drools.builder.KnowledgeBuilderFactory;
import org.drools.builder.ResourceType;
import org.drools.io.ResourceFactory;
import org.drools.runtime.StatefulKnowledgeSession;

public class a1_定时器 {
	public static void main(String[] args) {
		// 创建"知识创建器"
		KnowledgeBuilder kbuilder = KnowledgeBuilderFactory
				.newKnowledgeBuilder();
		kbuilder.add(ResourceFactory.newClassPathResource("a1_定时器.bpmn"),
				ResourceType.BPMN2);

		// 创建一个知识库
		KnowledgeBase kbase = kbuilder.newKnowledgeBase();
		StatefulKnowledgeSession ksession = kbase.newStatefulKnowledgeSession();

		// 启动流程
		ksession.startProcess("com.sample.bpmn");
	}
}
