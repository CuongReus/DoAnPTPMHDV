package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.Date;

public class ProjectBudgetDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long projectDetailId;
	private Long productBudget;
	private Long constructionTeamBudget;
	private Long labourBudget;
	private Long otherBudget;
	private Long incurredBudget;
	private Long totalProjectBudget;
	private String note;
	private Long createdUserId;
	private Long lastedUpdateUserId;
	private Date createdDate;
	private Date lastedUpdateDate;

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

	public Long getProductBudget() {
		return productBudget;
	}

	public void setProductBudget(Long productBudget) {
		this.productBudget = productBudget;
	}

	public Long getConstructionTeamBudget() {
		return constructionTeamBudget;
	}

	public void setConstructionTeamBudget(Long constructionTeamBudget) {
		this.constructionTeamBudget = constructionTeamBudget;
	}

	public Long getLabourBudget() {
		return labourBudget;
	}

	public void setLabourBudget(Long labourBudget) {
		this.labourBudget = labourBudget;
	}

	public Long getOtherBudget() {
		return otherBudget;
	}

	public void setOtherBudget(Long otherBudget) {
		this.otherBudget = otherBudget;
	}

	public Long getIncurredBudget() {
		return incurredBudget;
	}

	public void setIncurredBudget(Long incurredBudget) {
		this.incurredBudget = incurredBudget;
	}

	public Long getTotalProjectBudget() {
		return totalProjectBudget;
	}

	public void setTotalProjectBudget(Long totalProjectBudget) {
		this.totalProjectBudget = totalProjectBudget;
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

}
