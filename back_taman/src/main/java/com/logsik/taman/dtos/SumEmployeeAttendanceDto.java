package com.logsik.taman.dtos;

import java.io.Serializable;

public class SumEmployeeAttendanceDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long userId;
	private Double totalNormalAttendance;
	private Double totalNormalOvertimeAttendance;
	private Double bonusNormalOvertimeAttendance;
	private Double totalSatOvertimeAttendance;
	private Double bonusSatOvertimeAttendance;
	private Double totalSunOvertimeAttendance;
	private Double bonusSunOvertimeAttendance;
	private Double totalHolidayOvertimeAttendance;
	private Double bonusHolidayOvertimeAttendance;
	private Double holidayLeave;
	private Double leaveYear;
	private Double absentWithoutLeave;
	private Double compensatoryLeave;
	private Integer month;
	private Integer year;
	
	public SumEmployeeAttendanceDto(Long userId, Double totalNormalAttendance, Double totalNormalOvertimeAttendance,
			Double totalSatOvertimeAttendance, Double totalSunOvertimeAttendance, Double totalHolidayOvertimeAttendance,
			Double holidayLeave, Double leaveYear, Double absentWithoutLeave, Double compensatoryLeave) {
		super();
		this.userId = userId;
		this.totalNormalAttendance = totalNormalAttendance;
		this.totalNormalOvertimeAttendance = totalNormalOvertimeAttendance;
		this.totalSatOvertimeAttendance = totalSatOvertimeAttendance;
		this.totalSunOvertimeAttendance = totalSunOvertimeAttendance;
		this.totalHolidayOvertimeAttendance = totalHolidayOvertimeAttendance;
		this.holidayLeave = holidayLeave;
		this.leaveYear = leaveYear;
		this.absentWithoutLeave = absentWithoutLeave;
		this.compensatoryLeave = compensatoryLeave;
	}
	
	public SumEmployeeAttendanceDto(Long userId, Double bonusNormalOvertimeAttendance,
			Double bonusSatOvertimeAttendance, Double bonusSunOvertimeAttendance, Double bonusHolidayOvertimeAttendance,
			Double holidayLeave, Double leaveYear, Double absentWithoutLeave, Double compensatoryLeave) {
		super();
		this.userId = userId;
		this.bonusNormalOvertimeAttendance = bonusNormalOvertimeAttendance;
		this.bonusSatOvertimeAttendance = bonusSatOvertimeAttendance;
		this.bonusSunOvertimeAttendance = bonusSunOvertimeAttendance;
		this.bonusHolidayOvertimeAttendance = bonusHolidayOvertimeAttendance;
		this.holidayLeave = holidayLeave;
		this.leaveYear = leaveYear;
		this.absentWithoutLeave = absentWithoutLeave;
		this.compensatoryLeave = compensatoryLeave;
	}

	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Double getTotalNormalAttendance() {
		return totalNormalAttendance;
	}
	public void setTotalNormalAttendance(Double totalNormalAttendance) {
		this.totalNormalAttendance = totalNormalAttendance;
	}
	public Double getTotalNormalOvertimeAttendance() {
		return totalNormalOvertimeAttendance;
	}
	public void setTotalNormalOvertimeAttendance(Double totalNormalOvertimeAttendance) {
		this.totalNormalOvertimeAttendance = totalNormalOvertimeAttendance;
	}
	public Double getTotalSatOvertimeAttendance() {
		return totalSatOvertimeAttendance;
	}
	public void setTotalSatOvertimeAttendance(Double totalSatOvertimeAttendance) {
		this.totalSatOvertimeAttendance = totalSatOvertimeAttendance;
	}
	public Double getTotalSunOvertimeAttendance() {
		return totalSunOvertimeAttendance;
	}
	public void setTotalSunOvertimeAttendance(Double totalSunOvertimeAttendance) {
		this.totalSunOvertimeAttendance = totalSunOvertimeAttendance;
	}
	public Double getTotalHolidayOvertimeAttendance() {
		return totalHolidayOvertimeAttendance;
	}
	public void setTotalHolidayOvertimeAttendance(Double totalHolidayOvertimeAttendance) {
		this.totalHolidayOvertimeAttendance = totalHolidayOvertimeAttendance;
	}
	public Double getHolidayLeave() {
		return holidayLeave;
	}
	public void setHolidayLeave(Double holidayLeave) {
		this.holidayLeave = holidayLeave;
	}
	public Double getLeaveYear() {
		return leaveYear;
	}
	public void setLeaveYear(Double leaveYear) {
		this.leaveYear = leaveYear;
	}
	public Double getAbsentWithoutLeave() {
		return absentWithoutLeave;
	}
	public void setAbsentWithoutLeave(Double absentWithoutLeave) {
		this.absentWithoutLeave = absentWithoutLeave;
	}
	public Double getCompensatoryLeave() {
		return compensatoryLeave;
	}
	public void setCompensatoryLeave(Double compensatoryLeave) {
		this.compensatoryLeave = compensatoryLeave;
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

	public Double getBonusNormalOvertimeAttendance() {
		return bonusNormalOvertimeAttendance;
	}

	public void setBonusNormalOvertimeAttendance(Double bonusNormalOvertimeAttendance) {
		this.bonusNormalOvertimeAttendance = bonusNormalOvertimeAttendance;
	}

	public Double getBonusSatOvertimeAttendance() {
		return bonusSatOvertimeAttendance;
	}

	public void setBonusSatOvertimeAttendance(Double bonusSatOvertimeAttendance) {
		this.bonusSatOvertimeAttendance = bonusSatOvertimeAttendance;
	}

	public Double getBonusSunOvertimeAttendance() {
		return bonusSunOvertimeAttendance;
	}

	public void setBonusSunOvertimeAttendance(Double bonusSunOvertimeAttendance) {
		this.bonusSunOvertimeAttendance = bonusSunOvertimeAttendance;
	}

	public Double getBonusHolidayOvertimeAttendance() {
		return bonusHolidayOvertimeAttendance;
	}

	public void setBonusHolidayOvertimeAttendance(Double bonusHolidayOvertimeAttendance) {
		this.bonusHolidayOvertimeAttendance = bonusHolidayOvertimeAttendance;
	}
	
	
	
	
	
	
}
