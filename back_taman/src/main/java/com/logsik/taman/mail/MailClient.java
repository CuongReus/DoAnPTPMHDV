package com.logsik.taman.mail;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import com.logsik.taman.domain.LeaveLetter;
import com.logsik.taman.domain.Payment;
import com.logsik.taman.domain.Project;
import com.logsik.taman.domain.ProjectCost;
import com.logsik.taman.domain.ProjectDetail;
import com.logsik.taman.domain.ProjectYear;
import com.logsik.taman.domain.User;
import com.logsik.taman.repository.ProjectCostRepository;
import com.logsik.taman.repository.ProjectDetailRepository;
import com.logsik.taman.repository.ProjectRepository;
import com.logsik.taman.repository.ProjectYearRepository;
import com.logsik.taman.repository.UserRepository;
import com.logsik.taman.service.impl.DtoConverter;

/**
 * Created by phamcongbang on 14/05/2018.
 */
@Service
public class MailClient {
	private static final Logger LOGGER = LoggerFactory.getLogger(MailClient.class);

	@Value("${spring.production.url}")
    private String productionUrl;
	
	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private MailContentBuilder mailContentBuilder;
	@Autowired
	private ProjectYearRepository projectYearRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private ProjectDetailRepository projectDetailRepository;
	@Autowired
	private ProjectCostRepository projectCostRepository;
	
	@Autowired
	private UserRepository userRepository;

	// @Autowired
	// private UserTokenRepository userTokenRepository;

	@Autowired
	private DtoConverter dtoConverter;

	private static String emailFrom = "noreply@tamaninterior.com";

	/**
	 * TEST method
	 */
	public Boolean prepareAndSend(String recipient, String subject, String message) {
		MimeMessagePreparator messagePreparator = mimeMessage -> {
			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
			messageHelper.setFrom(emailFrom);
			messageHelper.setTo(recipient);
			messageHelper.setSubject(subject);

			// String content = mailContentBuilder.build(message);
			Map<String, Object> variables = new HashMap<>();
			variables.put("message", message);
			// variables.put("brand", brandDto); // TODO: put table price here
			String content = mailContentBuilder.buildVariables("mailTemplate", variables);
			messageHelper.setText(content, true);
		};
		try {
			mailSender.send(messagePreparator);
			return true;
		} catch (MailException e) {
			// runtime exception; compiler will not force you to handle it
			System.out.println(e.getMessage());
			return false;
		}
	}

	public Boolean sendPaymentNotifyTo(Payment payment) {
		String[] listEmail =   payment.getNotifyTo().split(",");
		ProjectCost projectCost = projectCostRepository.findById(payment.getProjectCostId()).get();
		Optional<ProjectYear> findCompanyByProjectYearId = projectYearRepository.findById(projectCost.getProjectDetail().getProject().getProjectYear().getId());
		Optional<User> approvalBy = userRepository.findById(payment.getApprovalById());
		Optional<User> sender;
		if (payment.getLastedUpdateUserId() ==null) {
			sender = userRepository.findById(payment.getCreatedUserId());
		}else { 
			sender = userRepository.findById(payment.getLastedUpdateUserId());
		}
		
		MimeMessagePreparator messagePreparator = mimeMessage -> {
			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
			messageHelper.setFrom(emailFrom);
			for(String email:listEmail) {
				messageHelper.addTo(email);
			}
			messageHelper.setSubject(findCompanyByProjectYearId.get().getCompany().getName()+" - *Bạn Nhận Được Thông Báo* Từ " + sender.get().getFullName());
			messageHelper.setReplyTo(emailFrom);
			Map<String, Object> variables = new HashMap<>();
			variables.put("welcomeMessage", "Xin chào");
			variables.put("projectDetail", projectCost.getProjectDetail());
			variables.put("projectCost", projectCost);
			variables.put("approvalBy", approvalBy.get());
			variables.put("payment",payment);
			variables.put("sender",sender.get());
			variables.put("company", findCompanyByProjectYearId.get().getCompany());

			// TODO: Hash the id to hide information
//			variables.put("", productionUrl + "/validateLeave/" + letter.getId());
			String content = mailContentBuilder.buildVariables("mailPaymentNotifyTo", variables);
			messageHelper.setText(content, true);
		};
		try {
			mailSender.send(messagePreparator);
			return true;
		} catch (MailException e) {
			// runtime exception; compiler will not force you to handle it
			LOGGER.error("Cannot send validation email. " + e.getMessage());
			return false;
		}
	}
	
	public Boolean sendProjectNotifyTo(Project project) {
		String[] listEmail = project.getNotifyTo().split(",");
		Optional<User> sender;
		if(project.getLastedUpdateUserId() ==null) {
			sender = userRepository.findById(project.getCreatedUserId());
		}else { 
			sender = userRepository.findById(project.getLastedUpdateUserId());
		}
		Optional<ProjectYear> projectYear = projectYearRepository.findById(project.getProjectYearId());
		MimeMessagePreparator messagePreparator = mimeMessage -> {
			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
			messageHelper.setFrom(emailFrom);
			for(String email:listEmail) {
				messageHelper.addTo(email);
			}
			messageHelper.setSubject(projectYear.get().getCompany().getName()+" -*Bạn Nhận Được Thông Báo Dự Án*");
			messageHelper.setReplyTo(emailFrom);
			Map<String, Object> variables = new HashMap<>();
			variables.put("welcomeMessage", "Xin chào");
			variables.put("project", project);
			variables.put("company", projectYear.get().getCompany());
			variables.put("sender",sender.get());
			

			// TODO: Hash the id to hide information
//			variables.put("", productionUrl + "/validateLeave/" + letter.getId());
			String content = mailContentBuilder.buildVariables("mailProjectNotifyTo", variables);
			messageHelper.setText(content, true);
		};
		try {
			mailSender.send(messagePreparator);
			return true;
		} catch (MailException e) {
			// runtime exception; compiler will not force you to handle it
			LOGGER.error("Cannot send validation email. " + e.getMessage());
			return false;
		}
	}
	
	public Boolean sendProjectDetailNotifyTo(ProjectDetail projectDetail) {
		String[] listEmail =   projectDetail.getNotifyTo().split(",");
		Optional<User> sender;
		if(projectDetail.getLastedUpdateUserId() ==null) {
			sender = userRepository.findById(projectDetail.getCreatedUserId());
		}else { 
			sender = userRepository.findById(projectDetail.getLastedUpdateUserId());
		}
		Project project = projectRepository.findById(projectDetail.getProjectId()).get();
		Optional<ProjectYear> projectYear = projectYearRepository.findById(project.getProjectYear().getId());
		MimeMessagePreparator messagePreparator = mimeMessage -> {
			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
			messageHelper.setFrom(emailFrom);
			for(String email:listEmail) {
				messageHelper.addTo(email);
			}
			messageHelper.setSubject(projectYear.get().getCompany().getName()+" - *Bạn Nhận Được Thông Báo Công Việc Dự Án*");
			messageHelper.setReplyTo(emailFrom);
			Map<String, Object> variables = new HashMap<>();
			variables.put("welcomeMessage", "Xin chào");
			variables.put("project", project);
			variables.put("projectDetail", projectDetail);
			variables.put("company", projectYear.get().getCompany());
			variables.put("sender", sender.get());

			// TODO: Hash the id to hide information
//			variables.put("", productionUrl + "/validateLeave/" + letter.getId());
			String content = mailContentBuilder.buildVariables("mailProjectDetailNotifyTo", variables);
			messageHelper.setText(content, true);
		};
		try {
			mailSender.send(messagePreparator);
			return true;
		} catch (MailException e) {
			// runtime exception; compiler will not force you to handle it
			LOGGER.error("Cannot send validation email. " + e.getMessage());
			return false;
		}
	}
	
	public Boolean sendProjectCostNotifyTo(ProjectCost projectCost) {
		String[] listEmail =   projectCost.getNotifyTo().split(",");
		ProjectDetail projectDetail = projectDetailRepository.findById(projectCost.getProjectDetailId()).get();
		Optional<User> approvalBy = userRepository.findById(projectCost.getApprovalById());
		Optional<User> sender;
		Optional<ProjectYear> findCompanyByProjectYearId = projectYearRepository.findById(projectDetail.getProject().getProjectYear().getId());
		if(projectCost.getLastedUpdateUserId() ==null) {
			sender = userRepository.findById(projectCost.getCreatedUserId());
		}else { 
			sender = userRepository.findById(projectCost.getLastedUpdateUserId());
		}
		MimeMessagePreparator messagePreparator = mimeMessage -> {
			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
			messageHelper.setFrom(emailFrom);
			for(String email:listEmail) {
				messageHelper.addTo(email);
			}
			messageHelper.setSubject(findCompanyByProjectYearId.get().getCompany().getName()+ " - *Bạn Nhận Được Thông Báo* Từ " + sender.get().getFullName());
			messageHelper.setReplyTo(emailFrom);
			Map<String, Object> variables = new HashMap<>();
			variables.put("welcomeMessage", "Xin chào");
			variables.put("projectDetail", projectDetail);
			variables.put("project", projectDetail.getProject());
			variables.put("projectCost", projectCost);
			variables.put("approvalBy", approvalBy.get());
			variables.put("sender",sender.get());
			variables.put("company", findCompanyByProjectYearId.get().getCompany());

			// TODO: Hash the id to hide information
//			variables.put("", productionUrl + "/validateLeave/" + letter.getId());
			String content = mailContentBuilder.buildVariables("mailProjectCostNotifyTo", variables);
			messageHelper.setText(content, true);
		};
		try {
			mailSender.send(messagePreparator);
			return true;
		} catch (MailException e) {
			// runtime exception; compiler will not force you to handle it
			LOGGER.error("Cannot send validation email. " + e.getMessage());
			return false;
		}
	}
	
	public Boolean sendValidationLeaveEmail(LeaveLetter letter, User user, User approvedBy) {
		MimeMessagePreparator messagePreparator = mimeMessage -> {
			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
			messageHelper.setFrom(emailFrom);
			messageHelper.setTo(approvedBy.getEmail());
			messageHelper.setSubject(user.getCompany().getName()+" - *Duyệt đơn xin nghỉ phép* " + user.getFullName());
			messageHelper.setReplyTo(emailFrom);
			Map<String, Object> variables = new HashMap<>();
			variables.put("welcomeMessage", "Xin chào " + approvedBy.getFullName() + ",");
			variables.put("staff", user);
			variables.put("leaveLetter", letter);
			variables.put("company", user.getCompany());

			// TODO: Hash the id to hide information
			variables.put("validateLeaveLetterUrl", productionUrl + "/validateLeave/" + letter.getId());
			String content = mailContentBuilder.buildVariables("validateLeave", variables);
			messageHelper.setText(content, true);
		};
		try {
			mailSender.send(messagePreparator);
			return true;
		} catch (MailException e) {
			// runtime exception; compiler will not force you to handle it
			LOGGER.error("Cannot send validation email. " + e.getMessage());
			return false;
		}
	}
	public Boolean approvalLabourCost(ProjectCost projectCost) {
		ProjectDetail projectDetail = projectDetailRepository.findById(projectCost.getProjectDetailId()).get();
		Optional<ProjectYear> findCompanyByProjectYearId = projectYearRepository.findById(projectDetail.getProject().getProjectYear().getId());
		Optional<User> approval = userRepository.findById(projectCost.getApprovalById());
		Optional<User> sender;
		if(projectCost.getLastedUpdateUserId() ==null) {
			sender = userRepository.findById(projectCost.getCreatedUserId());
		}else { 
			sender = userRepository.findById(projectCost.getLastedUpdateUserId());
		}
		MimeMessagePreparator messagePreparator = mimeMessage -> {
			if(sender.get().getId() != approval.get().getId() ) {
			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
			messageHelper.setFrom(emailFrom);
			messageHelper.setTo(approval.get().getEmail());
			messageHelper.setSubject(findCompanyByProjectYearId.get().getCompany().getName()+ " - *Yêu Cầu Duyệt* thanh toán nhân công tháng " + projectCost.getMonth() + " năm " + projectCost.getYear());
			messageHelper.setReplyTo(emailFrom);
			Map<String, Object> variables = new HashMap<>();
			variables.put("welcomeMessage", "Xin chào " + approval.get().getFullName() + ",");
			variables.put("projectCost",projectCost);
			variables.put("projectDetail", projectDetail);
			variables.put("project", projectDetail.getProject());
			variables.put("company",findCompanyByProjectYearId.get().getCompany());
			variables.put("sender",sender.get());

			// TODO: Hash the id to hide information
			variables.put("approvalLabourCostUrl", productionUrl + "/projectCostApproval/" + projectCost.getId());
			String content = mailContentBuilder.buildVariables("labourCostApproval", variables);
			messageHelper.setText(content, true);
			}
		};
		
		try {
			mailSender.send(messagePreparator);
			return true;
		} catch (MailException e) {
			// runtime exception; compiler will not force you to handle it
			LOGGER.error("Cannot send validation email. " + e.getMessage());
			return false;
		}
	}
//	That method use for ProductCost, ConstructionTeamCost, OtherCost
	public Boolean approvalProjectCost(ProjectCost projectCost) {
		Optional<User> approval = userRepository.findById(projectCost.getApprovalById());
		ProjectDetail projectDetail = projectDetailRepository.findById(projectCost.getProjectDetailId()).get();
		Optional<ProjectYear> findCompanyByProjectYearId = projectYearRepository.findById(projectDetail.getProject().getProjectYear().getId());
		Optional<User> sender;
		if(projectCost.getLastedUpdateUserId() ==null) {
			sender = userRepository.findById(projectCost.getCreatedUserId());
		}else { 
			sender = userRepository.findById(projectCost.getLastedUpdateUserId());
		}
		MimeMessagePreparator messagePreparator = mimeMessage -> {
			if(sender.get().getId() != approval.get().getId() ) {
			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
			messageHelper.setFrom(emailFrom);
			messageHelper.setTo(approval.get().getEmail());
			messageHelper.setSubject(findCompanyByProjectYearId.get().getCompany().getName()+ " - *Yêu Cầu Duyệt* thanh toán " + projectCost.getPaymentType().toString());
			messageHelper.setReplyTo(emailFrom);
			Map<String, Object> variables = new HashMap<>();
			variables.put("welcomeMessage", "Xin chào " + approval.get().getFullName() + ",");
			variables.put("projectCost",projectCost);
			variables.put("projectDetail", projectDetail);
			variables.put("project", projectDetail.getProject());
			variables.put("company",findCompanyByProjectYearId.get().getCompany());
			variables.put("sender",sender.get());

			// TODO: Hash the id to hide information
			variables.put("projectCostApprovalUrl", productionUrl + "/projectCostApproval/" + projectCost.getId());
			String content = mailContentBuilder.buildVariables("projectCostApproval", variables);
			messageHelper.setText(content, true);
			}
		};
		try {
			mailSender.send(messagePreparator);
			return true;
		} catch (MailException e) {
			// runtime exception; compiler will not force you to handle it
			LOGGER.error("Cannot send validation email. " + e.getMessage());
			return false;
		}
	}
	
public Boolean approvalPayment(Payment payment) {
	ProjectCost projectCost = projectCostRepository.findById(payment.getProjectCostId()).get();
		Optional<User> approval = userRepository.findById(payment.getApprovalById());
		Optional<ProjectYear> findCompanyByProjectYearId = projectYearRepository.findById(projectCost.getProjectDetail().getProject().getProjectYear().getId());
		Optional<User> sender;
		if(payment.getLastedUpdateUserId() ==null) {
			sender = userRepository.findById(payment.getCreatedUserId());
		}else { 
			sender = userRepository.findById(payment.getLastedUpdateUserId());
		}
		MimeMessagePreparator messagePreparator = mimeMessage -> {
			if(sender.get().getId() != approval.get().getId() && "NHAN_CONG" !=(payment.getProjectCost().getPaymentType().toString()) ) {
			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
			messageHelper.setFrom(emailFrom);
			messageHelper.setTo(approval.get().getEmail());
			messageHelper.setSubject(findCompanyByProjectYearId.get().getCompany().getName()+ " - *Yêu Cầu Duyệt % * thanh toán ");
			messageHelper.setReplyTo(emailFrom);
			Map<String, Object> variables = new HashMap<>();
			variables.put("welcomeMessage", "Xin chào " + approval.get().getFullName() + ",");
			variables.put("projectCost",projectCost);
			variables.put("payment", payment);
			variables.put("approvalBy", approval.get());
			variables.put("projectDetail", projectCost.getProjectDetail());
			variables.put("company",findCompanyByProjectYearId.get().getCompany());
			variables.put("sender",sender.get());
			// TODO: Hash the id to hide information
			variables.put("paymentApprovalUrl", productionUrl + "/projectCostApproval/" + payment.getProjectCost().getId());
			String content = mailContentBuilder.buildVariables("paymentApproval", variables);
			messageHelper.setText(content, true);
			}
		};
		
		try {
			mailSender.send(messagePreparator);
			return true;
		} catch (MailException e) {
			// runtime exception; compiler will not force you to handle it
			LOGGER.error("Cannot send validation email. " + e.getMessage());
			return false;
		}
	}

}
