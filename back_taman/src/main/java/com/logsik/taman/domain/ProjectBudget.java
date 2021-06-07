package com.logsik.taman.domain;

import java.io.Serializable;
import java.util.Date;

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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity(name = "project_budget")
public class ProjectBudget implements Serializable {
		private static final long serialVersionUID = 1L;
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Access(AccessType.PROPERTY)
		private Long id;
		
		@ManyToOne(fetch = FetchType.LAZY)
		@JoinColumn(name = "project_detail_id", updatable = false,insertable= false)
		private ProjectDetail projectDetail;
		
		@Column(name= "project_detail_id")
		private Long projectDetailId;

		
		@Column
		private Long productBudget;
		
		@Column
		private Long constructionTeamBudget;
		@Column
		private Long labourBudget;
		@Column
		private Long otherBudget;
		
		@Column
		private Long incurredBudget;
		@Column
		private Long totalProjectBudget;
		
		@Lob
		@Column(columnDefinition = "longtext")
		private String note;
		
		@ManyToOne(fetch = FetchType.LAZY)
		@JoinColumn(name = "created_user_id", updatable = false,insertable=false)
		private User createdUser;
		
		@Column(name= "created_user_id")
		private Long createdUserId;

		@ManyToOne(fetch = FetchType.LAZY)
		@JoinColumn(name = "lasted_update_user_id",updatable = false,insertable=false)
		private User lastedUpdateUser;
		
		@Column(name= "lasted_update_user_id")
		private Long lastedUpdateUserId;

		@Column
		@Temporal(TemporalType.DATE)
		private Date createdDate;

		@Column
		@Temporal(TemporalType.DATE)
		private Date lastedUpdateDate;

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public ProjectDetail getProjectDetail() {
			return projectDetail;
		}

		public void setProjectDetail(ProjectDetail projectDetail) {
			this.projectDetail = projectDetail;
		}

		public Long getProductBudget() {
			return productBudget;
		}

		public void setProductBudget(Long productBudget) {
			this.productBudget = productBudget;
		}

		public Long getLabourBudget() {
			return labourBudget;
		}

		public void setLabourBudget(Long labourBudget) {
			this.labourBudget = labourBudget;
		}

		public Long getOtherBudget() {
			return otherBudget;
		}

		public void setOtherBudget(Long otherBudget) {
			this.otherBudget = otherBudget;
		}

		public Long getIncurredBudget() {
			return incurredBudget;
		}

		public void setIncurredBudget(Long incurredBudget) {
			this.incurredBudget = incurredBudget;
		}

		public User getCreatedUser() {
			return createdUser;
		}

		public void setCreatedUser(User createdUser) {
			this.createdUser = createdUser;
		}

		public User getLastedUpdateUser() {
			return lastedUpdateUser;
		}

		public void setLastedUpdateUser(User lastedUpdateUser) {
			this.lastedUpdateUser = lastedUpdateUser;
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

		public String getNote() {
			return note;
		}

		public void setNote(String note) {
			this.note = note;
		}

		public Long getTotalProjectBudget() {
			return totalProjectBudget;
		}

		public void setTotalProjectBudget(Long totalProjectBudget) {
			this.totalProjectBudget = totalProjectBudget;
		}

		public Long getConstructionTeamBudget() {
			return constructionTeamBudget;
		}

		public void setConstructionTeamBudget(Long constructionTeamBudget) {
			this.constructionTeamBudget = constructionTeamBudget;
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
