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

import com.logsik.taman.enums.InvoiceVer123Status;
import com.logsik.taman.enums.PaymentRequestStatus;

@Entity(name = "invoice_ver1")
public class InvoiceVer1 implements Serializable {
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
	private String paymentUpload;

	@Column
	@Enumerated(EnumType.STRING)
	private PaymentRequestStatus paymentRequestStatus;

	@Column
	private Long invoiceMoney;

	@Column
	private String invoiceUpload;

	@Column
	@Temporal(TemporalType.DATE)
	private Date sendDate;

	@Column
	@Enumerated(EnumType.STRING)
	private InvoiceVer123Status status;

	@Column
	private Long inputInvoice;

	@Column
	private String inputUpload;
	
	@Column
	private String invoiceNumber;

	@Lob
	@Column(columnDefinition = "longtext")
	private String note;
	
	@Column(name="invoice_name")
	private String invoiceName;
	

	public Long getId() {
		return id;
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

	public void setId(Long id) {
		this.id = id;
	}

	public ProjectDetail getProjectDetail() {
		return projectDetail;
	}

	public void setProjectDetail(ProjectDetail projectDetail) {
		this.projectDetail = projectDetail;
	}

	public String getPaymentUpload() {
		return paymentUpload;
	}

	public void setPaymentUpload(String paymentUpload) {
		this.paymentUpload = paymentUpload;
	}

	public PaymentRequestStatus getPaymentRequestStatus() {
		return paymentRequestStatus;
	}

	public void setPaymentRequestStatus(PaymentRequestStatus paymentRequestStatus) {
		this.paymentRequestStatus = paymentRequestStatus;
	}

	public Long getInvoiceMoney() {
		return invoiceMoney;
	}

	public void setInvoiceMoney(Long invoiceMoney) {
		this.invoiceMoney = invoiceMoney;
	}

	public String getInvoiceUpload() {
		return invoiceUpload;
	}

	public void setInvoiceUpload(String invoiceUpload) {
		this.invoiceUpload = invoiceUpload;
	}

	public Date getSendDate() {
		return sendDate;
	}

	public void setSendDate(Date sendDate) {
		this.sendDate = sendDate;
	}

	public InvoiceVer123Status getStatus() {
		return status;
	}

	public void setStatus(InvoiceVer123Status status) {
		this.status = status;
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

	public String getInvoiceNumber() {
		return invoiceNumber;
	}

	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
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

	public String getInvoiceName() {
		return invoiceName;
	}

	public void setInvoiceName(String invoiceName) {
		this.invoiceName = invoiceName;
	}
	
}
