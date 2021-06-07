package com.logsik.taman.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity(name = "invoice_vat_out")
public class InvoiceVATOutput implements Serializable {
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
	@JoinColumn(name = "responsible_user_id", updatable = false,insertable=false)
	private User responsibleUser;
	
	@Column(name= "responsible_user_id")
	private Long responsibleUserId;

	@Column(name = "payment_date")
	@Temporal(TemporalType.DATE)
	private Date paymentDate;

	@Column(name = "invoice_output_date")
	@Temporal(TemporalType.DATE)
	private Date invoiceOutputDate;

	@Column(name = "invoice_vat_code")
	private String invoiceVatCode;
	
	@Column(name = "supplier_name")
	private String supplierName;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "total_money_no_vat")
	private long totalMoneyNoVat;
	
	@Column(name = "total_money_vat")
	private long totalMoneyVat;
	
	@Lob
	@Column(columnDefinition = "longtext")
	private String note;

	public Long getId() {
		return id;
	}

	public ProjectDetail getProjectDetail() {
		return projectDetail;
	}

	public Long getProjectDetailId() {
		return projectDetailId;
	}

	public User getResponsibleUser() {
		return responsibleUser;
	}

	public Long getResponsibleUserId() {
		return responsibleUserId;
	}

	public Date getPaymentDate() {
		return paymentDate;
	}

	public Date getInvoiceOutputDate() {
		return invoiceOutputDate;
	}

	public String getInvoiceVatCode() {
		return invoiceVatCode;
	}

	public long getTotalMoneyNoVat() {
		return totalMoneyNoVat;
	}

	public long getTotalMoneyVat() {
		return totalMoneyVat;
	}

	public String getNote() {
		return note;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setProjectDetailId(Long projectDetailId) {
		this.projectDetailId = projectDetailId;
	}

	public void setResponsibleUserId(Long responsibleUserId) {
		this.responsibleUserId = responsibleUserId;
	}

	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}

	public void setInvoiceOutputDate(Date invoiceOutputDate) {
		this.invoiceOutputDate = invoiceOutputDate;
	}

	public void setInvoiceVatCode(String invoiceVatCode) {
		this.invoiceVatCode = invoiceVatCode;
	}

	public void setTotalMoneyNoVat(long totalMoneyNoVat) {
		this.totalMoneyNoVat = totalMoneyNoVat;
	}

	public void setTotalMoneyVat(long totalMoneyVat) {
		this.totalMoneyVat = totalMoneyVat;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
}
