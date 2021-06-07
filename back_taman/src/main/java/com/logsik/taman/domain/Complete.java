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

import com.logsik.taman.enums.EvaluateProgressStatus;
import com.logsik.taman.enums.TeamEvaluateStatus;
@Entity(name = "complete")
public class Complete implements Serializable {
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
	
	@Column
	@Enumerated(EnumType.STRING)
	private EvaluateProgressStatus evaluateProgress;
	
	@Column
	@Enumerated(EnumType.STRING)
	private TeamEvaluateStatus teamEvaluate;
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date completedDate;
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date startContractProgressDate;
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date endContractProgressDate;
	
	@Lob
	@Column(columnDefinition="longtext")
	private String note;
	
	@Column
	private Integer actualCompleteDay;
	
	
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

	public ProjectDetail getProjectDetail() {
		return projectDetail;
	}

	public void setProjectDetail(ProjectDetail projectDetail) {
		this.projectDetail = projectDetail;
	}

	public EvaluateProgressStatus getEvaluateProgress() {
		return evaluateProgress;
	}

	public void setEvaluateProgress(EvaluateProgressStatus evaluateProgress) {
		this.evaluateProgress = evaluateProgress;
	}

	public TeamEvaluateStatus getTeamEvaluate() {
		return teamEvaluate;
	}

	public void setTeamEvaluate(TeamEvaluateStatus teamEvaluate) {
		this.teamEvaluate = teamEvaluate;
	}

	public Date getCompletedDate() {
		return completedDate;
	}

	public void setCompletedDate(Date completedDate) {
		this.completedDate = completedDate;
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

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Integer getActualCompleteDay() {
		return actualCompleteDay;
	}

	public void setActualCompleteDay(Integer actualCompleteDay) {
		this.actualCompleteDay = actualCompleteDay;
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
