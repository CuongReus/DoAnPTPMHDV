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

import com.logsik.taman.enums.ProjectCostStatus;
import com.logsik.taman.enums.ProjectPaymentType;

@Entity(name = "project_cost")
public class ProjectCost implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_detail_id", updatable = false,insertable= false)
	private ProjectDetail projectDetail;
	
	@Column(name= "project_detail_id")
	private Long projectDetailId;
	
	@Column
	private Integer month;
	
	@Column
	private Integer year;
	
	@Column(updatable = false)
	@Enumerated(EnumType.STRING)
	private ProjectPaymentType paymentType;
	@Column
	private Integer lotNumber;
	
	@Column
	private String title;
	
	@Column
	private Long unitPrice;
	
	@Column
	private Long totalMoney;
	@Column
	@Temporal(TemporalType.DATE)
	private Date startWorkDate;
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date endWorkDate;
	
	@Column
	private Long totalPaid;
	
	@Column
	@Enumerated(EnumType.STRING)
	private ProjectCostStatus status;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "approval_by", updatable = false,insertable= false)
	private User approvalBy;
	
	@Column(name="approval_by")
	private Long approvalById;
	@Column
	@Temporal(TemporalType.DATE)
	private Date closeDate;
	
	@Column
	private String notifyTo;
	@Lob
	@Column(columnDefinition ="longtext")
	private String notifyMessage;
	@Lob
	@Column(columnDefinition = "longtext")
	private String note;
	
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
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "invoice_relation_id",updatable = false,insertable=false)
	private InvoiceRelation invoiceRelation;
	
	@Column(name= "invoice_relation_id")
	private Long invoiceRelationId;
	
	
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

	public User getApprovalBy() {
		return approvalBy;
	}

	public void setApprovalBy(User approvalBy) {
		this.approvalBy = approvalBy;
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

	public Long getProjectDetailId() {
		return projectDetailId;
	}

	public void setProjectDetailId(Long projectDetailId) {
		this.projectDetailId = projectDetailId;
	}

	public Long getApprovalById() {
		return approvalById;
	}

	public void setApprovalById(Long approvalById) {
		this.approvalById = approvalById;
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

	public Long getInvoiceRelationId() {
		return invoiceRelationId;
	}

	public void setInvoiceRelationId(Long invoiceRelationId) {
		this.invoiceRelationId = invoiceRelationId;
	}

	public InvoiceRelation getInvoiceRelation() {
		return invoiceRelation;
	}

}
