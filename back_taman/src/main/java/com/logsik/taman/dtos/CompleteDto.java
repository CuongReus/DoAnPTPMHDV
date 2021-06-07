package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.Date;

import com.logsik.taman.enums.EvaluateProgressStatus;
import com.logsik.taman.enums.TeamEvaluateStatus;

public class CompleteDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long projectDetailId;
	private Long createdUserId;
	private Long lastedUpdateUserId;
	private Date createdDate;
	private Date lastedUpdateDate;
	private EvaluateProgressStatus evaluateProgress;
	private TeamEvaluateStatus teamEvaluate;
	private Date completedDate;
	private Date startContractProgressDate;
	private Date endContractProgressDate;
	private String note;
	private Integer actualCompleteDay;

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

}
