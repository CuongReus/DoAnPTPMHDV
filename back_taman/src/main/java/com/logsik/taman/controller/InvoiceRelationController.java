package com.logsik.taman.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.repository.InvoiceRelationRepository;

@RestController
@RequestMapping("/api")
public class InvoiceRelationController extends AbstractController {

	@Autowired
	private InvoiceRelationRepository invoiceRelationRepository;
	
	@RequestMapping(value = "/invoiceRelation/listByprojectDetail")
	public RestResult listAll(@RequestParam("projectDetailId") Long projectDetailId) {
		return new RestResult(invoiceRelationRepository.findByProjectDetailId(projectDetailId));
	}

}