package com.logsik.taman.dtos;

import com.logsik.taman.enums.ResourceType;

public class ResourceItemDTO {

	private Long id;
	private String name;
	private Long responsibleUserId;
	private String description;
	private ResourceType resourceType;
	
	
	public Long getId() {
		return id;
	}
	public String getName() {
		return name;
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
