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

import com.logsik.taman.enums.SupplierType;

@Entity(name = "supplier")
public class Supplier implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;
	@Column
	private String name;
	@Column
	private String productProvideName;
	@Column
	private String address;
	@Column
	private String email;
	@Column
	private String phoneNumber;
	@Column
	private String bankAccountNumber;
	@Lob
	@Column(columnDefinition = "longtext")
	private String note;
	
	@Column
	@Enumerated(EnumType.STRING)
	private SupplierType type;
	

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

	public String getProductProvideName() {
		return productProvideName;
	}

	public void setProductProvideName(String productProvideName) {
		this.productProvideName = productProvideName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getBankAccountNumber() {
		return bankAccountNumber;
	}

	public void setBankAccountNumber(String bankAccountNumber) {
		this.bankAccountNumber = bankAccountNumber;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public SupplierType getType() {
		return type;
	}

	public void setType(SupplierType type) {
		this.type = type;
	}
	

}
