//package com.logsik.taman.controller;
//
//import org.springframework.web.multipart.MultipartFile;
//
//import com.logsik.taman.dtos.UploadFileResponse;
//import com.logsik.taman.service.impl.FileStorageService;
//
//public class AbstractFileController {
//	protected FileStorageService fileStorageService;
//	 public UploadFileResponse uploadAFile(MultipartFile file) {
//	    	String fileName = fileStorageService.storeFile(file);
//	    	String api = "/api/downloadFile/";
//	        String fileDownloadUri = api + fileName ;
//	              
//	        return new UploadFileResponse(fileName, fileDownloadUri,
//	                file.getContentType(), file.getSize());
//	        
//	    }
//}
