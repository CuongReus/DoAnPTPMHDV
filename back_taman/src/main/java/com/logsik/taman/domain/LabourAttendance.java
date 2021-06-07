package com.logsik.taman.domain;

import java.io.Serializable;
import java.sql.Time;
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


@Entity(name = "labour_attendance")
public class LabourAttendance implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "labour_id",updatable = false,insertable=false)
	private Labour labour;
	
	@Column(name="labour_id")
	private Long labourId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_id",updatable = false,insertable=false)
	private Project project;
	
	@Column(name="project_id")
	private Long projectId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_detail_id",updatable = false,insertable=false)
	private ProjectDetail projectDetail;
	@Column(name="project_detail_id")
	private Long projectDetailId;
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date dateToWork;
	
	@Column
	private Time startDatetime;

	@Column
	private Time endDatetime;

	@Column
	private Float totalDatetime;
	
	@Column
	@Enumerated(EnumType.STRING)
	private SupportFarConstructionStatus supportFarConstructionStatus;
	@Column
	@Enumerated(EnumType.STRING)
	private SupportTransportFeeStatus supportTransportFeeStatus;
	
	@Column
	@Enumerated(EnumType.STRING)
	private PresenceSession session;
	
	@Column
	@Enumerated(EnumType.STRING)
	private OvertimeStatus overtimeStatus;
	
	@Column
	private Time startOvertime;
	
	@Column
	private Time endOvertime;
	
	@Column
	private Float totalOvertime;
	
	
	@Column
	@Enumerated(EnumType.STRING)
	private LateStatus lateStatus;
	
	@Column
	private Time lateHour;
	
	@Column
	private Integer totalLateHour;
	
	@Column
	@Enumerated(EnumType.STRING)
	private AbsentStatus absentStatus;
	 
	@Column
	@Temporal(TemporalType.DATE)
	private Date absentDate;
	
	@Lob
	@Column
	private String absentReason;
 	
	@Column
	@Enumerated(EnumType.STRING)
	private NotOvertimeStatus notOvertimeStatus;
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date notOvertimeDate;
	@Column
	@Enumerated(EnumType.STRING)
	private UniformBreachStatus uniformBreachStatus;
	@Column
	@Temporal(TemporalType.DATE)
	private Date uniformBreachDate;
	@Column
	@Enumerated(EnumType.STRING)
	private SafetyBreachStatus safetyBreachStatus;
	@Column
	@Temporal(TemporalType.DATE)
	private Date safetyBreachDate;
	@Column
	@Enumerated(EnumType.STRING)
	private ConstructionBreachStatus constructionBreachStatus;
	@Column
	@Temporal(TemporalType.DATE)
	private Date constructionBreachDate;
	@Lob
	@Column(columnDefinition="longtext")
	private String note;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "created_user_id", updatable = false, insertable = false)
	private User createdUser;

	@Column(name = "created_user_id")
	private Long createdUserId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "lasted_update_user_id", updatable = false, insertable = false)
	private User lastedUpdateUser;

	@Column(name = "lasted_update_user_id")
	private Long lastedUpdateUserId;
	
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date createdDate;
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date lastedUpdateDate;
	
	@Column
	private boolean isOutTime = false;
	
	@Column(name="minus_lunch_hour")
	private Float minusLunchHour;
	

	public Float getMinusLunchHour() {
		return minusLunchHour;
	}

	public void setMinusLunchHour(Float minusLunchHour) {
		this.minusLunchHour = minusLunchHour;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Labour getLabour() {
		return labour;
	}

	public void setLabour(Labour labour) {
		this.labour = labour;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}
	
	public ProjectDetail getProjectDetail() {
		return projectDetail;
	}

	public void setProjectDetail(ProjectDetail projectDetail) {
		this.projectDetail = projectDetail;
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

	public User getCreatedUser() {
		return createdUser;
	}

	public void setCreatedUser(User createdUser) {
		this.createdUser = createdUser;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public User getLastedUpdateUser() {
		return lastedUpdateUser;
	}

	public void setLastedUpdateUser(User lastedUpdateUser) {
		this.lastedUpdateUser = lastedUpdateUser;
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
	
	

}
