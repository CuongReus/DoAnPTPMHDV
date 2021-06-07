package com.logsik.taman.dtos;


public class UploadFileResponse {
    private String fileName;
    private String fileDownloadUri;
    private String fileType;
    private long size;
    private String uploadBy;
    
    
    public UploadFileResponse() {
       
    }

    public UploadFileResponse(String fileName, String fileDownloadUri, String fileType, long size,String uploadBy) {
        this.setFileName(fileName);
        this.setFileDownloadUri(fileDownloadUri);
        this.setFileType(fileType);
        this.setSize(size);
        this.setUploadBy(uploadBy);
    }
    
    public UploadFileResponse(String fileName, String fileDownloadUri, String fileType, long size) {
        this.setFileName(fileName);
        this.setFileDownloadUri(fileDownloadUri);
        this.setFileType(fileType);
        this.setSize(size);
    }

	public String getFileName() {
		return fileName;
	}
	


	public String getUploadBy() {
		return uploadBy;
	}

	public void setUploadBy(String uploadBy) {
		this.uploadBy = uploadBy;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileDownloadUri() {
		return fileDownloadUri;
	}

	public void setFileDownloadUri(String fileDownloadUri) {
		this.fileDownloadUri = fileDownloadUri;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}
}
