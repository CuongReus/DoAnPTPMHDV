package com.logsik.taman.service.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.logsik.taman.domain.Sale;
import com.logsik.taman.dtos.SaleWithSumMoneyDto;
import com.logsik.taman.enums.PaymentStatus;
import com.logsik.taman.queries.SaleSpecification;
import com.logsik.taman.repository.SaleRepository;

@Service
@Transactional
public class SaleService {
	@PersistenceContext
	private EntityManager em;
	
	@Autowired
	private SaleRepository saleRepository; 

	public SaleWithSumMoneyDto getSaleWithSumMoneyDto(SaleSpecification spec) {
//		SaleWithSumMoneyDto saleWithSumMoneyDto = new SaleWithSumMoneyDto();
		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
		CriteriaQuery<SaleWithSumMoneyDto> query = criteriaBuilder.createQuery(SaleWithSumMoneyDto.class);
		Root<Sale> root = query.from(Sale.class);

		if (spec != null) {

			query.where(spec.toSumPredicate(root, query, criteriaBuilder));
		}

		Expression<Long> totalMoneyPaid = root.get("actualMoney");
		Expression<Long> totalMoneyUnPaid = root.get("actualMoney");
		Expression<Long> totalMoneyConsignment = root.get("actualMoney");
//		criteriaBuilder.sum(criteriaBuilder.<Long>selectCase().when(
//						  criteriaBuilder.equal(root.get("paymentStatus"),PaymentStatus.CHUA_DUYET_THANH_TOAN), totalMoneyUnPaid));
//		criteriaBuilder.sum(criteriaBuilder.<Long>selectCase().when(
//				  criteriaBuilder.equal(root.get("paymentStatus"),PaymentStatus.DA_DUYET_THANH_TOAN), totalMoneyPaid));
//		 criteriaBuilder.selectCase()
//			     .when(criteriaBuilder.equal(root.get("totalMoney"), true), criteriaBuilder.sum(totalMoneyPaid))
//			     .otherwise(0).as(Long.class);

		query.select(criteriaBuilder.construct(SaleWithSumMoneyDto.class,
				criteriaBuilder.sum(criteriaBuilder.selectCase()
						.when(criteriaBuilder.equal(root.get("paymentStatus"), PaymentStatus.DA_DUYET_THANH_TOAN),
								totalMoneyPaid)
						.otherwise(0).as(Long.class)),

				criteriaBuilder.sum(criteriaBuilder.selectCase()
						.when(criteriaBuilder.equal(root.get("paymentStatus"), PaymentStatus.CHUA_DUYET_THANH_TOAN),
								totalMoneyUnPaid)
						.otherwise(0).as(Long.class)),

				criteriaBuilder.sum(criteriaBuilder.selectCase()
						.when(criteriaBuilder.equal(root.get("paymentStatus"), PaymentStatus.HANG_KY_GUI),
								totalMoneyConsignment)
						.otherwise(0).as(Long.class))));
		Query qry = em.createQuery(query);

		SaleWithSumMoneyDto sumObject = (SaleWithSumMoneyDto) qry.getSingleResult();
		return sumObject;

	}
	
	public void updateActualMoneyForAllSale() {
		List<Sale> listAllSale = saleRepository.findAll();
		for(Sale saleObject : listAllSale) {
			Long totalMoney=0L;
			Integer discountPercent = 0;
			if(saleObject.getTotalMoney()  != null) {
				totalMoney = saleObject.getTotalMoney();
			}
			if(saleObject.getDiscountPercent() != null) {
				discountPercent= saleObject.getDiscountPercent();
			}
			Long discountMoney = Math.round((totalMoney*(discountPercent/100F*1.0)));
			Long actutalMoney = totalMoney - discountMoney ;
			saleObject.setActualMoney(actutalMoney);
			saleRepository.save(saleObject);
		}
	}

}
