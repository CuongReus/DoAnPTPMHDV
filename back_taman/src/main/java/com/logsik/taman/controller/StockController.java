package com.logsik.taman.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.domain.Stock;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.StockDetailDto;
import com.logsik.taman.dtos.StockDto;
import com.logsik.taman.dtos.StockQuantityByStorageDto;
import com.logsik.taman.dtos.StockWithSumDto;
import com.logsik.taman.dtos.SumStockQuantityAndPrice;
import com.logsik.taman.queries.StockSortProductSpecification;
import com.logsik.taman.queries.StockSpecification;
import com.logsik.taman.repository.ProductRepository;
import com.logsik.taman.repository.StockMovementRepository;
import com.logsik.taman.repository.StockRepository;
import com.logsik.taman.repository.StorageLocationRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.StockService;
import com.logsik.taman.service.impl.TimeService;

@RestController
@RequestMapping("/api")
@Transactional
public class StockController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(StockController.class);

	@Autowired
	private StockRepository stockRepository;
	@Autowired
	private StockService stockService;
	@Autowired
	private StockMovementRepository stockMovementRepository;
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private StorageLocationRepository storageLocationRepository;
	@Autowired
	private DtoConverter dtoConverter;
	@Autowired
	private TimeService timeService;

	@RequestMapping("stock/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {

		return new RestResult(stockRepository.findById(id));
	}

	@RequestMapping(value = "/stock/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody StockDto stockDto) {
		try {
			Stock newStock = stockRepository.save(dtoConverter.convertToStock(stockDto));

			return new RestResult(newStock);
		} catch (Exception e) {
			LOGGER.error("Error when adding contract.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/stock/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody StockDto stockDto) {
		try {

			Stock updatedcontract = stockRepository.save(dtoConverter.convertToStock(stockDto));

			return new RestResult(updatedcontract);
		} catch (Exception e) {
			LOGGER.error("Error when updating stock.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/stock/{id}")
	public RestResult deletecontract(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete contract with ID = " + id + "...");

		try {
			stockRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete stock.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/stock/list")
	public RestResult list(@RequestParam("search") Long search, Pageable pageable) {
		Object result;

		result = stockRepository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/stock/listAll")
	public RestResult listAll() {
		return new RestResult(stockRepository.findAll());

	}

	@RequestMapping(value = "/stock/sumQuantityAndPrice")
	public RestResult sumQuantityAndPrice() {
		return new RestResult(stockRepository.sumQuantityAndPrice());
	}

//	@RequestMapping(value = "/stock/findMovementByProductId")
//	public RestResult listByStockId(@RequestParam("productId") Long productId) {
//		List<StockMovement> stockMovementInAndOutSort = stockMovementRepository.findByProductIdAndMovementDateBetween(
//				productId, timeService.getFirstDayOfYear(), timeService.getLastDayOfYear());
//		stockMovementInAndOutSort.sort((a1, a2) -> a2.getMovementDate().compareTo(a1.getMovementDate()));
//		return new RestResult(stockMovementInAndOutSort);
//	}

	@RequestMapping(value = "/stock/findProductCategoryIdAndProductName")
	public RestResult pageByProductTypeAndProductId(@RequestParam("productCategoryId") String productCategoryId,
			@RequestParam("supplierId") String supplierId, @RequestParam("productName") String productName,
			@RequestParam("productSize") List<String> productSize,
			@RequestParam("productUnit") List<String> productUnit,
			@RequestParam("minInStock") Float minInStock,
			@RequestParam("maxInStock") Float maxInStock, Pageable pageable) {
		Double totalStockQuantityByFilter = 0D;
		Long totalStockMoneyByFilter = 0L;
		StockWithSumDto stockWithSumDto = new StockWithSumDto();
		List<StockDetailDto> listStock = new ArrayList<>();

		Page<Long> productIds = stockService.getProductIdPage(
				new StockSortProductSpecification(productName, productCategoryId, supplierId, productUnit, productSize, minInStock, maxInStock),
				pageable);
		SumStockQuantityAndPrice sumStockQuantityAndPrice = stockService.getSumStockQuantityBySpec(
				new StockSpecification(productName, productCategoryId, supplierId, productUnit, productSize));
		if (sumStockQuantityAndPrice.getTotalQuantity() != null) {
			totalStockQuantityByFilter = sumStockQuantityAndPrice.getTotalQuantity();
		}
		if (sumStockQuantityAndPrice.getTotalPrice() != null) {
			totalStockMoneyByFilter = sumStockQuantityAndPrice.getTotalPrice();
		}
		//
		List<Stock> listStockByProductIds = stockRepository.findByProductIdIn(productIds.getContent());
		for (Long pId : productIds.getContent()) {
			List<Stock> stocksByProductId = selectByProductId(listStockByProductIds, pId);
			listStock.add(convertToDto(stocksByProductId, maxInStock, minInStock, pageable));
		}

		Object setPageForStockList = new PageImpl<StockDetailDto>(listStock, pageable, productIds.getTotalElements());
		stockWithSumDto.setStockObject(setPageForStockList);
		stockWithSumDto.setSumStockQuantity(totalStockQuantityByFilter);
		stockWithSumDto.setSumStockMoney(totalStockMoneyByFilter);
		return new RestResult(stockWithSumDto);
	}

	private List<Stock> selectByProductId(List<Stock> listStockByProductIds, Long id) {
		List<Stock> result = new ArrayList<>();
		for (Stock stock : listStockByProductIds) {
			if (id.equals(stock.getProductId())) {
				result.add(stock);
			}
		}
		return result;
	}

	private StockDetailDto convertToDto(List<Stock> stocksByProductId, Float maxInStock, Float minInStock,
			Pageable pageable) {

		StockDetailDto stDetailDto = new StockDetailDto();

		Stock stock = stocksByProductId.get(0);
		Float sumQuantityAllStorage = 0F;
		Long sumProductPriceAllStorage = 0L;
		List<StockQuantityByStorageDto> listStockQuantityByStorageDto = new ArrayList<>();
		stDetailDto.setId(stock.getId());
		stDetailDto.setProductId(stock.getProductId());
		stDetailDto.setProductCategory(stock.getProduct().getProductCategory());
		stDetailDto.setSupplier(stock.getProduct().getSupplier());
		stDetailDto.setProductCode(stock.getProduct().getCode());
		stDetailDto.setProductSize(stock.getProduct().getSize());
		stDetailDto.setProductUnit(stock.getProduct().getUnit());
		stDetailDto.setProductPrice(stock.getProduct().getPrice());
		stDetailDto.setProductName(stock.getProduct().getName());
		for (Stock st : stocksByProductId) {
			listStockQuantityByStorageDto.add(stockQuantityByStorageDto(st));
		}

		stDetailDto.setListQuantityByStorage(listStockQuantityByStorageDto);
		for (Integer i = 0; i < listStockQuantityByStorageDto.size(); i++) {
			sumQuantityAllStorage += listStockQuantityByStorageDto.get(i).getTotalQuantity();
			sumProductPriceAllStorage += listStockQuantityByStorageDto.get(i).getTotalPrice();
		}
		stDetailDto.setTotalQuantityAllStorage(sumQuantityAllStorage);
		stDetailDto.setTotalProductPriceAllStorage(sumProductPriceAllStorage);

		return stDetailDto;
	}

	private StockQuantityByStorageDto stockQuantityByStorageDto(Stock stock) {
		if (stock.getStorageLocation() != null) {
			StockQuantityByStorageDto stockQuantityByStorageDto = new StockQuantityByStorageDto();
			stockQuantityByStorageDto.setStockId(stock.getId());
			stockQuantityByStorageDto.setStorageLocationId(stock.getStorageLocationId());
			stockQuantityByStorageDto.setTotalQuantity(stock.getQuantity());
			stockQuantityByStorageDto.setTotalPrice(stock.getLatestProductPrice());
			return stockQuantityByStorageDto;
		} else {
			return null;
		}

	}

}
