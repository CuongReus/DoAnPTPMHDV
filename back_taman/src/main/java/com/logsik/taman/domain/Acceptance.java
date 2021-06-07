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

import com.logsik.taman.enums.AcceptanceStatus;
import com.logsik.taman.enums.DefectRemainingWorkStatus;
import com.logsik.taman.enums.OvercomeStatus;
@Entity(name = "acceptance")
public class Acceptance implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;
	@Column
	@Enumerated(EnumType.STRING)
	private AcceptanceStatus acceptanceStatus;
	
	
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
	private String acceptanceUpload;

	@Column
	private String defectUpload;

	@Column
	private String overcomeUpload;

	@Column
	@Temporal(TemporalType.DATE)
	private Date acceptanceDate;

	@Column
	@Enumerated(EnumType.STRING)
	private DefectRemainingWorkStatus defectRemainingWorkStatus;

	@Column
	@Enumerated(EnumType.STRING)
	private OvercomeStatus overcomeStatus;

	@Column
	@Temporal(TemporalType.DATE)
	private Date overcomeDate;

	@Lob
	@Column(columnDefinition = "longtext")
	private String note;

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
