package com.logsik.taman.dtos;

import java.io.Serializable;

import com.logsik.taman.domain.Labour;

public class SumLabourAttendanceDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Labour labour;
	private Long projectDetailId;
	private Double totalAttendanceLv0;
	private Double totalAttendanceLv01;
	private Double totalAttendanceLv02;
	
	public SumLabourAttendanceDto() {

		
	}

	public SumLabourAttendanceDto(Labour labour, Long projectDetailId, Double totalAttendanceLv0,
			Double totalAttendanceLv01, Double totalAttendanceLv02) {

		this.labour = labour;
		this.projectDetailId = projectDetailId;
		this.totalAttendanceLv0 = totalAttendanceLv0;
		this.totalAttendanceLv01 = totalAttendanceLv01;
		this.totalAttendanceLv02 = totalAttendanceLv02;
	}
	
	public SumLabourAttendanceDto(Labour labour, Double totalAttendanceLv0,
			Double totalAttendanceLv01, Double totalAttendanceLv02) {
		this.labour = labour;
//		this.projectDetailId = projectDetailId;
		this.totalAttendanceLv0 = totalAttendanceLv0;
		this.totalAttendanceLv01 = totalAttendanceLv01;
		this.totalAttendanceLv02 = totalAttendanceLv02;
	}

	public Labour getLabour() {
		return labour;
	}

	public void setLabour(Labour labour) {
		this.labour = labour;
	}

	public Long getProjectDetailId() {
		return projectDetailId;
	}

	public void setProjectDetailId(Long projectDetailId) {
		this.projectDetailId = projectDetailId;
	}

	public Double getTotalAttendanceLv0() {
		return totalAttendanceLv0;
	}

	public void setTotalAttendanceLv0(Double totalAttendanceLv0) {
		this.totalAttendanceLv0 = totalAttendanceLv0;
	}

	public Double getTotalAttendanceLv01() {
		return totalAttendanceLv01;
	}

	public void setTotalAttendanceLv01(Double totalAttendanceLv01) {
		this.totalAttendanceLv01 = totalAttendanceLv01;
	}

	public Double getTotalAttendanceLv02() {
		return totalAttendanceLv02;
	}

	public void setTotalAttendanceLv02(Double totalAttendanceLv02) {
		this.totalAttendanceLv02 = totalAttendanceLv02;
	}

}
