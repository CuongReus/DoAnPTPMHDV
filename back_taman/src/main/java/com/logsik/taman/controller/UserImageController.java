//package com.logsik.taman.controller;
//
//import java.io.IOException;
//import java.util.Arrays;
//import java.util.List;
//import java.util.stream.Collectors;
//
//import javax.servlet.http.HttpServletRequest;
//import org.modelmapper.ModelMapper;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.core.io.Resource;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.logsik.taman.domain.Invoice;
//import com.logsik.taman.domain.CWS;
//import com.logsik.taman.domain.Approval;
//import com.logsik.taman.domain.FileUpload;
//import com.logsik.taman.dtos.CWSDto;
//import com.logsik.taman.dtos.ApprovalDto;
//import com.logsik.taman.dtos.RestResult;
//import com.logsik.taman.dtos.UploadFileResponse;
//import com.logsik.taman.service.impl.AcceptanceStorageService;
//import com.logsik.taman.service.impl.ImageStorageService;
//import com.logsik.taman.service.impl.OutputStockStorageService;

//@RestController
//@RequestMapping("/api")
//public class UserImageController extends AbstractController {
//	public UploadFileResponse uploadCWSFileResponse(MultipartFile file) {
//		String fileName = cwsStorageService.storeFile(file);
//		String api = "/api/downloadCWSImageFiles/";
//		String fileDownloadUri = api + fileName;
//		return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
//
//	}
//
//	@RequestMapping(value = "/uploadCWSFile", method = RequestMethod.POST, consumes = "multipart/form-data")
//	public RestResult uploadCWSReportFile(@RequestParam("file") MultipartFile file) {
//		return new RestResult(uploadCWSFileResponse(file));
//	}
//
//	@PostMapping("/uploadCWSImageFiles")
//	public RestResult uploadCWSImageFiles(@RequestParam("files") MultipartFile[] files) {
//		List<UploadFileResponse> result = Arrays.asList(files).stream().map(file -> uploadCWSResponse(file))
//				.collect(Collectors.toList());
//		return new RestResult(result);
//	}
//
//	@GetMapping("/downloadCWSImageFiles/{fileName:.+}")
//	public ResponseEntity<Resource> downloadCWSImageFiles(@PathVariable String fileName,
//			HttpServletRequest request) {
//		// Load file as Resource
//		Resource resource = cwsStorageService.loadFileAsResource(fileName);
//
//		// Try to determine file's content type
//		String contentType = null;
//		try {
//			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
//		} catch (IOException ex) {
//			logger.info("Could not determine file type.");
//		}
//
//		// Fallback to the default content type if type could not be determined
//		if (contentType == null) {
//			contentType = "application/octet-stream";
//		}
//
//		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
//				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
//				.body(resource);
//	}
//}
