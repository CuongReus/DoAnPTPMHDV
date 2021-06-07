package com.logsik.taman.dtos;

import java.util.List;

import com.logsik.taman.domain.ProjectBudget;
import com.logsik.taman.domain.ProjectCost;

public class ProjectPaymentDto {
	private ProjectDetailProgressDto projectDetailProgressDto;
	private ProjectBudget projectBudget;
	private List<ProjectCost> listProductCost;
	private List<ProjectCost> listLabourCost;
	private List<ProjectCost> listOtherCost;
	private List<ProjectCost> listConstructionTeamCost;

	
	public ProjectPaymentDto() {
		super();
	}
	
	
	
	



	public ProjectPaymentDto(ProjectDetailProgressDto projectDetailProgressDto, ProjectBudget projectBudget,
			List<ProjectCost> listProductCost, List<ProjectCost> listLabourCost, List<ProjectCost> listOtherCost,
			List<ProjectCost> listConstructionTeamCost) {
		super();
		this.projectDetailProgressDto = projectDetailProgressDto;
		this.projectBudget = projectBudget;
		this.listProductCost = listProductCost;
		this.listLabourCost = listLabourCost;
		this.listOtherCost = listOtherCost;
		this.listConstructionTeamCost = listConstructionTeamCost;
	}







	public ProjectDetailProgressDto getProjectDetailDto() {
		return projectDetailProgressDto;
	}



	public void setProjectDetailDto(ProjectDetailProgressDto projectDetailProgressDto) {
		this.projectDetailProgressDto = projectDetailProgressDto;
	}



	public ProjectBudget getProjectBudget() {
		return projectBudget;
	}



	public void setProjectBudget(ProjectBudget projectBudget) {
		this.projectBudget = projectBudget;
	}



	public List<ProjectCost> getListProductCost() {
		return listProductCost;
	}



	public void setListProductCost(List<ProjectCost> listProductCost) {
		this.listProductCost = listProductCost;
	}



	public List<ProjectCost> getListLabourCost() {
		return listLabourCost;
	}



	public void setListLabourCost(List<ProjectCost> listLabourCost) {
		this.listLabourCost = listLabourCost;
	}



	public List<ProjectCost> getListOtherCost() {
		return listOtherCost;
	}



	public void setListOtherCost(List<ProjectCost> listOtherCost) {
		this.listOtherCost = listOtherCost;
	}



	public List<ProjectCost> getListConstructionTeamCost() {
		return listConstructionTeamCost;
	}



	public void setListConstructionTeamCost(List<ProjectCost> listConstructionTeamCost) {
		this.listConstructionTeamCost = listConstructionTeamCost;
	}

	

}
