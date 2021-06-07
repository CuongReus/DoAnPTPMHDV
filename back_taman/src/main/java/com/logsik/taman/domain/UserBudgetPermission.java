package com.logsik.taman.domain;

import java.io.Serializable;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name="user_budget_permission")
public class UserBudgetPermission implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_detail_id",updatable=false,insertable=false )
	private ProjectDetail projectDetail;
	
	@Column(name="project_detail_id")
	private Long projectDetailId;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id",updatable=false,insertable=false)
	private User user;
	@Column(name="user_id")
	private Long userId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public ProjectDetail getProjectDetail() {
		return projectDetail;
	}
	public void setProjectDetail(ProjectDetail projectDetail) {
		this.projectDetail = projectDetail;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Long getProjectDetailId() {
		return projectDetailId;
	}
	public void setProjectDetailId(Long projectDetailId) {
		this.projectDetailId = projectDetailId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	

}
