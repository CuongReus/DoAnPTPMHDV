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
import javax.persistence.ManyToOne;

@Entity(name = "contact_calendar")
public class ContactCalender implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;
	
	@Column(name= "contact_id")
	private Long contactId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "contact_id",updatable = false,insertable=false)
	private Contact contact;
	
	@Column(name= "calender_booking_id")
	private Long calenderBookingId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="calender_booking_id",updatable=false,insertable=false)
	private CalenderBooking calenderBooking;
	
	public CalenderBooking getCalenderBooking() {
		return calenderBooking;
	}

	public void setCalenderBooking(CalenderBooking calenderBooking) {
		this.calenderBooking = calenderBooking;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getContactId() {
		return contactId;
	}

	public void setContactId(Long contactId) {
		this.contactId = contactId;
	}

	public Contact getContact() {
		return contact;
	}

	public void setContact(Contact contact) {
		this.contact = contact;
	}

	public Long getCalenderBookingId() {
		return calenderBookingId;
	}

	public void setCalenderBookingId(Long calenderBookingId) {
		this.calenderBookingId = calenderBookingId;
	}
	
}