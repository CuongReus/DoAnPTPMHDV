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
	private String image;
	private Long companyId;
	private String email;
	private Float annualLeaveYear;
	private Float absentDayPerYear;
	private Float bonusAnnualLeavePerYear;
	private Float annualLeaveNumberRemaining;
	private Long departmentId;
	private String labourContract;
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
	
	private Long identityCardNumber;
	private Date issuedDate;
	private String issuedAt;
	private Gender gender;
	private String permanentAddress;
	private String currentAddress;
	private Date startWorkDate;
	private String position;
	private Integer numberOfYear;
	private String jobDescription ;
	private String degree;
	private String trainingPlace;
	private String profession;
	private Integer graduationYear;
	private String foreignLanguageSkill;
	private String level;
	private String familyInformation;
	private String code;
	private String createdUserEmail;
	private String lastedUpdateUserEmail;
	private Long salaryLevel;
	private Long personalDeduction;
	private Long familyCircumstanceDeduction;
	private Long normalOvertimeFee;
	private Long weekendOvertimeFee;
	private Long holidayOvertimeFee;
	private Long insuranceSalary;
	private Long responsibilityAllowance;
	private Integer rank;
	private Long  lunchFee;
	private Long  petrolFee;
	private Long  phoneFee;
	private Long  distanceSupportFee;
	private String  bankAccountNumber;
	private String  bankName;
	
	
	
	

	public String getBankAccountNumber() {
		return bankAccountNumber;
	}

	public void setBankAccountNumber(String bankAccountNumber) {
		this.bankAccountNumber = bankAccountNumber;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

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

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
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

	public String getLabourContract() {
		return labourContract;
	}

	public void setLabourContract(String labourContract) {
		this.labourContract = labourContract;
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

	public Long getIdentityCardNumber() {
		return identityCardNumber;
	}

	public void setIdentityCardNumber(Long identityCardNumber) {
		this.identityCardNumber = identityCardNumber;
	}

	public Date getIssuedDate() {
		return issuedDate;
	}

	public void setIssuedDate(Date issuedDate) {
		this.issuedDate = issuedDate;
	}

	public String getIssuedAt() {
		return issuedAt;
	}

	public void setIssuedAt(String issuedAt) {
		this.issuedAt = issuedAt;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public String getPermanentAddress() {
		return permanentAddress;
	}

	public void setPermanentAddress(String permanentAddress) {
		this.permanentAddress = permanentAddress;
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

	public Integer getNumberOfYear() {
		return numberOfYear;
	}

	public void setNumberOfYear(Integer numberOfYear) {
		this.numberOfYear = numberOfYear;
	}

	public String getJobDescription() {
		return jobDescription;
	}

	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
	}

	public String getDegree() {
		return degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
	}

	public String getTrainingPlace() {
		return trainingPlace;
	}

	public void setTrainingPlace(String trainingPlace) {
		this.trainingPlace = trainingPlace;
	}

	public String getProfession() {
		return profession;
	}

	public void setProfession(String profession) {
		this.profession = profession;
	}

	public Integer getGraduationYear() {
		return graduationYear;
	}

	public void setGraduationYear(Integer graduationYear) {
		this.graduationYear = graduationYear;
	}

	public String getForeignLanguageSkill() {
		return foreignLanguageSkill;
	}

	public void setForeignLanguageSkill(String foreignLanguageSkill) {
		this.foreignLanguageSkill = foreignLanguageSkill;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getFamilyInformation() {
		return familyInformation;
	}

	public void setFamilyInformation(String familyInformation) {
		this.familyInformation = familyInformation;
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

	public Long getPersonalDeduction() {
		return personalDeduction;
	}

	public void setPersonalDeduction(Long personalDeduction) {
		this.personalDeduction = personalDeduction;
	}

	public Long getFamilyCircumstanceDeduction() {
		return familyCircumstanceDeduction;
	}

	public void setFamilyCircumstanceDeduction(Long familyCircumstanceDeduction) {
		this.familyCircumstanceDeduction = familyCircumstanceDeduction;
	}

	public Long getNormalOvertimeFee() {
		return normalOvertimeFee;
	}

	public void setNormalOvertimeFee(Long normalOvertimeFee) {
		this.normalOvertimeFee = normalOvertimeFee;
	}

	public Long getWeekendOvertimeFee() {
		return weekendOvertimeFee;
	}

	public void setWeekendOvertimeFee(Long weekendOvertimeFee) {
		this.weekendOvertimeFee = weekendOvertimeFee;
	}

	public Long getHolidayOvertimeFee() {
		return holidayOvertimeFee;
	}

	public void setHolidayOvertimeFee(Long holidayOvertimeFee) {
		this.holidayOvertimeFee = holidayOvertimeFee;
	}

	public Long getInsuranceSalary() {
		return insuranceSalary;
	}

	public void setInsuranceSalary(Long insuranceSalary) {
		this.insuranceSalary = insuranceSalary;
	}

	public Long getResponsibilityAllowance() {
		return responsibilityAllowance;
	}

	public void setResponsibilityAllowance(Long responsibilityAllowance) {
		this.responsibilityAllowance = responsibilityAllowance;
	}

	public Integer getRank() {
		return rank;
	}

	public void setRank(Integer rank) {
		this.rank = rank;
	}

	public Long getLunchFee() {
		return lunchFee;
	}

	public void setLunchFee(Long lunchFee) {
		this.lunchFee = lunchFee;
	}

	public Long getPetrolFee() {
		return petrolFee;
	}

	public void setPetrolFee(Long petrolFee) {
		this.petrolFee = petrolFee;
	}

	

	public Long getPhoneFee() {
		return phoneFee;
	}

	public void setPhoneFee(Long phoneFee) {
		this.phoneFee = phoneFee;
	}

	public Long getDistanceSupportFee() {
		return distanceSupportFee;
	}

	public void setDistanceSupportFee(Long distanceSupportFee) {
		this.distanceSupportFee = distanceSupportFee;
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
	
	
	
	
}
