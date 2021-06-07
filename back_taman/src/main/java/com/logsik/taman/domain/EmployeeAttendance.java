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

import com.logsik.taman.enums.AttendanceStatus;
import com.logsik.taman.enums.AttendanceType;
import com.logsik.taman.enums.LateStatus;
import com.logsik.taman.enums.OvertimeType;

@Entity(name = "employee_attendance")
public class EmployeeAttendance implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id",updatable = false,insertable=false)
	private User user;
	
	@Column(name="user_id")
	private Long userId;
	
	@Column(name="date_to_work")
	@Temporal(TemporalType.DATE)
	private Date dateToWork;
	
	@Column(name="attendance_type")
	@Enumerated(EnumType.STRING)
	private AttendanceType attendanceType;
	
	@Column 
	private String workPlace;
	
	@Column
	@Enumerated(EnumType.STRING)
	private AttendanceStatus status;
	
	@Column
	@Enumerated(EnumType.STRING)
	private LateStatus lateStatus;
	
	@Lob
	@Column(columnDefinition= "longtext")
	private String note;
	
	@Column
	@Enumerated(EnumType.STRING)
	private OvertimeType overtimeType;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "leave_letter_id",updatable = false,insertable=false)
	private LeaveLetter leaveLetter;
	
	@Column(name="leave_letter_id")
	private Long leaveLetterId;

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

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public LeaveLetter getLeaveLetter() {
		return leaveLetter;
	}

	public Long getLeaveLetterId() {
		return leaveLetterId;
	}

	public void setLeaveLetterId(Long leaveLetterId) {
		this.leaveLetterId = leaveLetterId;
	}

	
}
