package com.logsik.taman.domain;

import java.io.Serializable;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

import com.logsik.taman.enums.SwotType;

@Entity(name = "swot_item")
public class SwotItem implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;

	@Column(length = 255)
	private String title;

	@Column
	@Enumerated(EnumType.STRING)
	private SwotType swotType;
	@Lob
	@Column(columnDefinition = "longtext")
	private String description;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}


	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public SwotType getSwotType() {
		return swotType;
	}

	public void setSwotType(SwotType swotType) {
		this.swotType = swotType;
	}

	
	
	

}
