package jbpmBasic;

import java.util.HashMap;
import java.util.Map;

import org.drools.KnowledgeBase;
import org.drools.builder.KnowledgeBuilder;
import org.drools.builder.KnowledgeBuilderFactory;
import org.drools.builder.ResourceType;
import org.drools.io.ResourceFactory;
import org.drools.runtime.StatefulKnowledgeSession;
import org.drools.runtime.process.ProcessInstance;
import org.drools.runtime.process.WorkItem;

public class a5_swimlane {

	public static void main(String[] args) {
		KnowledgeBuilder kbuilder = KnowledgeBuilderFactory
				.newKnowledgeBuilder();
		kbuilder.add(ResourceFactory.newClassPathResource("a5_swimlane.bpmn"),
				ResourceType.BPMN2);
		KnowledgeBase kbase = kbuilder.newKnowledgeBase();
		// �ûỰ
		StatefulKnowledgeSession ksession = kbase.newStatefulKnowledgeSession();
		//������������
		TestHander hander = new TestHander();
		// ע����������
		ksession.getWorkItemManager().registerWorkItemHandler("Human Task",
				hander);

		// ��������
       ProcessInstance instance = ksession.startProcess("com.sample.bpmn");
       //ȡ��workItem
       WorkItem workItem = hander.getWorkItem();
       System.out.println("�������:"+workItem.getName());
       System.out.println("��������:"+workItem.getParameter("Comment"));
       System.out.println("���������:"+workItem.getParameter("ActorId"));

       //����ǰ���� ����ָ����һ������Ĳ�����(ֻ��ͬһӾ���е��˹��������ָ����һ������Ĳ�����)
       Map<String, Object> maps = new HashMap<String, Object>();
       maps.put("ActorId", "����");
       ksession.getWorkItemManager().completeWorkItem(workItem.getId(), maps);

       //ȡ���ڶ��������workItem
       WorkItem item = hander.getWorkItem();
       System.out.println("��������:"+item.getParameter("Comment"));
       System.out.println("���������:"+item.getParameter("ActorId"));
       //��������
       ksession.getWorkItemManager().completeWorkItem(item.getId(), null);

       //�ж��Ƿ����
       boolean end = instance.getState()==ProcessInstance.STATE_COMPLETED;
       if(end) {
    	   System.out.println("���̽���");
       } else {
    	   System.out.println("����δ����");
       }
	}

}
