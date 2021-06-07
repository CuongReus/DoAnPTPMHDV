package com.logsik.taman.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.taman.domain.ConstructionTeam;
import com.logsik.taman.dtos.ConstructionTeamDto;
import com.logsik.taman.dtos.RestResult;
import com.logsik.taman.queries.ConstrucionTeamSpecification;
import com.logsik.taman.repository.ConstructionTeamRepository;
import com.logsik.taman.service.impl.DtoConverter;

@RestController
@RequestMapping("/api")
public class ConstructionTeamController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(LeaveLetterController.class);

	@Autowired
	private ConstructionTeamRepository constructionTeamRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@RequestMapping("constructionTeam/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(constructionTeamRepository.findById(id));
	}

	@RequestMapping(value = "/constructionTeam/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody ConstructionTeamDto constructionTeamDto) {
		try {
			ConstructionTeam newConstructionTeam = dtoConverter.convertToConstructionTeam(constructionTeamDto);
			newConstructionTeam = constructionTeamRepository.save(newConstructionTeam);

			return new RestResult(newConstructionTeam);
		} catch (Exception e) {
			LOGGER.error("Error when adding contract.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/constructionTeam/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody ConstructionTeamDto constructionTeamDto) {
		try {

			ConstructionTeam updatedConstructionTeam = constructionTeamRepository
					.save(dtoConverter.convertToConstructionTeam(constructionTeamDto));

			return new RestResult(updatedConstructionTeam);
		} catch (Exception e) {
			LOGGER.error("Error when updating constructionTeam.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/constructionTeam/{id}")
	public RestResult deletecontract(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete contract with ID = " + id + "...");

		try {
			constructionTeamRepository.deleteById(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete constructionTeam.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}

		return new RestResult("ok");
	}

	@RequestMapping(value = "/constructionTeam/findByCompanyIdAndLeaderNameOrPhoneOrSpecialize")
	public RestResult list(@RequestParam("companyId") String companyId,
			@RequestParam("leaderNameOrPhoneOrSpecialize") String search, Pageable pageable) {
		Object result;
		result = constructionTeamRepository.findAll(new ConstrucionTeamSpecification(companyId, search), pageable);
		return new RestResult(result);
	}

	@RequestMapping(value = "/constructionTeam/listAll")
	public RestResult listAll() {
		return new RestResult(constructionTeamRepository.findAll());

	}
}
