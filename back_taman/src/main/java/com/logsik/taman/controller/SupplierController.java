package com.logsik.taman.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.domain.Supplier;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.SupplierDto;
import com.logsik.taman.enums.SupplierType;
import com.logsik.taman.queries.SupplierSpecification;
import com.logsik.taman.repository.SupplierRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class SupplierController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(SupplierController.class);

	@Autowired
	private SupplierRepository supplierRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("supplier/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(supplierRepository.findById(id));
	}

	@RequestMapping(value = "/supplier/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody SupplierDto supplierDto) {
		try {
			Supplier newSupplier = supplierRepository.save(dtoConverter.convertToSupplier(supplierDto));

			return new RestResult(newSupplier);
		} catch (Exception e) {
			LOGGER.error("Error when adding contract.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/supplier/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody SupplierDto supplierDto) {
		try {

			Supplier updatedSupplier = supplierRepository.save(dtoConverter.convertToSupplier(supplierDto));
			return new RestResult(updatedSupplier);
		} catch (Exception e) {
			LOGGER.error("Error when updating supplier.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	@DeleteMapping("/supplier/{id}")
	public RestResult deletecontract(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete supplier with ID = " + id + "...");

		try {
			supplierRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete supplier.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}
		return new RestResult("ok");
	}

	@RequestMapping(value = "/supplier/list")
	public RestResult list(@RequestParam("type") String type, Pageable pageable,@RequestParam("supplierName") String supplierName) {
		Object result;
		result = supplierRepository.findAll(new SupplierSpecification(supplierName,type),pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/supplier/listAll")
	public RestResult listAll() {
		return new RestResult(supplierRepository.findAll());

	}
	
	@RequestMapping(value = "/supplier/listFindByType")
	public RestResult listFindByType(@RequestParam("type") SupplierType supplierType) {
		return new RestResult(supplierRepository.findByType(supplierType));
	}
}
