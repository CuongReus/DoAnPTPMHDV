package com.logsik.taman.mail;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class MailContentBuilder {

    @Autowired
    private TemplateEngine templateEngine;

    public String build(String message) {
        Context context = new Context();
        context.setVariable("message", message);
        return templateEngine.process("mailTemplate", context);
    }

    public String buildVariables(String templateName, Map<String, Object> variables) {
        Context context = new Context();
        for (Map.Entry<String, Object> pair : variables.entrySet()) {
            context.setVariable(pair.getKey(), pair.getValue());
        }
        return templateEngine.process(templateName, context);
    }

}
