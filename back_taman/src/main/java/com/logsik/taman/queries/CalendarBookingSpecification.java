package com.logsik.taman.queries;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.logsik.taman.domain.CalenderBooking;

public class CalendarBookingSpecification implements Specification<CalenderBooking> {
	private static final long serialVersionUID = 1L;
	
	private Date startDate;
	private Date endDatte;
	
	public CalendarBookingSpecification(Date startDate, Date endDatte) {
		super();
		this.startDate = startDate;
		this.endDatte = endDatte;
	}

	@Override
	public Predicate toPredicate(Root<CalenderBooking> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		List<Predicate> predicates = new ArrayList<>();
		if (startDate !=null) {
			predicates.add(builder.between(root.get("startDate"),startDate, endDatte));
		}
//		if (endDate !=null) {
//			predicates.add(builder.lessThanOrEqualTo(root.get("signDate"),endDate));
//		}
		
		query.orderBy(builder.asc(root.get("startDate")));
		return builder.and(predicates.toArray(new Predicate[predicates.size()]));

	}

}
