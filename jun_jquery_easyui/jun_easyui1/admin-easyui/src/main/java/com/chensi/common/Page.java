package com.chensi.common;
/**
 * dao层分页参数封装（针对于mysql limit分页）
 * @author Chason
 * @version 2016-6-13 下午10:49:49
 */
public class Page {
	private Integer start;
	
	private Integer size;
	
	public Page() {
		super();
	}

	public Page(Integer start, Integer size) {
		super();
		this.start = start;
		this.size = size;
	}

	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public Integer getSize() {
		return size;
	}

	public void setSize(Integer size) {
		this.size = size;
	}
	
	

}
