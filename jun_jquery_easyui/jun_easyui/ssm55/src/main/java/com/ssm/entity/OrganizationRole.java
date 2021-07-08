package com.ssm.entity;

import java.io.Serializable;

public class OrganizationRole implements Serializable{
    /** 
	 * @description: 
	 * @version 1.0
	 * @author Kool Zhao
	 * @createDate 2014-1-19;下午10:50:35
	 */
	private static final long serialVersionUID = -2464182266484822595L;

	/**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column security_organization_role.id
     *
     * @mbggenerated
     */
    private Long id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column security_organization_role.priority
     *
     * @mbggenerated
     */
    private Integer priority;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column security_organization_role.organization_id
     *
     * @mbggenerated
     */
    private Long organizationId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column security_organization_role.role_id
     *
     * @mbggenerated
     */
    private Long roleId;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column security_organization_role.id
     *
     * @return the value of security_organization_role.id
     *
     * @mbggenerated
     */
    public Long getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column security_organization_role.id
     *
     * @param id the value for security_organization_role.id
     *
     * @mbggenerated
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column security_organization_role.priority
     *
     * @return the value of security_organization_role.priority
     *
     * @mbggenerated
     */
    public Integer getPriority() {
        return priority;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column security_organization_role.priority
     *
     * @param priority the value for security_organization_role.priority
     *
     * @mbggenerated
     */
    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column security_organization_role.organization_id
     *
     * @return the value of security_organization_role.organization_id
     *
     * @mbggenerated
     */
    public Long getOrganizationId() {
        return organizationId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column security_organization_role.organization_id
     *
     * @param organizationId the value for security_organization_role.organization_id
     *
     * @mbggenerated
     */
    public void setOrganizationId(Long organizationId) {
        this.organizationId = organizationId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column security_organization_role.role_id
     *
     * @return the value of security_organization_role.role_id
     *
     * @mbggenerated
     */
    public Long getRoleId() {
        return roleId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column security_organization_role.role_id
     *
     * @param roleId the value for security_organization_role.role_id
     *
     * @mbggenerated
     */
    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }
    
    private Role role;

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
    
}