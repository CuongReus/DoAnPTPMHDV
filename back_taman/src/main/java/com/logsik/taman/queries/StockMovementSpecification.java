package com.logsik.taman.queries;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.logsik.taman.domain.StockMovement;

public class StockMovementSpecification implements Specification<StockMovement> {
	private static final long serialVersionUID = 1L;
	private Date startDate;
	private Date endDate;
	private String productCategoryId;
	private String supplierId;
	private List<String> storageLocationId;

	public StockMovementSpecification(Date startDate, Date endDate,String productCategoryId, String supplierId, List<String> storageLocationId) {
		super();
		this.startDate = startDate;
		this.endDate = endDate;
		this.productCategoryId = productCategoryId;
		this.supplierId = supplierId;
		this.storageLocationId = storageLocationId;
		
	}

	@Override
	public Predicate toPredicate(Root<StockMovement> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		List<Predicate> predicates = new ArrayList<>();
		Expression<String> storageLocationExp = root.get("stock").get("storageLocation").get("id");
		if (!StringUtils.isEmpty(productCategoryId) && !productCategoryId.equals("ALL")) {
			predicates.add(builder.equal(root.get("product").get("productCategory").get("id"),
					Long.valueOf(productCategoryId)));
		}
		if (!StringUtils.isEmpty(supplierId) && !supplierId.equals("ALL")) {
			predicates.add(builder.equal(root.get("product").get("supplier").get("id"), Long.valueOf(supplierId)));
		}
		if (!storageLocationId.isEmpty() && !storageLocationId.contains("ALL")) {
			predicates.add(storageLocationExp.in(storageLocationId));
		}
		if(startDate !=null && endDate != null ) {
			predicates.add(builder.between(root.get("movementDate"),startDate,endDate));
		}
		query.orderBy(builder.asc(root.get("movementDate")));
		return builder.and(predicates.toArray(new Predicate[predicates.size()]));

	}

}
