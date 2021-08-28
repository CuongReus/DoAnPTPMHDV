package com.logsik.taman.domain;

import java.io.Serializable;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;


@Entity(name = "swot_user")
public class SwotUser implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "swot_item_id",updatable=false,insertable=false)
	private SwotItem swotItem;
	
	@Column(name= "swot_item_id")
	private Long swotItemId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id",updatable=false,insertable=false)
	private User user;
	
	@Column(name= "user_id")
	private Long userId;
	
	@Column
	private Integer numberOfYears;
	
	@Lob
	@Column(columnDefinition = "longtext")
	private String note;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public SwotItem getSwotItem() {
		return swotItem;
	}

	public void setSwotItem(SwotItem swotItem) {
		this.swotItem = swotItem;
	}

	public Long getSwotItemId() {
		return swotItemId;
	}

	public void setSwotItemId(Long swotItemId) {
		this.swotItemId = swotItemId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Integer getNumberOfYears() {
		return numberOfYears;
	}

	public void setNumberOfYears(Integer numberOfYears) {
		this.numberOfYears = numberOfYears;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	
}
