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

import com.logsik.taman.enums.ApprovalStatus;
import com.logsik.taman.enums.DefectStatus;
import com.logsik.taman.enums.IncurredPaymentStatus;
import com.logsik.taman.enums.IncurredWorkStatus;

@Entity(name = "incurred")
public class Incurred implements Serializable {
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

	@Column
	private String workContentIncurred;
	@Column
	private String quotationUpload;

	@Column
	private Long incurredQuotation;

	@Column
	@Enumerated(EnumType.STRING)
	private ApprovalStatus approvalStatus;

	@Column
	private Long approvalValue;

	@Column
	private String approvalUpload;

	@Column
	private String appendixContractNumber;

	@Column
	private String appendixUpload;

	@Column
	@Temporal(TemporalType.DATE)
	private Date sendAppendixDate;

	@Column
	private Long invoiceIncurred;

	@Column
	private String invoiceIncurredUpload;

	@Column
	@Temporal(TemporalType.DATE)
	private Date sendInvoiceDate;

	@Column
	@Temporal(TemporalType.DATE)
	private Date startProgressDate;

	@Column
	@Temporal(TemporalType.DATE)
	private Date endProgressDate;

	@Column
	@Enumerated(EnumType.STRING)
	private IncurredWorkStatus workStatus;

	@Column
	private String workUpload;

	@Column
	@Enumerated(EnumType.STRING)
	private DefectStatus defectStatus;

	@Column
	private String defectUpload;

	@Column
	@Enumerated(EnumType.STRING)
	private IncurredPaymentStatus paymentStatus;

	@Column
	private Long inputInvoice;

	@Column
	private String inputUpload;

	@Lob
	@Column(columnDefinition = "longtext")
	private String note;
	
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ProjectDetail getProjectDetail() {
		return projectDetail;
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

	public void setProjectDetail(ProjectDetail projectDetail) {
		this.projectDetail = projectDetail;
	}

	public String getWorkContentIncurred() {
		return workContentIncurred;
	}

	public void setWorkContentIncurred(String workContentIncurred) {
		this.workContentIncurred = workContentIncurred;
	}

	public String getQuotationUpload() {
		return quotationUpload;
	}

	public void setQuotationUpload(String quotationUpload) {
		this.quotationUpload = quotationUpload;
	}

	public Long getIncurredQuotation() {
		return incurredQuotation;
	}

	public void setIncurredQuotation(Long incurredQuotation) {
		this.incurredQuotation = incurredQuotation;
	}

	public ApprovalStatus getApprovalStatus() {
		return approvalStatus;
	}

	public void setApprovalStatus(ApprovalStatus approvalStatus) {
		this.approvalStatus = approvalStatus;
	}

	public Long getApprovalValue() {
		return approvalValue;
	}

	public void setApprovalValue(Long approvalValue) {
		this.approvalValue = approvalValue;
	}

	public String getApprovalUpload() {
		return approvalUpload;
	}

	public void setApprovalUpload(String approvalUpload) {
		this.approvalUpload = approvalUpload;
	}

	

	public String getAppendixContractNumber() {
		return appendixContractNumber;
	}

	public void setAppendixContractNumber(String appendixContractNumber) {
		this.appendixContractNumber = appendixContractNumber;
	}

	public String getAppendixUpload() {
		return appendixUpload;
	}

	public void setAppendixUpload(String appendixUpload) {
		this.appendixUpload = appendixUpload;
	}

	public Date getSendAppendixDate() {
		return sendAppendixDate;
	}

	public void setSendAppendixDate(Date sendAppendixDate) {
		this.sendAppendixDate = sendAppendixDate;
	}

	public Long getInvoiceIncurred() {
		return invoiceIncurred;
	}

	public void setInvoiceIncurred(Long invoiceIncurred) {
		this.invoiceIncurred = invoiceIncurred;
	}

	public String getInvoiceIncurredUpload() {
		return invoiceIncurredUpload;
	}

	public void setInvoiceIncurredUpload(String invoiceIncurredUpload) {
		this.invoiceIncurredUpload = invoiceIncurredUpload;
	}

	public Date getSendInvoiceDate() {
		return sendInvoiceDate;
	}

	public void setSendInvoiceDate(Date sendInvoiceDate) {
		this.sendInvoiceDate = sendInvoiceDate;
	}

	public Date getStartProgressDate() {
		return startProgressDate;
	}

	public void setStartProgressDate(Date startProgressDate) {
		this.startProgressDate = startProgressDate;
	}

	public Date getEndProgressDate() {
		return endProgressDate;
	}

	public void setEndProgressDate(Date endProgressDate) {
		this.endProgressDate = endProgressDate;
	}

	public IncurredWorkStatus getWorkStatus() {
		return workStatus;
	}

	public void setWorkStatus(IncurredWorkStatus workStatus) {
		this.workStatus = workStatus;
	}

	public String getWorkUpload() {
		return workUpload;
	}

	public void setWorkUpload(String workUpload) {
		this.workUpload = workUpload;
	}

	public DefectStatus getDefectStatus() {
		return defectStatus;
	}

	public void setDefectStatus(DefectStatus defectStatus) {
		this.defectStatus = defectStatus;
	}

	public String getDefectUpload() {
		return defectUpload;
	}

	public void setDefectUpload(String defectUpload) {
		this.defectUpload = defectUpload;
	}

	

	public IncurredPaymentStatus getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(IncurredPaymentStatus paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public Long getInputInvoice() {
		return inputInvoice;
	}

	public void setInputInvoice(Long inputInvoice) {
		this.inputInvoice = inputInvoice;
	}

	public String getInputUpload() {
		return inputUpload;
	}

	public void setInputUpload(String inputUpload) {
		this.inputUpload = inputUpload;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Long getProjectDetailId() {
		return projectDetailId;
	}

	public void setProjectDetailId(Long projectDetailId) {
		this.projectDetailId = projectDetailId;
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
	

}
