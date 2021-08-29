package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.logsik.taman.domain.Role;
import com.logsik.taman.enums.Gender;
import com.logsik.taman.enums.UserRole;

public class UserDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private List<UploadFileResponse> imageUpload = new ArrayList<>();
	// private String image;
	private Long companyId;
	private Long jobId;
	private String email;
	private Float annualLeaveYear;
	private Float absentDayPerYear;
	private Float bonusAnnualLeavePerYear;
	private Float annualLeaveNumberRemaining;
	private Long departmentId;
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	private String fullName;
	private String phone;
	private UserRole role;
	private String address;
	private Date birthday;
	private boolean active;
	private List<Role> roles = new ArrayList<>();
	private List<UploadFileResponse> profiles = new ArrayList<>();
	private Gender gender;
	private String currentAddress;
	private Date startWorkDate;
	private String position;
	private String code;
	private String createdUserEmail;
	private String lastedUpdateUserEmail;
	private Long salaryLevel;
	
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public List<UploadFileResponse> getProfiles() {
		return profiles;
	}

	public void setProfiles(List<UploadFileResponse> profiles) {
		this.profiles = profiles;
	}

	public List<UploadFileResponse> getImageUpload() {
		return imageUpload;
	}

	public void setImageUpload(List<UploadFileResponse> imageUpload) {
		this.imageUpload = imageUpload;
	}
	
	public Float getAnnualLeaveYear() {
		return annualLeaveYear;
	}

	public void setAnnualLeaveYear(Float annualLeaveYear) {
		this.annualLeaveYear = annualLeaveYear;
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	public Long getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Long departmentId) {
		this.departmentId = departmentId;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public String getCurrentAddress() {
		return currentAddress;
	}

	public void setCurrentAddress(String currentAddress) {
		this.currentAddress = currentAddress;
	}

	public Date getStartWorkDate() {
		return startWorkDate;
	}

	public void setStartWorkDate(Date startWorkDate) {
		this.startWorkDate = startWorkDate;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getCreatedUserEmail() {
		return createdUserEmail;
	}

	public void setCreatedUserEmail(String createdUserEmail) {
		this.createdUserEmail = createdUserEmail;
	}

	public String getLastedUpdateUserEmail() {
		return lastedUpdateUserEmail;
	}

	public void setLastedUpdateUserEmail(String lastedUpdateUserEmail) {
		this.lastedUpdateUserEmail = lastedUpdateUserEmail;
	}

	public Long getSalaryLevel() {
		return salaryLevel;
	}

	public void setSalaryLevel(Long salaryLevel) {
		this.salaryLevel = salaryLevel;
	}

	public Float getAbsentDayPerYear() {
		return absentDayPerYear;
	}

	public void setAbsentDayPerYear(Float absentDayPerYear) {
		this.absentDayPerYear = absentDayPerYear;
	}

	public Float getBonusAnnualLeavePerYear() {
		return bonusAnnualLeavePerYear;
	}

	public void setBonusAnnualLeavePerYear(Float bonusAnnualLeavePerYear) {
		this.bonusAnnualLeavePerYear = bonusAnnualLeavePerYear;
	}

	public Float getAnnualLeaveNumberRemaining() {
		return annualLeaveNumberRemaining;
	}

	public void setAnnualLeaveNumberRemaining(Float annualLeaveNumberRemaining) {
		this.annualLeaveNumberRemaining = annualLeaveNumberRemaining;
	}

	public Long getJobId() {
		return jobId;
	}

	public void setJobId(Long jobId) {
		this.jobId = jobId;
	}
}
