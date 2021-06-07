package com.logsik.taman.domain;

import java.io.Serializable;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

import com.logsik.taman.enums.WorkOnWeekendStatus;

@Entity(name = "department")
public class Department implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;

	@Column(length = 255)
	private String name;
	
	@Column
	private String code;

	@Column
	private Float attendanceCoefficient;
	@Column
	@Enumerated(EnumType.STRING)
	private WorkOnWeekendStatus workOnWeekendStatus;
	@Lob
	@Column(columnDefinition = "longtext")
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
