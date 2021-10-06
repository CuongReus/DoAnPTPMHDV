package com.logsik.taman.controller;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.domain.ResourceItem;
import com.logsik.taman.dtos.ResourceItemDTO;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.queries.ResourceItemSpecification;
import com.logsik.taman.repository.ResourceItemRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class ResourceItemController extends AbstractController {

	@Autowired
	private ResourceItemRepository resourceItemRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("resourceItem/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		ResourceItem resourceItem = resourceItemRepository.findById(id).get();
	
		return new RestResult(resourceItem);
	}

	@RequestMapping(value = "/resourceItem/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody ResourceItemDTO resourceItemDto) {
		try {
			ResourceItem newResourceItem =  resourceItemRepository.save(dtoConverter.convertToResourceItem(resourceItemDto));
			return new RestResult(newResourceItem);
		} catch (Exception e) {
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	
	@RequestMapping(value = "/resourceItem/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody ResourceItemDTO resourceItemDto) {
		try {
			ResourceItem updatedResourceItem = resourceItemRepository.save(dtoConverter.convertToResourceItem(resourceItemDto));
			return new RestResult(updatedResourceItem);
		} catch (Exception e) {
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}


	@DeleteMapping("/resourceItem/{id}")
	public RestResult deleteresourceItem(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete resourceItem with ID = " + id + "...");

		try {
			resourceItemRepository.deleteById(id);
		} catch (Exception e) {
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "resourceItem/list")
	public RestResult list(
			@RequestParam("search") String search,
			@RequestParam("type") String type,
			@RequestParam("userId") String userId,
			Pageable pageable) throws ParseException {
		
		Object result;
		result = resourceItemRepository.findAll(new ResourceItemSpecification(search, type, userId),pageable);
		return new RestResult(result);
	}
	
	@RequestMapping(value = "resourceItem/listAll")
	public RestResult listAll() {
		return new RestResult(resourceItemRepository.findAll());
	}
	
	

}
