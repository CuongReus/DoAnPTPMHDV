package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import com.logsik.taman.domain.User;
import com.logsik.taman.enums.ProjectStatus;

public class ProjectDetailDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long projectId;
	private String name;
	private String note;
	private Long totalRevenue;
	private Long totalProfit;
	private ProjectStatus projectDetailStatus;
	private Date closedDate;
	private String notifyTo;
	private String notifyMessage;
	private Long createdUserId;
	private Long lastedUpdateUserId;
	private Date createdDate;
	private Date lastedUpdateDate;
	private Set<User> userBudgetPermissions;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getProjectId() {
		return projectId;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
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

	public ProjectStatus getProjectDetailStatus() {
		return projectDetailStatus;
	}

	public void setProjectDetailStatus(ProjectStatus projectDetailStatus) {
		this.projectDetailStatus = projectDetailStatus;
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

	public Set<User> getUserBudgetPermissions() {
		return userBudgetPermissions;
	}

	public void setUserBudgetPermissions(Set<User> userBudgetPermissions) {
		this.userBudgetPermissions = userBudgetPermissions;
	}

}
