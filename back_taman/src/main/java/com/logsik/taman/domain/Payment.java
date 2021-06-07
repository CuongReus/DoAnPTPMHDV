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

import com.logsik.taman.enums.PaymentStatus;

@Entity(name = "payment")
public class Payment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_cost_id",updatable = false, insertable = false)
	private ProjectCost projectCost;
	
	@Column(name="project_cost_id")
	private Long projectCostId;
	
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "labour_id", updatable = false, insertable = false)
	private Labour labour;
	
	@Column(name="labour_id")
	private Long labourId;

	@Column
	private Integer lotNumber;

	@Column
	@Temporal(TemporalType.DATE)
	private Date paymentDate;

//	@Column
//	@Temporal(TemporalType.DATE)
//	private Date startWorkDate;
//
//	@Column
//	@Temporal(TemporalType.DATE)
//	private Date endWorkDate;

	@Column
	private Long percentPaid;

	@Column
	private Long moneyPaid;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "approval_by", updatable = false,insertable=false)
	private User approvalBy;
	
	@Column(name="approval_by")
	private Long approvalById;


	@Column
	@Enumerated(EnumType.STRING)
	private PaymentStatus status;
	
	@Column
	private Long lbSalaryMidNight;
	
	@Column
	private Long lbSalaryPerDay;

	@Column
	private Float lbNormalAttendance;

	@Column
	private Float lbOvertimeAttendance;

	@Column
	private Float lbMidnightAttendance;

	@Column
	private String notifyTo;
	@Lob
	@Column(columnDefinition ="longtext")
	private String notifyMessage;

	@Lob
	@Column(columnDefinition = "longtext")
	private String note;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "created_user_id", updatable = false,insertable=false)
	private User createdUser;
	
	@Column(name="created_user_id")
	private Long createdUserId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "lasted_update_user_id",updatable = false,insertable=false)
	private User lastedUpdateUser;
	
	@Column(name="lasted_update_user_id")
	private Long lastedUpdateUserId;

	@Column
	@Temporal(TemporalType.DATE)
	private Date createdDate;

	@Column
	@Temporal(TemporalType.DATE)
	private Date lastedUpdateDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ProjectCost getProjectCost() {
		return projectCost;
	}

	public void setProjectCost(ProjectCost projectCost) {
		this.projectCost = projectCost;
	}

	public Integer getLotNumber() {
		return lotNumber;
	}

	public void setLotNumber(Integer lotNumber) {
		this.lotNumber = lotNumber;
	}

	public Date getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}

	public Long getPercentPaid() {
		return percentPaid;
	}

	public void setPercentPaid(Long percentPaid) {
		this.percentPaid = percentPaid;
	}

	public Long getMoneyPaid() {
		return moneyPaid;
	}

	public void setMoneyPaid(Long moneyPaid) {
		this.moneyPaid = moneyPaid;
	}

	public User getApprovalBy() {
		return approvalBy;
	}

	public void setApprovalBy(User approvalBy) {
		this.approvalBy = approvalBy;
	}

	public PaymentStatus getStatus() {
		return status;
	}

	public void setStatus(PaymentStatus status) {
		this.status = status;
	}

	public Float getLbNormalAttendance() {
		return lbNormalAttendance;
	}

	public void setLbNormalAttendance(Float lbNormalAttendance) {
		this.lbNormalAttendance = lbNormalAttendance;
	}

	public Float getLbMidnightAttendance() {
		return lbMidnightAttendance;
	}

	public void setLbMidnightAttendance(Float lbMidnightAttendance) {
		this.lbMidnightAttendance = lbMidnightAttendance;
	}

	public String getNotifyTo() {
		return notifyTo;
	}

	public void setNotifyTo(String notifyTo) {
		this.notifyTo = notifyTo;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
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

	public Float getLbOvertimeAttendance() {
		return lbOvertimeAttendance;
	}

	public void setLbOvertimeAttendance(Float lbOvertimeAttendance) {
		this.lbOvertimeAttendance = lbOvertimeAttendance;
	}

	public Labour getLabour() {
		return labour;
	}

	public void setLabour(Labour labour) {
		this.labour = labour;
	}

	public Long getLbSalaryMidNight() {
		return lbSalaryMidNight;
	}

	public void setLbSalaryMidNight(Long lbSalaryMidNight) {
		this.lbSalaryMidNight = lbSalaryMidNight;
	}

	public Long getLbSalaryPerDay() {
		return lbSalaryPerDay;
	}

	public void setLbSalaryPerDay(Long lbSalaryPerDay) {
		this.lbSalaryPerDay = lbSalaryPerDay;
	}

	public String getNotifyMessage() {
		return notifyMessage;
	}

	public void setNotifyMessage(String notifyMessage) {
		this.notifyMessage = notifyMessage;
	}

	public Long getProjectCostId() {
		return projectCostId;
	}

	public void setProjectCostId(Long projectCostId) {
		this.projectCostId = projectCostId;
	}

	public Long getLabourId() {
		return labourId;
	}

	public void setLabourId(Long labourId) {
		this.labourId = labourId;
	}

	public Long getApprovalById() {
		return approvalById;
	}

	public void setApprovalById(Long approvalById) {
		this.approvalById = approvalById;
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
