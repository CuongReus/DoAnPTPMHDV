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


@Entity(name = "swot_job")
public class SwotJob implements Serializable {

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
	@JoinColumn(name = "job_id",updatable=false,insertable=false)
	private Job job;
	
	@Column(name= "job_id")
	private Long jobId;
	
	@Lob
	@Column(columnDefinition = "longtext")
	private String description;

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

	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
	}

	public Long getJobId() {
		return jobId;
	}

	public void setJobId(Long jobId) {
		this.jobId = jobId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
}
