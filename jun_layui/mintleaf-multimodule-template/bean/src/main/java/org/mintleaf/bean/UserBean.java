package org.mintleaf.bean;

import java.io.Serializable;

/**
 * @Author: MengchuZhang
 * @Date: 2018/10/10 16:04
 * @Version 1.0
 */
public class UserBean implements Serializable
{
    //用户名
    private String name;
    //密码
    private String pwd;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
}
