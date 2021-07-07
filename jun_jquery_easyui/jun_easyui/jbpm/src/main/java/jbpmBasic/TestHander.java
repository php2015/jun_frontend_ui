package jbpmBasic;

import java.util.ArrayList;
import java.util.List;

import org.drools.runtime.process.WorkItem;
import org.drools.runtime.process.WorkItemHandler;
import org.drools.runtime.process.WorkItemManager;

public class TestHander implements WorkItemHandler {

	private List<WorkItem> workItems = new ArrayList<WorkItem>();

	public void abortWorkItem(WorkItem item, WorkItemManager manager) {
	    System.out.println("*************������ֹ****************");
	}

	public void executeWorkItem(WorkItem item, WorkItemManager manager) {
		workItems.add(item);
		System.out.println("*************����ִ��****************");
	}

	public WorkItem getWorkItem() {
		System.out.println("ִ������");
		if(workItems.size() == 0) {
			return null;
		}
		if(workItems.size()==1) {
			WorkItem result = workItems.get(0);
			this.workItems.clear();
			return result;
		} else {
			throw new IllegalArgumentException("��ֹһ����Ծ����");
		}
	}

	public List<WorkItem> getWorkItems() {
		List<WorkItem> result = new ArrayList<WorkItem>(workItems);
		workItems.clear();
		return result;
	}
}
