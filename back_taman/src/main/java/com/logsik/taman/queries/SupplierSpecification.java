package com.logsik.taman.queries;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;
import com.logsik.taman.domain.Supplier;
import com.logsik.taman.enums.SupplierType;

public class SupplierSpecification implements Specification<Supplier> {
	private static final long serialVersionUID = 1L;
	private String supplierName;
	private String type;

	
	public SupplierSpecification(String supplierName, String type) {
		super();
		this.supplierName = supplierName;
		this.type = type;
	}


	@Override
	public Predicate toPredicate(Root<Supplier> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		List<Predicate> predicates = new ArrayList<>();
		if (!StringUtils.isEmpty(type) && !type.equals("ALL")) {
			predicates.add(builder.or(builder.equal(root.get("type"),
					SupplierType.valueOf(type))));
		}
		
		if (!StringUtils.isEmpty(supplierName)) {
			predicates.add(builder.like(root.get("name"), "%" + supplierName + "%"));
		}
		query.orderBy(builder.asc(root.get("type")));
		return builder.and(predicates.toArray(new Predicate[predicates.size()]));
	}

}
