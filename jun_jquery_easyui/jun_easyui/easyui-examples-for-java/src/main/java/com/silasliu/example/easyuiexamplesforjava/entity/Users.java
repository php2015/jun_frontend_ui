package com.silasliu.example.easyuiexamplesforjava.entity;


import javax.persistence.*;

/**
 * @author -==> mi
 * @since -==> 2019/7/9 11:50
 */
@Entity
public class Users {
    @Override
    public String toString() {
        return "[USER:" +id+
                "_" +lastName+" "+firstName+
                "]";
    }

    @Id
    @GeneratedValue
    private Long id;
    @Column
    private String firstName;
    @Column
    private String lastName;
    @Column
    private String phone;
    @Column
    private String eamil;

    public Users() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEamil() {
        return eamil;
    }

    public void setEamil(String eamil) {
        this.eamil = eamil;
    }
}
