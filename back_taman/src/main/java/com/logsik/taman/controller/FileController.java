package com.logsik.taman.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.dtos.UploadFileResponse;
import com.logsik.taman.service.impl.ApprovalStorageService;
import com.logsik.taman.service.impl.CloseProjectStorageService;
import com.logsik.taman.service.impl.ContractStorageService;
import com.logsik.taman.service.impl.EfficiencyStorageService;
import com.logsik.taman.service.impl.FileStorageService;
import com.logsik.taman.service.impl.ImageStorageService;
import com.logsik.taman.service.impl.IncurredStorageService;
import com.logsik.taman.service.impl.LabourContractFileStorageService;
import com.logsik.taman.service.impl.ProjectCostStorageService;
import com.logsik.taman.service.impl.QuotationStorageService;

// https://www.callicoder.com/spring-boot-file-upload-download-rest-api-example/
// TODO: check security, only login user can upload, download files.

@RestController
@RequestMapping("/api")
public class FileController extends AbstractController {

	private static final Logger logger = LoggerFactory.getLogger(FileController.class);
// Start Autowired StorageService
	
	
	@Autowired
	private FileStorageService fileStorageService;
	@Autowired
	private ImageStorageService imageStorageService;
	@Autowired
	private ApprovalStorageService approvalStorageService;
	@Autowired
	private CloseProjectStorageService closeProjectStorageService;
	@Autowired
	private ContractStorageService contractStorageService;
	@Autowired
	private EfficiencyStorageService efficiencyStorageService;
	@Autowired
	private IncurredStorageService incurredStorageService;
	@Autowired
	private QuotationStorageService quotationStorageService;
	@Autowired
	private LabourContractFileStorageService labourContractFileStorageService;
	@Autowired
	private ProjectCostStorageService projectCostStorageService;
	
	
// End Autowired StorageService
	// *******************************************Start User Profile File****************************************************

	// Upload Labour ContractController
	public UploadFileResponse uploadUserProfile(MultipartFile file) {
		String fileName = fileStorageService.storeFile(file);
		String api = "/api/downloadUserProfile/";
		String fileDownloadUri = api + fileName;

		return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());

	}
	// End Upload Labour File ContractController

//    @PostMapping("/uploadFile")

	@RequestMapping(value = "/uploadUserProfile", method = RequestMethod.POST, consumes = "multipart/form-data")
	public RestResult uploadUserProfileFile(@RequestParam("file") MultipartFile file) {
		return new RestResult(uploadUserProfile(file));
	}

	@PostMapping("/uploadMultipleUserProfileFiles")
	public RestResult uploadMultipleUserProfileFiles(@RequestParam("files") MultipartFile[] files) {
		List<UploadFileResponse> result = Arrays.asList(files).stream().map(file -> uploadUserProfile(file))
				.collect(Collectors.toList());
		return new RestResult(result);
	}

	@GetMapping("/downloadUserProfile/{fileName:.+}")
	public ResponseEntity<Resource> downloadUserProfileFile(@PathVariable String fileName, HttpServletRequest request) {
		// Load file as Resource
		Resource resource = fileStorageService.loadFileAsResource(fileName);

		// Try to determine file's content type
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException ex) {
			logger.info("Could not determine file type.");
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
	// *******************************************End User Profile File*********************************************************

	
	
	// *******************************************Start Labour File****************************************************

			// Upload Labour ContractController
			public UploadFileResponse uploadLabourContract(MultipartFile file) {
				String fileName = labourContractFileStorageService.storeFile(file);
				String api = "/api/downloadLabourContract/";
				String fileDownloadUri = api + fileName;

				return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());

			}
			// End Upload Labour File ContractController

//		    @PostMapping("/uploadFile")

			@RequestMapping(value = "/uploadLabourContract", method = RequestMethod.POST, consumes = "multipart/form-data")
			public RestResult uploadLabourContractFile(@RequestParam("file") MultipartFile file) {
				return new RestResult(uploadLabourContract(file));
			}

			@PostMapping("/uploadMultipleLabourContractFiles")
			public RestResult uploadMultipleLabourContractFiles(@RequestParam("files") MultipartFile[] files) {
				List<UploadFileResponse> result = Arrays.asList(files).stream().map(file -> uploadLabourContract(file))
						.collect(Collectors.toList());
				return new RestResult(result);
			}

			@GetMapping("/downloadLabourContract/{fileName:.+}")
			public ResponseEntity<Resource> downloadLabourContractFile(@PathVariable String fileName, HttpServletRequest request) {
				// Load file as Resource
				Resource resource = fileStorageService.loadFileAsResource(fileName);

				// Try to determine file's content type
				String contentType = null;
				try {
					contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
				} catch (IOException ex) {
					logger.info("Could not determine file type.");
				}

				// Fallback to the default content type if type could not be determined
				if (contentType == null) {
					contentType = "application/octet-stream";
				}

				return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
						.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
						.body(resource);
			}
			// *******************************************End Labour File*********************************************************

		
	
	// *******************************************Start User Image File****************************************************

	public UploadFileResponse uploadUserImage(MultipartFile file) {
		String fileName = imageStorageService.storeFile(file);
		String api = "/api/downloadUserImage/";
		String fileDownloadUri = api + fileName;
		return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());

	}

	@RequestMapping(value = "/uploadUserFile", method = RequestMethod.POST, consumes = "multipart/form-data")
	public RestResult uploadUserImageFile(@RequestParam("file") MultipartFile file) {
		return new RestResult(uploadUserImage(file));
	}

	@PostMapping("/uploadMultipleImageFiles")
	public RestResult uploadMultipleUserImageFiles(@RequestParam("files") MultipartFile[] files) {
		List<UploadFileResponse> result = Arrays.asList(files).stream().map(file -> uploadUserImage(file))
				.collect(Collectors.toList());
		return new RestResult(result);
	}

	@GetMapping("/downloadUserImage/{fileName:.+}")
	public ResponseEntity<Resource> downloadUserImageFile(@PathVariable String fileName, HttpServletRequest request) {
		// Load file as Resource
		Resource resource = imageStorageService.loadFileAsResource(fileName);

		// Try to determine file's content type
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException ex) {
			logger.info("Could not determine file type.");
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
	// *******************************************End User Image File****************************************************

	
	// *******************************************Start Approval  Report File************************************************************
	
	public UploadFileResponse uploadApprovalFileResponse(MultipartFile file) {
		String fileName = approvalStorageService.storeFile(file);
		String api = "/api/downloadApprovalFile/";
		String fileDownloadUri = api + fileName;
		return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());

	}

	@RequestMapping(value = "/uploadApprovalFile", method = RequestMethod.POST, consumes = "multipart/form-data")
	public RestResult uploadApprovalReportFile(@RequestParam("file") MultipartFile file) {
		return new RestResult(uploadApprovalFileResponse(file));
	}

	@PostMapping("/uploadMultipleApprovalFiles")
	public RestResult uploadMultipleApprovalFiles(@RequestParam("files") MultipartFile[] files) {
		List<UploadFileResponse> result = Arrays.asList(files).stream().map(file -> uploadApprovalFileResponse(file))
				.collect(Collectors.toList());
		return new RestResult(result);
	}

	@GetMapping("/downloadApprovalFile/{fileName:.+}")
	public ResponseEntity<Resource> downloadApprovalFile(@PathVariable String fileName,
			HttpServletRequest request) {
		// Load file as Resource
		Resource resource = approvalStorageService.loadFileAsResource(fileName);

		// Try to determine file's content type
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException ex) {
			logger.info("Could not determine file type.");
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
	// *******************************************End Approval  Report File************************************************************
	
	// *******************************************Start Close Project  Report File************************************************************
	
	
	public UploadFileResponse uploadCloseProjectResponse(MultipartFile file) {
		String fileName = closeProjectStorageService.storeFile(file);
		String api = "/api/downloadCloseProjectFile/";
		String fileDownloadUri = api + fileName;
		return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());

	}

	@RequestMapping(value = "/uploadCloseProjectFile", method = RequestMethod.POST, consumes = "multipart/form-data")
	public RestResult uploadCloseProjectReportFile(@RequestParam("file") MultipartFile file) {
		return new RestResult(uploadCloseProjectResponse(file));
	}

	@PostMapping("/uploadMultipleCloseProjectFiles")
	public RestResult uploadMultipleCloseProjectFiles(@RequestParam("files") MultipartFile[] files) {
		List<UploadFileResponse> result = Arrays.asList(files).stream().map(file -> uploadCloseProjectResponse(file))
				.collect(Collectors.toList());
		return new RestResult(result);
	}

	@GetMapping("/downloadCloseProjectFile/{fileName:.+}")
	public ResponseEntity<Resource> downloadCloseProjectFile(@PathVariable String fileName,
			HttpServletRequest request) {
		// Load file as Resource
		Resource resource = closeProjectStorageService.loadFileAsResource(fileName);

		// Try to determine file's content type
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException ex) {
			logger.info("Could not determine file type.");
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
	// *******************************************End Close Project  Report File************************************************************
	
	// *******************************************Start Contract  Report File************************************************************
	public UploadFileResponse uploadContractResponse(MultipartFile file) {
		String fileName = contractStorageService.storeFile(file);
		String api = "/api/downloadContractFile/";
		String fileDownloadUri = api + fileName;
		return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());

	}

	@RequestMapping(value = "/uploadContractFile", method = RequestMethod.POST, consumes = "multipart/form-data")
	public RestResult uploadContractReportFile(@RequestParam("file") MultipartFile file) {
		return new RestResult(uploadContractResponse(file));
	}

	@PostMapping("/uploadMultipleContractFiles")
	public RestResult uploadMultipleContractFiles(@RequestParam("files") MultipartFile[] files) {
		List<UploadFileResponse> result = Arrays.asList(files).stream().map(file -> uploadContractResponse(file))
				.collect(Collectors.toList());
		return new RestResult(result);
	}

	@GetMapping("/downloadContractFile/{fileName:.+}")
	public ResponseEntity<Resource> downloadContractFile(@PathVariable String fileName,
			HttpServletRequest request) {
		// Load file as Resource
		Resource resource = contractStorageService.loadFileAsResource(fileName);

		// Try to determine file's content type
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException ex) {
			logger.info("Could not determine file type.");
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
	// *******************************************End Contract  Report File************************************************************
	// *******************************************Start Efficiency  Report File************************************************************

	public UploadFileResponse uploadEfficiencyResponse(MultipartFile file) {
		String fileName = efficiencyStorageService.storeFile(file);
		String api = "/api/downloadEfficiencyFile/";
		String fileDownloadUri = api + fileName;
		return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());

	}

	@RequestMapping(value = "/uploadEfficiencyFile", method = RequestMethod.POST, consumes = "multipart/form-data")
	public RestResult uploadEfficiencyReportFile(@RequestParam("file") MultipartFile file) {
		return new RestResult(uploadEfficiencyResponse(file));
	}

	@PostMapping("/uploadMultipleEfficiencyFiles")
	public RestResult uploadMultipleEfficiencyFiles(@RequestParam("files") MultipartFile[] files) {
		List<UploadFileResponse> result = Arrays.asList(files).stream().map(file -> uploadEfficiencyResponse(file))
				.collect(Collectors.toList());
		return new RestResult(result);
	}

	@GetMapping("/downloadEfficiencyFile/{fileName:.+}")
	public ResponseEntity<Resource> downloadEfficiencyFile(@PathVariable String fileName,
			HttpServletRequest request) {
		// Load file as Resource
		Resource resource = efficiencyStorageService.loadFileAsResource(fileName);

		// Try to determine file's content type
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException ex) {
			logger.info("Could not determine file type.");
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
	// *******************************************End Efficiency  Report File************************************************************
	// *******************************************Start Incurred  Report File************************************************************

	public UploadFileResponse uploadIncurredResponse(MultipartFile file) {
		String fileName = incurredStorageService.storeFile(file);
		String api = "/api/downloadIncurredFile/";
		String fileDownloadUri = api + fileName;
		return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());

	}

	@RequestMapping(value = "/uploadIncurredFile", method = RequestMethod.POST, consumes = "multipart/form-data")
	public RestResult uploadIncurredReportFile(@RequestParam("file") MultipartFile file) {
		return new RestResult(uploadIncurredResponse(file));
	}

	@PostMapping("/uploadMultipleIncurredFiles")
	public RestResult uploadMultipleIncurredFiles(@RequestParam("files") MultipartFile[] files) {
		List<UploadFileResponse> result = Arrays.asList(files).stream().map(file -> uploadIncurredResponse(file))
				.collect(Collectors.toList());
		return new RestResult(result);
	}

	@GetMapping("/downloadIncurredFile/{fileName:.+}")
	public ResponseEntity<Resource> downloadIncurredFile(@PathVariable String fileName,
			HttpServletRequest request) {
		// Load file as Resource
		Resource resource = incurredStorageService.loadFileAsResource(fileName);

		// Try to determine file's content type
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException ex) {
			logger.info("Could not determine file type.");
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
	
	// *******************************************Start Quotation Ver 3 File************************************************************
	
	public UploadFileResponse uploadQuotationResponse(MultipartFile file) {
		String fileName = quotationStorageService.storeFile(file);
		String api = "/api/downloadQuotationFile/";
		String fileDownloadUri = api + fileName;
		return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());

	}

	@RequestMapping(value = "/uploadQuotationFile", method = RequestMethod.POST, consumes = "multipart/form-data")
	public RestResult uploadQuotationReportFile(@RequestParam("file") MultipartFile file) {
		return new RestResult(uploadQuotationResponse(file));
	}

	@PostMapping("/uploadMultipleQuotationFiles")
	public RestResult uploadMultipleQuotationFiles(@RequestParam("files") MultipartFile[] files) {
		List<UploadFileResponse> result = Arrays.asList(files).stream().map(file -> uploadQuotationResponse(file))
				.collect(Collectors.toList());
		return new RestResult(result);
	}

	@GetMapping("/downloadQuotationFile/{fileName:.+}")
	public ResponseEntity<Resource> downloadQuotationFile(@PathVariable String fileName,
			HttpServletRequest request) {
		// Load file as Resource
		Resource resource = quotationStorageService.loadFileAsResource(fileName);

		// Try to determine file's content type
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException ex) {
			logger.info("Could not determine file type.");
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
	// *******************************************End Quotation Ver 3 File************************************************************
	// ******************************************Start ProjectCost Ver 3 File************************************************************
	public UploadFileResponse uploadProjectCostResponse(MultipartFile file) {
		String fileName = projectCostStorageService.storeFile(file);
		String api = "/api/downloadProjectCostFile/";
		String fileDownloadUri = api + fileName;
		return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());

	}

	@RequestMapping(value = "/uploadProjectCostFile", method = RequestMethod.POST, consumes = "multipart/form-data")
	public RestResult uploadProjetCostReportFile(@RequestParam("file") MultipartFile file) {
		return new RestResult(uploadProjectCostResponse(file));
	}

	@PostMapping("/uploadMultipleProjectCostFiles")
	public RestResult uploadMultipleProjectCostFiles(@RequestParam("files") MultipartFile[] files) {
		List<UploadFileResponse> result = Arrays.asList(files).stream().map(file -> uploadProjectCostResponse(file))
				.collect(Collectors.toList());
		return new RestResult(result);
	}

	@GetMapping("/downloadProjectCostFile/{fileName:.+}")
	public ResponseEntity<Resource> downloadProjectCostFile(@PathVariable String fileName,
			HttpServletRequest request) {
		// Load file as Resource
		Resource resource = projectCostStorageService.loadFileAsResource(fileName);

		// Try to determine file's content type
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException ex) {
			logger.info("Could not determine file type.");
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
	// *******************************************End ProjectCost Ver 3 File************************************************************
}
