package com.logsik.taman.queries;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.logsik.taman.domain.Contact;
import com.logsik.taman.enums.ContactStatus;

public class ContactSpecification implements Specification<Contact> {
	private String nameOrTaxNumber;
	private String contactStatus;

	public ContactSpecification(String contactStatus, String nameOrTaxNumber) {
		this.contactStatus = contactStatus;
		this.nameOrTaxNumber = nameOrTaxNumber;

	}
	@Override
	public Predicate toPredicate(Root<Contact> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		List<Predicate> predicates = new ArrayList<>();
		if (!StringUtils.isEmpty(contactStatus) && !contactStatus.equals("ALL")) {
			predicates.add(builder.or(builder.equal(root.get("contactStatus"),
					ContactStatus.valueOf(contactStatus))));
		}
		
		if (!StringUtils.isEmpty(nameOrTaxNumber)) {
			predicates.add(builder.or(builder.like(root.get("name"), "%" + nameOrTaxNumber + "%"),
					builder.like(root.get("taxNumber"), "%" + nameOrTaxNumber + "%")));
		}
		query.orderBy(builder.desc(root.get("contactStatus")),builder.asc(root.get("name")));
		return builder.and(predicates.toArray(new Predicate[predicates.size()]));
//		  Join<Pet, Owner> owners = root.join("owners");
//        criteriaQuery.orderBy(criteriaBuilder.desc(root.get("id")));
//        return criteriaBuilder.equal(owners.get("name"), ownerName);
	}

}
