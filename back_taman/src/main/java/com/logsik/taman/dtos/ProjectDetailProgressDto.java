package com.logsik.taman.dtos;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.logsik.taman.domain.Approval;
import com.logsik.taman.domain.CloseProject;
import com.logsik.taman.domain.Complete;
import com.logsik.taman.domain.Efficiency;
import com.logsik.taman.domain.Project;
import com.logsik.taman.domain.User;
import com.logsik.taman.enums.ProjectStatus;

public class ProjectDetailProgressDto {
	private Long id;
	private Project project;
	private String name;
	private String note;
	private Long totalRevenue;
	private Long totalProfit;
	private Approval approval;
	private CloseProject closeProject;
	private Complete complete;
	private Efficiency efficiency;
	private ProjectStatus projectDetailStatus;
	private Date closedDate;
	private String notifyTo;
	private String notifyMessage;
	private User createdUser;
	private User lastedUpdateUser;
	private Date createdDate;
	private Date lastedUpdateDate;

	public ProjectDetailProgressDto() {
		super();
	}

	

	public ProjectDetailProgressDto(Long id, Project project, String name, String note, Long totalRevenue, Long totalProfit,
		 Approval approval, CloseProject closeProject, Complete complete,
			Efficiency efficiency, ProjectStatus projectDetailStatus, Date closedDate,
			String notifyTo, String notifyMessage, User createdUser, User lastedUpdateUser, Date createdDate,
			Date lastedUpdateDate) {
		super();
		this.id = id;
		this.project = project;
		this.name = name;
		this.note = note;
		this.totalRevenue = totalRevenue;
		this.totalProfit = totalProfit;
		this.approval = approval;
		this.closeProject = closeProject;
		this.complete = complete;
		this.efficiency = efficiency;
		this.projectDetailStatus = projectDetailStatus;
		this.closedDate = closedDate;
		this.notifyTo = notifyTo;
		this.notifyMessage = notifyMessage;
		this.createdUser = createdUser;
		this.lastedUpdateUser = lastedUpdateUser;
		this.createdDate = createdDate;
		this.lastedUpdateDate = lastedUpdateDate;
	}

	public Approval getApproval() {
		return approval;
	}

	public void setApproval(Approval approval) {
		this.approval = approval;
	}

	public CloseProject getCloseProject() {
		return closeProject;
	}

	public void setCloseProject(CloseProject closeProject) {
		this.closeProject = closeProject;
	}

	public Complete getComplete() {
		return complete;
	}

	public void setComplete(Complete complete) {
		this.complete = complete;
	}

	public Efficiency getEfficiency() {
		return efficiency;
	}

	public void setEfficiency(Efficiency efficiency) {
		this.efficiency = efficiency;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
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
}
