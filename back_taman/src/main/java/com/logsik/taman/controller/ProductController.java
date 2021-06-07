package com.logsik.taman.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.domain.Product;
import com.logsik.taman.dtos.ProductDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.queries.ProductSpecification;
import com.logsik.taman.repository.ProductRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.StockService;

@RestController
@RequestMapping("/api")
@Transactional
public class ProductController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(ProductController.class);

	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private StockService stockService;
	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("product/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(productRepository.findById(id));
	}

	@RequestMapping(value = "/product/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody ProductDto productDto) {
		try {
			Product product = dtoConverter.convertToProduct(productDto);
			product = productRepository.save(product);
			stockService.createNewInputProductToStock(product);

//			Build addStockFromProductService
			return new RestResult(product);
		} catch (Exception e) {
			LOGGER.error("Error when adding contract.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/product/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody ProductDto productDto) {
		try {
			Product updatedcontract = productRepository.save(dtoConverter.convertToProduct(productDto));
			
			return new RestResult(updatedcontract);
		} catch (Exception e) {
			LOGGER.error("Error when updating product.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/product/{id}")
	public RestResult deleteProduct(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete contract with ID = " + id + "...");

		try {
			stockService.removeProductFromStock(id);
			productRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete product.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/product/listFindByProductCategoryAndProductName")
	public RestResult list(@RequestParam("productCategoryId") String productCategoryId,
			@RequestParam("productName") String productName,
			@RequestParam("productSize") List<String> productSize, 
			@RequestParam("productUnit") List<String> productUnit,
			Pageable pageable) {
		Object result = productRepository.findAll(new ProductSpecification(productName,productCategoryId,productUnit,productSize ), pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/product/listAll")
	public RestResult listAll() {
		return new RestResult(productRepository.findAll());

	}

}
