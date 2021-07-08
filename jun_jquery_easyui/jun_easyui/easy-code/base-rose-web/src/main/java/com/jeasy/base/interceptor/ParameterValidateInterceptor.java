package com.jeasy.base.interceptor;

import net.paoding.rose.web.ControllerInterceptorAdapter;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.InvocationChain;
import net.paoding.rose.web.annotation.Interceptor;

import java.lang.annotation.Annotation;

import org.springframework.beans.factory.annotation.Autowired;

import com.jeasy.AnnotationValidable;
import com.jeasy.ValidateException;
import com.jeasy.Validator;
import com.jeasy.base.controllers.ModelResult;
import com.jeasy.json.GsonUtils;

import lombok.extern.slf4j.Slf4j;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/17 10:26
 */
@Slf4j
@Interceptor(oncePerRequest = true)
public class ParameterValidateInterceptor extends ControllerInterceptorAdapter {

	@Autowired
	private Validator validator;

	protected Object before(Invocation inv) throws Exception {
		Object[] args = inv.getMethodParameters();
		Annotation[][] parameterAnnotations = inv.getMethod().getParameterAnnotations();
		try {
			for (int i = 0; i < parameterAnnotations.length; i++) {
				if (args[i] instanceof AnnotationValidable) {
					validator.validate((AnnotationValidable) args[i]);
				} else {
					for (int j = 0; j < parameterAnnotations[i].length; j++) {
						Annotation annotation = parameterAnnotations[i][j];
						if (annotation.annotationType().getSimpleName().startsWith(Validator.PREFIX)) {
							validator.validate(annotation, args[i]);
						}
					}
				}
			}
			return Boolean.TRUE;
		} catch (ValidateException ve) {
			log.error("Validate Occur Exception : ", ve);
			ModelResult modelResult = new ModelResult(ModelResult.CODE_200);
			modelResult.setMessage(ve.getMessage());
			inv.getRequest().setAttribute("result", modelResult);
			return "@json:" + GsonUtils.toJson(modelResult);
		} catch (Exception e) {
			log.error("ParameterValidateInterceptor Occur Exception : ", e);
			ModelResult modelResult = new ModelResult(ModelResult.CODE_500);
			modelResult.setMessage(e.getMessage());
			inv.getRequest().setAttribute("result", modelResult);
			return "@json:" + GsonUtils.toJson(modelResult);
		}
	}

	@Override
	protected Object round(Invocation inv, InvocationChain chain) throws Exception {
		try {
			return super.round(inv, chain);
		} catch (Exception e) {
			log.error("Occur Exception : ", e);
			ModelResult modelResult = new ModelResult(ModelResult.CODE_500);
			modelResult.setMessage(e.getMessage());
			inv.getRequest().setAttribute("result", modelResult);
			return "@json:" + GsonUtils.toJson(modelResult);
		}
	}
}
