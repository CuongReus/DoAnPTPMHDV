package com.logsik.taman.queries;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.logsik.taman.domain.User;

public class PersonelSpecification implements Specification<User> {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String fullNameOrPhoneOrEmail;
	private String companyId;
	private Boolean isActive;

	public PersonelSpecification(String companyId, String fullNameOrPhoneOrEmail,Boolean isActive) {
		this.companyId = companyId;
		this.fullNameOrPhoneOrEmail = fullNameOrPhoneOrEmail;
		this.isActive = isActive;

	}
	@Override
	public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		List<Predicate> predicates = new ArrayList<>();
		if(isActive != null) {
			predicates.add(builder.or(builder.equal(root.get("isActive"),isActive)));
		}
		if (!StringUtils.isEmpty(companyId) && !companyId.equals("ALL")) {
			predicates.add(builder.or(builder.equal(root.get("company").get("id"),
					Long.valueOf(companyId))));
		}
		
		if (!StringUtils.isEmpty(fullNameOrPhoneOrEmail)) {
			predicates.add(builder.or(builder.like(root.get("fullName"), "%" + fullNameOrPhoneOrEmail + "%"),
					builder.like(root.get("phone"), "%" + fullNameOrPhoneOrEmail + "%"),
					builder.like(root.get("email"), "%" + fullNameOrPhoneOrEmail + "%")));
		}
		query.orderBy(builder.desc(root.get("company").get("id")),builder.desc(root.get("rank")),builder.asc(root.get("fullName")));
		return builder.and(predicates.toArray(new Predicate[predicates.size()]));
//		  Join<Pet, Owner> owners = root.join("owners");
//        criteriaQuery.orderBy(criteriaBuilder.desc(root.get("id")));
//        return criteriaBuilder.equal(owners.get("name"), ownerName);
	}

}
