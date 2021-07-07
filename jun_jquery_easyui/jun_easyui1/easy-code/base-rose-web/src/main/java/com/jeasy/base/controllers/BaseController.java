package com.jeasy.base.controllers;

import net.paoding.rose.web.InvocationLocal;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.jeasy.json.GsonUtils;

/**
 * Abstract BaseController
 *
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
public abstract class BaseController {

	@Autowired
	protected InvocationLocal inv;

	private static final String TEXT_PREFIX = "@";

	private static final String JSON_PREFIX = "@json:";

	private static final String XML_PREFIX = "@xml:";

	private static final String PLAIN_PREFIX = "@plain:";

	private static final String HTML_PREFIX = "@html:";

	private static final String FORWARD_PREFIX = "f:";

	private static final String REDIRECT_PREFIX = "r:";

	protected String render(String render) {
		return renderJsp(render);
	}

	protected String renderJsp(String render) {
		return render;
	}

	protected String renderText(String text) {
		return TEXT_PREFIX + text;
	}

	protected String renderJson(String json) {
		return JSON_PREFIX + json;
	}

	protected String renderXml(String xml) {
		return XML_PREFIX + xml;
	}

	protected String renderPlain(String plain) {
		return PLAIN_PREFIX + plain;
	}

	protected String renderHtml(String html) {
		return HTML_PREFIX + html;
	}

	protected String forward(String url) {
		return FORWARD_PREFIX + url;
	}

	protected String redirect(String url) {
		return REDIRECT_PREFIX + url;
	}

	/**
	 * 响应信息
	 * @param code
	 * @param message
	 * @return
	 */
	protected String renderMessage(int code, String message) {
		return renderJson(GsonUtils.toJson(buildMessage(code, message)));
	}

	private ModelResult buildMessage(int code, String message){
		ModelResult modelResult = new ModelResult(code);
		modelResult.setMessage(message);

		inv.getRequest().setAttribute("result", modelResult);
		return modelResult;
	}

	/**
	 * 响应实体
	 * @param code
	 * @param message
	 * @param entity
	 * @return
	 */
	protected String renderEntity(int code, String message, Object entity) {
		return renderJson(GsonUtils.toJson(buildEntity(code, message, entity)));
	}

	private ModelResult buildEntity(int code, String message, Object entity){
		ModelResult modelResult = new ModelResult(code);
		modelResult.setMessage(message);
		modelResult.setEntity(entity);

		inv.getRequest().setAttribute("result", modelResult);
		return modelResult;
	}

	/**
	 * 响应list
	 * @param code
	 * @param message
	 * @param list
	 * @return
	 */
	protected String renderList(int code, String message, List list) {
		return renderJson(GsonUtils.toJson(buildList(code, message, list)));
	}

	private ModelResult buildList(int code, String message, List list){
		ModelResult modelResult = new ModelResult(code);
		modelResult.setMessage(message);
		modelResult.setList(list);

		inv.getRequest().setAttribute("result", modelResult);
		return modelResult;
	}

	/**
	 * 响应page
	 * @param code
	 * @param message
	 * @param totalCount
	 * @param items
	 * @return
	 */
	protected String renderPage(int code, String message, int totalCount, List items, Integer pageSize, Integer pageNo) {
		return renderJson(GsonUtils.toJson(buildPage(code, message, totalCount, items, pageSize, pageNo)));
	}

	private ModelResult buildPage(int code, String message, int totalCount, List items, Integer pageSize, Integer pageNo){
		ModelResult modelResult = new ModelResult(code);
		modelResult.setMessage(message);
		modelResult.setResultPage(new ResultPage(totalCount, pageSize, pageNo, items));

		inv.getRequest().setAttribute("result", modelResult);
		return modelResult;
	}
}
