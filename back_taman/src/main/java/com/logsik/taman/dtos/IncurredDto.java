package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.logsik.taman.enums.ApprovalStatus;
import com.logsik.taman.enums.DefectStatus;
import com.logsik.taman.enums.IncurredPaymentStatus;
import com.logsik.taman.enums.IncurredWorkStatus;

public class IncurredDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long projectDetailId;
	private String workContentIncurred;
	private Long incurredQuotation;
	private String quotationUpload;
	private String workUpload;
	private ApprovalStatus approvalStatus;
	private Long approvalValue;
	private String approvalUpload;
	private String appendixContractNumber;
	private String appendixUpload;
	private Date sendAppendixDate;
	private Long invoiceIncurred;
	private String invoiceIncurredUpload;
	private Date sendInvoiceDate;
	private Date startProgressDate;
	private Date endProgressDate;
	private IncurredWorkStatus workStatus;
	private DefectStatus defectStatus;
	private String defectUpload;
	private IncurredPaymentStatus paymentStatus;
	private Long createdUserId;
	private Long lastedUpdateUserId;
	private Date createdDate;
	private Date lastedUpdateDate;
	private Long inputInvoice;
	private String inputUpload;
	private String note;
	private List<UploadFileResponse> quotationUploadFile = new ArrayList<>();
	private List<UploadFileResponse> approvalUploadFile = new ArrayList<>();
	private List<UploadFileResponse> appendixUploadFile = new ArrayList<>();
	private List<UploadFileResponse> invoiceIncurredUploadFile = new ArrayList<>();
	private List<UploadFileResponse> defectUploadFile = new ArrayList<>();
	private List<UploadFileResponse> inputUploadFile = new ArrayList<>();
	private List<UploadFileResponse> workUploadFile = new ArrayList<>();

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

	public String getWorkContentIncurred() {
		return workContentIncurred;
	}

	public void setWorkContentIncurred(String workContentIncurred) {
		this.workContentIncurred = workContentIncurred;
	}

	public Long getIncurredQuotation() {
		return incurredQuotation;
	}

	public void setIncurredQuotation(Long incurredQuotation) {
		this.incurredQuotation = incurredQuotation;
	}

	public String getQuotationUpload() {
		return quotationUpload;
	}

	public void setQuotationUpload(String quotationUpload) {
		this.quotationUpload = quotationUpload;
	}

	public String getWorkUpload() {
		return workUpload;
	}

	public void setWorkUpload(String workUpload) {
		this.workUpload = workUpload;
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

	public List<UploadFileResponse> getQuotationUploadFile() {
		return quotationUploadFile;
	}

	public void setQuotationUploadFile(List<UploadFileResponse> quotationUploadFile) {
		this.quotationUploadFile = quotationUploadFile;
	}

	public List<UploadFileResponse> getApprovalUploadFile() {
		return approvalUploadFile;
	}

	public void setApprovalUploadFile(List<UploadFileResponse> approvalUploadFile) {
		this.approvalUploadFile = approvalUploadFile;
	}

	public List<UploadFileResponse> getAppendixUploadFile() {
		return appendixUploadFile;
	}

	public void setAppendixUploadFile(List<UploadFileResponse> appendixUploadFile) {
		this.appendixUploadFile = appendixUploadFile;
	}

	public List<UploadFileResponse> getInvoiceIncurredUploadFile() {
		return invoiceIncurredUploadFile;
	}

	public void setInvoiceIncurredUploadFile(List<UploadFileResponse> invoiceIncurredUploadFile) {
		this.invoiceIncurredUploadFile = invoiceIncurredUploadFile;
	}

	public List<UploadFileResponse> getDefectUploadFile() {
		return defectUploadFile;
	}

	public void setDefectUploadFile(List<UploadFileResponse> defectUploadFile) {
		this.defectUploadFile = defectUploadFile;
	}

	public List<UploadFileResponse> getInputUploadFile() {
		return inputUploadFile;
	}

	public void setInputUploadFile(List<UploadFileResponse> inputUploadFile) {
		this.inputUploadFile = inputUploadFile;
	}

	public List<UploadFileResponse> getWorkUploadFile() {
		return workUploadFile;
	}

	public void setWorkUploadFile(List<UploadFileResponse> workUploadFile) {
		this.workUploadFile = workUploadFile;
	}

}
