package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.Date;

import com.logsik.taman.enums.PaymentStatus;

public class EmployeeSalaryDto implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private Long userId;
	private Float actualAttendance;
	private Integer month;
	private Integer year;
	private Long salaryPerMonth;
	private Long normalOvertimeFee;
	private Long weekendOvertimeFee;
	private Long holidayOvertimeFee;
	private Float attendanceCoefficient;
	private Long lunchFee;
	private Long petrolFee;
	private Long holidayFee;
	private Long diligenceFee;
	private Long insuranceSalary;
	private Long unionFee;
	private Long birthdayFee;
	private Long phoneFee;
	private Long distanceSupportFee;
	private Long otherSupportFee;
	private Long penaltyFee;
	private Long taxPayable;
	private Long taxableIncome;
	private Long assessableIncome;
	private Long otherMinusFee;
	private Long totalSalary;
	private Long totalPersonalInsuranceFee;
	private Long totalCompanyInsuranceFee;
	private Long personalDeduction;
	private Long familyCircumstanceDeduction;
	private Long actualSalary;
	private Float holidayLeave;
	private Float absentWithoutLeave;
	private Float leaveYear;
	private Float normalAttendance;
	private Float normalOvertimeAttendance;
	private Float weekendAttendance;
	private Float holidayAttendance;
	private Float absentWithoutSalary;
	private Float compensatoryLeave;
	private Long responsibilityAllowance;
	private PaymentStatus paymentStatus;
	private Date paymentDate;
	private String note;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Float getActualAttendance() {
		return actualAttendance;
	}

	public void setActualAttendance(Float actualAttendance) {
		this.actualAttendance = actualAttendance;
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

	public Long getSalaryPerMonth() {
		return salaryPerMonth;
	}

	public void setSalaryPerMonth(Long salaryPerMonth) {
		this.salaryPerMonth = salaryPerMonth;
	}

	public Long getNormalOvertimeFee() {
		return normalOvertimeFee;
	}

	public void setNormalOvertimeFee(Long normalOvertimeFee) {
		this.normalOvertimeFee = normalOvertimeFee;
	}

	public Long getWeekendOvertimeFee() {
		return weekendOvertimeFee;
	}

	public void setWeekendOvertimeFee(Long weekendOvertimeFee) {
		this.weekendOvertimeFee = weekendOvertimeFee;
	}

	public Long getHolidayOvertimeFee() {
		return holidayOvertimeFee;
	}

	public void setHolidayOvertimeFee(Long holidayOvertimeFee) {
		this.holidayOvertimeFee = holidayOvertimeFee;
	}

	public Float getAttendanceCoefficient() {
		return attendanceCoefficient;
	}

	public void setAttendanceCoefficient(Float attendanceCoefficient) {
		this.attendanceCoefficient = attendanceCoefficient;
	}

	public Long getLunchFee() {
		return lunchFee;
	}

	public void setLunchFee(Long lunchFee) {
		this.lunchFee = lunchFee;
	}

	public Long getPetrolFee() {
		return petrolFee;
	}

	public void setPetrolFee(Long petrolFee) {
		this.petrolFee = petrolFee;
	}

	public Long getHolidayFee() {
		return holidayFee;
	}

	public void setHolidayFee(Long holidayFee) {
		this.holidayFee = holidayFee;
	}

	public Long getDiligenceFee() {
		return diligenceFee;
	}

	public void setDiligenceFee(Long diligenceFee) {
		this.diligenceFee = diligenceFee;
	}

	public Long getInsuranceSalary() {
		return insuranceSalary;
	}

	public void setInsuranceSalary(Long insuranceSalary) {
		this.insuranceSalary = insuranceSalary;
	}

	public Long getUnionFee() {
		return unionFee;
	}

	public void setUnionFee(Long unionFee) {
		this.unionFee = unionFee;
	}

	public Long getBirthdayFee() {
		return birthdayFee;
	}

	public void setBirthdayFee(Long birthdayFee) {
		this.birthdayFee = birthdayFee;
	}

	public Long getPhoneFee() {
		return phoneFee;
	}

	public void setPhoneFee(Long phoneFee) {
		this.phoneFee = phoneFee;
	}

	public Long getDistanceSupportFee() {
		return distanceSupportFee;
	}

	public void setDistanceSupportFee(Long distanceSupportFee) {
		this.distanceSupportFee = distanceSupportFee;
	}

	public Long getOtherSupportFee() {
		return otherSupportFee;
	}

	public void setOtherSupportFee(Long otherSupportFee) {
		this.otherSupportFee = otherSupportFee;
	}

	public Long getPenaltyFee() {
		return penaltyFee;
	}

	public void setPenaltyFee(Long penaltyFee) {
		this.penaltyFee = penaltyFee;
	}

	public Long getTaxPayable() {
		return taxPayable;
	}

	public void setTaxPayable(Long taxPayable) {
		this.taxPayable = taxPayable;
	}

	public Long getTaxableIncome() {
		return taxableIncome;
	}

	public void setTaxableIncome(Long taxableIncome) {
		this.taxableIncome = taxableIncome;
	}

	public Long getAssessableIncome() {
		return assessableIncome;
	}

	public void setAssessableIncome(Long assessableIncome) {
		this.assessableIncome = assessableIncome;
	}

	public Long getOtherMinusFee() {
		return otherMinusFee;
	}

	public void setOtherMinusFee(Long otherMinusFee) {
		this.otherMinusFee = otherMinusFee;
	}

	public Long getTotalSalary() {
		return totalSalary;
	}

	public void setTotalSalary(Long totalSalary) {
		this.totalSalary = totalSalary;
	}

	public Long getTotalPersonalInsuranceFee() {
		return totalPersonalInsuranceFee;
	}

	public void setTotalPersonalInsuranceFee(Long totalPersonalInsuranceFee) {
		this.totalPersonalInsuranceFee = totalPersonalInsuranceFee;
	}

	public Long getTotalCompanyInsuranceFee() {
		return totalCompanyInsuranceFee;
	}

	public void setTotalCompanyInsuranceFee(Long totalCompanyInsuranceFee) {
		this.totalCompanyInsuranceFee = totalCompanyInsuranceFee;
	}

	public Long getPersonalDeduction() {
		return personalDeduction;
	}

	public void setPersonalDeduction(Long personalDeduction) {
		this.personalDeduction = personalDeduction;
	}

	public Long getFamilyCircumstanceDeduction() {
		return familyCircumstanceDeduction;
	}

	public void setFamilyCircumstanceDeduction(Long familyCircumstanceDeduction) {
		this.familyCircumstanceDeduction = familyCircumstanceDeduction;
	}

	public Long getActualSalary() {
		return actualSalary;
	}

	public void setActualSalary(Long actualSalary) {
		this.actualSalary = actualSalary;
	}

	public Float getHolidayLeave() {
		return holidayLeave;
	}

	public void setHolidayLeave(Float holidayLeave) {
		this.holidayLeave = holidayLeave;
	}

	public Float getAbsentWithoutLeave() {
		return absentWithoutLeave;
	}

	public void setAbsentWithoutLeave(Float absentWithoutLeave) {
		this.absentWithoutLeave = absentWithoutLeave;
	}

	public Float getLeaveYear() {
		return leaveYear;
	}

	public void setLeaveYear(Float leaveYear) {
		this.leaveYear = leaveYear;
	}

	public Float getNormalAttendance() {
		return normalAttendance;
	}

	public void setNormalAttendance(Float normalAttendance) {
		this.normalAttendance = normalAttendance;
	}

	public Float getNormalOvertimeAttendance() {
		return normalOvertimeAttendance;
	}

	public void setNormalOvertimeAttendance(Float normalOvertimeAttendance) {
		this.normalOvertimeAttendance = normalOvertimeAttendance;
	}

	public Float getWeekendAttendance() {
		return weekendAttendance;
	}

	public void setWeekendAttendance(Float weekendAttendance) {
		this.weekendAttendance = weekendAttendance;
	}

	public Float getHolidayAttendance() {
		return holidayAttendance;
	}

	public void setHolidayAttendance(Float holidayAttendance) {
		this.holidayAttendance = holidayAttendance;
	}

	public Float getAbsentWithoutSalary() {
		return absentWithoutSalary;
	}

	public void setAbsentWithoutSalary(Float absentWithoutSalary) {
		this.absentWithoutSalary = absentWithoutSalary;
	}

	public Float getCompensatoryLeave() {
		return compensatoryLeave;
	}

	public void setCompensatoryLeave(Float compensatoryLeave) {
		this.compensatoryLeave = compensatoryLeave;
	}

	public Long getResponsibilityAllowance() {
		return responsibilityAllowance;
	}

	public void setResponsibilityAllowance(Long responsibilityAllowance) {
		this.responsibilityAllowance = responsibilityAllowance;
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

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
