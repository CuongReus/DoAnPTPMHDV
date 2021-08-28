package com.logsik.taman.dtos;

import java.io.Serializable;

import com.logsik.taman.enums.SwotType;

public class SwotUserDto implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private Long swotItemId;
	private Long userId;
	private Integer numberOfYears;
	private String note;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getSwotItemId() {
		return swotItemId;
	}
	public void setSwotItemId(Long swotItemId) {
		this.swotItemId = swotItemId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Integer getNumberOfYears() {
		return numberOfYears;
	}
	public void setNumberOfYears(Integer numberOfYears) {
		this.numberOfYears = numberOfYears;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	
}
