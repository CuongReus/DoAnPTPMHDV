package com.logsik.taman.dtos;

import java.io.Serializable;
import java.sql.Time;
import java.util.Date;

import com.logsik.taman.enums.AbsentStatus;
import com.logsik.taman.enums.ConstructionBreachStatus;
import com.logsik.taman.enums.LateStatus;
import com.logsik.taman.enums.NotOvertimeStatus;
import com.logsik.taman.enums.OvertimeStatus;
import com.logsik.taman.enums.PresenceSession;
import com.logsik.taman.enums.SafetyBreachStatus;
import com.logsik.taman.enums.SupportFarConstructionStatus;
import com.logsik.taman.enums.SupportTransportFeeStatus;
import com.logsik.taman.enums.UniformBreachStatus;

public class LabourAttendanceDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;

	private Long labourId;

	private Long projectId;
	private Long projectDetailId;

	private Date dateToWork;
	private Time startDatetime;
	private Time endDatetime;
	private Float totalDatetime;
	private SupportFarConstructionStatus supportFarConstructionStatus;
	private SupportTransportFeeStatus supportTransportFeeStatus;
	private PresenceSession session;
	private OvertimeStatus overtimeStatus;
	private Time startOvertime;
	private Time endOvertime;
	private Float totalOvertime;
	private LateStatus lateStatus;
	private Time lateHour;
	private Integer totalLateHour;
	private AbsentStatus absentStatus;
	private Date absentDate;
	private String absentReason;
	private NotOvertimeStatus notOvertimeStatus;
	private Date notOvertimeDate;
	private UniformBreachStatus uniformBreachStatus;
	private Date uniformBreachDate;
	private SafetyBreachStatus safetyBreachStatus;
	private Date safetyBreachDate;
	private ConstructionBreachStatus constructionBreachStatus;
	private Date constructionBreachDate;
	private String note;
	private Long createdUserId;
	private Long lastedUpdateUserId;
	private Date createdDate;
	private Date lastedUpdateDate;
	private boolean isOutTime = false;
	private Float minusLunchHour;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getLabourId() {
		return labourId;
	}

	public void setLabourId(Long labourId) {
		this.labourId = labourId;
	}

	public Long getProjectId() {
		return projectId;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}

	public Long getProjectDetailId() {
		return projectDetailId;
	}

	public void setProjectDetailId(Long projectDetailId) {
		this.projectDetailId = projectDetailId;
	}

	public Date getDateToWork() {
		return dateToWork;
	}

	public void setDateToWork(Date dateToWork) {
		this.dateToWork = dateToWork;
	}

	public Time getStartDatetime() {
		return startDatetime;
	}

	public void setStartDatetime(Time startDatetime) {
		this.startDatetime = startDatetime;
	}

	public Time getEndDatetime() {
		return endDatetime;
	}

	public void setEndDatetime(Time endDatetime) {
		this.endDatetime = endDatetime;
	}

	public Float getTotalDatetime() {
		return totalDatetime;
	}

	public void setTotalDatetime(Float totalDatetime) {
		this.totalDatetime = totalDatetime;
	}

	public SupportFarConstructionStatus getSupportFarConstructionStatus() {
		return supportFarConstructionStatus;
	}

	public void setSupportFarConstructionStatus(SupportFarConstructionStatus supportFarConstructionStatus) {
		this.supportFarConstructionStatus = supportFarConstructionStatus;
	}

	public SupportTransportFeeStatus getSupportTransportFeeStatus() {
		return supportTransportFeeStatus;
	}

	public void setSupportTransportFeeStatus(SupportTransportFeeStatus supportTransportFeeStatus) {
		this.supportTransportFeeStatus = supportTransportFeeStatus;
	}

	public PresenceSession getSession() {
		return session;
	}

	public void setSession(PresenceSession session) {
		this.session = session;
	}

	public OvertimeStatus getOvertimeStatus() {
		return overtimeStatus;
	}

	public void setOvertimeStatus(OvertimeStatus overtimeStatus) {
		this.overtimeStatus = overtimeStatus;
	}

	public Time getStartOvertime() {
		return startOvertime;
	}

	public void setStartOvertime(Time startOvertime) {
		this.startOvertime = startOvertime;
	}

	public Time getEndOvertime() {
		return endOvertime;
	}

	public void setEndOvertime(Time endOvertime) {
		this.endOvertime = endOvertime;
	}

	public Float getTotalOvertime() {
		return totalOvertime;
	}

	public void setTotalOvertime(Float totalOvertime) {
		this.totalOvertime = totalOvertime;
	}

	public LateStatus getLateStatus() {
		return lateStatus;
	}

	public void setLateStatus(LateStatus lateStatus) {
		this.lateStatus = lateStatus;
	}

	public Time getLateHour() {
		return lateHour;
	}

	public void setLateHour(Time lateHour) {
		this.lateHour = lateHour;
	}

	public Integer getTotalLateHour() {
		return totalLateHour;
	}

	public void setTotalLateHour(Integer totalLateHour) {
		this.totalLateHour = totalLateHour;
	}

	public AbsentStatus getAbsentStatus() {
		return absentStatus;
	}

	public void setAbsentStatus(AbsentStatus absentStatus) {
		this.absentStatus = absentStatus;
	}

	public Date getAbsentDate() {
		return absentDate;
	}

	public void setAbsentDate(Date absentDate) {
		this.absentDate = absentDate;
	}

	public String getAbsentReason() {
		return absentReason;
	}

	public void setAbsentReason(String absentReason) {
		this.absentReason = absentReason;
	}

	public NotOvertimeStatus getNotOvertimeStatus() {
		return notOvertimeStatus;
	}

	public void setNotOvertimeStatus(NotOvertimeStatus notOvertimeStatus) {
		this.notOvertimeStatus = notOvertimeStatus;
	}

	public Date getNotOvertimeDate() {
		return notOvertimeDate;
	}

	public void setNotOvertimeDate(Date notOvertimeDate) {
		this.notOvertimeDate = notOvertimeDate;
	}

	public UniformBreachStatus getUniformBreachStatus() {
		return uniformBreachStatus;
	}

	public void setUniformBreachStatus(UniformBreachStatus uniformBreachStatus) {
		this.uniformBreachStatus = uniformBreachStatus;
	}

	public Date getUniformBreachDate() {
		return uniformBreachDate;
	}

	public void setUniformBreachDate(Date uniformBreachDate) {
		this.uniformBreachDate = uniformBreachDate;
	}

	public SafetyBreachStatus getSafetyBreachStatus() {
		return safetyBreachStatus;
	}

	public void setSafetyBreachStatus(SafetyBreachStatus safetyBreachStatus) {
		this.safetyBreachStatus = safetyBreachStatus;
	}

	public Date getSafetyBreachDate() {
		return safetyBreachDate;
	}

	public void setSafetyBreachDate(Date safetyBreachDate) {
		this.safetyBreachDate = safetyBreachDate;
	}

	public ConstructionBreachStatus getConstructionBreachStatus() {
		return constructionBreachStatus;
	}

	public void setConstructionBreachStatus(ConstructionBreachStatus constructionBreachStatus) {
		this.constructionBreachStatus = constructionBreachStatus;
	}

	public Date getConstructionBreachDate() {
		return constructionBreachDate;
	}

	public void setConstructionBreachDate(Date constructionBreachDate) {
		this.constructionBreachDate = constructionBreachDate;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Long getCreatedUserId() {
		return createdUserId;
	}

	public void setCreatedUserId(Long createdUserId) {
		this.createdUserId = createdUserId;
	}

	public Long getLastedUpdateUserId() {
		return lastedUpdateUserId;
	}

	public void setLastedUpdateUserId(Long lastedUpdateUserId) {
		this.lastedUpdateUserId = lastedUpdateUserId;
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

	public boolean isOutTime() {
		return isOutTime;
	}

	public void setOutTime(boolean isOutTime) {
		this.isOutTime = isOutTime;
	}

	public Float getMinusLunchHour() {
		return minusLunchHour;
	}

	public void setMinusLunchHour(Float minusLunchHour) {
		this.minusLunchHour = minusLunchHour;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
