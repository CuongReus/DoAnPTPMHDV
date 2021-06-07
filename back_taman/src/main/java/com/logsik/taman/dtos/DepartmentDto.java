package com.logsik.taman.dtos;

import java.io.Serializable;

import com.logsik.taman.enums.WorkOnWeekendStatus;

public class DepartmentDto implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private String name;
	private String code;
	private Float attendanceCoefficient;
	private WorkOnWeekendStatus workOnWeekendStatus;
	private String note;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Float getAttendanceCoefficient() {
		return attendanceCoefficient;
	}

	public void setAttendanceCoefficient(Float attendanceCoefficient) {
		this.attendanceCoefficient = attendanceCoefficient;
	}

	public WorkOnWeekendStatus getWorkOnWeekendStatus() {
		return workOnWeekendStatus;
	}

	public void setWorkOnWeekendStatus(WorkOnWeekendStatus workOnWeekendStatus) {
		this.workOnWeekendStatus = workOnWeekendStatus;
	}

	
	
	

}
