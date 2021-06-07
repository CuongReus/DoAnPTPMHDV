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

import com.logsik.taman.domain.StorageLocation;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.StorageLocationDto;
import com.logsik.taman.repository.StorageLocationRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.StorageLocationService;

@RestController
@RequestMapping("/api")
public class StorageLocationController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(StorageLocationController.class);

	@Autowired
	private StorageLocationRepository storageLocationRepository;

	@Autowired
	private DtoConverter dtoConverter;
	
	@Autowired
	private StorageLocationService storageLocationService;

	@RequestMapping("storageLocation/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {

		return new RestResult(storageLocationRepository.findById(id));
	}

	@RequestMapping(value = "/storageLocation/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody StorageLocationDto storageLocationDto) {
		try {
			StorageLocation newStorageLocation = storageLocationRepository.save(dtoConverter.convertToStorageLocation(storageLocationDto));
			storageLocationService.addProductToStock(newStorageLocation);
			return new RestResult(newStorageLocation);
		} catch (Exception e) {
			LOGGER.error("Error when adding contract.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/storageLocation/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody StorageLocationDto storageLocationDto) {
		try {

			StorageLocation updatedStorageLocation = storageLocationRepository.save(dtoConverter.convertToStorageLocation(storageLocationDto));

			return new RestResult(updatedStorageLocation);
		} catch (Exception e) {
			LOGGER.error("Error when updating storageLocation.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/storageLocation/{id}")
	public RestResult deletecontract(@PathVariable("id") Long id) throws Exception{
		System.out.println("Delete contract with ID = " + id + "...");

		try {
			storageLocationRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete storageLocation.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/storageLocation/list")
	public RestResult list(@RequestParam("search") Long search, Pageable pageable) {
		Object result;
			result = storageLocationRepository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/storageLocation/listAll")
	public RestResult listAll() {
		return new RestResult(storageLocationRepository.findAll());

	}

}
