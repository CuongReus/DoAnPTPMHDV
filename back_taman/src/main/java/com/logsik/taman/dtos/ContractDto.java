package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.logsik.taman.enums.ApprovalStatus;
import com.logsik.taman.enums.DraftContractStatus;
import com.logsik.taman.enums.OfficialContractStatus;

public class ContractDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long projectDetailId;
	private DraftContractStatus draftContractStatus;
	private String draftUpload;
	private String officialUpload;
	private OfficialContractStatus officialContractStatus;
	private Date sendDate;
	private String contractNumber;
	private Date startProgressDate;
	private Date endProgressDate;
	private Integer progressDays;
	private String note;
	private Long createdUserId;
	private Long lastedUpdateUserId;
	private Date createdDate;
	private Date lastedUpdateDate;
	private List<UploadFileResponse> draftUploadFile = new ArrayList<>();
	private List<UploadFileResponse> officialUploadFile = new ArrayList<>();

	private ApprovalStatus approvalStatus;

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

	public DraftContractStatus getDraftContractStatus() {
		return draftContractStatus;
	}

	public void setDraftContractStatus(DraftContractStatus draftContractStatus) {
		this.draftContractStatus = draftContractStatus;
	}

	public String getDraftUpload() {
		return draftUpload;
	}

	public void setDraftUpload(String draftUpload) {
		this.draftUpload = draftUpload;
	}

	public String getOfficialUpload() {
		return officialUpload;
	}

	public void setOfficialUpload(String officialUpload) {
		this.officialUpload = officialUpload;
	}

	public OfficialContractStatus getOfficialContractStatus() {
		return officialContractStatus;
	}

	public void setOfficialContractStatus(OfficialContractStatus officialContractStatus) {
		this.officialContractStatus = officialContractStatus;
	}

	public Date getSendDate() {
		return sendDate;
	}

	public void setSendDate(Date sendDate) {
		this.sendDate = sendDate;
	}

	public String getContractNumber() {
		return contractNumber;
	}

	public void setContractNumber(String contractNumber) {
		this.contractNumber = contractNumber;
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

	public Integer getProgressDays() {
		return progressDays;
	}

	public void setProgressDays(Integer progressDays) {
		this.progressDays = progressDays;
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

	public List<UploadFileResponse> getDraftUploadFile() {
		return draftUploadFile;
	}

	public void setDraftUploadFile(List<UploadFileResponse> draftUploadFile) {
		this.draftUploadFile = draftUploadFile;
	}

	public List<UploadFileResponse> getOfficialUploadFile() {
		return officialUploadFile;
	}

	public void setOfficialUploadFile(List<UploadFileResponse> officialUploadFile) {
		this.officialUploadFile = officialUploadFile;
	}

	public ApprovalStatus getApprovalStatus() {
		return approvalStatus;
	}

	public void setApprovalStatus(ApprovalStatus approvalStatus) {
		this.approvalStatus = approvalStatus;
	}

}
