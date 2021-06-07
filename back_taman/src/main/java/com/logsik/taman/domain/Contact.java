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

import com.logsik.taman.enums.ContactStatus;
import com.logsik.taman.enums.ProjectStatus;

@Entity(name = "contact")
public class Contact implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	@Column(name = "id")
	private Long id;
	@Column
	private String name;
	@Column
	private String taxNumber;
	@Column
	private String address;	
	@Column
	@Enumerated(EnumType.STRING)
	private ContactStatus contactStatus; 	
	@Lob
	@Column(columnDefinition= "longtext")
	private String note;
	@Column
	private Integer discountPercent;
	
	
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
	public String getTaxNumber() {
		return taxNumber;
	}
	public void setTaxNumber(String taxNumber) {
		this.taxNumber = taxNumber;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public ContactStatus getContactStatus() {
		return contactStatus;
	}
	public void setContactStatus(ContactStatus contactStatus) {
		this.contactStatus = contactStatus;
	}
	public Integer getDiscountPercent() {
		return discountPercent;
	}
	public void setDiscountPercent(Integer discountPercent) {
		this.discountPercent = discountPercent;
	}
	
	
	

}
