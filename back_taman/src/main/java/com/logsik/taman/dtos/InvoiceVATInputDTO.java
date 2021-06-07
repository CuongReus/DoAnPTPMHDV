package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class InvoiceVATInputDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Long projectDetailId;
	private Long responsibleUserId;
	private Long invoiceVatOutId;
	private Date paymentDate;
	private Date invoiceOutputDate;
	private String invoiceVatCode;
	private String customerName;
	private String taxCode;
	private long totalMoneyNoVat;
	private long totalMoneyVat;
	private String note;
	private List<UploadFileResponse> files = new ArrayList<>();
	private String name;
	
	public Long getId() {
		return id;
	}
	public Long getProjectDetailId() {
		return projectDetailId;
	}
	public Long getResponsibleUserId() {
		return responsibleUserId;
	}
	public Long getInvoiceVatOutId() {
		return invoiceVatOutId;
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
	public String getCustomerName() {
		return customerName;
	}
	public String getTaxCode() {
		return taxCode;
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
	public void setInvoiceVatOutId(Long invoiceVatOutId) {
		this.invoiceVatOutId = invoiceVatOutId;
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
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public void setTaxCode(String taxCode) {
		this.taxCode = taxCode;
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
	public List<UploadFileResponse> getFiles() {
		return files;
	}
	public void setFiles(List<UploadFileResponse> files) {
		this.files = files;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	
}
