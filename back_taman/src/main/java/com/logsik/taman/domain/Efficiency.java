package com.logsik.taman.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.logsik.taman.enums.HandoverWorkReportStatus;
@Entity(name = "efficiency")
public class Efficiency implements Serializable {
	private static final long serialVersionUID = 1L; 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;
	
	@ManyToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="curator_id", updatable = false,insertable=false)
	private User curator;
	
	@Column(name= "curator_id")
	private Long curatorId;
	
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
	
	
	@ManyToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="construction_team_id", updatable = false,insertable=false)
	private ConstructionTeam constructionTeam;
	
	@Column(name= "construction_team_id")
	private Long constructionTeamId;
	@Column
	private Integer totalContractProgressDays;
	@Column
	private Integer totalActualProgressDays;
	
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date startContractProgressDate;
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date endContractProgressDate;
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date startActualProgressDate;
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date endPlanProgressDate;
	
	@Column
	@Enumerated(EnumType.STRING)
	private HandoverWorkReportStatus handoverWorkReportStatus ;
	
	@Column
	private String handoverWorkUpload;
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date sendDate;
	
	@Column
	private String leaderName;
	
	@Column
	private String leaderPhone;
	
	@Column
	private String newLeaderName;
	
	@Column
	private String newLeaderPhone;
	
	@Column
	private String newSpecialize;

	@Lob
	@Column(columnDefinition="longtext")
	private String note;
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	
	
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

	public User getCurator() {
		return curator;
	}

	public void setCurator(User curator) {
		this.curator = curator;
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

	public String getNewSpecialize() {
		return newSpecialize;
	}

	public void setNewSpecialize(String newSpecialize) {
		this.newSpecialize = newSpecialize;
	}

	public Long getCuratorId() {
		return curatorId;
	}

	public void setCuratorId(Long curatorId) {
		this.curatorId = curatorId;
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

	public Long getConstructionTeamId() {
		return constructionTeamId;
	}

	public void setConstructionTeamId(Long constructionTeamId) {
		this.constructionTeamId = constructionTeamId;
	}

	

	
	
	
	
}
