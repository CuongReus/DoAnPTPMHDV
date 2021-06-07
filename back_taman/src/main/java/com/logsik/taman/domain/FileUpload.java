package com.logsik.taman.domain;

import java.io.Serializable;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class FileUpload implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;

	@Column(length = 255)
	private String crmTableName;
	
	@Column
	private String uploadBy;
	
	@Column
	private Long crmLinkId;

	@Column(length = 512)
	private String name;

	@Column(length = 1024)
	private String fileLocation;

	@Column
	private Long size;

	

	public String getUploadBy() {
		return uploadBy;
	}

	public void setUploadBy(String uploadBy) {
		this.uploadBy = uploadBy;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCrmTableName() {
		return crmTableName;
	}

	public void setCrmTableName(String crmTableName) {
		this.crmTableName = crmTableName;
	}

	public Long getCrmLinkId() {
		return crmLinkId;
	}

	public void setCrmLinkId(Long crmLinkId) {
		this.crmLinkId = crmLinkId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFileLocation() {
		return fileLocation;
	}

	public void setFileLocation(String fileLocation) {
		this.fileLocation = fileLocation;
	}

	public Long getSize() {
		return size;
	}

	public void setSize(Long size) {
		this.size = size;
	}

}
