package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.Date;

import com.logsik.taman.enums.PaymentStatus;

public class PaymentDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long projectCostId;
	private Long labourId;
	private Integer lotNumber;
	private Date paymentDate;
	private Long percentPaid;
	private Long moneyPaid;
	private Long approvalById;
	private PaymentStatus status;
	private Long lbSalaryMidNight;
	private Long lbSalaryPerDay;
	private Float lbNormalAttendance;
	private Float lbOvertimeAttendance;
	private Float lbMidnightAttendance;
	private String notifyTo;
	private String notifyMessage;
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

	public Long getApprovalById() {
		return approvalById;
	}

	public void setApprovalById(Long approvalById) {
		this.approvalById = approvalById;
	}

	public PaymentStatus getStatus() {
		return status;
	}

	public void setStatus(PaymentStatus status) {
		this.status = status;
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

	public Float getLbNormalAttendance() {
		return lbNormalAttendance;
	}

	public void setLbNormalAttendance(Float lbNormalAttendance) {
		this.lbNormalAttendance = lbNormalAttendance;
	}

	public Float getLbOvertimeAttendance() {
		return lbOvertimeAttendance;
	}

	public void setLbOvertimeAttendance(Float lbOvertimeAttendance) {
		this.lbOvertimeAttendance = lbOvertimeAttendance;
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

	public String getNotifyMessage() {
		return notifyMessage;
	}

	public void setNotifyMessage(String notifyMessage) {
		this.notifyMessage = notifyMessage;
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
