package com.logsik.taman.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.domain.FileUpload;
import com.logsik.taman.domain.Stock;
import com.logsik.taman.domain.StockMovement;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.StockMovementDto;
import com.logsik.taman.dtos.UploadFileResponse;
import com.logsik.taman.enums.MovementType;
import com.logsik.taman.queries.StockMovementSpecification;
import com.logsik.taman.repository.FileUploadRepository;
import com.logsik.taman.repository.StockMovementRepository;
import com.logsik.taman.repository.StockRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.StockService;

@RestController
@RequestMapping("/api")
@Transactional
public class StockMovementController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(StockMovementController.class);

	@Autowired
	private StockMovementRepository stockMovementRepository;
	@Autowired
	private StockRepository stockRepository;
	@Autowired
	private FileUploadRepository fileUploadRepository;
	@Autowired
	private DtoConverter dtoConverter;

	@Autowired
	private StockService stockService;

	@RequestMapping("stockMovement/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		Optional<StockMovement> stockMovement = stockMovementRepository.findById(id);
		List<FileUpload> movementStockReportFile = fileUploadRepository
				.findByCrmTableNameAndCrmLinkId("StockMovementReport_"+stockMovement.get().getMovementType(), stockMovement.get().getId());
		return new RestResult(dtoConverter.convertToStockMovementDto(stockMovement.get(), movementStockReportFile));
	}

	@RequestMapping(value = "/stockMovement/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody StockMovementDto stockMovementDto) {
		try {
			StockMovement stockMovement = dtoConverter.convertToStockMovement(stockMovementDto);
			StockMovement newStockMovement = stockMovementRepository.save(stockMovement);
			saveNewStockMovementReportFile(newStockMovement, stockMovementDto.getMovementStockInputReportFile());
			Optional<Stock> currentStock = stockRepository.findById(stockMovementDto.getStockId());
			stockService.updateMovementToStock(currentStock.get());
			return new RestResult(newStockMovement);
		} catch (Exception e) {
			LOGGER.error("Error when adding stockMovement.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}
	
	@RequestMapping(value = "/stockMovement/addList", method = RequestMethod.POST)
	public RestResult addList(@RequestBody List<StockMovementDto> listStockMovementDto) {
		try {
			for(StockMovementDto stMv : listStockMovementDto ) {
				Optional<Stock> currentStock = stockRepository.findById(stMv.getStockId());
					stockMovementRepository.save(dtoConverter.convertToStockMovement(stMv));
					stockService.updateMovementToStock(currentStock.get());
			} 
			return new RestResult("ADD_LIST_SUCCESS");
		} catch (Exception e) {
			LOGGER.error("Error when adding stockMovement.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	private void saveNewStockMovementReportFile(StockMovement stockMovement,
			List<UploadFileResponse> movementStockReportFile) {
		for (UploadFileResponse file : movementStockReportFile) {
			FileUpload StockReportFile = new FileUpload();
			StockReportFile.setName(file.getFileName());
			StockReportFile.setFileLocation(file.getFileDownloadUri());
			StockReportFile.setSize(file.getSize());
			StockReportFile.setCrmLinkId(stockMovement.getId());
			StockReportFile.setCrmTableName("StockMovementReport_"+stockMovement.getMovementType());
			stockMovement.setMovementStockReport(file.getFileDownloadUri());
			fileUploadRepository.save(StockReportFile);
		}
	}

	@RequestMapping(value = "/stockMovement/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody StockMovementDto stockMovementDto) {
		try {
			StockMovement updatedStockMovement = stockMovementRepository
					.save(dtoConverter.convertToStockMovement(stockMovementDto));

			updateStockMovementReportFile(updatedStockMovement, stockMovementDto.getMovementStockInputReportFile());
			Optional<Stock> currentStock = stockRepository.findById(stockMovementDto.getStockId());
//			Source is old Object
			stockService.updateMovementToStock(currentStock.get());
			return new RestResult(updatedStockMovement);
		} catch (Exception e) {
			LOGGER.error("Error when updating stockMovement.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	private void updateStockMovementReportFile(StockMovement stockMovement,
			List<UploadFileResponse> movementStockReportFile) {
		List<FileUpload> currenStockMovementReportFiles = fileUploadRepository
				.findByCrmTableNameAndCrmLinkId("StockMovementReport_"+stockMovement.getMovementType(), stockMovement.getId());
		List<String> currentReportFiles = currenStockMovementReportFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newStockMovementReportString = movementStockReportFile.stream().map(e -> e.getFileName())
				.collect(Collectors.toList());
		for (FileUpload StockReportFile : currenStockMovementReportFiles) {
			if (!newStockMovementReportString.contains(StockReportFile.getName())) {
				fileUploadRepository.delete(StockReportFile);
			}

		}
		for (UploadFileResponse newStockReportFile : movementStockReportFile) {
			if (!currentReportFiles.contains(newStockReportFile.getFileDownloadUri())) {
				FileUpload StockReportFile = new FileUpload();
				StockReportFile.setCrmTableName("StockMovementReport_"+stockMovement.getMovementType());
				StockReportFile.setCrmLinkId(stockMovement.getId());
				StockReportFile.setName(newStockReportFile.getFileName());
				StockReportFile.setFileLocation(newStockReportFile.getFileDownloadUri());
				StockReportFile.setSize(newStockReportFile.getSize());
				stockMovement.setMovementStockReport(newStockReportFile.getFileDownloadUri());
				fileUploadRepository.save(StockReportFile);
			} else if (currentReportFiles.contains(newStockReportFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}

		}

	}

	@DeleteMapping("/stockMovement/{id}")
	public RestResult deleteContract(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete contract with ID = " + id + "...");
		try {
			Optional<StockMovement>  source = stockMovementRepository.findById(id);
			Optional<Stock> currentStock = stockRepository.findById(source.get().getStockId());
			stockMovementRepository.deleteById(id);
			if (currentStock.isPresent()) {
					stockService.updateMovementToStock(currentStock.get());
			}

		} catch (Exception e) {
			LOGGER.error("Error when delete stockMovement.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/stockMovement/list")
	public RestResult list(@RequestParam("movementType") String movementType,@RequestParam("search") String search, Pageable pageable) {
		Object result=null;
		if(StringUtils.isEmpty(search)) {
			result = stockMovementRepository.findByMovementType(MovementType.valueOf(movementType), pageable);
		}
		return new RestResult(result);
	}
	@RequestMapping(value = "/stockMovement/listFindByProductId")
	public RestResult listFindByProductId(@RequestParam("productId") Long productId) {
		Object result=null;
			result = stockMovementRepository.findByProductId(productId);
		return new RestResult(result);
	}
	@RequestMapping(value = "/stockMovement/listAll")
	public RestResult listAll() {
		return new RestResult(stockMovementRepository.findAll());

	}
	
	
	@RequestMapping(value = "/stockMovement/pageFindByReportCondition")
	public RestResult pageFindByReportCondition(
				@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date startDate,
				@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date endDate,
				@RequestParam("productCategoryId") String productCategoryId,
				@RequestParam("supplierId") String supplierId,
				@RequestParam("storageLocationId") List<String> storageLocationId,
				Pageable pageable) {
		return new RestResult(stockMovementRepository.findAll(new StockMovementSpecification(startDate, endDate, productCategoryId, supplierId, storageLocationId),pageable));
	}
	
	@RequestMapping(value = "/stockMovement/listFindByReportCondition")
	public RestResult listFindByReportCondition(
				@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date startDate,
				@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date endDate,
				@RequestParam("productCategoryId") String productCategoryId,
				@RequestParam("supplierId") String supplierId,
				@RequestParam("storageLocationId") List<String> storageLocationId) {
		return new RestResult(stockMovementRepository.findAll(new StockMovementSpecification(startDate, endDate, productCategoryId, supplierId, storageLocationId)));
	}

}
