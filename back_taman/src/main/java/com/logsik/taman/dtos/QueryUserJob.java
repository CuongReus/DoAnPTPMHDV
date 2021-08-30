package com.logsik.taman.dtos;

import java.util.ArrayList;
import java.util.List;

public class QueryUserJob {
	private Long selectedJobId = null;
	private List<Long> currentJobIds = new ArrayList<Long>();
	public Long getSelectedJobId() {
		return selectedJobId;
	}
	public void setSelectedJobId(Long selectedJobId) {
		this.selectedJobId = selectedJobId;
	}
	public List<Long> getCurrentJobIds() {
		return currentJobIds;
	}
	public void setCurrentJobIds(List<Long> currentJobIds) {
		this.currentJobIds = currentJobIds;
	}
}
