package com.logsik.taman.service.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.logsik.taman.domain.Product;
import com.logsik.taman.domain.Stock;
import com.logsik.taman.domain.StockMovement;
import com.logsik.taman.domain.StorageLocation;
import com.logsik.taman.dtos.StockMovementSumDto;
import com.logsik.taman.dtos.SumStockQuantityAndPrice;
import com.logsik.taman.queries.StockSortProductSpecification;
import com.logsik.taman.queries.StockSpecification;
import com.logsik.taman.repository.StockMovementRepository;
import com.logsik.taman.repository.StockRepository;
import com.logsik.taman.repository.StorageLocationRepository;

@Service
@Transactional
public class StockService {
	@Autowired
	private StockRepository stockRepository;
	@Autowired
	private StorageLocationRepository storageLocationRepository;
	@Autowired
	private StockMovementRepository stockMovementRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@PersistenceContext
	private EntityManager em;
//	****************************************Start Input****************************************

	public void createNewInputProductToStock(Product product) {
		List<StorageLocation> listStorageLocation = storageLocationRepository.findAll();
		for (StorageLocation sl : listStorageLocation) {
			Stock stock = new Stock();
			stock.setProductId(product.getId());
			stock.setQuantity(0f);
			stock.setLatestProductPrice(0l);
			stock.setStorageLocationId(sl.getId());
			stockRepository.save(stock);

		}

	}

	public void removeProductFromStock(Long productId) {
		List<Stock> listStockByCurrentProductId = stockRepository.findByProductId(productId);
		List<StockMovement> listStockMovementByProductId = stockMovementRepository.findByProductId(productId);
		if (listStockMovementByProductId.size() == 0) {
			for (Stock st : listStockByCurrentProductId) {
				stockRepository.deleteById(st.getId());
			}
		}
	}

	public void updateMovementToStock(Stock stock) {
		StockMovementSumDto getSumQuantityAndTotalPriceByStock = stockMovementRepository
				.getSumQuantityAndTotalPriceByStock(stock.getId());

		Float quantity = 0F;
		Long totalPrice = 0L;
		if (getSumQuantityAndTotalPriceByStock != null) {
			if (getSumQuantityAndTotalPriceByStock.getSumQuantity() != null) {
				quantity = (float) (getSumQuantityAndTotalPriceByStock.getSumQuantity() * 1);
			}
			if (getSumQuantityAndTotalPriceByStock.getSumTotalPrice() != null) {
				totalPrice = getSumQuantityAndTotalPriceByStock.getSumTotalPrice();
			}
		}

		stock.setQuantity(quantity);
		stock.setLatestProductPrice(totalPrice);
		stockRepository.save(stock);
	}

////	Remove and Output Productfrom Stock can use this function above
//	public void removeMovementToStock(Stock stock, StockMovement stockMovement) {
//		StockMovementSumDto getSumQuantityAndTotalPriceByStock = stockMovementRepository.getSumQuantityAndTotalPriceByStock(stock.getId());
//		Float quantity = (float) (getSumQuantityAndTotalPriceByStock.getSumQuantity() *1 );
//		Long totalPrice = getSumQuantityAndTotalPriceByStock.getSumTotalPrice();
//		stock.setQuantity(quantity);
//		stock.setLatestProductPrice(totalPrice);
//		stockRepository.save(stock);
//	}

//	****************************************End Input****************************************

	public Page<Long> getProductIdPage(StockSortProductSpecification spec, Pageable pageable) {

		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
		CriteriaQuery<Long> query = criteriaBuilder.createQuery(Long.TYPE);

		if (spec != null) {
			Root<Stock> root = query.from(Stock.class);
			query.where(spec.toPredicate(root, query, criteriaBuilder));
		}

		TypedQuery<Long> typedQuery = em.createQuery(query);
		typedQuery.setFirstResult((int) pageable.getOffset());
		typedQuery.setMaxResults(pageable.getPageSize());

		List<Long> result = typedQuery.getResultList();
		Long totalElements = countTotalEmplement(spec);
//		Object getSumStockQuantityBySpec = getSumStockQuantityBySpec(spec); 
		return new PageImpl<Long>(result, pageable, totalElements);
	}

	public List<Long> getListProductIds(StockSpecification spec) {

		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
		CriteriaQuery<Long> query = criteriaBuilder.createQuery(Long.TYPE);

		if (spec != null) {
			Root<Stock> root = query.from(Stock.class);
			query.where(spec.toPredicate(root, query, criteriaBuilder));
		}

		TypedQuery<Long> typedQuery = em.createQuery(query);

		List<Long> result = typedQuery.getResultList();
		return result;
	}

	private Long countTotalEmplement(StockSortProductSpecification spec) {
//		// Set up criteria (restrictions)
		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
		CriteriaQuery<Stock> query = criteriaBuilder.createQuery(Stock.class);
		Root<Stock> root = query.from(Stock.class);
		root.alias("productId");
		query.where(spec.toPredicate(root, query, criteriaBuilder));
		// Generic retrieve count
		CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
//			Root<T> entity_ = (Root<T>) countQuery.from(query.getResultType());
		Root<Stock> entity_ = countQuery.from(query.getResultType()); // because group by productId
		countQuery.select(criteriaBuilder.count(entity_));
		entity_.alias("productId"); // use the same alias in order to match the restrictions part and the selection
									// part

		Predicate restriction = query.getRestriction();

		countQuery.groupBy(query.getGroupList());
		countQuery.orderBy(query.getOrderList());
		if (restriction != null) {
			countQuery.where(restriction); // Copy restrictions
//					countQuery.where(spec.toPredicate(root, countQuery, criteriaBuilder));
		}
		List<Long> list = em.createQuery(countQuery).getResultList();
		return (long) list.size();
	}
	
	public SumStockQuantityAndPrice getSumStockQuantityBySpec(StockSpecification spec) {
		List<Stock> list = stockRepository.findAll(spec);
		Double totalStock= 0.0;
		Double totalPrice = 0.0;
		for (Stock stock : list) {
			totalStock += stock.getQuantity();
			if (stock.getProduct().getPrice() != null) {
				totalPrice += stock.getQuantity() * stock.getProduct().getPrice();
			}
			
		}
		
		return new SumStockQuantityAndPrice(totalStock, totalPrice.longValue());
		
//		// Set up criteria (restrictions)
//		SumStockQuantityAndPrice sumStockQuantityAndPrice = new SumStockQuantityAndPrice();
//		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
//		CriteriaQuery<SumStockQuantityAndPrice> query = criteriaBuilder.createQuery(SumStockQuantityAndPrice.class);
//		Root<Stock> root = query.from(Stock.class);
//		
//		if (spec != null) {
//			
//			query.where(spec.toSumPredicate(root, query, criteriaBuilder));
//		}
//
//		Expression<Float> quantityExp = root.get("quantity");
//		Expression<Long> latestProductPrice = root.get("latestProductPrice"); // TODO: Wrong - get product.price
//		query.select(criteriaBuilder.construct(SumStockQuantityAndPrice.class, criteriaBuilder.sumAsDouble(quantityExp),criteriaBuilder.sum(latestProductPrice)	));
//		Query qry = em.createQuery(query);
//		
//		SumStockQuantityAndPrice sumObject = (SumStockQuantityAndPrice) qry.getSingleResult();
//		TODO not 
//		for(SumStockQuantityAndPrice sum:orgList) {
//			totalStockQuantity +=   sum.getTotalQuantity();
//			totalLastedProductPrice +=sum.getTotalPrice();
//		}

	}
//	// Set up criteria (restrictions)
//	CriteriaBuilder builder = entityManager.getCriteriaBuilder();
//	CriteriaQuery<EntityStub> criteriaQuery = builder.createQuery(EntityStub.class);
//	Root<EntityStub> entity_ = criteriaQuery.from(EntityStub.class);
//	entity_.alias("entitySub"); //assign alias to entity root
//
//	criteriaQuery.where(builder.equal(entity_.get("message"), "second"));

//	private <T> Long countTotalEmplement (StockSpecification spec) {
////		// Set up criteria (restrictions)
//		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
//		CriteriaQuery<Stock> query = criteriaBuilder.createQuery(Stock.class);
//		Root<Stock> root = query.from(Stock.class);
//		root.alias("productId");
//			query.where(spec.toPredicate(root, query, criteriaBuilder));
//			// Generic retrieve count
//			CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
////			Root<T> entity_ = (Root<T>) countQuery.from(query.getResultType());
//			Root<Stock> entity_ = countQuery.from(query.getResultType()); // because group by productId
//			entity_.alias("productId"); //use the same alias in order to match the restrictions part and the selection part
//			countQuery.select(criteriaBuilder.count(entity_));
//			Predicate restriction = query.getRestriction();
//			if (restriction != null) {
//			  countQuery.where(restriction); // Copy restrictions
////				countQuery.where(spec.toPredicate(root, countQuery, criteriaBuilder));
//			}
////			countQuery.select(query.getSelection());
//			countQuery.groupBy(query.getGroupList());
//			countQuery.getOrderList()
//			return em.createQuery(countQuery).getSingleResult();
//	}
}
