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

import com.logsik.taman.domain.Stock;

public class StockSpecification implements Specification<Stock> {

	private static final long serialVersionUID = 1L;
	private String productName;
	private String productCategoryId;
	private String supplierId;
	private List<String> productUnit;
	private List<String> productSize;

	public StockSpecification(String productName, String productCategoryId,String supplierId, List<String> productUnit,
			List<String> productSize) {
		super();
		this.setProductName(productName);
		this.setProductCategoryId(productCategoryId);
		this.setSupplierId(supplierId);
		this.setProductUnit(productUnit);
		this.setProductSize(productSize);
	}

	@Override
	public Predicate toPredicate(Root<Stock> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		List<Predicate> predicates = new ArrayList<>();
		Expression<String> sizeExp = root.get("product").get("size");
		Expression<String> unitExp = root.get("product").get("unit");
		Expression<Float> quantityExp = root.get("quantity");
		if (!StringUtils.isEmpty(getProductCategoryId()) && !getProductCategoryId().equals("ALL")) {
			predicates.add(builder.equal(root.get("product").get("productCategory").get("id"), Long.valueOf(getProductCategoryId())));
		}
		if (!StringUtils.isEmpty(getSupplierId()) && !getSupplierId().equals("ALL")) {
			predicates.add(builder.equal(root.get("product").get("supplier").get("id"), Long.valueOf(getSupplierId())));
		}
		if (!getProductSize().isEmpty() && !getProductSize().contains("ALL")) {
			predicates.add(sizeExp.in(getProductSize()));
		}
		if (!getProductUnit().isEmpty() && !getProductUnit().contains("ALL")) {
			predicates.add(unitExp.in(getProductUnit()));
		}
		if (!StringUtils.isEmpty(getProductName())) {
			predicates.add(builder.like(root.get("product").get("name"), "%" + getProductName() + "%"));
		}
		
			
				

		
		return builder.and(predicates.toArray(new Predicate[predicates.size()]));

	}

	

	public List<String> getProductSize() {
		return productSize;
	}

	public void setProductSize(List<String> productSize) {
		this.productSize = productSize;
	}

	public List<String> getProductUnit() {
		return productUnit;
	}

	public void setProductUnit(List<String> productUnit) {
		this.productUnit = productUnit;
	}

	public String getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(String supplierId) {
		this.supplierId = supplierId;
	}

	public String getProductCategoryId() {
		return productCategoryId;
	}

	public void setProductCategoryId(String productCategoryId) {
		this.productCategoryId = productCategoryId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}


}
