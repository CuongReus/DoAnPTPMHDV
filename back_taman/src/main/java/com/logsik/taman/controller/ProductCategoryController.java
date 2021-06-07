package com.logsik.taman.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.domain.ProductCategory;
import com.logsik.taman.dtos.ProductCategoryDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.repository.ProductCategoryRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.ProductCategoryService;

@RestController
@RequestMapping("/api")
public class ProductCategoryController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(ProductCategoryController.class);

	@Autowired
	private ProductCategoryRepository productCategoryRepository;

	@Autowired
	private DtoConverter dtoConverter;
	
	@Autowired
	private ProductCategoryService productCategoryService;

	@RequestMapping("productCategory/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {

		return new RestResult(productCategoryRepository.findById(id));
	}

	@RequestMapping(value = "/productCategory/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody ProductCategoryDto productCategoryDto) {
		try {
			ProductCategory newProductCategory = productCategoryRepository.save(dtoConverter.convertToProductCategory(productCategoryDto));

			return new RestResult(newProductCategory);
		} catch (Exception e) {
			LOGGER.error("Error when adding contact.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	
	@RequestMapping(value="/productCategory/updateSalesMarginForProduct",method =RequestMethod.POST)
	public RestResult updateSalesMarginForProduct(@RequestParam("productCategoryId") Long productCategoryId) {
		try {
			productCategoryService.updateMinDiscountProductByPC(productCategoryId);
			return new RestResult("UPDATE_SALES_MARGIN_COMPLETE");
		} catch (Exception e) {
			LOGGER.error("Error when adding contact.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	
	@RequestMapping(value="/productCategory/updateSalesMarginForAllProduct",method =RequestMethod.POST)
	public RestResult updateMinDiscountForAllProduct() {
		try {
			productCategoryService.updateMinDiscountForAllProduct();
			return new RestResult("UPDATE_SALES_MARGIN_COMPLETE");
		} catch (Exception e) {
			LOGGER.error("Error when adding contact.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	
	@RequestMapping(value = "/productCategory/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody ProductCategoryDto productCategoryDto) {
		try {

			ProductCategory updatedProductCategory = productCategoryRepository.save(dtoConverter.convertToProductCategory(productCategoryDto));

			return new RestResult(updatedProductCategory);
		} catch (Exception e) {
			LOGGER.error("Error when updating productCategory.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/productCategory/{id}")
	public RestResult deleteProductCategory(@PathVariable("id") Long id) throws Exception{
		System.out.println("Delete contract with ID = " + id + "...");

		try {
			productCategoryRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete productCategory.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/productCategory/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result = null;
		if(StringUtils.isEmpty(search)) {
			result = productCategoryRepository.findAllByOrderBySupplierIdAsc(pageable);
		}else {
			result = productCategoryRepository.findByNameContainingOrCodeContainingOrderBySupplierIdAsc(search,search, pageable);
		}
			
		return new RestResult(result);
	}

	@RequestMapping(value = "/productCategory/listAll")
	public RestResult listAll() {
		return new RestResult(productCategoryRepository.findAll());

	}

}
