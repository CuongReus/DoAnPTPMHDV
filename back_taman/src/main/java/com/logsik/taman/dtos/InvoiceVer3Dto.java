package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.logsik.taman.enums.InvoiceVer123Status;
import com.logsik.taman.enums.PaymentRequestStatus;

public class InvoiceVer3Dto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long projectDetailId;
	private String invoiceUpload;
	private Long invoiceMoney;
	private String paymentUpload;
	private PaymentRequestStatus paymentRequestStatus;
	private Date sendDate;
	private InvoiceVer123Status status;
	private Long inputInvoice;
	private String inputUpload;
	private String note;
	private Long createdUserId;
	private Long lastedUpdateUserId;
	private Date createdDate;
	private Date lastedUpdateDate;
	private String invoiceNumber;
	private List<UploadFileResponse> inputUploadFile = new ArrayList<>();
	private List<UploadFileResponse> invoiceUploadFile = new ArrayList<>();
	
	private String invoiceName;

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

	public String getInvoiceUpload() {
		return invoiceUpload;
	}

	public void setInvoiceUpload(String invoiceUpload) {
		this.invoiceUpload = invoiceUpload;
	}

	public Long getInvoiceMoney() {
		return invoiceMoney;
	}

	public void setInvoiceMoney(Long invoiceMoney) {
		this.invoiceMoney = invoiceMoney;
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

	public String getInvoiceNumber() {
		return invoiceNumber;
	}

	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}

	public List<UploadFileResponse> getInputUploadFile() {
		return inputUploadFile;
	}

	public void setInputUploadFile(List<UploadFileResponse> inputUploadFile) {
		this.inputUploadFile = inputUploadFile;
	}

	public List<UploadFileResponse> getInvoiceUploadFile() {
		return invoiceUploadFile;
	}

	public void setInvoiceUploadFile(List<UploadFileResponse> invoiceUploadFile) {
		this.invoiceUploadFile = invoiceUploadFile;
	}

	public String getInvoiceName() {
		return invoiceName;
	}

	public void setInvoiceName(String invoiceName) {
		this.invoiceName = invoiceName;
	}

}
