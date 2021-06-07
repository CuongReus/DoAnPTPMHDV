package com.logsik.taman.repository;

import java.util.List;

import com.logsik.taman.domain.FileUpload;

public interface FileUploadRepository extends BaseRepository<FileUpload, Long> {
	List<FileUpload> findByCrmTableNameAndCrmLinkId(String crmTableName, Long crmId);

}
