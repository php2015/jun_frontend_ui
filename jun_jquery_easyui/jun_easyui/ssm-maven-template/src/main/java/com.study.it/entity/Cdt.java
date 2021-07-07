package com.study.it.entity;

public class Cdt {
    private String col;
    private String opr;
    private Object val;
    
    public Cdt(){}
    
	public Cdt(String col, String opr, Object val) {
		super();
		this.col = col;
		this.opr = opr;
		this.val = val;
	}

	public String getCol() {
		return col;
	}
	public void setCol(String col) {
		this.col = col;
	}
	public String getOpr() {
		return opr;
	}
	public void setOpr(String opr) {
		this.opr = opr;
	}
	public Object getVal() {
		return val;
	}
	public void setVal(Object val) {
		this.val = val;
	}
    
    
}
