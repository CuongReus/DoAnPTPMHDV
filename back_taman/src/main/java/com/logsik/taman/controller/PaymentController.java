package com.logsik.taman.controller;

import java.util.Optional;

import javax.transaction.Transactional;

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

import com.logsik.taman.domain.Payment;
import com.logsik.taman.dtos.PaymentDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.mail.MailClient;
import com.logsik.taman.repository.PaymentRepository;
import com.logsik.taman.repository.ProjectCostRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.ProjectCostService;

@RestController
@RequestMapping("/api")
@Transactional
public class PaymentController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(PaymentController.class);

	@Autowired
	private PaymentRepository paymentRepository;

	@Autowired
	private DtoConverter dtoConverter;
	@Autowired
	private ProjectCostRepository projectCostRepository; 
	
	@Autowired
	private ProjectCostService projectCostService; 
	
	@Autowired
	private MailClient mailClient;

	@RequestMapping("payment/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(paymentRepository.findById(id));
	}
	@RequestMapping(value = "/payment/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody PaymentDto paymentDto) {
		try {
			Payment newPayment = dtoConverter.convertToPayment(paymentDto);
			newPayment = paymentRepository.save(newPayment);
			projectCostService.updateTotalPaidByProjectCost(paymentDto.getProjectCostId());
			mailClient.approvalPayment(newPayment);
			if(newPayment.getNotifyTo() != null) {
				String[] listEmail =   newPayment.getNotifyTo().split(",");
				if(listEmail.length != 0) {
					mailClient.sendPaymentNotifyTo(newPayment);
				}
				}
			return new RestResult(newPayment);
		} catch (Exception e) {
			LOGGER.error("Error when adding payment.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	@RequestMapping(value = "/payment/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody PaymentDto paymentDto) {
		try {
			
			Payment updatedPayment = paymentRepository.save(dtoConverter.convertToPayment(paymentDto));
			
			projectCostService.updateTotalPaidByProjectCost(updatedPayment.getProjectCostId());
			mailClient.approvalPayment(updatedPayment);
			if(updatedPayment.getNotifyTo() != null) {
			String[] listEmail =   updatedPayment.getNotifyTo().split(",");
			if(listEmail.length != 0) {
				mailClient.sendPaymentNotifyTo(updatedPayment);
			}
			}
			return new RestResult(updatedPayment);
		} catch (Exception e) {
			LOGGER.error("Error when updating payment.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	@DeleteMapping("/payment/{id}")
	public RestResult deletepayment(@PathVariable("id") Long id) throws Exception{
		System.out.println("Delete payment with ID = " + id + "...");

		try {
			Optional<Payment> source = paymentRepository.findById(id);
			paymentRepository.deleteById(id);
//			After delete calculate again total Paid
			projectCostService.updateTotalPaidByProjectCost(source.get().getProjectCostId());
		
		} catch (Exception e) {
			LOGGER.error("Error when delete payment.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/payment/list")
	public RestResult list(@RequestParam("search") Long search, Pageable pageable) {
		Object result;
			result = paymentRepository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/payment/listAll")
	public RestResult listAll() {
		return new RestResult(paymentRepository.findAll());

	}
	@RequestMapping(value = "/payment/listFindByProjectCostId")
	public RestResult listFindByProjectCostId(@RequestParam("projectCostId") Long projectCostId) {
		return new RestResult(paymentRepository.findByProjectCostId(projectCostId));

	}
}
