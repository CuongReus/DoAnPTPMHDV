package com.logsik.taman.dtos;

import java.util.Date;
import java.util.Set;

import com.logsik.taman.domain.Contact;
import com.logsik.taman.domain.User;
import com.logsik.taman.enums.BookingType;

public class CalenderBookingDTO {

	private Long id;
	private BookingType bookingType;
	private Long responsibleId;
	private Date startDate;
	private Date endDate;
	private String description;
	private Long calenderTypeId;
	private String title;
	private Set<User> users = null;
	private Set<Contact> contacts = null;
	
	public Long getId() {
		return id;
	}
	public BookingType getBookingType() {
		return bookingType;
	}
	public Long getResponsibleId() {
		return responsibleId;
	}
	public Date getStartDate() {
		return startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public String getDescription() {
		return description;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setBookingType(BookingType bookingType) {
		this.bookingType = bookingType;
	}
	public void setResponsibleId(Long responsibleId) {
		this.responsibleId = responsibleId;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Long getCalenderTypeId() {
		return calenderTypeId;
	}
	public void setCalenderTypeId(Long calenderTypeId) {
		this.calenderTypeId = calenderTypeId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Set<User> getUsers() {
		return users;
	}
	public void setUsers(Set<User> users) {
		this.users = users;
	}
	public Set<Contact> getContacts() {
		return contacts;
	}
	public void setContacts(Set<Contact> contacts) {
		this.contacts = contacts;
	}

}
