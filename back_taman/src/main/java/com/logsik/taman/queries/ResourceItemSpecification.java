package com.logsik.taman.queries;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.logsik.taman.domain.ResourceItem;
import com.logsik.taman.enums.ResourceType;

public class ResourceItemSpecification implements Specification<ResourceItem> {

	private static final long serialVersionUID = 1L;
	
	private String search;
	private String type;
	private String userId;
	
	public ResourceItemSpecification(String search, String type, String userId) {
		super();
		this.search = search;
		this.type = type;
		this.userId = userId;
	}



	@Override
	public Predicate toPredicate(Root<ResourceItem> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		List<Predicate> predicates = new ArrayList<>();
		if (!StringUtils.isEmpty(type) && !type.equals("ALL")) {
			predicates.add(builder.equal(root.get("type"), ResourceType.valueOf(type)));
		}
		
		if (!StringUtils.isEmpty(userId) && !userId.equals("ALL")) {
			predicates.add(builder.equal(root.get("responsibleUserId"), Long.valueOf(userId)));
		}
		
		if (!(search).isEmpty()) {
			predicates.add(builder.like(root.get("name"), "%" + search + "%"));
		}
		query.orderBy(builder.desc(root.get("name")));
		return builder.and(predicates.toArray(new Predicate[predicates.size()]));
	}

}
