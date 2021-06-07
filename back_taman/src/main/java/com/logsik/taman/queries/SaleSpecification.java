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

import com.logsik.taman.domain.Sale;
import com.logsik.taman.enums.ApprovalStatus;
import com.logsik.taman.enums.ContactStatus;
import com.logsik.taman.enums.PaymentStatus;

public class SaleSpecification implements Specification<Sale> {

	private static final long serialVersionUID = 1L;
	private Date startDate;
	private Date endDate;
	private String paymentStatus;
	private String approvalStatus;
	private String contactStatus;
	private String orderCode;
	private String contactName; 
	private String supplierId;

	

	public SaleSpecification(Date startDate, Date endDate, String paymentStatus, String approvalStatus, String contactStatus,
			String orderCode,String contactName,String supplierId) {
		super();
		this.startDate = startDate;
		this.endDate = endDate;
		this.paymentStatus = paymentStatus;
		this.approvalStatus = approvalStatus;
		this.contactStatus = contactStatus;
		this.orderCode = orderCode;
		this.contactName = contactName;
		this.supplierId = supplierId;
	}



	@Override
	public Predicate toPredicate(Root<Sale> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		List<Predicate> predicates = new ArrayList<>();
		if (startDate != null && endDate != null ) {
			predicates.add(builder.between(root.get("purchasedDate"), startDate, endDate));
		}
//		else if(startDate == null && endDate == null ) {
//			predicates.add(builder.like(root.get("orderCode"),"%"+ orderCode + "%" ));
//		} 
		if (!paymentStatus.isEmpty() && !paymentStatus.equals("ALL")) {
			predicates.add(builder.equal(root.get("paymentStatus"), PaymentStatus.valueOf(paymentStatus)));

		}
		
		if (!approvalStatus.isEmpty() && !approvalStatus.equals("ALL")) {
			predicates.add(builder.equal(root.get("approvalStatus"), ApprovalStatus.valueOf(approvalStatus)));
		}
		if (!contactStatus.isEmpty() && !contactStatus.equals("ALL")) {
			predicates.add(builder.equal(root.get("contact").get("contactStatus"), ContactStatus.valueOf(contactStatus)));
		}
		if(!contactName.isEmpty()) {
			predicates.add(builder.like(root.get("contact").get("name"),"%" + contactName + "%" ));
		}
		
		if(!supplierId.isEmpty() && !supplierId.equals("ALL")) {
			predicates.add(builder.equal(root.get("supplier").get("id"),Long.valueOf(supplierId) ));
		}
			
		
		query.orderBy(builder.desc(root.get("purchasedDate")));
		return builder.and(predicates.toArray(new Predicate[predicates.size()]));

	}
	
	public Predicate toSumPredicate(Root<Sale> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		List<Predicate> predicates = new ArrayList<>();
		if (startDate != null && endDate != null && StringUtils.isEmpty(orderCode) ) {
			predicates.add(builder.between(root.get("purchasedDate"), startDate, endDate));
		}else if(startDate == null && endDate == null && !orderCode.isEmpty() ) {
			predicates.add(builder.like(root.get("orderCode"),"%"+ orderCode + "%" ));
		} 
		if (!paymentStatus.isEmpty() && !paymentStatus.equals("ALL")) {
			predicates.add(builder.equal(root.get("paymentStatus"), PaymentStatus.valueOf(paymentStatus)));

		}
		
		if (!approvalStatus.isEmpty() && !approvalStatus.equals("ALL")) {
			predicates.add(builder.equal(root.get("approvalStatus"), ApprovalStatus.valueOf(approvalStatus)));
		}
		if(!contactName.isEmpty()) {
			predicates.add(builder.like(root.get("contact").get("name"),"%" + contactName + "%" ));
		}
		
		if(!supplierId.isEmpty() && !supplierId.equals("ALL")) {
			predicates.add(builder.equal(root.get("supplier").get("id"),Long.valueOf(supplierId) ));
		}
		return builder.and(predicates.toArray(new Predicate[predicates.size()]));

	}

}
