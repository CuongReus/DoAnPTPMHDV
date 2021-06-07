package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.Date;

public class RoleDto  implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String name;
	private String permissions;
	private Date createdAt;
	private Date updatedAt;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPermissions() {
		return permissions;
	}
	public void setPermissions(String permissions) {
		this.permissions = permissions;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	public Date getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	

	
	
	
	
	
}
