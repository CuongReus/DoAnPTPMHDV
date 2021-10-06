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

@Entity(name = "user_calendar")
public class UserCalender implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id",updatable=false,insertable=false)
	private User user;
	
	@Column(name= "user_id")
	private Long userId;
	
	@Column(name= "calender_booking_id")
	private Long calenderBookingId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="calender_booking_id",updatable=false,insertable=false)
	private CalenderBooking calenderBooking;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

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

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getCalenderBookingId() {
		return calenderBookingId;
	}

	public void setCalenderBookingId(Long calenderBookingId) {
		this.calenderBookingId = calenderBookingId;
	}
	
	
}