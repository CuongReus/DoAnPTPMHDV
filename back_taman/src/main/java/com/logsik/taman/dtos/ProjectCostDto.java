package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.logsik.taman.enums.ProjectCostStatus;
import com.logsik.taman.enums.ProjectPaymentType;

public class ProjectCostDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Long projectDetailId;
	private Long labourId;
	private Integer month;
	private Integer year;
	private ProjectPaymentType paymentType;
	private Date startWorkDate;
	private Date endWorkDate;
	private Integer lotNumber;
	private String title;
	private Long unitPrice;
	private Long totalMoney;
	private Long totalPaid;
	private ProjectCostStatus status;
	private Long approvalById;
	private String notifyMessage;
	private String notifyTo;
	private Date closeDate;
	private String note;
	private Long createdUserId;
	private Long lastedUpdateUserId;
	private Date createdDate;
	private Date lastedUpdateDate;
	private List<UploadFileResponse> projectCostFile = new ArrayList<>();
	private Long invoiceRalationId;
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getProjectDetailId() {
		return projectDetailId;
	}

	public void setProjectDetailId(Long projectDetailId) {
		this.projectDetailId = projectDetailId;
	}

	public Long getLabourId() {
		return labourId;
	}

	public void setLabourId(Long labourId) {
		this.labourId = labourId;
	}

	public Integer getMonth() {
		return month;
	}

	public void setMonth(Integer month) {
		this.month = month;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public ProjectPaymentType getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(ProjectPaymentType paymentType) {
		this.paymentType = paymentType;
	}

	public Date getStartWorkDate() {
		return startWorkDate;
	}

	public void setStartWorkDate(Date startWorkDate) {
		this.startWorkDate = startWorkDate;
	}

	public Date getEndWorkDate() {
		return endWorkDate;
	}

	public void setEndWorkDate(Date endWorkDate) {
		this.endWorkDate = endWorkDate;
	}

	public Integer getLotNumber() {
		return lotNumber;
	}

	public void setLotNumber(Integer lotNumber) {
		this.lotNumber = lotNumber;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Long getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(Long unitPrice) {
		this.unitPrice = unitPrice;
	}

	public Long getTotalMoney() {
		return totalMoney;
	}

	public void setTotalMoney(Long totalMoney) {
		this.totalMoney = totalMoney;
	}

	public Long getTotalPaid() {
		return totalPaid;
	}

	public void setTotalPaid(Long totalPaid) {
		this.totalPaid = totalPaid;
	}

	public ProjectCostStatus getStatus() {
		return status;
	}

	public void setStatus(ProjectCostStatus status) {
		this.status = status;
	}

	public Long getApprovalById() {
		return approvalById;
	}

	public void setApprovalById(Long approvalById) {
		this.approvalById = approvalById;
	}

	public String getNotifyMessage() {
		return notifyMessage;
	}

	public void setNotifyMessage(String notifyMessage) {
		this.notifyMessage = notifyMessage;
	}

	public String getNotifyTo() {
		return notifyTo;
	}

	public void setNotifyTo(String notifyTo) {
		this.notifyTo = notifyTo;
	}

	public Date getCloseDate() {
		return closeDate;
	}

	public void setCloseDate(Date closeDate) {
		this.closeDate = closeDate;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
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

	public List<UploadFileResponse> getProjectCostFile() {
		return projectCostFile;
	}

	public void setProjectCostFile(List<UploadFileResponse> projectCostFile) {
		this.projectCostFile = projectCostFile;
	}

	public Long getInvoiceRalationId() {
		return invoiceRalationId;
	}

	public void setInvoiceRalationId(Long invoiceRalationId) {
		this.invoiceRalationId = invoiceRalationId;
	}

}
