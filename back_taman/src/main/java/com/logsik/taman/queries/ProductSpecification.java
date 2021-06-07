package com.logsik.taman.queries;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.logsik.taman.domain.Product;

public class ProductSpecification implements Specification<Product> {

	private String productName;
	private String productCategoryId;
	private List<String> productUnit;
	private List<String> productSize;

	
	


	public ProductSpecification(String productName, String productCategoryId, List<String> productUnit,
			List<String> productSize) {
		super();
		this.productName = productName;
		this.productCategoryId = productCategoryId;
		this.productUnit = productUnit;
		this.productSize = productSize;
	}





	@Override
	public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		List<Predicate> predicates = new ArrayList<>();
		Expression<String> sizeExp = root.get("size");
		Expression<String> unitExp = root.get("unit");
		if (!StringUtils.isEmpty(productCategoryId) && !productCategoryId.equals("ALL")) {
			predicates.add(builder.equal(root.get("productCategory").get("id"),
					Long.valueOf(productCategoryId)));
		}
		if (!productSize.isEmpty() && !productSize.contains("ALL")) {
    			predicates.add(sizeExp.in(productSize));
			
		}
		if (!productUnit.isEmpty() && !productUnit.contains("ALL")) {
    			predicates.add(unitExp.in(productUnit));
		
		}
		if (!StringUtils.isEmpty(productName)) {
			predicates.add(builder.like(root.get("name"), "%" + productName + "%"));
		}

		return builder.and(predicates.toArray(new Predicate[predicates.size()]));

	}

}
