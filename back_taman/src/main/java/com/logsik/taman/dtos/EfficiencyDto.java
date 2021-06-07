package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.logsik.taman.domain.ConstructionTeam;
import com.logsik.taman.domain.User;
import com.logsik.taman.enums.ApprovalStatus;
import com.logsik.taman.enums.HandoverWorkReportStatus;

public class EfficiencyDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long projectDetailId;
	private Long curatorId;
	private Long constructionTeamId;
	private Date startContractProgressDate;
	private Date endContractProgressDate;
	private Date startActualProgressDate;
	private Date endPlanProgressDate;
	private Integer totalContractProgressDays;
	private Integer totalActualProgressDays;
	private HandoverWorkReportStatus handoverWorkReportStatus;
	private String handoverWorkUpload;
	private Date sendDate;
	private String leaderName;
	private String leaderPhone;
	private String newSpecialize;
	private String newLeaderName;
	private String newLeaderPhone;
	private String note;
	private Long createdUserId;
	private Long lastedUpdateUserId;
	private Date createdDate;
	private Date lastedUpdateDate;
	private List<UploadFileResponse> handoverWorkUploadFile = new ArrayList<>();
	private User createdUser;
	private ConstructionTeam constructionTeam;
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

	

	public Long getCreatedUserId() {
		return createdUserId;
	}

	public Long getLastedUpdateUserId() {
		return lastedUpdateUserId;
	}

	public Long getCuratorId() {
		return curatorId;
	}

	public void setCuratorId(Long curatorId) {
		this.curatorId = curatorId;
	}

	public void setCreatedUserId(Long createdUserId) {
		this.createdUserId = createdUserId;
	}

	public void setLastedUpdateUserId(Long lastedUpdateUserId) {
		this.lastedUpdateUserId = lastedUpdateUserId;
	}

	public Long getConstructionTeamId() {
		return constructionTeamId;
	}

	public void setConstructionTeamId(Long constructionTeamId) {
		this.constructionTeamId = constructionTeamId;
	}

	public Date getStartContractProgressDate() {
		return startContractProgressDate;
	}

	public void setStartContractProgressDate(Date startContractProgressDate) {
		this.startContractProgressDate = startContractProgressDate;
	}

	public Date getEndContractProgressDate() {
		return endContractProgressDate;
	}

	public void setEndContractProgressDate(Date endContractProgressDate) {
		this.endContractProgressDate = endContractProgressDate;
	}

	public Date getStartActualProgressDate() {
		return startActualProgressDate;
	}

	public void setStartActualProgressDate(Date startActualProgressDate) {
		this.startActualProgressDate = startActualProgressDate;
	}

	public Date getEndPlanProgressDate() {
		return endPlanProgressDate;
	}

	public void setEndPlanProgressDate(Date endPlanProgressDate) {
		this.endPlanProgressDate = endPlanProgressDate;
	}

	public Integer getTotalContractProgressDays() {
		return totalContractProgressDays;
	}

	public void setTotalContractProgressDays(Integer totalContractProgressDays) {
		this.totalContractProgressDays = totalContractProgressDays;
	}

	public Integer getTotalActualProgressDays() {
		return totalActualProgressDays;
	}

	public void setTotalActualProgressDays(Integer totalActualProgressDays) {
		this.totalActualProgressDays = totalActualProgressDays;
	}

	public HandoverWorkReportStatus getHandoverWorkReportStatus() {
		return handoverWorkReportStatus;
	}

	public void setHandoverWorkReportStatus(HandoverWorkReportStatus handoverWorkReportStatus) {
		this.handoverWorkReportStatus = handoverWorkReportStatus;
	}

	public String getHandoverWorkUpload() {
		return handoverWorkUpload;
	}

	public void setHandoverWorkUpload(String handoverWorkUpload) {
		this.handoverWorkUpload = handoverWorkUpload;
	}

	public Date getSendDate() {
		return sendDate;
	}

	public void setSendDate(Date sendDate) {
		this.sendDate = sendDate;
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

	public String getNewSpecialize() {
		return newSpecialize;
	}

	public void setNewSpecialize(String newSpecialize) {
		this.newSpecialize = newSpecialize;
	}

	public String getNewLeaderName() {
		return newLeaderName;
	}

	public void setNewLeaderName(String newLeaderName) {
		this.newLeaderName = newLeaderName;
	}

	public String getNewLeaderPhone() {
		return newLeaderPhone;
	}

	public void setNewLeaderPhone(String newLeaderPhone) {
		this.newLeaderPhone = newLeaderPhone;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
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

	public List<UploadFileResponse> getHandoverWorkUploadFile() {
		return handoverWorkUploadFile;
	}

	public void setHandoverWorkUploadFile(List<UploadFileResponse> handoverWorkUploadFile) {
		this.handoverWorkUploadFile = handoverWorkUploadFile;
	}

	public ApprovalStatus getApprovalStatus() {
		return approvalStatus;
	}

	public void setApprovalStatus(ApprovalStatus approvalStatus) {
		this.approvalStatus = approvalStatus;
	}

	public User getCreatedUser() {
		return createdUser;
	}

	public void setCreatedUser(User createdUser) {
		this.createdUser = createdUser;
	}

	public ConstructionTeam getConstructionTeam() {
		return constructionTeam;
	}

	public void setConstructionTeam(ConstructionTeam constructionTeam) {
		this.constructionTeam = constructionTeam;
	}
	
}
