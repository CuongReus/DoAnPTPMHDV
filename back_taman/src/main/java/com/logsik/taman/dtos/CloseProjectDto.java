package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.logsik.taman.enums.ApprovalStatus;

public class CloseProjectDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long projectDetailId;
	private Long constructionTeamId;
	private Long closeApprovalValue;
	private Long closeWorkDoneValue;
	private String closeWorkDoneUpload;
	private Long profit;
	private Long guaranteeMoney;
	private Date guaranteeStartDate;
	private Date guaranteeEndDate;
	private Long incurApprovalValue;
	private Long incurWorkDoneValue;
	private String incurredUpload;
	private Long profitIncurrent;
	private String leaderName;
	private String leaderPhone;
	private String teamEvaluate;
	private Long createdUserId;
	private Long lastedUpdateUserId;
	private Date createdDate;
	private Date lastedUpdateDate;
	private boolean isClosed = false;
	private String note;
	private Date closeProjectDate;

	private List<UploadFileResponse> closeWorkDoneUploadFile = new ArrayList<>();
	private List<UploadFileResponse> incurredUploadFile = new ArrayList<>();
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

	public Long getConstructionTeamId() {
		return constructionTeamId;
	}

	public void setConstructionTeamId(Long constructionTeamId) {
		this.constructionTeamId = constructionTeamId;
	}

	public Long getCloseApprovalValue() {
		return closeApprovalValue;
	}

	public void setCloseApprovalValue(Long closeApprovalValue) {
		this.closeApprovalValue = closeApprovalValue;
	}

	public Long getCloseWorkDoneValue() {
		return closeWorkDoneValue;
	}

	public void setCloseWorkDoneValue(Long closeWorkDoneValue) {
		this.closeWorkDoneValue = closeWorkDoneValue;
	}

	public String getCloseWorkDoneUpload() {
		return closeWorkDoneUpload;
	}

	public void setCloseWorkDoneUpload(String closeWorkDoneUpload) {
		this.closeWorkDoneUpload = closeWorkDoneUpload;
	}

	public Long getProfit() {
		return profit;
	}

	public void setProfit(Long profit) {
		this.profit = profit;
	}

	public Long getGuaranteeMoney() {
		return guaranteeMoney;
	}

	public void setGuaranteeMoney(Long guaranteeMoney) {
		this.guaranteeMoney = guaranteeMoney;
	}

	public Date getGuaranteeStartDate() {
		return guaranteeStartDate;
	}

	public void setGuaranteeStartDate(Date guaranteeStartDate) {
		this.guaranteeStartDate = guaranteeStartDate;
	}

	public Date getGuaranteeEndDate() {
		return guaranteeEndDate;
	}

	public void setGuaranteeEndDate(Date guaranteeEndDate) {
		this.guaranteeEndDate = guaranteeEndDate;
	}

	public Long getIncurApprovalValue() {
		return incurApprovalValue;
	}

	public void setIncurApprovalValue(Long incurApprovalValue) {
		this.incurApprovalValue = incurApprovalValue;
	}

	public Long getIncurWorkDoneValue() {
		return incurWorkDoneValue;
	}

	public void setIncurWorkDoneValue(Long incurWorkDoneValue) {
		this.incurWorkDoneValue = incurWorkDoneValue;
	}

	public String getIncurredUpload() {
		return incurredUpload;
	}

	public void setIncurredUpload(String incurredUpload) {
		this.incurredUpload = incurredUpload;
	}

	public Long getProfitIncurrent() {
		return profitIncurrent;
	}

	public void setProfitIncurrent(Long profitIncurrent) {
		this.profitIncurrent = profitIncurrent;
	}

	public String getLeaderName() {
		return leaderName;
	}

	public void setLeaderName(String leaderName) {
		this.leaderName = leaderName;
	}

	public String getLeaderPhone() {
		return leaderPhone;
	}

	public void setLeaderPhone(String leaderPhone) {
		this.leaderPhone = leaderPhone;
	}

	public String getTeamEvaluate() {
		return teamEvaluate;
	}

	public void setTeamEvaluate(String teamEvaluate) {
		this.teamEvaluate = teamEvaluate;
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

	public boolean isClosed() {
		return isClosed;
	}

	public void setClosed(boolean isClosed) {
		this.isClosed = isClosed;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Date getCloseProjectDate() {
		return closeProjectDate;
	}

	public void setCloseProjectDate(Date closeProjectDate) {
		this.closeProjectDate = closeProjectDate;
	}

	public List<UploadFileResponse> getCloseWorkDoneUploadFile() {
		return closeWorkDoneUploadFile;
	}

	public void setCloseWorkDoneUploadFile(List<UploadFileResponse> closeWorkDoneUploadFile) {
		this.closeWorkDoneUploadFile = closeWorkDoneUploadFile;
	}

	public List<UploadFileResponse> getIncurredUploadFile() {
		return incurredUploadFile;
	}

	public void setIncurredUploadFile(List<UploadFileResponse> incurredUploadFile) {
		this.incurredUploadFile = incurredUploadFile;
	}

	public ApprovalStatus getApprovalStatus() {
		return approvalStatus;
	}

	public void setApprovalStatus(ApprovalStatus approvalStatus) {
		this.approvalStatus = approvalStatus;
	}

}
