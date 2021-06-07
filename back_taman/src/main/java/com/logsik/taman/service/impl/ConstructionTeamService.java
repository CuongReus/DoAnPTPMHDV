package com.logsik.taman.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.logsik.taman.domain.ConstructionTeam;
import com.logsik.taman.domain.Efficiency;
import com.logsik.taman.domain.ProjectDetail;
import com.logsik.taman.repository.ConstructionTeamRepository;
import com.logsik.taman.repository.EfficiencyRepository;
import com.logsik.taman.repository.ProjectDetailRepository;

@Service
public class ConstructionTeamService {
	@Autowired
	ProjectDetailRepository projectDetailRepository;
	@Autowired
	private ConstructionTeamRepository constructionTeamRepository;
	@Autowired
	private EfficiencyRepository efficiencyRepository;
	
	public ConstructionTeam addNewConstructionTeam(Efficiency efficiency) {
		Optional<ProjectDetail> companyFromProjectDetail = projectDetailRepository.findById(efficiency.getProjectDetailId());
		ConstructionTeam constructionTeam = new ConstructionTeam();
		if(!StringUtils.isEmpty(efficiency.getNewLeaderName())) {
			constructionTeam.setCompany(companyFromProjectDetail.get().getProject().getProjectYear().getCompany());
			constructionTeam.setSpecialize(efficiency.getNewSpecialize());
			constructionTeam.setTeamLeaderName(efficiency.getNewLeaderName());
			constructionTeam.setLeaderPhoneNumber(efficiency.getNewLeaderPhone());
			ConstructionTeam result = constructionTeamRepository.save(constructionTeam);	
			return result;
		}
		return null;
		
		
	}
	
}
