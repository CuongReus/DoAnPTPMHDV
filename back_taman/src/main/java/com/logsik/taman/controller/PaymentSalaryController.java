//package com.logsik.taman.controller;
//
//import java.util.Optional;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Pageable;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.logsik.taman.domain.PaymentSalary;
//import com.logsik.taman.dtos.RestResult;
//import com.logsik.taman.repository.PaymentSalaryRepository;
//import com.logsik.taman.service.impl.DtoConverter;
//
//@RestController
//@RequestMapping("/api")
//public class PaymentSalaryController extends AbstractController {
//	private static final Logger LOGGER = LoggerFactory.getLogger(PaymentSalaryController.class);
//
//	@Autowired
//	private PaymentSalaryRepository paymentSalaryRepository;
//
//	@Autowired
//	private DtoConverter dtoConverter;
//
//	@RequestMapping("paymentSalary/{id}")
//	public RestResult findById(@PathVariable(value = "id") Long id) {
//		return new RestResult(paymentSalaryRepository.findById(id));
//	}
//
//	@RequestMapping(value = "/paymentSalary/add", method = RequestMethod.POST)
//	public RestResult add(@RequestBody PaymentSalaryD paymentSalary) {
//		try {
//			PaymentSalary newpaymentSalary = paymentSalaryRepository.save(paymentSalary);
//			return new RestResult(newpaymentSalary);
//		} catch (Exception e) {
//			LOGGER.error("Error when adding paymentSalary.", e);
//			return new RestResult(true, MESSAGE_CANNOT_SAVE);
//		}
//	}
//
//	@RequestMapping(value = "/paymentSalary/update", method = RequestMethod.POST)
//	public RestResult update(@RequestBody PaymentSalary paymentSalary) {
//		try {
//			Optional<PaymentSalary> source = paymentSalaryRepository.findById(paymentSalary.getId());
//			PaymentSalary updatedPaymentSalary = paymentSalaryRepository.save(dtoConverter.fillPaymentSalaryForm(source.get(), paymentSalary));
//			return new RestResult(updatedPaymentSalary);
//		} catch (Exception e) {
//			LOGGER.error("Error when updating paymentSalary.", e);
//			return new RestResult(true, MESSAGE_CANNOT_SAVE);
//		}
//	}
//
//	@DeleteMapping("/paymentSalary/{id}")
//	public RestResult deletepaymentSalary(@PathVariable("id") Long id) throws Exception{
//		System.out.println("Delete paymentSalary with ID = " + id + "...");
//
//		try {
//			paymentSalaryRepository.deleteById(id);
//		} catch (Exception e) {
//			LOGGER.error("Error when delete paymentSalary.", e);
//			return new RestResult(true, MESSAGE_CANNOT_SAVE);
//		}
//
//		return new RestResult("ok");
//	}
//
//	@RequestMapping(value = "/paymentSalary/list")
//	public RestResult list(@RequestParam("search") Long id, Pageable pageable) {
//		Object result;
//			result = paymentSalaryRepository.findAll(pageable);
//		return new RestResult(result);
//	}
//	@RequestMapping(value = "/paymentSalary/listAll")
//	public RestResult listAll() {
//		return new RestResult (paymentSalaryRepository.findAll());
//	}
//}
