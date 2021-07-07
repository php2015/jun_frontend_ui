package com.study.it.entity;

import java.util.List;

public class PageInfo<T> {
     private List<T> list;
     private int pageIndex;
     private long rowCount;
     private int row;
     
     public int getStart()
     {
    	 return (pageIndex-1)*row;
     }
     
     public  int getPageCount()
     {
    	 return (int)(rowCount%row==0?
    			 			 (rowCount/row)
    			 			:(rowCount/row+1));
     }
     public int getNext()
     {
    	 if(this.pageIndex<this.getPageCount())
    		 return this.pageIndex+1;
    	 else
    		 return this.pageIndex;
     }
    
     public int getPrev()
     {
    	 if(this.pageIndex==1)
    		 return 1;
    	 else
    		 return this.pageIndex-1;
     }
	public List<T> getList() {
		return list;
	}
	public void setList(List<T> list) {
		this.list = list;
	}
	public int getPageIndex() {
		return pageIndex;
	}
	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}
	public long getRowCount() {
		return rowCount;
	}
	public void setRowCount(long rowCount) {
		this.rowCount = rowCount;
	}
	public int getRow() {
		return row;
	}
	public void setRow(int row) {
		this.row = row;
	}
     
     
}







