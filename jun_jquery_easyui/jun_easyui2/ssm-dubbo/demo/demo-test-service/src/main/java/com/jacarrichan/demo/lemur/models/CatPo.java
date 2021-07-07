package com.jacarrichan.demo.lemur.models;

import java.io.Serializable;

public class CatPo implements Serializable {
	private Integer catId;

	private String catName;

	private String color;

	public Integer getCatId() {
		return catId;
	}

	public void setCatId(Integer catId) {
		this.catId = catId;
	}

	public String getCatName() {
		return catName;
	}

	public void setCatName(String catName) {
		this.catName = catName;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	@Override
	public String toString() {
		return "Cat [catId=" + catId + ", catName=" + catName + ", color="
				+ color + "]";
	}

}