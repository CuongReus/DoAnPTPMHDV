package com.logsik.taman.controller;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.domain.Sale;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.SaleDto;
import com.logsik.taman.dtos.SaleWithSumMoneyDto;
import com.logsik.taman.dtos.SumStockQuantityAndPrice;
import com.logsik.taman.enums.ApprovalStatus;
import com.logsik.taman.enums.PaymentStatus;
import com.logsik.taman.queries.SaleSpecification;
import com.logsik.taman.queries.StockSpecification;
import com.logsik.taman.repository.SaleRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.SaleService;

@RestController
@RequestMapping("/api")
@Transactional
public class SaleController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(SaleController.class);
	public static String DUPPLICATE_ENTRY_ORDER_CODE = "Trùng mã đơn hàng ! Vui lòng thử lại.";
	@Autowired
	private SaleRepository saleRepository;
	@Autowired
	private DtoConverter dtoConverter;
	@Autowired
	private SaleService saleService;

	@RequestMapping("sale/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(saleRepository.findById(id));
	}

	@RequestMapping(value = "sale/updateTotalMoneyWithDiscountPercent", method = RequestMethod.POST)
	public RestResult updateTotalMoneyWithDiscountPercent() {

		try {
			saleService.updateActualMoneyForAllSale();
			return new RestResult("UPDATE_SALE_ACTUAL_MONEY_SUCCESS");
			

		} catch (Exception e) {
			LOGGER.error("Error when adding sale.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/sale/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody SaleDto saleDto) throws Exception {
		try {

			try {
				Sale newSale = saleRepository.save(dtoConverter.convertToSale(saleDto));
				return new RestResult(newSale);
			} catch (DataIntegrityViolationException e) {
				LOGGER.error("Error when adding sale.", e);
				return new RestResult(DUPPLICATE_ENTRY_ORDER_CODE);
			}
//			

		} catch (Exception e) {
			LOGGER.error("Error when adding sale.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/sale/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody SaleDto saleDto) {
		try {
			Sale updatedSale = saleRepository.save(dtoConverter.convertToSale(saleDto));

			return new RestResult(updatedSale);
		} catch (Exception e) {
			LOGGER.error("Error when updating sale.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/sale/{id}")
	public RestResult deleteSale(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete sale with ID = " + id + "...");

		try {
			saleRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete Sale.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/sale/list")
//	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult list(Pageable pageable) {
		Object result;
		result = saleRepository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/sale/listFindById")
//	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult listFindById(@RequestParam("id") Long id) {
		Object result;
		result = saleRepository.findById(id);
		return new RestResult(result);
	}

	@RequestMapping(value = "/sale/listFindByPurchasedDate_PaymentStatus_ApprovalStatus")
//	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult listSaleWithPagination(@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date startPurchasedDate,
			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date endPurchasedDate,
			@RequestParam("paymentStatus") String paymentStatus, @RequestParam("approvalStatus") String approvalStatus,
			@RequestParam("orderCode") String orderCode,
			@RequestParam("supplierId") String supplierId,
			Pageable pageable) {
		SaleWithSumMoneyDto saleWithSumMoneyDto;

//		if(!paymentStatus.equals("ALL") && !approvalStatus.equals("ALL")) {
//			saleWithSumMoneyDto = saleRepository.sumSaleMoney(startPurchasedDate, endPurchasedDate,ApprovalStatus.valueOf(approvalStatus), PaymentStatus.valueOf(paymentStatus));
//		}else if(!paymentStatus.equals("ALL") && approvalStatus.equals("ALL") ){
//			saleWithSumMoneyDto = saleRepository.sumSaleMoneyWithApprovalStatusALL(startPurchasedDate, endPurchasedDate,  PaymentStatus.valueOf(paymentStatus));
//		}else if(paymentStatus.equals("ALL") && !approvalStatus.equals("ALL")){
//			saleWithSumMoneyDto = saleRepository.sumSaleMoneyWithPaymentStatusALL(startPurchasedDate, endPurchasedDate, ApprovalStatus.valueOf(approvalStatus));
//		}else {
//			saleWithSumMoneyDto = saleRepository.sumSaleMoneyWithALLStatus(startPurchasedDate, endPurchasedDate);
//		}

		Object result;
		result = saleRepository.findAll(new SaleSpecification(startPurchasedDate, endPurchasedDate, paymentStatus,
				approvalStatus, "ALL", "", "", supplierId), pageable);
		saleWithSumMoneyDto = saleService.getSaleWithSumMoneyDto(new SaleSpecification(startPurchasedDate,
				endPurchasedDate, paymentStatus, approvalStatus, "", "", "", supplierId));
		saleWithSumMoneyDto.setSaleObject(result);

		// result.(hello);
		return new RestResult(saleWithSumMoneyDto);
	}

	@RequestMapping(value = "/sale/listFindByPurchasedDateBetween_PaymentStatus_ContactStatus")
//	@PreAuthorize("hasAuthority('ADMIN')")
	public RestResult listSale(@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date startPurchasedDate,
			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date endPurchasedDate,
			@RequestParam("paymentStatus") String paymentStatus, @RequestParam("contactStatus") String contactStatus,
			@RequestParam("contactName") String contactName, Pageable pageable) {
		Object result;
		result = saleRepository.findAll(new SaleSpecification(startPurchasedDate, endPurchasedDate, paymentStatus,
				"ALL", contactStatus, "", contactName, "ALL"));
		// result.(hello);
		return new RestResult(result);
	}

	@RequestMapping(value = "/sale/listAll")
	public RestResult listAll() {
		return new RestResult(saleRepository.findAll());

	}

//	@RequestMapping(value = "/sale/listFindByPurchasedDate_PaymentStatus_ApprovalStatus")
//	public RestResult listFindByPurchasedDateAndPaymentStatusAndApprovalStatus(
//			
//			) {
//		return new RestResult(saleRepository.findAll());
//
//	}

}
