package com.logsik.taman.queries;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.logsik.taman.domain.ConstructionTeam;

public class ConstrucionTeamSpecification implements Specification<ConstructionTeam> {
	private String leaderNameOrPhoneOrSpecialize;
	private String companyId;

	public ConstrucionTeamSpecification(String companyId, String leaderNameOrPhoneOrSpecialize) {
		this.companyId = companyId;
		this.leaderNameOrPhoneOrSpecialize = leaderNameOrPhoneOrSpecialize;

	}

	@Override
	public Predicate toPredicate(Root<ConstructionTeam> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		List<Predicate> predicates = new ArrayList<>();
		if (!StringUtils.isEmpty(companyId) && !companyId.equals("ALL")) {
			predicates.add(builder.or(builder.equal(root.get("company").get("id"), Long.valueOf(companyId))));
		}
		if (!StringUtils.isEmpty(leaderNameOrPhoneOrSpecialize)) {
			predicates
					.add(builder.or(builder.like(root.get("teamLeaderName"), "%" + leaderNameOrPhoneOrSpecialize + "%"),
							builder.like(root.get("leaderPhoneNumber"), "%" + leaderNameOrPhoneOrSpecialize + "%"),
							builder.like(root.get("specialize"), "%" + leaderNameOrPhoneOrSpecialize + "%")));
		}

		return builder.and(predicates.toArray(new Predicate[predicates.size()]));

	}

}
