package com.logsik.taman.queries;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.logsik.taman.domain.ProjectCost;
import com.logsik.taman.enums.ProjectCostStatus;

public class ProjectCostSpecification implements Specification<ProjectCost> {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String projectCostStatus;
	private Date fromDate;
	private Date toDate;

	public ProjectCostSpecification( String projectCostStatus, Date fromDate, Date toDate) {
		super();
		this.projectCostStatus = projectCostStatus;
		this.fromDate = fromDate;
		this.toDate = toDate;
		
	}


	@Override
	public Predicate toPredicate(Root<ProjectCost> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		List<Predicate> predicates = new ArrayList<>();
		
		if (!StringUtils.isEmpty(projectCostStatus) && !"ALL".equals(projectCostStatus) ) {

			predicates.add(builder.equal(root.get("status"),ProjectCostStatus.valueOf(projectCostStatus)));
					
		}
		if(fromDate !=null && toDate !=null) {
			predicates.add(builder.between(root.get("createdDate"),fromDate,toDate ));
		}
//		query.orderBy(builder.desc(root.get("projectDetailId")));
		query.orderBy(builder.desc(root.get("projectDetail").get("project").get("projectYear").get("companyId")));
		query.orderBy(builder.asc(root.get("createdDate")));
		return builder.and(predicates.toArray(new Predicate[predicates.size()]));
		

	}


}
