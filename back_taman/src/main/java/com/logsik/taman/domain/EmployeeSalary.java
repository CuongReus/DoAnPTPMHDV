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

@Entity(name = "employee_salary")
public class EmployeeSalary implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	@Column(name="id")
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id",updatable = false,insertable=false)
	private User  user;
	
	@Column(name="user_id")
	private Long  userId;
	
	
	
	@Column(name="actual_attendance")
	private Float actualAttendance;
	
	@Column(name="month")
	private Integer  month;
	
	@Column(name="year")
	private Integer  year;
	
	@Column(name="salary_per_month")
	private Long  salaryPerMonth;
	
	@Column(name="normal_overtime_fee")
	private Long  normalOvertimeFee;
	
	@Column(name="weekend_overtime_fee")
	private Long  weekendOvertimeFee;
	
	@Column(name="holiday_overtime_fee")
	private Long  holidayOvertimeFee;

	@Column(name="attendance_coefficient")
	private Float attendanceCoefficient;
	
	@Column(name="lunch_fee")
	private Long  lunchFee;
	
	@Column(name="petrol_fee")
	private Long  petrolFee;
	
	@Column(name="holiday_fee")
	private Long  holidayFee;
	
	@Column(name="diligence_fee")
	private Long  diligenceFee;
	
	@Column(name="insurance_salary")
	private Long  insuranceSalary;
	
	@Column(name="union_fee")
	private Long  unionFee;
	
	@Column(name="birthday_fee")
	private Long  birthdayFee;
	
	@Column(name="phone_fee")
	private Long  phoneFee;

	@Column(name="distance_support_fee")
	private Long  distanceSupportFee;
	
	@Column(name="other_support_fee")
	private Long  otherSupportFee;
	
	@Column(name="penalty_fee")
	private Long  penaltyFee;
	
	@Column(name="tax_payable")
	private Long  taxPayable;
	@Column(name="taxable_income")
	private Long taxableIncome;
	@Column(name="assessable_income")
	private Long  assessableIncome;
	
	@Column(name="other_minus_fee")
	private Long  otherMinusFee;
	
	@Column(name="total_salary")
	private Long  totalSalary;
	
	@Column(name="total_personal_insurance_fee")
	private Long  totalPersonalInsuranceFee;
	
	@Column(name="total_company_insurance_fee")
	private Long  totalCompanyInsuranceFee;
	
	@Column(name="personal_deduction")
	private Long personalDeduction;

	@Column(name="family_circumstance_deduction")
	private Long familyCircumstanceDeduction;
	
	@Column(name="actual_salary")
	private Long  actualSalary;
	
	@Column(name="holiday_leave")
	private Float holidayLeave;
	
	@Column(name="absent_without_leave")
	private Float absentWithoutLeave; 
	
	@Column(name="leave_year")
	private Float leaveYear;
	
	@Column(name="normal_attendance")
	private Float normalAttendance;
	
	@Column(name="normal_overtime_attendance")
	private Float normalOvertimeAttendance;
	
	@Column(name="weekend_attendance")
	private Float weekendAttendance;

	@Column(name="holiday_attendance")
	private Float holidayAttendance;
	
	@Column(name="absent_without_salary")
	private Float absentWithoutSalary;
	
	@Column(name="compensatory_leave")
	private Float compensatoryLeave;
	@Column(name = "responsibility_allowance")
	private Long responsibilityAllowance;
	
	@Column
	@Enumerated(EnumType.STRING)
	private PaymentStatus paymentStatus;
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date paymentDate;
	
	@Lob
	@Column(columnDefinition = "longtext")
	private String  note;
	
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
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

	public Long getResponsibilityAllowance() {
		return responsibilityAllowance;
	}

	public void setResponsibilityAllowance(Long responsibilityAllowance) {
		this.responsibilityAllowance = responsibilityAllowance;
	}

	public Long getTaxableIncome() {
		return taxableIncome;
	}

	public void setTaxableIncome(Long taxableIncome) {
		this.taxableIncome = taxableIncome;
	}

	public Float getNormalOvertimeAttendance() {
		return normalOvertimeAttendance;
	}

	public void setNormalOvertimeAttendance(Float normalOvertimeAttendance) {
		this.normalOvertimeAttendance = normalOvertimeAttendance;
	}

	

	public Float getAttendanceCoefficient() {
		return attendanceCoefficient;
	}

	public void setAttendanceCoefficient(Float attendanceCoefficient) {
		this.attendanceCoefficient = attendanceCoefficient;
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

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	

	
	
	
	 

}
