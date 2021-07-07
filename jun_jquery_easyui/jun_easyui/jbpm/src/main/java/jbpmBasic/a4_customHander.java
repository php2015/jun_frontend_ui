package jbpmBasic;


import org.drools.KnowledgeBase;
import org.drools.builder.KnowledgeBuilder;
import org.drools.builder.KnowledgeBuilderFactory;
import org.drools.builder.ResourceType;
import org.drools.io.ResourceFactory;
import org.drools.logger.KnowledgeRuntimeLogger;
import org.drools.logger.KnowledgeRuntimeLoggerFactory;
import org.drools.runtime.StatefulKnowledgeSession;
import org.drools.runtime.process.ProcessInstance;
import org.drools.runtime.process.WorkItem;

public class a4_customHander {

	public static void main(String[] args) {
		KnowledgeBuilder kbuilder = KnowledgeBuilderFactory
				.newKnowledgeBuilder();
		kbuilder.add(ResourceFactory.newClassPathResource("a4_customHander.bpmn"),
				ResourceType.BPMN2);
		KnowledgeBase kbase = kbuilder.newKnowledgeBase();
		// �ûỰ
		StatefulKnowledgeSession ksession = kbase.newStatefulKnowledgeSession();
		//�����Զ���Ĵ�����
		TestHander hander = new TestHander();
		// ע����������
		ksession.getWorkItemManager().registerWorkItemHandler("Human Task",
				hander);
		// �����־
		KnowledgeRuntimeLogger logger = KnowledgeRuntimeLoggerFactory
				.newFileLogger(ksession, "test");
		// �������� �õ�����ʵ��
       ProcessInstance instance = ksession.startProcess("com.sample.bpmn");
       //�鿴�����Ƿ�ʼ
       boolean start = instance.getState()==ProcessInstance.STATE_ACTIVE;
       if(start) {
    	   System.out.println("����ʼ");
       } else {
    	   System.out.println("����δ��ʼ");
       }
       //��ȡ������
       WorkItem workItem = hander.getWorkItem();
       //��ӡ�ù�����Ĳ�����
       System.out.println(workItem.getParameter("ActorId"));
       //�õ��ù����������
       System.out.println(workItem.getParameter("Comment"));
       //��ɸù���
       ksession.getWorkItemManager().completeWorkItem(workItem.getId(), null);
       //�鿴����״̬
       boolean end = instance.getState()==ProcessInstance.STATE_COMPLETED;
       if(end) {
    	   System.out.println("�������");
       } else {
    	   System.out.println("���������...");
       }

	}

}
