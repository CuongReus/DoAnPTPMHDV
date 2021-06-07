package com.logsik.taman.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

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

import com.logsik.taman.enums.EnoughLabourContractStatus;

@Entity(name = "labour")
public class Labour implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;

//	@ManyToOne(fetch=FetchType.LAZY)
//	@JoinColumn(name="company_id")
//	private Company company;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "labour_company", joinColumns = @JoinColumn(name = "labour_id"), inverseJoinColumns = @JoinColumn(name = "company_id"))
	private Set<Company> companies;

	@Column
	private String fullName;

	@Column
	private String title;

	@Column
	private Long salaryMidnight;
	@Column
	private Long salaryPerDay;

	@Column
	private Long additionSalary;

	@Column
	@Temporal(TemporalType.DATE)
	private Date birthday;

	@Column
	@Temporal(TemporalType.DATE)
	private Date startWorkDate;

	@Column
	private String phone;

	@Column
	private String contractNumber;

	@Column
	@Temporal(TemporalType.DATE)
	private Date contractSignDate;

	@Column
	@Temporal(TemporalType.DATE)
	private Date contractEndDate;

	@Column
	@Enumerated(EnumType.STRING)
	private EnoughLabourContractStatus enoughLabourContract;

	@Lob
	@Column(columnDefinition = "longtext")
	private String note;

	@Column(name = "identity_card_number")
	private Long identityCardNumber;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "created_user_id", updatable = false, insertable = false)
	private User createdUser;

	@Column(name = "created_user_id")
	private Long createdUserId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "lasted_update_user_id", updatable = false, insertable = false)
	private User lastedUpdateUser;

	@Column(name = "lasted_update_user_id")
	private Long lastedUpdateUserId;

	@Column
	@Temporal(TemporalType.DATE)
	private Date createdDate;

	@Column
	@Temporal(TemporalType.DATE)
	private Date lastedUpdateDate;

	// getter and setter

	public Long getId() {
		return id;
	}

	public Set<Company> getCompanies() {
		return companies;
	}

	public void setCompanies(Set<Company> companies) {
		this.companies = companies;
	}

	public void setId(Long id) {
		this.id = id;
	}

//	public Company getCompany() {
//		return company;
//	}
//
//	public void setCompany(Company company) {
//		this.company = company;
//	}

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

	public Long getIdentityCardNumber() {
		return identityCardNumber;
	}

	public void setIdentityCardNumber(Long identityCardNumber) {
		this.identityCardNumber = identityCardNumber;
	}

	public User getCreatedUser() {
		return createdUser;
	}

	public void setCreatedUser(User createdUser) {
		this.createdUser = createdUser;
	}

	public User getLastedUpdateUser() {
		return lastedUpdateUser;
	}

	public void setLastedUpdateUser(User lastedUpdateUser) {
		this.lastedUpdateUser = lastedUpdateUser;
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
	
}
