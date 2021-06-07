package com.logsik.taman.dtos;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.logsik.taman.domain.Acceptance;
import com.logsik.taman.domain.Approval;
import com.logsik.taman.domain.CloseProject;
import com.logsik.taman.domain.Complete;
import com.logsik.taman.domain.Contract;
import com.logsik.taman.domain.Efficiency;
import com.logsik.taman.domain.Incurred;
import com.logsik.taman.domain.InvoiceVer1;
import com.logsik.taman.domain.InvoiceVer2;
import com.logsik.taman.domain.InvoiceVer3;
import com.logsik.taman.domain.Project;
import com.logsik.taman.domain.Quotation;
import com.logsik.taman.domain.User;
import com.logsik.taman.enums.ProjectStatus;

public class ProjectDetailProgressDto {
	private Long id;
	private Project project;
	private String name;
	private String note;
	private Long totalRevenue;
	private Long totalProfit;
	private Acceptance acceptance;
	private Approval approval;
	private CloseProject closeProject;
	private Complete complete;
	private Contract contract;
	private Efficiency efficiency;
	private Incurred incurred;
	private InvoiceVer1 invoiceVer1;
	private InvoiceVer2 invoiceVer2;
	private InvoiceVer3 invoiceVer3;
	private Quotation quotation;
	private ProjectStatus projectDetailStatus;
	private Date closedDate;
	private String notifyTo;
	private String notifyMessage;
	private User createdUser;
	private User lastedUpdateUser;
	private Date createdDate;
	private Date lastedUpdateDate;
	private Set<User> userBudgetPermissions = new HashSet<>();

	public ProjectDetailProgressDto() {
		super();
	}

	

	public ProjectDetailProgressDto(Long id, Project project, String name, String note, Long totalRevenue, Long totalProfit,
			Acceptance acceptance, Approval approval, CloseProject closeProject, Complete complete, Contract contract,
			Efficiency efficiency, Incurred incurred, InvoiceVer1 invoiceVer1, InvoiceVer2 invoiceVer2,
			InvoiceVer3 invoiceVer3, Quotation quotation, ProjectStatus projectDetailStatus, Date closedDate,
			String notifyTo, String notifyMessage, User createdUser, User lastedUpdateUser, Date createdDate,
			Date lastedUpdateDate, Set<User> userBudgetPermissions) {
		super();
		this.id = id;
		this.project = project;
		this.name = name;
		this.note = note;
		this.totalRevenue = totalRevenue;
		this.totalProfit = totalProfit;
		this.acceptance = acceptance;
		this.approval = approval;
		this.closeProject = closeProject;
		this.complete = complete;
		this.contract = contract;
		this.efficiency = efficiency;
		this.incurred = incurred;
		this.invoiceVer1 = invoiceVer1;
		this.invoiceVer2 = invoiceVer2;
		this.invoiceVer3 = invoiceVer3;
		this.quotation = quotation;
		this.projectDetailStatus = projectDetailStatus;
		this.closedDate = closedDate;
		this.notifyTo = notifyTo;
		this.notifyMessage = notifyMessage;
		this.createdUser = createdUser;
		this.lastedUpdateUser = lastedUpdateUser;
		this.createdDate = createdDate;
		this.lastedUpdateDate = lastedUpdateDate;
		this.userBudgetPermissions = userBudgetPermissions;
	}



	public Acceptance getAcceptance() {
		return acceptance;
	}

	public void setAcceptance(Acceptance acceptance) {
		this.acceptance = acceptance;
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

	public Contract getContract() {
		return contract;
	}

	public void setContract(Contract contract) {
		this.contract = contract;
	}

	public Efficiency getEfficiency() {
		return efficiency;
	}

	public void setEfficiency(Efficiency efficiency) {
		this.efficiency = efficiency;
	}

	public Incurred getIncurred() {
		return incurred;
	}

	public void setIncurred(Incurred incurred) {
		this.incurred = incurred;
	}

	public InvoiceVer1 getInvoiceVer1() {
		return invoiceVer1;
	}

	public void setInvoiceVer1(InvoiceVer1 invoiceVer1) {
		this.invoiceVer1 = invoiceVer1;
	}

	public InvoiceVer2 getInvoiceVer2() {
		return invoiceVer2;
	}

	public void setInvoiceVer2(InvoiceVer2 invoiceVer2) {
		this.invoiceVer2 = invoiceVer2;
	}

	public InvoiceVer3 getInvoiceVer3() {
		return invoiceVer3;
	}

	public void setInvoiceVer3(InvoiceVer3 invoiceVer3) {
		this.invoiceVer3 = invoiceVer3;
	}

	public Quotation getQuotation() {
		return quotation;
	}

	public void setQuotation(Quotation quotation) {
		this.quotation = quotation;
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



	public Set<User> getUserBudgetPermissions() {
		return userBudgetPermissions;
	}



	public void setUserBudgetPermissions(Set<User> userBudgetPermissions) {
		this.userBudgetPermissions = userBudgetPermissions;
	}

	

}
