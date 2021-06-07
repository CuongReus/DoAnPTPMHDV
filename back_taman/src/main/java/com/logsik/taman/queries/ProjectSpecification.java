package com.logsik.taman.queries;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.logsik.taman.domain.Project;
import com.logsik.taman.enums.ProjectType;

public class ProjectSpecification implements Specification<Project> {
	

	private static final long serialVersionUID = 1L;
	private String projectYearId;
	private String projectType;
//	private String closeProjectDetail;

	public ProjectSpecification(String projectYearId, String projectType) {
		super();
		this.projectYearId = projectYearId;
		this.projectType = projectType;
	}

	@Override
	public Predicate toPredicate(Root<Project> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		List<Predicate> predicates = new ArrayList<>();
		if (!StringUtils.isEmpty(projectYearId)) {
			predicates.add(builder.or(builder.equal(root.get("projectYearId"),
					Long.valueOf(projectYearId))));
		}
		if (!StringUtils.isEmpty(projectType) && !projectType.equals("ALL")) {
			predicates.add(builder.or(
					builder.equal(root.get("projectType"), ProjectType.valueOf(projectType))));
		}
		

		return builder.and(predicates.toArray(new Predicate[predicates.size()]));

	}


}
