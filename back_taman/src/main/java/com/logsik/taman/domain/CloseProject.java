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

@Entity(name = "close_project")
public class CloseProject implements Serializable {
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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "construction_team_id",updatable = false)
	private ConstructionTeam constructionTeam;

	@Column
	private Long closeApprovalValue;

	@Column
	private Long closeWorkDoneValue;

	@Column
	private String closeWorkDoneUpload;

	@Column
	private Long profit;

	@Column
	private Long guaranteeMoney;

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

	@Column
	@Temporal(TemporalType.DATE)
	private Date guaranteeStartDate;

	@Column
	@Temporal(TemporalType.DATE)
	private Date guaranteeEndDate;

	@Column
	private Long incurApprovalValue;

	@Column
	private Long incurWorkDoneValue;

	@Column
	private String incurredUpload;

	@Column
	private Long profitIncurrent;

	@Column
	private String leaderName;

	@Column
	private String leaderPhone;

	@Column
	private String teamEvaluate;

	@Column
	private boolean isClosed = false;

	@Column
	@Temporal(TemporalType.DATE)
	private Date closeProjectDate;

	@Lob
	@Column(columnDefinition = "longtext")
	private String note;

	public Long getId() {
		return id;
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

	public ConstructionTeam getConstructionTeam() {
		return constructionTeam;
	}

	public void setConstructionTeam(ConstructionTeam constructionTeam) {
		this.constructionTeam = constructionTeam;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
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

	public boolean isClosed() {
		return isClosed;
	}

	public void setClosed(boolean isClosed) {
		this.isClosed = isClosed;
	}

	public Date getCloseProjectDate() {
		return closeProjectDate;
	}

	public void setCloseProjectDate(Date closeProjectDate) {
		this.closeProjectDate = closeProjectDate;
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
