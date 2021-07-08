package com.sgl.model;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

@SuppressWarnings("serial")
@Entity
@Table(name = "tmenu")
public class Menu implements java.io.Serializable {

	// Fields
	private String state;
	private String id;
	private Menu menu;
	private String text;
	private String url;
	private Set<Menu> menus = new HashSet<Menu>(0);
	private Map<String,Object> attributes;

	// Constructors

	/** default constructor */
	public Menu() {
	}
	@Transient
	public Map<String, Object> getAttributes() {
		return attributes;
	}
	public void setAttributes(Map<String, Object> attributes) {
		this.attributes = attributes;
	}
	/** minimal constructor */
	public Menu(String id) {
		this.id = id;
	}

	/** full constructor */
	public Menu(String id, Menu menu, String text, String url, Set<Menu> menus,
			Map<String, Object> attributes) {
		this.id = id;
		this.menu = menu;
		this.text = text;
		this.url = url;
		this.menus = menus;
		this.attributes = attributes;
	}

	@Transient
	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	// Property accessors
	@Id
	@Column(name = "id", unique = true, nullable = false, length = 36)
	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pid")
	public Menu getMenu() {
		return this.menu;
	}

	public void setMenu(Menu menu) {
		this.menu = menu;
	}

	@Column(name = "text", length = 50)
	public String getText() {
		return this.text;
	}

	public void setText(String text) {
		this.text = text;
	}

	@Column(name = "url", length = 200)
	public String getUrl() {
		return this.url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "menu")
	public Set<Menu> getMenus() {
		return this.menus;
	}

	public void setMenus(Set<Menu> menus) {
		this.menus = menus;
	}
}