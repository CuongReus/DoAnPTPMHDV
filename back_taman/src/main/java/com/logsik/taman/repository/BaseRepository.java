package com.logsik.taman.repository;

import java.io.Serializable;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.PagingAndSortingRepository;

@NoRepositoryBean
interface BaseRepository<T, ID extends Serializable> extends PagingAndSortingRepository<T, ID> {
    Page<T> findAll(Pageable pageable);
}
