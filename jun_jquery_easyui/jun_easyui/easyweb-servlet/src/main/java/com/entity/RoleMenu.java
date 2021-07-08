package com.entity;


import top.appx.easysql.annotation.Table;

/**
 * Created by john on 2015/12/8.
 */
@Table(name="tb_roleMenu")
public class RoleMenu {
    private int id;
    private Integer roleId;
    private Integer menuId;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Integer getMenuId() {
        return menuId;
    }

    public void setMenuId(Integer menuId) {
        this.menuId = menuId;
    }
}
