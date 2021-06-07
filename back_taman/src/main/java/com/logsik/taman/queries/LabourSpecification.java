package com.logsik.taman.queries;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.logsik.taman.domain.Labour;

public class LabourSpecification implements Specification<Labour> {
	private String fullNameOrPhone;
	private String companyId;

	public LabourSpecification(String companyId, String fullName) {
		this.companyId = companyId;
		this.fullNameOrPhone = fullName;

	}
	@Override
	public Predicate toPredicate(Root<Labour> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		List<Predicate> predicates = new ArrayList<>();
		if (!StringUtils.isEmpty(companyId) && !companyId.equals("ALL")) {
			predicates.add(builder.or(builder.equal(root.get("company").get("id"),
					Long.valueOf(companyId))));
		}
		if (!StringUtils.isEmpty(fullNameOrPhone)) {
			predicates.add(builder.or(builder.like(root.get("fullName"), "%" + fullNameOrPhone + "%"),
					builder.like(root.get("phone"), "%" + fullNameOrPhone + "%")));
		}

		return builder.and(predicates.toArray(new Predicate[predicates.size()]));

	}

}
