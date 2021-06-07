package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.logsik.taman.domain.Company;
import com.logsik.taman.enums.EnoughLabourContractStatus;

public class LabourDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String fullName;
	private String title;
	private Long salaryPerDay;
	private Long salaryMidnight;
	private Long additionSalary;
	private Date birthday;
	private Date startWorkDate;
	private String phone;
	private String contractNumber;
	private Date contractSignDate;
	private Date contractEndDate;
	private Long createdUserId;
	private Long lastedUpdateUserId;
	private Date createdDate;
	private Date lastedUpdateDate;
	private EnoughLabourContractStatus enoughLabourContract;
	private String note;
	private List<Company> companies = new ArrayList<>();
	private List<UploadFileResponse> labourContractFile = new ArrayList<>();
	private Long identityCardNumber;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<Company> getCompanies() {
		return companies;
	}

	public void setCompanies(List<Company> companies) {
		this.companies = companies;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Long getSalaryPerDay() {
		return salaryPerDay;
	}

	public void setSalaryPerDay(Long salaryPerDay) {
		this.salaryPerDay = salaryPerDay;
	}

	public Long getAdditionSalary() {
		return additionSalary;
	}

	public void setAdditionSalary(Long additionSalary) {
		this.additionSalary = additionSalary;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public Date getStartWorkDate() {
		return startWorkDate;
	}

	public void setStartWorkDate(Date startWorkDate) {
		this.startWorkDate = startWorkDate;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getContractNumber() {
		return contractNumber;
	}

	public void setContractNumber(String contractNumber) {
		this.contractNumber = contractNumber;
	}

	public Date getContractSignDate() {
		return contractSignDate;
	}

	public void setContractSignDate(Date contractSignDate) {
		this.contractSignDate = contractSignDate;
	}

	public Date getContractEndDate() {
		return contractEndDate;
	}

	public void setContractEndDate(Date contractEndDate) {
		this.contractEndDate = contractEndDate;
	}

	public EnoughLabourContractStatus getEnoughLabourContract() {
		return enoughLabourContract;
	}

	public void setEnoughLabourContract(EnoughLabourContractStatus enoughLabourContract) {
		this.enoughLabourContract = enoughLabourContract;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public List<UploadFileResponse> getLabourContractFile() {
		return labourContractFile;
	}

	public void setLabourContractFile(List<UploadFileResponse> labourContractFile) {
		this.labourContractFile = labourContractFile;
	}

	public Long getIdentityCardNumber() {
		return identityCardNumber;
	}

	public void setIdentityCardNumber(Long identityCardNumber) {
		this.identityCardNumber = identityCardNumber;
	}

	public Long getCreatedUserId() {
		return createdUserId;
	}

	public void setCreatedUserId(Long createdUserId) {
		this.createdUserId = createdUserId;
	}

	public Long getLastedUpdateUserId() {
		return lastedUpdateUserId;
	}

	public void setLastedUpdateUserId(Long lastedUpdateUserId) {
		this.lastedUpdateUserId = lastedUpdateUserId;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getLastedUpdateDate() {
		return lastedUpdateDate;
	}

	public void setLastedUpdateDate(Date lastedUpdateDate) {
		this.lastedUpdateDate = lastedUpdateDate;
	}

	public Long getSalaryMidnight() {
		return salaryMidnight;
	}

	public void setSalaryMidnight(Long salaryMidnight) {
		this.salaryMidnight = salaryMidnight;
	}
	

}
