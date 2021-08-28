package com.logsik.taman.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.logsik.taman.domain.Approval;
import com.logsik.taman.domain.CloseProject;
import com.logsik.taman.domain.Company;
import com.logsik.taman.domain.ConstructionTeam;
import com.logsik.taman.domain.Contact;
import com.logsik.taman.domain.ContactDetail;
import com.logsik.taman.domain.Department;
import com.logsik.taman.domain.Efficiency;
import com.logsik.taman.domain.EmployeeAttendance;
import com.logsik.taman.domain.EmployeeSalary;
import com.logsik.taman.domain.FileUpload;
import com.logsik.taman.domain.Job;
import com.logsik.taman.domain.Labour;
import com.logsik.taman.domain.LabourAttendance;
import com.logsik.taman.domain.LabourSalary;
import com.logsik.taman.domain.LeaveLetter;
import com.logsik.taman.domain.Project;
import com.logsik.taman.domain.ProjectDetail;
import com.logsik.taman.domain.ProjectYear;
import com.logsik.taman.domain.Role;
import com.logsik.taman.domain.SwotItem;
import com.logsik.taman.domain.SwotJob;
import com.logsik.taman.domain.SwotUser;
import com.logsik.taman.domain.User;
import com.logsik.taman.dtos.ApprovalDto;
import com.logsik.taman.dtos.CloseProjectDto;
import com.logsik.taman.dtos.CompanyDto;
import com.logsik.taman.dtos.ConstructionTeamDto;
import com.logsik.taman.dtos.ContactDetailDto;
import com.logsik.taman.dtos.ContactDto;
import com.logsik.taman.dtos.DepartmentDto;
import com.logsik.taman.dtos.EfficiencyDto;
import com.logsik.taman.dtos.EmployeeAttendanceDto;
import com.logsik.taman.dtos.EmployeeSalaryDto;
import com.logsik.taman.dtos.JobDto;
import com.logsik.taman.dtos.LabourAttendanceDto;
import com.logsik.taman.dtos.LabourDto;
import com.logsik.taman.dtos.LabourSalaryDto;
import com.logsik.taman.dtos.LeaveLetterDto;
import com.logsik.taman.dtos.ProjectDetailDto;
import com.logsik.taman.dtos.ProjectDto;
import com.logsik.taman.dtos.ProjectYearDto;
import com.logsik.taman.dtos.RoleDto;
import com.logsik.taman.dtos.SwotItemDto;
import com.logsik.taman.dtos.SwotJobDto;
import com.logsik.taman.dtos.SwotUserDto;
import com.logsik.taman.dtos.UploadFileResponse;
import com.logsik.taman.dtos.UserDto;
import com.logsik.taman.repository.ApprovalRepository;
import com.logsik.taman.repository.CloseProjectRepository;
import com.logsik.taman.repository.CompanyRepository;
import com.logsik.taman.repository.ConstructionTeamRepository;
import com.logsik.taman.repository.ContactDetailRepository;
import com.logsik.taman.repository.ContactRepository;
import com.logsik.taman.repository.DepartmentRepository;
import com.logsik.taman.repository.SwotItemRepository;
import com.logsik.taman.repository.SwotJobRepository;
import com.logsik.taman.repository.SwotUserRepository;
import com.logsik.taman.repository.EfficiencyRepository;
import com.logsik.taman.repository.EmployeeAttendanceRepository;
import com.logsik.taman.repository.EmployeeSalaryRepository;
import com.logsik.taman.repository.JobRepository;
import com.logsik.taman.repository.LabourAttendanceRepository;
import com.logsik.taman.repository.LabourRepository;
import com.logsik.taman.repository.LabourSalaryRepository;
import com.logsik.taman.repository.LeaveLetterRepository;
import com.logsik.taman.repository.ProjectDetailRepository;
import com.logsik.taman.repository.ProjectRepository;
import com.logsik.taman.repository.ProjectYearRepository;
import com.logsik.taman.repository.RoleRepository;
import com.logsik.taman.repository.UserRepository;

/**
 * Created by phamcongbang on 10/04/2018.
 */
@Service
public class DtoConverter {
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private ConstructionTeamRepository constructionTeamRepository;
	
	@Autowired
	private ApprovalRepository approvalRepository;
	@Autowired
	private CloseProjectRepository closeProjectRepository;
	@Autowired
	private EfficiencyRepository efficiencyRepository;
	@Autowired
	private ContactRepository contactRepository;
	@Autowired
	private ContactDetailRepository contactDetailRepository;
	@Autowired
	private ProjectDetailRepository projectDetailRepository;
	
	@Autowired
	private ProjectYearRepository projectYearRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
	
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private EmployeeAttendanceRepository employeeAttendanceRepository;
	@Autowired
	private EmployeeSalaryRepository employeeSalaryRepository;
	@Autowired
	private LabourSalaryRepository labourSalaryRepository;
	@Autowired
	private LabourRepository labourRepository;
	@Autowired
	private LabourAttendanceRepository labourAttendanceRepository;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private LeaveLetterRepository leaveLetterRepository;
	@Autowired
	private DepartmentRepository departmentRepository;
	@Autowired
	private SwotItemRepository swotItemRepository;
	@Autowired
	private SwotUserRepository swotUserRepository;
	@Autowired
	private JobRepository jobRepository;
	@Autowired
	private SwotJobRepository swotJobRepository;

	@PostConstruct
	private void postConstruct() {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
	}

	// Never map to Hibernate entity with modelMapper, map wrong id to any field
	// xxxId, password is empty

	public Company convertToCompany(CompanyDto companyDto) {
		Company company = null;
		if (companyDto.getId() != null) {
			company = companyRepository.findById(companyDto.getId()).get();
		} else {
			company = new Company();
		}
		modelMapper.map(companyDto, company);
		return company;
	}

	public ConstructionTeam convertToConstructionTeam(ConstructionTeamDto constructionTeamDto) {
		ConstructionTeam constructionTeam = null;
		if (constructionTeamDto.getId() != null) {
			constructionTeam = constructionTeamRepository.findById(constructionTeamDto.getId()).get();
		} else {
			constructionTeam = new ConstructionTeam();
		}
		modelMapper.map(constructionTeamDto, constructionTeam);
		return constructionTeam;
	}
	
	public Approval convertToApproval(ApprovalDto approvalDto) {
		Approval approval = null;
		if (approvalDto.getId() != null) {
			approval = approvalRepository.findById(approvalDto.getId()).get();
		} else {
			approval = new Approval();
		}
		modelMapper.map(approvalDto, approval);
		return approval;
	}
	
	public Contact convertToContact(ContactDto contactDto) {
		Contact contact = null;
		if (contactDto.getId() != null) {
			contact = contactRepository.findById(contactDto.getId()).get();
		} else {
			contact = new Contact();
		}
		modelMapper.map(contactDto, contact);
		return contact;

	}
	
	public ContactDetail convertToContactDetail(ContactDetailDto contactDetailDto) {
		ContactDetail contactDetail = null;
		if (contactDetailDto.getId() != null) {
			contactDetail = contactDetailRepository.findById(contactDetailDto.getId()).get();
		} else {
			contactDetail = new ContactDetail();
		}
		modelMapper.map(contactDetailDto, contactDetail);
		return contactDetail;

	}
	
	public Contact fillContactForm(Contact destination, Contact form) {
		modelMapper.map(form, destination);
		return destination;
	}
	
	public ContactDetail fillContactDetailForm(ContactDetail destination, ContactDetail form) {
		modelMapper.map(form, destination);
		return destination;
	}

	public CloseProject convertToCloseProject(CloseProjectDto closeProjectDto) {
		CloseProject closeProject = null;
		if (closeProjectDto.getId() != null) {
			closeProject = closeProjectRepository.findById(closeProjectDto.getId()).get();
		} else {
			closeProject = new CloseProject();
		}
		modelMapper.map(closeProjectDto, closeProject);
		return closeProject;
	}

	

	public Efficiency convertToEfficiency(EfficiencyDto efficiencyDto) {
		Efficiency efficiency = null;
		if (efficiencyDto.getId() != null) {
			efficiency = efficiencyRepository.findById(efficiencyDto.getId()).get();
		} else {
			efficiency = new Efficiency();
		}
		modelMapper.map(efficiencyDto, efficiency);
		return efficiency;
	}

	public ProjectYear convertToProjectYear(ProjectYearDto projectYearDto) {
		ProjectYear projectYear = null;
		if (projectYearDto.getId() != null) {
			projectYear = projectYearRepository.findById(projectYearDto.getId()).get();
		} else {
			projectYear = new ProjectYear();
		}
		modelMapper.map(projectYearDto, projectYear);
		return projectYear;
	}

	public Project convertToProject(ProjectDto projectDto) {
		Project project = null;
		if (projectDto.getId() != null) {
			project = projectRepository.findById(projectDto.getId()).get();
		} else {
			project = new Project();
		}
		modelMapper.map(projectDto, project);
		return project;
	}

	public ProjectDetail convertToProjectDetail(ProjectDetailDto projectDetailDto) {
		ProjectDetail projectDetail = null;
		if (projectDetailDto.getId() != null) {
			projectDetail = projectDetailRepository.findById(projectDetailDto.getId()).get();
		} else {
			projectDetail = new ProjectDetail();
		}
		modelMapper.map(projectDetailDto, projectDetail);
		return projectDetail;
	}
	
	public Department convertToDepartment(DepartmentDto departmentDto) {
		Department department = null;
		if (departmentDto.getId() != null) {
			department = departmentRepository.findById(departmentDto.getId()).get();
		} else {
			department = new Department();
		}
		modelMapper.map(departmentDto, department);
		return department;
	}
	
	public SwotItem convertToSwotItem(SwotItemDto swotItemDto) {
		SwotItem swotItem = null;
		if (swotItemDto.getId() != null) {
			swotItem = swotItemRepository.findById(swotItemDto.getId()).get();
		} else {
			swotItem = new SwotItem();
		}
		modelMapper.map(swotItemDto, swotItem);
		return swotItem;
	}
	
	public SwotUser convertToSwotUser(SwotUserDto swotUserDto) {
		SwotUser swotUser = null;
		if (swotUserDto.getId() != null) {
			swotUser = swotUserRepository.findById(swotUserDto.getId()).get();
		} else {
			swotUser = new SwotUser();
		}
		modelMapper.map(swotUserDto, swotUser);
		return swotUser;
	}
	
	public Job convertToJob(JobDto jobDto) {
		Job job = null;
		if (jobDto.getId() != null) {
			job = jobRepository.findById(jobDto.getId()).get();
		} else {
			job = new Job();
		}
		modelMapper.map(jobDto, job);
		return job;
	}
	
	public SwotJob convertToSwotJob(SwotJobDto swotJobDto) {
		SwotJob swotJob = null;
		if (swotJobDto.getId() != null) {
			swotJob = swotJobRepository.findById(swotJobDto.getId()).get();
		} else {
			swotJob = new SwotJob();
		}
		modelMapper.map(swotJobDto, swotJob);
		return swotJob;
	}

	public LeaveLetter convertToLeaveLetter(LeaveLetterDto  leaveLetterDto) {
		LeaveLetter leaveLetter = null;
		if (leaveLetterDto.getId() != null) {
			leaveLetter = leaveLetterRepository.findById(leaveLetterDto.getId()).get();
		} else {
			leaveLetter = new LeaveLetter();
		}
		modelMapper.map(leaveLetterDto, leaveLetter);
		return leaveLetter;
	}

	public Role convertToRole(RoleDto roleDto) {
		Role role = null;
		if (roleDto.getId() != null) {
			role = roleRepository.findById(roleDto.getId()).get();
		} else {
			role = new Role();
		}
		modelMapper.map(roleDto, role);
		return role;
	}


	
	public LabourAttendance convertToLabourAttendance(LabourAttendanceDto labourAttendanceDto) {
		LabourAttendance labourAttendance = null;
		if (labourAttendanceDto.getId() != null) {
			labourAttendance = labourAttendanceRepository.findById(labourAttendanceDto.getId()).get();
		} else {
			labourAttendance = new LabourAttendance();
		}
		modelMapper.map(labourAttendanceDto, labourAttendance);
		return labourAttendance;
	}
	
	public Labour convertToLabour(LabourDto labourDto) {
		Labour labour = null;
		if (labourDto.getId() != null) {
			labour = labourRepository.findById(labourDto.getId()).get();
		} else {
			labour = new Labour();
		}
		modelMapper.map(labourDto, labour);
		return labour;
	}

	public LabourSalary convertToLabourSalary(LabourSalaryDto labourSalaryDto) {
		LabourSalary labourSalary = null;
		if (labourSalaryDto.getId() != null) {
			labourSalary = labourSalaryRepository.findById(labourSalaryDto.getId()).get();
		} else {
			labourSalary = new LabourSalary();
		}
		modelMapper.map(labourSalaryDto, labourSalary);
		return labourSalary;
	}

	public EmployeeSalary convertToEmployeeSalary(EmployeeSalaryDto employeeSalaryDto ) {
		EmployeeSalary employeeSalary = null;
		if (employeeSalaryDto.getId() != null) {
			employeeSalary = employeeSalaryRepository.findById(employeeSalaryDto.getId()).get();
		} else {
			employeeSalary = new EmployeeSalary();
		}
		modelMapper.map(employeeSalaryDto, employeeSalary);
		return employeeSalary;
	}
	
	public EmployeeAttendance convertToEmployeeAttendance(EmployeeAttendanceDto employeeAttendanceDto) {
		EmployeeAttendance employeeAttendance = null;
		if (employeeAttendanceDto.getId() != null) {
			employeeAttendance = employeeAttendanceRepository.findById(employeeAttendanceDto.getId()).get();
		} else {
			employeeAttendance = new EmployeeAttendance();
		}
		modelMapper.map(employeeAttendanceDto, employeeAttendance);
		return employeeAttendance;
	}

	public User convertToUser(UserDto userDto) {
		User user = null;
		if (userDto.getId() != null) {
			user = userRepository.findById(userDto.getId()).get();
		} else {
			user = new User();
		}
//		modelMapper.map(userDto, user);
		
		
		user.setEmail(userDto.getEmail());
		user.setAnnualLeaveYear(userDto.getAnnualLeaveYear());
		user.setAbsentDayPerYear(userDto.getAbsentDayPerYear());
		user.setBonusAnnualLeavePerYear(userDto.getBonusAnnualLeavePerYear());
		user.setAnnualLeaveNumberRemaining(userDto.getAnnualLeaveNumberRemaining());
		user.setCompanyId(userDto.getCompanyId());
		user.setDepartmentId(userDto.getDepartmentId());
		user.setFullName(userDto.getFullName());
		user.setPhone(userDto.getPhone());
		user.setRole(userDto.getRole());
		user.setAddress(userDto.getAddress());
		user.setBirthday(userDto.getBirthday());
		user.setActive(userDto.isActive());
		user.setGender(userDto.getGender());
		user.setCurrentAddress(userDto.getCurrentAddress());
		user.setStartWorkDate(userDto.getStartWorkDate());
		user.setPosition(userDto.getPosition());
		user.setCode(userDto.getCode());
		user.setCreatedUserEmail(userDto.getCreatedUserEmail());
		user.setLastedUpdateUserEmail(userDto.getLastedUpdateUserEmail());
		user.setSalaryLevel(userDto.getSalaryLevel());
		
		if (user.getRoles() != null) {
			user.getRoles().clear();
			for (Role role : userDto.getRoles()) {
				user.getRoles().add(role);
			}
		} else {
			user.setRoles(userDto.getRoles());
		}

		
		return user;
	}

//****************************User File & Image******************************
	public UserDto convertToUserDto(User user, List<FileUpload> profiles, List<FileUpload> imageUpload) {
		UserDto dto = modelMapper.map(user, UserDto.class);
		dto.setImageUpload(
				imageUpload.stream().map(file -> convertToUploadUserImage(file)).collect(Collectors.toList()));
		dto.setProfiles(profiles.stream().map(file -> convertToUploadUserProfile(file)).collect(Collectors.toList()));
		return dto;
	}

	private UploadFileResponse convertToUploadUserProfile(FileUpload file) {
		return new UploadFileResponse(file.getName(), "/api/downloadUserProfile/" + file.getName(), null,
				file.getSize(), file.getUploadBy());
	}

	private UploadFileResponse convertToUploadUserImage(FileUpload file) {
		return new UploadFileResponse(file.getName(), "/api/downloadUserImage/" + file.getName(), null, file.getSize(),
				file.getUploadBy());
	}

//******************************End User File & Image******************************

//	******************************Start Approval File******************************

	public ApprovalDto convertToApprovalDto(Approval approval, List<FileUpload> approvalUploadFile) {
		ApprovalDto dto = modelMapper.map(approval, ApprovalDto.class);
		dto.setApprovalUploadFile(approvalUploadFile.stream().map(file -> convertToUploadApprovalFile(file))
				.collect(Collectors.toList()));
		return dto;
	}

	private UploadFileResponse convertToUploadApprovalFile(FileUpload file) {
		return new UploadFileResponse(file.getName(), "/api/downloadApprovalFile/" + file.getName(), null,
				file.getSize(), file.getUploadBy());
	}
//	******************************End Approval File******************************

//	******************************Start Close Project File******************************

	public CloseProjectDto convertToCloseProjectDto(CloseProject closeProject, List<FileUpload> closeWorkDoneUploadFile,
			List<FileUpload> incurredUploadFile) {
		CloseProjectDto dto = modelMapper.map(closeProject, CloseProjectDto.class);
		dto.setCloseWorkDoneUploadFile(closeWorkDoneUploadFile.stream()
				.map(file -> convertToUploadCloseProjectFile(file)).collect(Collectors.toList()));
		dto.setIncurredUploadFile(incurredUploadFile.stream().map(file -> convertToUploadCloseProjectFile(file))
				.collect(Collectors.toList()));
		return dto;
	}

	private UploadFileResponse convertToUploadCloseProjectFile(FileUpload file) {
		return new UploadFileResponse(file.getName(), "/api/downloadCloseProjectFile/" + file.getName(), null,
				file.getSize(), file.getUploadBy());
	}
//	******************************End Close Project File******************************

//	******************************Start Efficiency File******************************

	public EfficiencyDto convertToEfficiencyDto(Efficiency efficiency, List<FileUpload> handoverWorkUploadFile) {
		EfficiencyDto dto = modelMapper.map(efficiency, EfficiencyDto.class);
		dto.setHandoverWorkUploadFile(handoverWorkUploadFile.stream().map(file -> convertToUploadEfficiencyFile(file))
				.collect(Collectors.toList()));
		return dto;
	}

	private UploadFileResponse convertToUploadEfficiencyFile(FileUpload file) {
		return new UploadFileResponse(file.getName(), "/api/downloadEfficiencyFile/" + file.getName(), null,
				file.getSize(), file.getUploadBy());
	}
//	******************************End Efficiency File******************************


	// ******************************Start Labour File******************************

	public LabourDto convertToLabourDto(Labour labour, List<FileUpload> labourContractFile) {
		LabourDto dto = modelMapper.map(labour, LabourDto.class);
		dto.setLabourContractFile(
				labourContractFile.stream().map(file -> convertToLabourFile(file)).collect(Collectors.toList()));
		return dto;
	}

	private UploadFileResponse convertToLabourFile(FileUpload file) {
		return new UploadFileResponse(file.getName(), "/api/downloadLabourContractFile/" + file.getName(), null,
				file.getSize(), file.getUploadBy());
	}

	// ******************************End Labour File******************************
}
