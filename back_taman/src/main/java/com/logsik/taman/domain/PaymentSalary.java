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
import com.logsik.taman.enums.PaymentType;

@Entity(name = "payment_salary")
public class PaymentSalary  implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "labour_salary_id",updatable = false,insertable=false)
	private LabourSalary labourSalary;
	
	@Column(name="labour_salary_id")
	private Long labourSalaryId;
	@Column
	private Long amount;
	
	@Column
	@Enumerated(EnumType.STRING)
	private PaymentType paymentType;
	
	@ManyToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="created_user_id",updatable = false,insertable=false)
	private User createdUser;

	@Column(name="created_user_id")
	private Long createdUserId;
	@Column
	@Temporal(TemporalType.DATE)
	private Date createdDate;
	
	@ManyToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="validated_by",updatable = false,insertable=false)
	private User validatedBy;
	
	@Column(name="validated_by")
	private Long validatedById;
	
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date validatedDate;
	
	@Column
	@Enumerated(EnumType.STRING)
	private PaymentStatus status;

	@Column
	@Temporal(TemporalType.DATE)
	private Date paidDate;
	
	@Lob
	@Column(columnDefinition = "longtext")
	private String note;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LabourSalary getLabourSalary() {
		return labourSalary;
	}

	public void setLabourSalary(LabourSalary labourSalary) {
		this.labourSalary = labourSalary;
	}

	public Long getAmount() {
		return amount;
	}

	public void setAmount(Long amount) {
		this.amount = amount;
	}

	public PaymentType getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(PaymentType paymentType) {
		this.paymentType = paymentType;
	}

	public User getCreatedUser() {
		return createdUser;
	}

	public void setCreatedUser(User createdUser) {
		this.createdUser = createdUser;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public User getValidatedBy() {
		return validatedBy;
	}

	public void setValidatedBy(User validatedBy) {
		this.validatedBy = validatedBy;
	}

	public Date getValidatedDate() {
		return validatedDate;
	}

	public void setValidatedDate(Date validatedDate) {
		this.validatedDate = validatedDate;
	}

	public PaymentStatus getStatus() {
		return status;
	}

	public void setStatus(PaymentStatus status) {
		this.status = status;
	}

	public Date getPaidDate() {
		return paidDate;
	}

	public void setPaidDate(Date paidDate) {
		this.paidDate = paidDate;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Long getLabourSalaryId() {
		return labourSalaryId;
	}

	public void setLabourSalaryId(Long labourSalaryId) {
		this.labourSalaryId = labourSalaryId;
	}

	public Long getCreatedUserId() {
		return createdUserId;
	}

	public void setCreatedUserId(Long createdUserId) {
		this.createdUserId = createdUserId;
	}

	public Long getValidatedById() {
		return validatedById;
	}

	public void setValidatedById(Long validatedById) {
		this.validatedById = validatedById;
	}
	
	
}
