package com.jeasy.base.interceptor;

import net.paoding.rose.web.ControllerInterceptorAdapter;
import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Interceptor;

import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/17 10:26
 */
@Slf4j
@Interceptor(oncePerRequest = true)
public class CharacterEncodingInterceptor extends ControllerInterceptorAdapter {

	@Setter
	private String encoding;

	@Override
	protected Object after(Invocation inv, Object instruction) throws Exception {
		inv.getResponse().setCharacterEncoding(encoding);
		return instruction;
	}
}
