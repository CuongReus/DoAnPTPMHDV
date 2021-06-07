package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class QuotationDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long projectDetailId;
	private String quotationNumber;
	private String quotationUpload;
	private Long total;
	private Date sendDate;
	private String workContent;
	private String note;
	private Long createdUserId;
	private Long lastedUpdateUserId;
	private Date createdDate;
	private Date lastedUpdateDate;
	private List<UploadFileResponse> quotationUploadFile = new ArrayList<>();

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

	public String getQuotationNumber() {
		return quotationNumber;
	}

	public void setQuotationNumber(String quotationNumber) {
		this.quotationNumber = quotationNumber;
	}

	public String getQuotationUpload() {
		return quotationUpload;
	}

	public void setQuotationUpload(String quotationUpload) {
		this.quotationUpload = quotationUpload;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

	public Date getSendDate() {
		return sendDate;
	}

	public void setSendDate(Date sendDate) {
		this.sendDate = sendDate;
	}

	public String getWorkContent() {
		return workContent;
	}

	public void setWorkContent(String workContent) {
		this.workContent = workContent;
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

	public List<UploadFileResponse> getQuotationUploadFile() {
		return quotationUploadFile;
	}

	public void setQuotationUploadFile(List<UploadFileResponse> quotationUploadFile) {
		this.quotationUploadFile = quotationUploadFile;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
