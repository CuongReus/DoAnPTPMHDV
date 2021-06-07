package com.logsik.taman.dtos;

import java.io.Serializable;

import com.logsik.taman.domain.User;

public class LeaveDayManageDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id; // That id is User Id
	private User user;
	private String fullName;
	private Integer leaveDayYear;
	private Long totalLeaveDays;
	private Integer month;
	private Integer year;

	public LeaveDayManageDto(Long id, String fullName, Integer leaveDayYear, Long totalLeaveDays) {
		setId(id);
		setFullName(fullName);
		setLeaveDayYear(leaveDayYear);
		setTotalLeaveDays(totalLeaveDays);
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getLeaveDayYear() {
		return leaveDayYear;
	}

	public void setLeaveDayYear(Integer leaveDayYear) {
		this.leaveDayYear = leaveDayYear;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Long getTotalLeaveDays() {
		return totalLeaveDays;
	}

	public void setTotalLeaveDays(Long totalLeaveDays) {
		this.totalLeaveDays = totalLeaveDays;
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

}
