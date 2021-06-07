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

import com.logsik.taman.enums.DraftContractStatus;
import com.logsik.taman.enums.OfficialContractStatus;

@Entity(name = "contract")
public class Contract implements Serializable {
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
	private DraftContractStatus draftContractStatus;

	@Column
	private String draftUpload;

	@Column
	private String officialUpload;

	@Column
	@Enumerated(EnumType.STRING)
	private OfficialContractStatus officialContractStatus;

	@Column
	@Temporal(TemporalType.DATE)
	private Date sendDate;

	@Column
	private String contractNumber;

	@Column
	@Temporal(TemporalType.DATE)
	private Date startProgressDate;

	@Column
	@Temporal(TemporalType.DATE)
	private Date endProgressDate;

	@Column
	private Integer progressDays;

	@Lob
	@Column
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
