package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.logsik.taman.enums.AcceptanceStatus;
import com.logsik.taman.enums.ApprovalStatus;
import com.logsik.taman.enums.DefectRemainingWorkStatus;
import com.logsik.taman.enums.OvercomeStatus;

public class AcceptanceDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long projectDetailId;
	private AcceptanceStatus acceptanceStatus;
	private String acceptanceUpload;
	private String defectUpload;
	private String overcomeUpload;
	private Date acceptanceDate;
	private DefectRemainingWorkStatus defectRemainingWorkStatus;
	private OvercomeStatus overcomeStatus;
	private Date overcomeDate;
	private Long createdUserId;
	private Long lastedUpdateUserId;
	private Date createdDate;
	private Date lastedUpdateDate;
	private String note;
	private List<UploadFileResponse> acceptanceUploadFile = new ArrayList<>();
	private List<UploadFileResponse> defectUploadFile = new ArrayList<>();
	private List<UploadFileResponse> overcomeUploadFile = new ArrayList<>();
	private ApprovalStatus approvalStatus;

	public ApprovalStatus getApprovalStatus() {
		return approvalStatus;
	}

	public void setApprovalStatus(ApprovalStatus approvalStatus) {
		this.approvalStatus = approvalStatus;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public AcceptanceStatus getAcceptanceStatus() {
		return acceptanceStatus;
	}

	public void setAcceptanceStatus(AcceptanceStatus acceptanceStatus) {
		this.acceptanceStatus = acceptanceStatus;
	}

	public String getAcceptanceUpload() {
		return acceptanceUpload;
	}

	public void setAcceptanceUpload(String acceptanceUpload) {
		this.acceptanceUpload = acceptanceUpload;
	}

	public String getDefectUpload() {
		return defectUpload;
	}

	public void setDefectUpload(String defectUpload) {
		this.defectUpload = defectUpload;
	}

	public String getOvercomeUpload() {
		return overcomeUpload;
	}

	public void setOvercomeUpload(String overcomeUpload) {
		this.overcomeUpload = overcomeUpload;
	}

	public Date getAcceptanceDate() {
		return acceptanceDate;
	}

	public void setAcceptanceDate(Date acceptanceDate) {
		this.acceptanceDate = acceptanceDate;
	}

	public DefectRemainingWorkStatus getDefectRemainingWorkStatus() {
		return defectRemainingWorkStatus;
	}

	public void setDefectRemainingWorkStatus(DefectRemainingWorkStatus defectRemainingWorkStatus) {
		this.defectRemainingWorkStatus = defectRemainingWorkStatus;
	}

	public OvercomeStatus getOvercomeStatus() {
		return overcomeStatus;
	}

	public void setOvercomeStatus(OvercomeStatus overcomeStatus) {
		this.overcomeStatus = overcomeStatus;
	}

	public Date getOvercomeDate() {
		return overcomeDate;
	}

	public void setOvercomeDate(Date overcomeDate) {
		this.overcomeDate = overcomeDate;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public List<UploadFileResponse> getAcceptanceUploadFile() {
		return acceptanceUploadFile;
	}

	public void setAcceptanceUploadFile(List<UploadFileResponse> acceptanceUploadFile) {
		this.acceptanceUploadFile = acceptanceUploadFile;
	}

	public List<UploadFileResponse> getDefectUploadFile() {
		return defectUploadFile;
	}

	public void setDefectUploadFile(List<UploadFileResponse> defectUploadFile) {
		this.defectUploadFile = defectUploadFile;
	}

	public List<UploadFileResponse> getOvercomeUploadFile() {
		return overcomeUploadFile;
	}

	public void setOvercomeUploadFile(List<UploadFileResponse> overcomeUploadFile) {
		this.overcomeUploadFile = overcomeUploadFile;
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
