package com.logsik.taman.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

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
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.logsik.taman.enums.Gender;
import com.logsik.taman.enums.UserRole;

@Entity(name = "user_table")
public class User implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "company_id",updatable=false,insertable=false)
	private Company company;
	
	@Column(name="company_id")
	private Long companyId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "job_id",updatable=false,insertable=false)
	private Job job;
	
	@Column(name="job_id")
	private Long jobId;

	@Column
	private String email;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Column
	private String password;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private UserRole role;

	@Column(length = 255)
	private String fullName;

	@Column
	@Temporal(TemporalType.DATE)
	private Date birthday;

	@Column(length = 255)
	private String phone;

	@Column(length = 1024)
	private String address;

	@ManyToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="department_id",updatable=false,insertable=false)
	private Department department;
	
	@Column(name="department_id")
	private Long departmentId;

	@Column
	private Float annualLeaveYear;
	@Column
	private Float absentDayPerYear;
	@Column 
	private Float bonusAnnualLeavePerYear;
	
	@Column
	private Float annualLeaveNumberRemaining;

	@Column
	private boolean isLock = false;

	@Column
	private boolean isActive = false;

	@Column(length = 100)
	private String rememberToken;

	@ManyToMany
	@JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private List<Role> roles;

	@Column(name = "gender")
	@Enumerated(EnumType.STRING)
	private Gender gender;

	@Lob
	@Column(name = "current_address", columnDefinition = "longtext")
	private String currentAddress;

	@Column(name = "start_work_date")
	private Date startWorkDate;

	@Column(name = "position")
	private String position;

	@Column(name = "code")
	private String code;
	@Column
	private String createdUserEmail;

	@Column
	private String lastedUpdateUserEmail;

	@Column
	private Long salaryLevel;

	public Long getId() {
		return id;
	}

	@Deprecated
	public void setId(Long id) {
		this.id = id;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
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

	public UserRole getRole() {
		return role;
	}

	public void setRole(UserRole role) {
		this.role = role;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Float getAnnualLeaveYear() {
		return annualLeaveYear;
	}

	public void setAnnualLeaveYear(Float annualLeaveYear) {
		this.annualLeaveYear = annualLeaveYear;
	}

	public boolean isLock() {
		return isLock;
	}

	public void setLock(boolean isLock) {
		this.isLock = isLock;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public String getRememberToken() {
		return rememberToken;
	}

	public void setRememberToken(String rememberToken) {
		this.rememberToken = rememberToken;
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

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
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

	public void setDepartment(Department department) {
		this.department = department;
	}

	public Department getDepartment() {
		return department;
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

	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
	}

	public Long getJobId() {
		return jobId;
	}

	public void setJobId(Long jobId) {
		this.jobId = jobId;
	}
	
	
}
