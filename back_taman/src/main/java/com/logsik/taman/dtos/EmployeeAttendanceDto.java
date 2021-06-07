package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.Date;

import com.logsik.taman.enums.AttendanceStatus;
import com.logsik.taman.enums.AttendanceType;
import com.logsik.taman.enums.LateStatus;
import com.logsik.taman.enums.OvertimeType;

public class EmployeeAttendanceDto implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long userId;
	private Date dateToWork;
	private AttendanceType attendanceType;
	private String workPlace;
	private AttendanceStatus status;
	private LateStatus lateStatus;
	private String note;
	private OvertimeType overtimeType;
	private Long leaveLetterId;
	
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
	public Date getDateToWork() {
		return dateToWork;
	}
	public void setDateToWork(Date dateToWork) {
		this.dateToWork = dateToWork;
	}
	public AttendanceType getAttendanceType() {
		return attendanceType;
	}
	public void setAttendanceType(AttendanceType attendanceType) {
		this.attendanceType = attendanceType;
	}
	public String getWorkPlace() {
		return workPlace;
	}
	public void setWorkPlace(String workPlace) {
		this.workPlace = workPlace;
	}
	public AttendanceStatus getStatus() {
		return status;
	}
	public void setStatus(AttendanceStatus status) {
		this.status = status;
	}
	public LateStatus getLateStatus() {
		return lateStatus;
	}
	public void setLateStatus(LateStatus lateStatus) {
		this.lateStatus = lateStatus;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public OvertimeType getOvertimeType() {
		return overtimeType;
	}
	public void setOvertimeType(OvertimeType overtimeType) {
		this.overtimeType = overtimeType;
	}
	public Long getLeaveLetterId() {
		return leaveLetterId;
	}
	public void setLeaveLetterId(Long leaveLetterId) {
		this.leaveLetterId = leaveLetterId;
	}
	
	
}
