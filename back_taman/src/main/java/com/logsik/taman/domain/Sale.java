package com.logsik.taman.domain;

import java.io.Serializable;
import java.util.Date;

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
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.logsik.taman.enums.ApprovalStatus;
import com.logsik.taman.enums.PaymentStatus;

@Entity(name= "sale")
public class Sale implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "contact_id", updatable=false, insertable=false)
	private Contact contact;
	
	@Column(name="contact_id")
	private Long contactId;	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "created_user_id", updatable = false,insertable=false)
	private User createdUser;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="supplier_id",updatable =false,insertable = false)
	private Supplier supplier;
	
	@Column(name="supplier_id")
	private Long supplierId;	
	
	@Column(name="created_user_id")
	private Long createdUserId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "lasted_update_user_id",updatable = false,insertable=false)
	private User lastedUpdateUser;
	
	@Column(name="lasted_update_user_id")
	private Long lastedUpdateUserId;
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date purchasedDate;
	
	@Lob
	@Column(columnDefinition = "longtext")
	private String content;
	
	@Column(name="paymentStatus")
	@Enumerated(EnumType.STRING)
	private PaymentStatus paymentStatus;
	
	@Column(name="approvalStatus")
	@Enumerated(EnumType.STRING)
	private ApprovalStatus approvalStatus;
	
	@Column
	private Long totalMoney;
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date createdDate;
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date lastedUpdateDate;
	
	@Column
	private String orderCode;
	
	@Column(name="delivery_address")
	private String deliveryAddress;
	
	@Column(name="export_warehouse")
	private String exportWarehouse;
	
	@Column
	private Integer discountPercent;
	
	@Column
	private Long actualMoney;
	
	@Lob
	@Column(columnDefinition = "longtext")
	private String note;
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date paymentDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Contact getContact() {
		return contact;
	}

	public void setContact(Contact contact) {
		this.contact = contact;
	}

	public Long getContactId() {
		return contactId;
	}

	public void setContactId(Long contactId) {
		this.contactId = contactId;
	}

	public User getCreatedUser() {
		return createdUser;
	}

	public void setCreatedUser(User createdUser) {
		this.createdUser = createdUser;
	}

	public Long getCreatedUserId() {
		return createdUserId;
	}

	public void setCreatedUserId(Long createdUserId) {
		this.createdUserId = createdUserId;
	}

	public User getLastedUpdateUser() {
		return lastedUpdateUser;
	}

	public void setLastedUpdateUser(User lastedUpdateUser) {
		this.lastedUpdateUser = lastedUpdateUser;
	}

	public Long getLastedUpdateUserId() {
		return lastedUpdateUserId;
	}

	public void setLastedUpdateUserId(Long lastedUpdateUserId) {
		this.lastedUpdateUserId = lastedUpdateUserId;
	}

	public Date getPurchasedDate() {
		return purchasedDate;
	}

	public void setPurchasedDate(Date purchasedDate) {
		this.purchasedDate = purchasedDate;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public PaymentStatus getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(PaymentStatus paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public ApprovalStatus getApprovalStatus() {
		return approvalStatus;
	}

	public void setApprovalStatus(ApprovalStatus approvalStatus) {
		this.approvalStatus = approvalStatus;
	}

	public Long getTotalMoney() {
		return totalMoney;
	}

	public void setTotalMoney(Long totalMoney) {
		this.totalMoney = totalMoney;
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

	public String getOrderCode() {
		return orderCode;
	}

	public void setOrderCode(String orderCode) {
		this.orderCode = orderCode;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	public String getExportWarehouse() {
		return exportWarehouse;
	}

	public void setExportWarehouse(String exportWarehouse) {
		this.exportWarehouse = exportWarehouse;
	}

	public Long getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(Long supplierId) {
		this.supplierId = supplierId;
	}

	public Supplier getSupplier() {
		return supplier;
	}

	public Date getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}

	public Integer getDiscountPercent() {
		return discountPercent;
	}

	public void setDiscountPercent(Integer discountPercent) {
		this.discountPercent = discountPercent;
	}

	public Long getActualMoney() {
		return actualMoney;
	}

	public void setActualMoney(Long actualMoney) {
		this.actualMoney = actualMoney;
	}
	
	
	
	
	
}
