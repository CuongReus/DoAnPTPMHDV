package com.logsik.taman.dtos;



import java.io.Serializable;
import java.util.Date;

import com.logsik.taman.enums.PaymentStatus;
public class LabourSalaryDto implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long labourId;
	private Long salaryPerDay;
	private Long salaryMidnight;
	private Integer month;
	private Integer year;
	private Float attendanceLv0;
	private Float attendanceLv1;
	private Float attendanceLv2;
	private Float attendanceLv3;
	private Float totalAttendanceCalc;
	private Long totalMidnightSalary;
	private Long totalNormalSalary;
	private Long totalSalary;
	private Integer numberOfDistanceDay;
	private Integer numberOfTransport;
	private Integer numberOfLateDay;
	private Long labourSupportFee;
	private Long otherSupportFee;
	private Long totalSupportFee;
	private Long birthdayFee;
	private Long holidayFee;
	private Long otherExtraFee;
	private Long totalExtraFee;
	private Long diligenceFee;
	private Long unionFee;
	private Long taxFee;
	private Long socialInsuranceFee;
	private Long penaltyFee;
	private Long totalMinusFee;
	private Long actualSalary;
	private Long advanceFee;
	private String note;
	private Long lastedUpdateUserId;
	private Date lastedUpdateDate;
	private PaymentStatus paymentStatus;
	private Date paymentDate;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getLabourId() {
		return labourId;
	}
	public void setLabourId(Long labourId) {
		this.labourId = labourId;
	}
	public Long getSalaryPerDay() {
		return salaryPerDay;
	}
	public void setSalaryPerDay(Long salaryPerDay) {
		this.salaryPerDay = salaryPerDay;
	}
	public Long getSalaryMidnight() {
		return salaryMidnight;
	}
	public void setSalaryMidnight(Long salaryMidnight) {
		this.salaryMidnight = salaryMidnight;
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
	public Long getTotalSalary() {
		return totalSalary;
	}
	public void setTotalSalary(Long totalSalary) {
		this.totalSalary = totalSalary;
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
	public Long getLastedUpdateUserId() {
		return lastedUpdateUserId;
	}
	public void setLastedUpdateUserId(Long lastedUpdateUserId) {
		this.lastedUpdateUserId = lastedUpdateUserId;
	}
	public Date getLastedUpdateDate() {
		return lastedUpdateDate;
	}
	public void setLastedUpdateDate(Date lastedUpdateDate) {
		this.lastedUpdateDate = lastedUpdateDate;
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
	
	

}
