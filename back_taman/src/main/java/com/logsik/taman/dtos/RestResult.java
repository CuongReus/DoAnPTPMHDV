package com.logsik.taman.dtos;

import java.io.Serializable;

public class RestResult implements Serializable {
    private static final long serialVersionUID = 1L;
    private boolean isError = false;
    private String errorMessage = null;
    private Object resultData = null;
    
    public RestResult() {
    }
    
    public RestResult(Object resultData) {
    	this.resultData = resultData;
    }
    
    public RestResult(boolean isError, String errorMessage) {
    	this.isError = isError;
    	this.errorMessage = errorMessage;
    }
    
	public boolean isError() {
		return isError;
	}
	public RestResult setIsError(boolean isError) {
		this.isError = isError;
		return this;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public RestResult setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
		return this;
	}
	public Object getResultData() {
		return resultData;
	}
	public RestResult setResultData(Object resultData) {
		this.resultData = resultData;
		return this;
	}

}
