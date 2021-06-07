//package com.logsik.taman.queries;
//
//import java.util.ArrayList;
//import java.util.Calendar;
//import java.util.List;
//
//import javax.persistence.criteria.CriteriaBuilder;
//import javax.persistence.criteria.CriteriaQuery;
//import javax.persistence.criteria.Predicate;
//import javax.persistence.criteria.Root;
//
//import org.springframework.data.jpa.domain.Specification;
//import org.springframework.util.StringUtils;
//
//import com.logsik.taman.domain.Holiday;
//
//public class ContractItemSpecification implements Specification<Holiday> {
//	 private String search;
//	 
//	 private String activeStatus;
//	 
//	 private String validationStatus;
//	 
//	 private String followStatus;
//	 
//	 private String depositStatus;
//    
//    public ContractItemSpecification(String search, 
//			String activeStatus, String validationStatus,
//			String followStatus, 
//			String depositStatus) {
//    	this.search = search;
//    	this.activeStatus = activeStatus;
//    	this.validationStatus = validationStatus;
//    	this.followStatus = followStatus;
//    	this.depositStatus = depositStatus;
//    }
// 
//    @Override
//    public Predicate toPredicate
//      (Root<Holiday> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
//    	List<Predicate> predicates = new ArrayList<>();
//
//    	if (!StringUtils.isEmpty(search)) {
//    		predicates.add(builder.or(builder.like(root.join("contract").get("customerFullName"), "%" + search + "%"),
//    				builder.like(root.join("contract").get("code"), "%" + search + "%"),
//    				builder.like(root.get("workAddress"), "%" + search + "%")));
//    	}
//    	
//    	if (!StringUtils.isEmpty(activeStatus) && !"ALL".equals(activeStatus)) {
//    		predicates.add(builder.equal(root.get("isActive"), isActive(activeStatus)));
//    	}
//    	
//    	if (!StringUtils.isEmpty(validationStatus) && !"ALL".equals(validationStatus)) {
//    		predicates.add(builder.equal(root.get("isValidated"), isValidated(validationStatus)));
//    	}
//    	
//    	if (!StringUtils.isEmpty(followStatus) && !"ALL".equals(followStatus)) {
//    		predicates.add(builder.equal(root.get("isFollowed"), isFollowed(followStatus)));
//    	}
//    	
//    	if (!StringUtils.isEmpty(depositStatus) && !"ALL".equals(depositStatus)) {
//    		predicates.add(builder.equal(root.get("isDeposited"), isDeposited(depositStatus)));
//    	}
//    	
//    	
//    	if ("DANG_THEO_DOI".equals(followStatus)) {
//    		Calendar cal = Calendar.getInstance();
//            cal.add(Calendar.DATE, 15); //minus number would decrement the days
//    		predicates.add(builder.lessThanOrEqualTo(root.get("endContract"), cal.getTime()));
//    	}
//        
////    	TODO: order by Id desc
//        return builder.and(predicates.toArray(new Predicate[predicates.size()]));
//    }
//
//	private Boolean isDeposited(String depositStatus2) {
//		switch (depositStatus2) {
//		case "DA_DAT_COC":
//			return true;		
//		case "CHUA_DAT_COC":
//			return false;
//		default:
//			throw new RuntimeException("Not support depositStatus: " + depositStatus2);
//		}
//	}
//
//	private Boolean isFollowed(String followStatus2) {
//		switch (followStatus2) {
//		case "DANG_THEO_DOI":
//			return true;		
//		case "KHONG_THEO_DOI":
//			return false;
//		default:
//			throw new RuntimeException("Not support followStatus: " + followStatus2);
//		}
//	}
//
//	private Boolean isValidated(String validationStatus2) {
//		switch (validationStatus2) {
//		case "DA_DUYET":
//			return true;		
//		case "CHUA_DUYET":
//			return false;
//		default:
//			throw new RuntimeException("Not support validationStatus: " + validationStatus2);
//		}
//	}
//
//	private Boolean isActive(String activeStatus2) {
//		switch (activeStatus2) {
//		case "DANG_HOAT_DONG":
//			return true;		
//		case "TAM_NGUNG":
//			return false;
//		default:
//			throw new RuntimeException("Not support activeStatus: " + activeStatus2);
//		}
//	}
//}
