package com.logsik.taman.dtos;

import java.util.Date;

import javax.persistence.Column;

import com.logsik.taman.enums.UserRole;

public class UserLeaveDayDto {

	private Long userId;
	private Long leaveLetterId;
	// private String image;
	private String companyName;
	private String email;
	// private String labourContract;
	private Date startDateToWork;
	private Float lastTotalAnnualLeave;
	private String fullName;
	private String phone;
	private UserRole role;
	private String address;
	private Date birthday;
	private boolean active;
	private Double totalLeaveDays;
	
	

	public UserLeaveDayDto(Long userId, String fullName,String companyName, String email, Date startDateToWork,Float lastTotalAnnualLeave,  String phone) {
		setUserId(userId);
		// setImage(image);
		setFullName(fullName);
		setCompanyName(companyName);
		setEmail(email);
		// setLabourContract(labourContract);
		setStartDateToWork(startDateToWork);
		setLastTotalAnnualLeave(lastTotalAnnualLeave);
		setPhone(phone);
	}
	
	public UserLeaveDayDto(Long userId, String fullName,String companyName, String email,Long leaveLetterId, Date startDateToWork,Float lastTotalAnnualLeave,  String phone) {
		setUserId(userId);
		// setImage(image);
		setFullName(fullName);
		setCompanyName(companyName);
		setEmail(email);
		// setLabourContract(labourContract);
		setLeaveLetterId(leaveLetterId);
		setStartDateToWork(startDateToWork);
		setLastTotalAnnualLeave(lastTotalAnnualLeave);
		setPhone(phone);
	}

	
	// public String getLabourContract() {
	// 	return labourContract;
	// }


	// public void setLabourContract(String labourContract) {
	// 	this.labourContract = labourContract;
	// }


	

	public Long getUserId() {
		return userId;
	}


	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}


	public Date getStartDateToWork() {
		return startDateToWork;
	}


	public void setStartDateToWork(Date startDateToWork) {
		this.startDateToWork = startDateToWork;
	}


	public Float getLastTotalAnnualLeave() {
		return lastTotalAnnualLeave;
	}


	public void setLastTotalAnnualLeave(Float lastTotalAnnualLeave) {
		this.lastTotalAnnualLeave = lastTotalAnnualLeave;
	}


	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public UserRole getRole() {
		return role;
	}

	public void setRole(UserRole role) {
		this.role = role;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	


	public Double getTotalLeaveDays() {
		return totalLeaveDays;
	}


	public void setTotalLeaveDays(Double totalLeaveDays) {
		this.totalLeaveDays = totalLeaveDays;
	}


	public String getCompanyName() {
		return companyName;
	}


	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public Long getLeaveLetterId() {
		return leaveLetterId;
	}

	public void setLeaveLetterId(Long leaveLetterId) {
		this.leaveLetterId = leaveLetterId;
	}
	
	
	

}
