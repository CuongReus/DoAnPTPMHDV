package com.logsik.taman.queries;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.logsik.taman.domain.EmployeeSalary;

public class EmployeeSalarySpecification implements Specification<EmployeeSalary> {

	private static final long serialVersionUID = 1L;
	
	private String month;
	private String year;
	private String companyId;
	private String fullNameOrEmailOrCode;
	
	
	public EmployeeSalarySpecification(String month, String year, String companyId, String fullNameOrEmailOrCode) {
		super();
		this.month = month;
		this.year = year;
		this.companyId = companyId;
		this.fullNameOrEmailOrCode = fullNameOrEmailOrCode;
	}



	@Override
	public Predicate toPredicate(Root<EmployeeSalary> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		List<Predicate> predicates = new ArrayList<>();
		
		
		
		if(!StringUtils.isEmpty(month) && !StringUtils.isEmpty(year)) {
			predicates.add(builder.and(builder.equal(root.get("month"), Integer.valueOf(month)),
					builder.equal(root.get("year"), Integer.valueOf(year))));
		}
		if (!StringUtils.isEmpty(companyId) && !companyId.equals("ALL")) {
			predicates.add(builder.equal(root.get("user").get("company").get("id"),
					Long.valueOf(companyId)));
		}
		if(!StringUtils.isEmpty(fullNameOrEmailOrCode)) {
			predicates.add(builder.or(
					builder.like(root.get("user").get("fullName"),"%" + fullNameOrEmailOrCode + "%"),
					builder.like(root.get("user").get("email"),"%" + fullNameOrEmailOrCode + "%"),
					builder.like(root.get("user").get("code"), "%" + fullNameOrEmailOrCode+ "%")
					));
		}
		return builder.and(predicates.toArray(new Predicate[predicates.size()]));

	}

}
