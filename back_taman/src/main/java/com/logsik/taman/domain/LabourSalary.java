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
@Entity(name = "labour_salary")
public class LabourSalary implements Serializable {
	
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "labour_id",updatable = false,insertable= false)
	private Labour labour;
	
	
	@Column(name="labour_id")
	private Long labourId;
	@Column
	private Long salaryPerDay;
	@Column
	private Long salaryMidnight;
	@Column
	private Integer month;
	
	@Column
	private Integer year;
	
	@Column
	private Float attendanceLv0;
	
	@Column
	private Float attendanceLv1;
	
	@Column
	private Float attendanceLv2;
	
	@Column
	private Float attendanceLv3;
	
	@Column
	private Float totalAttendanceCalc;
	
	@Column
	private Long totalMidnightSalary;
	@Column
	private Long totalNormalSalary;
	
	@Column
	private Long totalSalary;
	
	@Column
	private Integer numberOfDistanceDay;
	
	@Column
	private Integer numberOfTransport;
	@Column
	private Integer numberOfLateDay;
	
	@Column
	private Long labourSupportFee;
	
	
	@Column
	private Long otherSupportFee;
	
	@Column
	private Long totalSupportFee;
	
	@Column
	private Long birthdayFee;
	
	@Column
	private Long holidayFee;
	
	@Column
	private Long otherExtraFee;
	
	@Column
	private Long totalExtraFee;
	@Column
	private Long diligenceFee;
	@Column
	private Long unionFee;
	
	@Column
	private Long taxFee;
	
	@Column
	private Long socialInsuranceFee;
	
	@Column
	private Long penaltyFee;
	
	@Column
	private Long totalMinusFee;
	
	@Column
	private Long actualSalary;
	
	@Column
	private Long advanceFee;
	
	@Lob
	@Column(columnDefinition = "longtext")
	private String note;
	@ManyToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="lasted_update_user_id",updatable = false,insertable= false)
	private User lastedUpdateUser;
	
	@Column(name="lasted_update_user_id")
	private Long lastedUpdateUserId;
	@Column
	@Temporal(TemporalType.DATE)
	private Date lastedUpdateDate;
	
	@Column
	@Enumerated(EnumType.STRING)
	private PaymentStatus paymentStatus;
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date paymentDate;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Labour getLabour() {
		return labour;
	}
	public void setLabour(Labour labour) {
		this.labour = labour;
	}
	public Long getSalaryPerDay() {
		return salaryPerDay;
	}
	public void setSalaryPerDay(Long salaryPerDay) {
		this.salaryPerDay = salaryPerDay;
	}
	public Integer getMonth() {
		return month;
	}
	public void setMonth(Integer month) {
		this.month = month;
	}
	public Integer getYear() {
		return year;
	}
	public void setYear(Integer year) {
		this.year = year;
	}
	public Float getAttendanceLv0() {
		return attendanceLv0;
	}
	public void setAttendanceLv0(Float attendanceLv0) {
		this.attendanceLv0 = attendanceLv0;
	}
	public Float getAttendanceLv1() {
		return attendanceLv1;
	}
	public void setAttendanceLv1(Float attendanceLv1) {
		this.attendanceLv1 = attendanceLv1;
	}
	public Float getAttendanceLv2() {
		return attendanceLv2;
	}
	public void setAttendanceLv2(Float attendanceLv2) {
		this.attendanceLv2 = attendanceLv2;
	}
	public Float getAttendanceLv3() {
		return attendanceLv3;
	}
	public void setAttendanceLv3(Float attendanceLv3) {
		this.attendanceLv3 = attendanceLv3;
	}
	public Float getTotalAttendanceCalc() {
		return totalAttendanceCalc;
	}
	public void setTotalAttendanceCalc(Float totalAttendanceCalc) {
		this.totalAttendanceCalc = totalAttendanceCalc;
	}
	
	public Long getTotalMidnightSalary() {
		return totalMidnightSalary;
	}
	public void setTotalMidnightSalary(Long totalMidnightSalary) {
		this.totalMidnightSalary = totalMidnightSalary;
	}
	public Long getTotalNormalSalary() {
		return totalNormalSalary;
	}
	public void setTotalNormalSalary(Long totalNormalSalary) {
		this.totalNormalSalary = totalNormalSalary;
	}
	public Integer getNumberOfDistanceDay() {
		return numberOfDistanceDay;
	}
	public void setNumberOfDistanceDay(Integer numberOfDistanceDay) {
		this.numberOfDistanceDay = numberOfDistanceDay;
	}
	public Integer getNumberOfTransport() {
		return numberOfTransport;
	}
	public void setNumberOfTransport(Integer numberOfTransport) {
		this.numberOfTransport = numberOfTransport;
	}
	
	
	
	public Integer getNumberOfLateDay() {
		return numberOfLateDay;
	}
	public void setNumberOfLateDay(Integer numberOfLateDay) {
		this.numberOfLateDay = numberOfLateDay;
	}
	public Long getLabourSupportFee() {
		return labourSupportFee;
	}
	public void setLabourSupportFee(Long labourSupportFee) {
		this.labourSupportFee = labourSupportFee;
	}
	public Long getOtherSupportFee() {
		return otherSupportFee;
	}
	public void setOtherSupportFee(Long otherSupportFee) {
		this.otherSupportFee = otherSupportFee;
	}
	public Long getTotalSupportFee() {
		return totalSupportFee;
	}
	public void setTotalSupportFee(Long totalSupportFee) {
		this.totalSupportFee = totalSupportFee;
	}
	public Long getBirthdayFee() {
		return birthdayFee;
	}
	public void setBirthdayFee(Long birthdayFee) {
		this.birthdayFee = birthdayFee;
	}
	public Long getHolidayFee() {
		return holidayFee;
	}
	public void setHolidayFee(Long holidayFee) {
		this.holidayFee = holidayFee;
	}
	public Long getOtherExtraFee() {
		return otherExtraFee;
	}
	public void setOtherExtraFee(Long otherExtraFee) {
		this.otherExtraFee = otherExtraFee;
	}
	public Long getTotalExtraFee() {
		return totalExtraFee;
	}
	public void setTotalExtraFee(Long totalExtraFee) {
		this.totalExtraFee = totalExtraFee;
	}
	public Long getDiligenceFee() {
		return diligenceFee;
	}
	public void setDiligenceFee(Long diligenceFee) {
		this.diligenceFee = diligenceFee;
	}
	public Long getUnionFee() {
		return unionFee;
	}
	public void setUnionFee(Long unionFee) {
		this.unionFee = unionFee;
	}
	public Long getTaxFee() {
		return taxFee;
	}
	public void setTaxFee(Long taxFee) {
		this.taxFee = taxFee;
	}
	public Long getSocialInsuranceFee() {
		return socialInsuranceFee;
	}
	public void setSocialInsuranceFee(Long socialInsuranceFee) {
		this.socialInsuranceFee = socialInsuranceFee;
	}
	public Long getPenaltyFee() {
		return penaltyFee;
	}
	public void setPenaltyFee(Long penaltyFee) {
		this.penaltyFee = penaltyFee;
	}
	public Long getTotalMinusFee() {
		return totalMinusFee;
	}
	public void setTotalMinusFee(Long totalMinusFee) {
		this.totalMinusFee = totalMinusFee;
	}
	public Long getActualSalary() {
		return actualSalary;
	}
	public void setActualSalary(Long actualSalary) {
		this.actualSalary = actualSalary;
	}
	public Long getAdvanceFee() {
		return advanceFee;
	}
	public void setAdvanceFee(Long advanceFee) {
		this.advanceFee = advanceFee;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public User getLastedUpdateUser() {
		return lastedUpdateUser;
	}
	public void setLastedUpdateUser(User lastedUpdateUser) {
		this.lastedUpdateUser = lastedUpdateUser;
	}
	public Date getLastedUpdateDate() {
		return lastedUpdateDate;
	}
	public void setLastedUpdateDate(Date lastedUpdateDate) {
		this.lastedUpdateDate = lastedUpdateDate;
	}
	public Long getSalaryMidnight() {
		return salaryMidnight;
	}
	public void setSalaryMidnight(Long salaryMidnight) {
		this.salaryMidnight = salaryMidnight;
	}
	public Long getTotalSalary() {
		return totalSalary;
	}
	public void setTotalSalary(Long totalSalary) {
		this.totalSalary = totalSalary;
	}
	public PaymentStatus getPaymentStatus() {
		return paymentStatus;
	}
	public void setPaymentStatus(PaymentStatus paymentStatus) {
		this.paymentStatus = paymentStatus;
	}
	public Date getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}
	public Long getLabourId() {
		return labourId;
	}
	public void setLabourId(Long labourId) {
		this.labourId = labourId;
	}
	
	

}
