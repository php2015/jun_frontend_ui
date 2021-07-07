package jbpmBasic;

import org.drools.KnowledgeBase;
import org.drools.builder.KnowledgeBuilder;
import org.drools.builder.KnowledgeBuilderFactory;
import org.drools.builder.ResourceType;
import org.drools.io.ResourceFactory;
import org.drools.logger.KnowledgeRuntimeLogger;
import org.drools.logger.KnowledgeRuntimeLoggerFactory;
import org.drools.runtime.StatefulKnowledgeSession;
import org.drools.runtime.process.WorkItem;
import org.drools.runtime.process.WorkItemHandler;
import org.drools.runtime.process.WorkItemManager;

public class a3_log {

	public static void main(String[] args) {
		KnowledgeBuilder kbuilder = KnowledgeBuilderFactory
				.newKnowledgeBuilder();
		kbuilder.add(ResourceFactory.newClassPathResource("a3_log.bpmn"),
				ResourceType.BPMN2);
		KnowledgeBase kbase = kbuilder.newKnowledgeBase();
		StatefulKnowledgeSession ksession = kbase.newStatefulKnowledgeSession();
		// ��Ӵ�����
		ksession.getWorkItemManager().registerWorkItemHandler("Log",
				new WorkItemHandler() {
					public void executeWorkItem(WorkItem item,
							WorkItemManager manager) {
						 System.out.println("ִ����־����");
                         System.out.println("���������"+item.getName());
					}

					public void abortWorkItem(WorkItem item,
							WorkItemManager manager) {

					}
				});
		// ��־
		KnowledgeRuntimeLogger logger = KnowledgeRuntimeLoggerFactory
				.newFileLogger(ksession, "test");
		// ��������
		ksession.startProcess("com.sample.bpmn");
		logger.close();

	}

}
