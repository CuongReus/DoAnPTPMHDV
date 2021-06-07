package com.logsik.taman.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.logsik.taman.enums.ProjectStatus;
import com.logsik.taman.enums.ProjectType;

@Entity(name = "project")
public class Project implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_year_id",updatable=false,insertable=false)
	private ProjectYear projectYear;
	@Column(name="project_year_id")
	private Long projectYearId;
	@Column
	private String name;
	@Lob
	@Column(columnDefinition = "longtext")
	private String note;
	@Column
	private Long totalRevenue;
	@Column
	private Long totalProfit;
	
	@Column
	@Enumerated(EnumType.STRING)
	private ProjectStatus projectStatus; 
	
	@Column
	@Enumerated(EnumType.STRING)
	private ProjectType projectType;
	
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date closedDate;
	
	@Column
	private String notifyTo;
	@Lob
	@Column(columnDefinition="longtext")
	private String notifyMessage;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "created_user_id", updatable = false,insertable=false)
	private User createdUser;
	
	@Column(name= "created_user_id")
	private Long createdUserId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "lasted_update_user_id",updatable = false,insertable=false)
	private User lastedUpdateUser;
	
	@Column(name= "lasted_update_user_id")
	private Long lastedUpdateUserId;

	@Column
	@Temporal(TemporalType.DATE)
	private Date createdDate;

	@Column
	@Temporal(TemporalType.DATE)
	private Date lastedUpdateDate;
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ProjectYear getProjectYear() {
		return projectYear;
	}

	public void setProjectYear(ProjectYear projectYear) {
		this.projectYear = projectYear;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Long getTotalRevenue() {
		return totalRevenue;
	}

	public void setTotalRevenue(Long totalRevenue) {
		this.totalRevenue = totalRevenue;
	}

	public Long getTotalProfit() {
		return totalProfit;
	}

	public void setTotalProfit(Long totalProfit) {
		this.totalProfit = totalProfit;
	}

	public ProjectStatus getProjectStatus() {
		return projectStatus;
	}

	public void setProjectStatus(ProjectStatus projectStatus) {
		this.projectStatus = projectStatus;
	}

	public Date getClosedDate() {
		return closedDate;
	}

	public void setClosedDate(Date closedDate) {
		this.closedDate = closedDate;
	}

	public String getNotifyTo() {
		return notifyTo;
	}

	public void setNotifyTo(String notifyTo) {
		this.notifyTo = notifyTo;
	}

	public String getNotifyMessage() {
		return notifyMessage;
	}

	public void setNotifyMessage(String notifyMessage) {
		this.notifyMessage = notifyMessage;
	}

	public User getCreatedUser() {
		return createdUser;
	}

	public void setCreatedUser(User createdUser) {
		this.createdUser = createdUser;
	}

	public User getLastedUpdateUser() {
		return lastedUpdateUser;
	}

	public void setLastedUpdateUser(User lastedUpdateUser) {
		this.lastedUpdateUser = lastedUpdateUser;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getLastedUpdateDate() {
		return lastedUpdateDate;
	}

	public void setLastedUpdateDate(Date lastedUpdateDate) {
		this.lastedUpdateDate = lastedUpdateDate;
		
		
	}

	public Long getProjectYearId() {
		return projectYearId;
	}

	public void setProjectYearId(Long projectYearId) {
		this.projectYearId = projectYearId;
	}

	public Long getCreatedUserId() {
		return createdUserId;
	}

	public void setCreatedUserId(Long createdUserId) {
		this.createdUserId = createdUserId;
	}

	public Long getLastedUpdateUserId() {
		return lastedUpdateUserId;
	}

	public void setLastedUpdateUserId(Long lastedUpdateUserId) {
		this.lastedUpdateUserId = lastedUpdateUserId;
	}

	public ProjectType getProjectType() {
		return projectType;
	}

	public void setProjectType(ProjectType projectType) {
		this.projectType = projectType;
	}

	
	

}
