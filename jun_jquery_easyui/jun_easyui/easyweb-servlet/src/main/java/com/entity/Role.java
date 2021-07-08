package com.entity;

import top.appx.easysql.annotation.Table;

/**
 * 角色表
 */
@Table(name="tb_role")
public class Role {
    private int id;
    private String name;
    private String icon;
    //private int pid;//用于扩展子权限,暂时没有用到
    private String comment;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
