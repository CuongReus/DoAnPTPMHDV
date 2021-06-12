package com.logsik.taman.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.domain.CloseProject;
import com.logsik.taman.domain.FileUpload;
import com.logsik.taman.domain.ProjectCost;
import com.logsik.taman.domain.User;
import com.logsik.taman.dtos.ProjectCostDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.StatisticalInvoiceDTO;
import com.logsik.taman.dtos.SumMonthProjectCostDto;
import com.logsik.taman.dtos.SumYearProjectCostDto;
import com.logsik.taman.dtos.UploadFileResponse;
import com.logsik.taman.enums.ProjectCostStatus;
import com.logsik.taman.enums.ProjectPaymentType;
import com.logsik.taman.mail.MailClient;
import com.logsik.taman.queries.ProjectCostSpecification;
import com.logsik.taman.repository.CloseProjectRepository;
import com.logsik.taman.repository.FileUploadRepository;
import com.logsik.taman.repository.ProjectCostRepository;
import com.logsik.taman.repository.QuotationRepository;
import com.logsik.taman.repository.UserRepository;
import com.logsik.taman.service.impl.DtoConverter;
import com.logsik.taman.service.impl.LabourCostService;
import com.logsik.taman.service.impl.ProjectCostService;
import com.logsik.taman.service.impl.TimeService;

@RestController
@RequestMapping("/api")
@Transactional
public class ProjectCostController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(ProjectCostController.class);
	@Autowired
	private ProjectCostRepository projectCostRepository;
	@Autowired
	private ProjectCostService projectCostService;
	@Autowired
	private FileUploadRepository fileUploadRepository;
	@Autowired
	private LabourCostService labourCostService;
	@Autowired
	private DtoConverter dtoConverter;
	@Autowired
	private MailClient mailClient;
	@Autowired
	private CloseProjectRepository closeProjectRepository;
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private QuotationRepository quotationRepository;
	
	@Autowired
	private TimeService timeService;

	@RequestMapping("projectCost/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		Optional<ProjectCost> projectCost = projectCostRepository.findById(id);
		List<FileUpload> projectCostFile = fileUploadRepository.findByCrmTableNameAndCrmLinkId("ProjectCostFile",
				projectCost.get().getId());
		return new RestResult(dtoConverter.convertToProjectCostDto(projectCost.get(), projectCostFile));
	}

	@RequestMapping("projectCostGetHibernateEntity/{id}")
	public RestResult getHibernateEntity(@PathVariable(value = "id") Long id) {
		Optional<ProjectCost> projectCost = projectCostRepository.findById(id);
		return new RestResult(projectCost);
	}

	@RequestMapping(value = "/projectCost/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody ProjectCostDto projectCostDto) {
		try {
			ProjectCost newProjectCost = null;
			// Check Lot

			if(newProjectCost.getTotalMoney() - newProjectCost.getTotalPaid() == 0) {
				newProjectCost.setCloseDate(new Date());
				newProjectCost.setStatus(ProjectCostStatus.DA_THANH_TOAN_DU);
				projectCostRepository.save(newProjectCost);
				projectCostService.ApprovalAllPayment(newProjectCost);
			}else {
				projectCostRepository.save(newProjectCost);
			}

			// Just use for ProjectCost of Labour.
			if ("NHAN_CONG".equals(projectCostDto.getPaymentType().toString())) {
				labourCostService.getAllPaymentFollowByProjectCost(newProjectCost, newProjectCost.getStartWorkDate(),
						newProjectCost.getEndWorkDate());

				mailClient.approvalLabourCost(newProjectCost);

			} else {
				mailClient.approvalProjectCost(newProjectCost);
			}
			if (newProjectCost.getNotifyTo() != null) {
				String[] listEmail = newProjectCost.getNotifyTo().split(",");
				if (listEmail.length != 0) {
					mailClient.sendProjectCostNotifyTo(newProjectCost);
				}
			}
//			This Method use for closeProject
			CloseProject closeProjectByProjectDetailId = closeProjectRepository
					.findByProjectDetailId(newProjectCost.getProjectDetailId());
			if (closeProjectByProjectDetailId != null) {
				projectCostService.setTotalWorkDoneMoney(closeProjectByProjectDetailId);
			}
//			End Method use for closeProject

			saveNewProjectCostFileFiles(newProjectCost, projectCostDto.getProjectCostFile());

			return new RestResult(newProjectCost);
		} catch (Exception e) {
			LOGGER.error("Error when adding projectCost.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	private void saveNewProjectCostFileFiles(ProjectCost projectCost, List<UploadFileResponse> projectCostFile) {
		User createdUser = userRepository.findById(projectCost.getCreatedUserId()).get();
		for (UploadFileResponse file : projectCostFile) {
			FileUpload pFile = new FileUpload();
			pFile.setName(file.getFileName());
			pFile.setFileLocation(file.getFileDownloadUri());
			pFile.setSize(file.getSize());
			pFile.setCrmLinkId(projectCost.getId());
			pFile.setCrmTableName("ProjectCostFile");
			pFile.setUploadBy(createdUser.getEmail());
			fileUploadRepository.save(pFile);
		}
	}

	@RequestMapping(value = "/projectCost/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody ProjectCostDto projectCostDto) {
		try {

			ProjectCost updatedProjectCost = null;
				
			if(updatedProjectCost.getTotalMoney() - updatedProjectCost.getTotalPaid() == 0) {
				updatedProjectCost.setCloseDate(new Date());
				updatedProjectCost.setStatus(ProjectCostStatus.DA_THANH_TOAN_DU);
				projectCostRepository.save(updatedProjectCost);
				projectCostService.ApprovalAllPayment(updatedProjectCost);
			}else {
				projectCostRepository.save(updatedProjectCost);
			}
			
//			// Just use for ProjectCost of Labour	
//			List<Payment> currentLabourPaymentByProjectCostId = paymentRepository.findByProjectCostId(updatedProjectCost.getId());
//			
			if ("NHAN_CONG".equals(projectCostDto.getPaymentType().toString())) {
				labourCostService.updateAllPaymentFollowByProjectCost(updatedProjectCost,
						updatedProjectCost.getStartWorkDate(), updatedProjectCost.getEndWorkDate());
				mailClient.approvalLabourCost(updatedProjectCost);
			} else {
				mailClient.approvalProjectCost(updatedProjectCost);
			}
			if (updatedProjectCost.getNotifyTo() != null) {
				String[] listEmail = updatedProjectCost.getNotifyTo().split(",");
				if (listEmail.length != 0) {
					mailClient.sendProjectCostNotifyTo(updatedProjectCost);
				}
			}
//			This Method use for closeProject
			CloseProject closeProjectByProjectDetailId = closeProjectRepository
					.findByProjectDetailId(updatedProjectCost.getProjectDetailId());
			if (closeProjectByProjectDetailId != null) {
				projectCostService.setTotalWorkDoneMoney(closeProjectByProjectDetailId);
			}
//			End Method use for closeProject
			updateProjectCostFile(updatedProjectCost, projectCostDto.getProjectCostFile());
			return new RestResult(updatedProjectCost);
		} catch (Exception e) {
			LOGGER.error("Error when updating projectCost.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/projectCost/approvalAll", method = RequestMethod.POST)
	public RestResult updateApprovalAll(@RequestBody ProjectCostDto projectCostDto) {
		try {
			ProjectCost source = projectCostRepository.findById(projectCostDto.getId()).get();
			source.setStatus(projectCostDto.getStatus());
			source.setNotifyTo(projectCostDto.getNotifyTo());
			source.setNotifyMessage(projectCostDto.getNotifyMessage());
//			source.setApprovalBy(projectCostDto.getApprovalBy());
			source.setCloseDate(projectCostDto.getCloseDate());
			source.setLastedUpdateUserId(projectCostDto.getLastedUpdateUserId());
			source.setLastedUpdateDate(projectCostDto.getLastedUpdateDate());
			projectCostService.ApprovalAllPayment(source);

//			// Just use for ProjectCost of Labour	
//			List<Payment> currentLabourPaymentByProjectCostId = paymentRepository.findByProjectCostId(updatedProjectCost.getId());
			if (source.getNotifyTo() != null) {
				String[] listEmail = source.getNotifyTo().split(",");
				if (listEmail.length != 0) {
					mailClient.sendProjectCostNotifyTo(source);
				}
			}
			return new RestResult(source);
		} catch (Exception e) {
			LOGGER.error("Error when updating projectCost.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	private void updateProjectCostFile(ProjectCost projectCost, List<UploadFileResponse> newProjectCostFile) {
		User lastedUpdateUser = userRepository.findById(projectCost.getLastedUpdateUserId()).get();
		List<FileUpload> currentProjectCostFiles = fileUploadRepository
				.findByCrmTableNameAndCrmLinkId("ProjectCostFile", projectCost.getId());
		List<String> currentProfiles = currentProjectCostFiles.stream().map(e -> e.getFileLocation())
				.collect(Collectors.toList());
		List<String> newProfilesString = newProjectCostFile.stream().map(e -> e.getFileName())
				.collect(Collectors.toList());
		for (FileUpload projectCostFile : currentProjectCostFiles) {
			if (!newProfilesString.contains(projectCostFile.getName())) {
				fileUploadRepository.delete(projectCostFile);
			}

		}
		for (UploadFileResponse newFile : newProjectCostFile) {
			if (!currentProfiles.contains(newFile.getFileDownloadUri())) {
				FileUpload userFile = new FileUpload();
				userFile.setCrmTableName("ProjectCostFile");
				userFile.setCrmLinkId(projectCost.getId());
				userFile.setName(newFile.getFileName());
				userFile.setFileLocation(newFile.getFileDownloadUri());
				userFile.setSize(newFile.getSize());
				userFile.setUploadBy(lastedUpdateUser.getEmail());
				fileUploadRepository.save(userFile);
			} else if (currentProfiles.contains(newFile.getFileDownloadUri())) {
				LOGGER.error("Duplicate File Name");
			}
		}

	}

	@DeleteMapping("/projectCost/{id}")
	public RestResult deleteprojectCost(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete projectCost with ID = " + id + "...");

		try {
			projectCostService.deleteAllPaymentFollowByProjectCostId(id);
			ProjectCost source = projectCostRepository.findById(id).get();
			projectCostRepository.deleteById(id);
			projectCostService.updateLotNumber(source.getProjectDetailId(), source.getPaymentType());
		} catch (Exception e) {
			LOGGER.error("Error when delete projectCost.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/projectCost/list")
	public RestResult list(@RequestParam("search") Long search, Pageable pageable) {
		Object result;
		result = projectCostRepository.findAll(pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/projectCost/listAll")
	public RestResult listAll() {
		return new RestResult(projectCostRepository.findAll());

	}

	@RequestMapping(value = "/projectCost/findByProjectDetailIdAndPaymentType")
	public RestResult findByProjectDetailIdAndPaymentType(@RequestParam("projectDetailId") Long projectDetailId,
			@RequestParam("paymentType") ProjectPaymentType projectPaymentType) {
		Object result;
		result = projectCostRepository.findByProjectDetailIdAndPaymentType(projectDetailId, projectPaymentType);
		return new RestResult(result);

	}

//	That Method for labourCost
	@RequestMapping(value = "/projectCost/findByProjectDetailIdAndPaymentTypeAndMonthAndYear")
	public RestResult findByProjectDetailIdAndPaymentTypeAndMonthAndYear(
			@RequestParam("projectDetailId") Long projectDetailId,
			@RequestParam("paymentType") ProjectPaymentType projectPaymentType, @RequestParam("month") Integer month,
			@RequestParam("year") Integer year) {

		Object result = null;

//		Not filter by month anymore
//		result = projectCostRepository.findByProjectDetailIdAndPaymentTypeAndMonthAndYear(projectDetailId,
//				projectPaymentType, month, year);
		result = projectCostRepository.findByProjectDetailIdAndPaymentType(projectDetailId,
				projectPaymentType);
		
//		result = labourCostService.getLabourCostList(listProjectCost, dateToWorkStart, dateToWorkEnd);
		return new RestResult(result);

	}

	@RequestMapping(value = "/projectCost/sumTotalPaidByCloseProject")
	public RestResult sumTotalPaidCloseProject(@RequestParam("projectDetailId") Long projectDetailId) {
		Object result = null;
		result = projectCostRepository.sumProjectCostTotalPaidDto(projectDetailId);
		return new RestResult(result);
	}

	@RequestMapping(value = "/projectCost/CheckPaidStatusByProjectId")
	public RestResult objectProjectPayment(@RequestParam("projectId") Long projectId) {
		return new RestResult(projectCostRepository.findByProjectDetailProjectIdAndStatus(projectId,
				ProjectCostStatus.CHUA_THANH_TOAN_DU));
	}

	@RequestMapping(value = "/projectCost/refreshLabourCost")
	public RestResult refreshLabourCostByMonth(
			@RequestParam("projectDetailId") Long projectDetailId,
			@RequestParam("month") Integer month, 
			@RequestParam("year") Integer year,
			@RequestParam("currentUserId") Long currentUserId) throws Exception {

		Object result = null;
		
//		Create projectCost for a month if not exist
		List<ProjectCost> projectCosts = projectCostRepository.findByProjectDetailIdAndPaymentTypeAndMonthAndYear(
				projectDetailId, ProjectPaymentType.NHAN_CONG, month, year);
//		List<ProjectCost> projectCosts = projectCostRepository.findByProjectDetailIdAndPaymentType(projectDetailId,
//				ProjectPaymentType.NHAN_CONG);
		if (projectCosts.size() == 0) {
			projectCosts.add(createNewProjectCost(projectDetailId, month, year, 1, currentUserId));
			projectCosts.add(createNewProjectCost(projectDetailId, month, year, 2, currentUserId));
		} if (projectCosts.size() == 1) {
			ProjectCost projectCost = projectCosts.get(0);
			labourCostService.updateAllPaymentFollowByProjectCost(projectCost, projectCost.getStartWorkDate(),
					projectCost.getEndWorkDate());
			projectCosts.add(createNewProjectCost(projectDetailId, month, year, 2, currentUserId));
		} else {
			for (ProjectCost projectCost : projectCosts) {
				labourCostService.updateAllPaymentFollowByProjectCost(projectCost, projectCost.getStartWorkDate(),
						projectCost.getEndWorkDate());
			}
		}
		result = projectCosts;
		return new RestResult(result);

	}


	
	private ProjectCost createNewProjectCost(Long projectDetailId, Integer month, Integer year, Integer lotNumber, Long currentUserId ) throws ParseException {
		Date startDate;
		Date endDate;
		if (lotNumber == 1) {
			startDate = timeService.getFirstDayOfMonth(month, year);
			endDate = timeService.parseDay(15, month, year);
		} else if (lotNumber == 2) {
			startDate = timeService.parseDay(16, month, year);
			endDate = timeService.getLastDayOfMonth(month, year);
		} else {
			throw new RuntimeException("Only handle lotNumber 1 or 2. Cannot handle lotNumber: " + lotNumber);
		}
		ProjectCost newProjectCost = new ProjectCost();
		newProjectCost.setProjectDetailId(projectDetailId);;
		newProjectCost.setLotNumber(lotNumber);
		newProjectCost.setStartWorkDate(startDate);
		newProjectCost.setEndWorkDate(endDate);
		newProjectCost.setUnitPrice(0L);
		newProjectCost.setTotalMoney(0L);
		newProjectCost.setCloseDate(null);
		newProjectCost.setPaymentType(ProjectPaymentType.NHAN_CONG);
		newProjectCost.setMonth(month);
		newProjectCost.setYear(year);
		newProjectCost.setCreatedUserId(currentUserId);
		newProjectCost.setApprovalById(currentUserId);
		newProjectCost.setStatus(ProjectCostStatus.CHUA_THANH_TOAN_DU);

		newProjectCost = projectCostRepository.save(newProjectCost);
		labourCostService.updateAllPaymentFollowByProjectCost(newProjectCost, newProjectCost.getStartWorkDate(),
				newProjectCost.getEndWorkDate());
		return newProjectCost;
	}
	
	@RequestMapping(value = "/projectCost/findByProjectDetailId")
	public RestResult invoiceByProjectDetail(@RequestParam("projectDetailId") Long projectDetailId) {
		return new RestResult(projectCostRepository.findByProjectDetailId(projectDetailId));
	}
	
	@RequestMapping(value = "/projectCost/findByProjectDetailIdOrderLot")
	public RestResult findByProjectDetailIdOrderLot(@RequestParam("projectDetailId") Long projectDetailId) {
		
		List<ProjectCost> projectCosts = projectCostRepository.findByProjectDetailIdOrderByLotNumber(projectDetailId);
		return new RestResult(projectCosts);
	}
	@RequestMapping(value = "/projectCost/findByStartDayAndLastDayOfWeekAndStatus")
	public RestResult findByStartDayAndLastDayOfWeekAndStatus(
			@RequestParam("status") String status,
			@DateTimeFormat(pattern = "yyyy-MM-dd") Date fromDate,
			@DateTimeFormat(pattern = "yyyy-MM-dd") Date toDate) throws ParseException{
		List<ProjectCost> result = projectCostRepository.findAll(
				new ProjectCostSpecification(status, fromDate != null ? timeService.getStartOfDay(fromDate) : null,
						toDate != null ? timeService.getEndOfDay(toDate) : null));
		return new RestResult(result);

	}
	
	@RequestMapping(value = "/projectCost/listTotalMoneyByYear")
	public RestResult listTotalMoneyByYear(@RequestParam("year") Integer year) {
		List<SumMonthProjectCostDto> months = projectCostRepository.sumProjectCostTotalByYear(year);
		SumYearProjectCostDto result = new SumYearProjectCostDto(year);
		for (SumMonthProjectCostDto dto : months) {
			dto.setYear(year);
			result.setTotalMoneyProjectCost(result.getTotalMoneyProjectCost() + dto.getTotalMoneyProjectCost());
			result.setTotalPaidProjectCost(result.getTotalPaidProjectCost() + dto.getTotalPaidProjectCost());
			result.getListMonthProjectCosts().add(dto);
		}
		
		return new RestResult(result);
	}
	
	@RequestMapping(value = "/projectCost/getByInvoiceRelation")
	public RestResult getByInvoiceRelation(@RequestParam("projectDetailId") Long projectDetailId) {
		
		List<ProjectCost> projectCosts = projectCostRepository.findByInvoiceRelationProjectDetailId(projectDetailId);
		List<StatisticalInvoiceDTO> statisticalInvoiceDTOs = new ArrayList<StatisticalInvoiceDTO>();
		StatisticalInvoiceDTO statisticalInvoiceDTO = new StatisticalInvoiceDTO();
		for(ProjectCost projectCost :projectCosts ) {
			if(projectCost.getInvoiceRelation() != null) {
				if(projectCost.getInvoiceRelation().getInvoiceVer1() != null) {
					statisticalInvoiceDTO.setInvoicever1(projectCost.getInvoiceRelation().getInvoiceVer1());
					statisticalInvoiceDTO.setProjectCosts(projectCostRepository.findByProjectDetailIdAndInvoiceRelationId(projectDetailId,projectCost.getInvoiceRelationId()));
					statisticalInvoiceDTO.setQuotation(quotationRepository.findByProjectDetailId(projectDetailId));
					statisticalInvoiceDTOs.add(statisticalInvoiceDTO);
					
				}else if(projectCost.getInvoiceRelation().getInvoiceVer2() != null) {
					statisticalInvoiceDTO.setInvoicever2(projectCost.getInvoiceRelation().getInvoiceVer2());
					statisticalInvoiceDTO.setProjectCosts(projectCostRepository.findByProjectDetailIdAndInvoiceRelationId(projectDetailId,projectCost.getInvoiceRelationId() ));
					statisticalInvoiceDTO.setQuotation(quotationRepository.findByProjectDetailId(projectDetailId));
					statisticalInvoiceDTOs.add(statisticalInvoiceDTO);
					
				}else if(projectCost.getInvoiceRelation().getInvoiceVer3() != null) {
					statisticalInvoiceDTO.setInvoicever3(projectCost.getInvoiceRelation().getInvoiceVer3());
					statisticalInvoiceDTO.setProjectCosts(projectCostRepository.findByProjectDetailIdAndInvoiceRelationId(projectDetailId,projectCost.getInvoiceRelationId() ));
					statisticalInvoiceDTO.setQuotation(quotationRepository.findByProjectDetailId(projectDetailId));
					statisticalInvoiceDTOs.add(statisticalInvoiceDTO);
				}
			}
		}
		
		
		return new RestResult(statisticalInvoiceDTOs);
	}
}
