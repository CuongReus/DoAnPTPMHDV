package com.logsik.taman.queries;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.logsik.taman.domain.ProjectDetail;

public class ProjectProgressSpecification implements Specification<ProjectDetail> {
	private String projectNameOrProjectDetailName;
	private String projectYearId;
	private String companyId;
//	private String closeProjectDetail;

	

	public ProjectProgressSpecification(String projectNameOrProjectDetailName, String projectYearId, String companyId) {
		super();
		this.projectNameOrProjectDetailName = projectNameOrProjectDetailName;
		this.projectYearId = projectYearId;
		this.companyId = companyId;
	}



	@Override
	public Predicate toPredicate(Root<ProjectDetail> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		List<Predicate> predicates = new ArrayList<>();
		if(!StringUtils.isEmpty(companyId)) {
			predicates.add(builder.or(
					builder.equal(root.join("project").join("projectYear").join("company").get("id"),
							Long.valueOf(companyId))));
		}
		if (!StringUtils.isEmpty(projectYearId) && !projectYearId.equals("ALL")) {
			predicates.add(builder.or(
					builder.equal(root.join("project").join("projectYear").get("id"),
							Long.valueOf(projectYearId))));
		}
		if (!StringUtils.isEmpty(projectNameOrProjectDetailName)) {
			predicates.add(builder.or(builder.like(root.join("project").get("name"), "%" + projectNameOrProjectDetailName + "%"),
					builder.like(root.get("name"), "%" + projectNameOrProjectDetailName + "%")
					));
		}

		return builder.and(predicates.toArray(new Predicate[predicates.size()]));

	}







	

}
