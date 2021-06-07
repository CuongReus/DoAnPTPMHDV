package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.Date;

import com.logsik.taman.enums.ProjectStatus;
import com.logsik.taman.enums.ProjectType;

public class ProjectDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long projectYearId;
	private String name;
	private String note;
	private Long totalRevenue;
	private Long totalProfit;
	private ProjectStatus projectStatus;
	private ProjectType projectType;
	private Date closedDate;
	private String notifyTo;
	private String notifyMessage;
	private Long createdUserId;
	private Long lastedUpdateUserId;
	private Date createdDate;
	private Date lastedUpdateDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getProjectYearId() {
		return projectYearId;
	}

	public void setProjectYearId(Long projectYearId) {
		this.projectYearId = projectYearId;
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

	public ProjectType getProjectType() {
		return projectType;
	}

	public void setProjectType(ProjectType projectType) {
		this.projectType = projectType;
	}
	
}
