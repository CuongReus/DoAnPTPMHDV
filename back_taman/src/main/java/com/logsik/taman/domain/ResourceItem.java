package com.logsik.taman.domain;

import java.io.Serializable;

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

import com.logsik.taman.enums.ResourceType;

@Entity(name = "resource_item")
public class ResourceItem implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;
	
	@Column
	private String name;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "responsible_user_id", updatable = false,insertable= false)
	private User responsibleUser;
	
	@Column(name= "responsible_user_id")
	private Long responsibleUserId;

	@Lob
	@Column(columnDefinition = "longtext")
	private String description;
	
	@Column(columnDefinition = "enum('DEVICE', 'ROOM', 'OTHER')",name = "resource_type")
	@Enumerated(EnumType.STRING)
	private ResourceType resourceType;

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public User getResponsibleUser() {
		return responsibleUser;
	}

	public Long getResponsibleUserId() {
		return responsibleUserId;
	}

	public String getDescription() {
		return description;
	}

	public ResourceType getResourceType() {
		return resourceType;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setResponsibleUserId(Long responsibleUserId) {
		this.responsibleUserId = responsibleUserId;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setResourceType(ResourceType resourceType) {
		this.resourceType = resourceType;
	}

}
