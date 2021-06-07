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

package com.logsik.taman.dtos;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;

import com.logsik.taman.enums.LeaveLetterStatus;
import com.logsik.taman.enums.TypeOfLeave;

public class LeaveLetterDto implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private Long userId;
	private Date startLeaveDate;
	private Date endLeaveDate;
	private Float totalLeaveDays;
	private Float leaveDays;
	private Integer month;
	private Integer year;
	private Float holiday;
	private LeaveLetterStatus status;
	private Date startWorkDate;
	private Long approvedById;
	private String note;
	private TypeOfLeave leaveType;
	private String workPlace;
	private Integer overtimeLeaveDay;
	private Date createdDate;
	private String reason;
	private Float lastTotalAbsentDay;
	private Float lastTotalBonusLeaveDay;
	private Float lastTotalAnnualLeave;
	private String holidayAndWeekendDay;
	private Float lastTotalAnnualLeaveRemaining;

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

	public Date getStartWorkDate() {
		return startWorkDate;
	}

	public void setStartWorkDate(Date startWorkDate) {
		this.startWorkDate = startWorkDate;
	}

	public Long getApprovedById() {
		return approvedById;
	}

	public void setApprovedById(Long approvedById) {
		this.approvedById = approvedById;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
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

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public Float getTotalLeaveDays() {
		return totalLeaveDays;
	}

	public void setTotalLeaveDays(Float totalLeaveDays) {
		this.totalLeaveDays = totalLeaveDays;
	}

	public Float getLeaveDays() {
		return leaveDays;
	}

	public void setLeaveDays(Float leaveDays) {
		this.leaveDays = leaveDays;
	}

	public Float getHoliday() {
		return holiday;
	}

	public void setHoliday(Float holiday) {
		this.holiday = holiday;
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
