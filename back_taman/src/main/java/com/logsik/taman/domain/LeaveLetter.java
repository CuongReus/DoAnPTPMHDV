/*
 * Copyright 2012-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

import com.logsik.taman.enums.LeaveLetterStatus;
import com.logsik.taman.enums.TypeOfLeave;

@Entity(name = "leave_letter")
public class LeaveLetter implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id",updatable = false, insertable = false)
	private User user;
	
	@Column(name="user_id")
	private Long userId;

	@Column
	@Temporal(TemporalType.DATE)
	private Date startLeaveDate;

	@Column
	@Temporal(TemporalType.DATE)
	private Date endLeaveDate;

	@Column
	private Float totalLeaveDays;

	@Column
	private Float leaveDays;
	
	@Column
	private Float lastTotalAbsentDay;
	
	@Column
	private Float lastTotalBonusLeaveDay;
	
	@Column
	private Float lastTotalAnnualLeave;
	
	@Column
	private Float lastTotalAnnualLeaveRemaining;
	
	
	@Column
	private Integer month;

	@Column
	private Integer year;
	
	@Column
	private Float holiday;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private LeaveLetterStatus status;

	@Column
	@Temporal(TemporalType.DATE)
	private Date startWorkDate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "approved_by",updatable = false, insertable = false)
	private User approvedBy;
	
	@Column(name="approved_by")
	private Long approvedById;

	@Lob
	@Column(columnDefinition = "longtext")
	private String note;
	
	// update: 03/07/2019
	
	@Column(name = "leave_type")
	@Enumerated(EnumType.STRING)
	private TypeOfLeave leaveType;
	
	@Column(name="work_place")
	private String workPlace;
	
	@Column(name="overtime_leave_day")
	private Integer overtimeLeaveDay;
	
	@Column(name="created_date")
	private Date createdDate;
	
	@Column(name="reason",columnDefinition = "longtext")
	private String reason;
	
	// getter-setter
	
	@Column(name="holiday_and_weekend_day")
	private String holidayAndWeekendDay;
	
	
	public Date getCreatedDate() {
		return createdDate;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public TypeOfLeave getLeaveType() {
		return leaveType;
	}

	public void setLeaveType(TypeOfLeave leaveType) {
		this.leaveType = leaveType;
	}

	public String getWorkPlace() {
		return workPlace;
	}

	public void setWorkPlace(String workPlace) {
		this.workPlace = workPlace;
	}

	public Integer getOvertimeLeaveDay() {
		return overtimeLeaveDay;
	}

	public void setOvertimeLeaveDay(Integer overtimeLeaveDay) {
		this.overtimeLeaveDay = overtimeLeaveDay;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Date getStartLeaveDate() {
		return startLeaveDate;
	}

	public void setStartLeaveDate(Date startLeaveDate) {
		this.startLeaveDate = startLeaveDate;
	}

	public Date getEndLeaveDate() {
		return endLeaveDate;
	}

	public void setEndLeaveDate(Date endLeaveDate) {
		this.endLeaveDate = endLeaveDate;
	}

	

	public Float getTotalLeaveDays() {
		return totalLeaveDays;
	}

	public void setTotalLeaveDays(Float totalLeaveDays) {
		this.totalLeaveDays = totalLeaveDays;
	}

	public Float getHoliday() {
		return holiday;
	}

	public void setHoliday(Float holiday) {
		this.holiday = holiday;
	}

	public void setLeaveDays(Float leaveDays) {
		this.leaveDays = leaveDays;
	}

	public Date getStartWorkDate() {
		return startWorkDate;
	}

	public void setStartWorkDate(Date startWorkDate) {
		this.startWorkDate = startWorkDate;
	}

	public User getApprovedBy() {
		return approvedBy;
	}

	public void setApprovedBy(User approvedBy) {
		this.approvedBy = approvedBy;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	

	public Float getLeaveDays() {
		return leaveDays;
	}

	public Integer getMonth() {
		return month;
	}

	public void setMonth(Integer month) {
		this.month = month;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public LeaveLetterStatus getStatus() {
		return status;
	}

	public void setStatus(LeaveLetterStatus status) {
		this.status = status;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getApprovedById() {
		return approvedById;
	}

	public void setApprovedById(Long approvedById) {
		this.approvedById = approvedById;
	}

	public Float getLastTotalAbsentDay() {
		return lastTotalAbsentDay;
	}

	public void setLastTotalAbsentDay(Float lastTotalAbsentDay) {
		this.lastTotalAbsentDay = lastTotalAbsentDay;
	}

	public Float getLastTotalBonusLeaveDay() {
		return lastTotalBonusLeaveDay;
	}

	public void setLastTotalBonusLeaveDay(Float lastTotalBonusLeaveDay) {
		this.lastTotalBonusLeaveDay = lastTotalBonusLeaveDay;
	}

	public Float getLastTotalAnnualLeave() {
		return lastTotalAnnualLeave;
	}

	public void setLastTotalAnnualLeave(Float lastTotalAnnualLeave) {
		this.lastTotalAnnualLeave = lastTotalAnnualLeave;
	}

	public String getHolidayAndWeekendDay() {
		return holidayAndWeekendDay;
	}

	public void setHolidayAndWeekendDay(String holidayAndWeekendDay) {
		this.holidayAndWeekendDay = holidayAndWeekendDay;
	}

	public Float getLastTotalAnnualLeaveRemaining() {
		return lastTotalAnnualLeaveRemaining;
	}

	public void setLastTotalAnnualLeaveRemaining(Float lastTotalAnnualLeaveRemaining) {
		this.lastTotalAnnualLeaveRemaining = lastTotalAnnualLeaveRemaining;
	}
	

	

}
