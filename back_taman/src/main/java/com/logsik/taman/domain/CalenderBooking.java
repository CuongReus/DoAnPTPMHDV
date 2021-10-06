package com.logsik.taman.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
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

import com.logsik.taman.enums.BookingType;

@Entity(name = "calendar_booking")
public class CalenderBooking implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;

	@Column(columnDefinition = "enum('EVENT','TASK')", name = "booking_type")
	@Enumerated(EnumType.STRING)
	private BookingType bookingType;

	@Column(name = "title")
	private String title;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "responsible_id", updatable = false, insertable = false)
	private User responsible;

	@Column(name = "responsible_id")
	private Long responsibleId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "calender_type_id", updatable = false, insertable = false)
	private CalenderType calenderType;

	@Column(name = "calender_type_id")
	private Long calenderTypeId;

	@Column(name = "start_date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date startDate;

	@Column(name = "end_date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date endDate;

	@Lob
	@Column(columnDefinition = "longtext", name = "description")
	private String description;
	
	@ManyToMany
	@JoinTable(name = "contact_calendar", joinColumns = @JoinColumn(name = "calender_booking_id"), inverseJoinColumns = @JoinColumn(name = "contact_id"))
	private Set<Contact> contacts;
	
	@ManyToMany
	@JoinTable(name = "user_calendar", joinColumns = @JoinColumn(name = "calender_booking_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
	private Set<User> users;
	
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

	public void setResponsible(User responsible) {
		this.responsible = responsible;
	}

	public void setCalenderType(CalenderType calenderType) {
		this.calenderType = calenderType;
	}

	public Long getId() {
		return id;
	}

	public BookingType getBookingType() {
		return bookingType;
	}

	public User getResponsible() {
		return responsible;
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

	public CalenderType getCalenderType() {
		return calenderType;
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

}
