package com.jeasy.doc.interceptor;

import net.paoding.rose.web.ControllerInterceptorAdapter;
import net.paoding.rose.web.Invocation;

import java.io.PrintWriter;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.net.URLDecoder;
import java.util.*;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

import com.google.common.collect.Lists;
import com.jeasy.base.controllers.ModelResult;
import com.jeasy.base.resolver.FromJson;
import com.jeasy.date.DateExUtils;
import com.jeasy.doc.annotation.InitField;
import com.jeasy.doc.annotation.MethodDoc;
import com.jeasy.doc.model.BodyParam;
import com.jeasy.doc.model.KvParam;
import com.jeasy.doc.model.ResParam;
import com.jeasy.json.GsonUtils;
import com.jeasy.util.ThreadLocalUtils;
import com.jeasy.validate.*;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class TransferDocInterceptor extends ControllerInterceptorAdapter {

	@Override
	protected Object before(Invocation inv) throws Exception {
		ThreadLocalUtils.putTime(System.currentTimeMillis());

		int isDoc = Integer.valueOf(inv.getRequest().getParameter("doc") == null ? "0" : inv.getRequest().getParameter("doc"));
		int isDisplay = Integer.valueOf(inv.getRequest().getParameter("display") == null ? "0" : inv.getRequest().getParameter("display"));

		StringBuilder logMsg = new StringBuilder("\nAPI doc handle report -------- " + DateExUtils.currentDatetime() + " ------------------------------------------------------");
		logMsg.append("\nURI         : ").append(inv.getRequest().getRequestURI()).append(", Method : ").append(inv.getRequest().getMethod());
		logMsg.append("\nController  : ").append(inv.getControllerClass().getName()).append(", Method : ").append(inv.getMethod().getName());

		if (inv.getRequest().getMethod().equalsIgnoreCase("GET")) {
			logMsg.append("\nQueryString : ").append(URLDecoder.decode((inv.getRequest().getQueryString() == null ? "null" : inv.getRequest().getQueryString()), "UTF-8"));
		} else if (inv.getRequest().getMethod().equalsIgnoreCase("POST")) {
			logMsg.append("\nParameter   : ").append(inv.getRequest().getParameterMap());
		}

		// 构建DOC接口响应假数据
		if (isDoc == 1) {
			Method method = inv.getMethod();
			MethodDoc methodDoc = method.getAnnotation(MethodDoc.class);
			Class entity = methodDoc.entity();
			Class lists = methodDoc.lists();
			Class pages = methodDoc.pages();

			List<ResParam> resParams = new ArrayList<>();
			long index = 0;
			if (!entity.getSimpleName().equals("Object")) {
				ResParam codeParam = new ResParam(++index, "code", "200", "HTTP状态", "Integer");
				resParams.add(codeParam);

				ResParam dataParam = new ResParam(++index, "data", StringUtils.EMPTY, "响应数据", StringUtils.EMPTY);
				resParams.add(dataParam);

				List<ResParam> children = new ArrayList<>();
				dataParam.setChildren(children);

				ResParam msgParam = new ResParam(++index, "message", "success", "处理信息", "String");
				children.add(msgParam);

				ResParam entityParam = new ResParam(++index, "entity", StringUtils.EMPTY, "实体对象", entity.getSimpleName());
				children.add(entityParam);

				List<ResParam> entityChildren = new ArrayList<>();
				entityParam.setChildren(entityChildren);

				List<Field> fieldList = getFields(entity);

				for (Field field : fieldList) {
					index = buildFieldParamsForDoc(index, entityChildren, field);
				}
			} else if (!lists.getSimpleName().equals("Object")) {
				ResParam codeParam = new ResParam(++index, "code", "200", "HTTP状态", "Integer");
				resParams.add(codeParam);

				ResParam dataParam = new ResParam(++index, "data", StringUtils.EMPTY, "响应数据", StringUtils.EMPTY);
				resParams.add(dataParam);

				List<ResParam> children = new ArrayList<>();
				dataParam.setChildren(children);

				ResParam msgParam = new ResParam(++index, "message", "success", "处理信息", "String");
				children.add(msgParam);

				ResParam listParam = new ResParam(++index, "list", StringUtils.EMPTY, "集合对象", "List<" + lists.getSimpleName() + ">");
				children.add(listParam);

				List<ResParam> listChildren = new ArrayList<>();
				listParam.setChildren(listChildren);

				for (int j=0; j < 3; j++) {
					ResParam listItem = new ResParam(++index, "[" + j + "]", StringUtils.EMPTY, StringUtils.EMPTY, lists.getSimpleName());
					listChildren.add(listItem);

					List<ResParam> itemChildren = new ArrayList<>();
					listItem.setChildren(itemChildren);

					List<Field> fieldList = getFields(lists);

					for (Field field : fieldList) {
						index = buildFieldParamsForDoc(index, itemChildren, field);
					}
				}
			} else if (!pages.getSimpleName().equals("Object")) {
				ResParam codeParam = new ResParam(++index, "code", "200", "HTTP状态", "Integer");
				resParams.add(codeParam);

				ResParam dataParam = new ResParam(++index, "data", StringUtils.EMPTY, "响应数据", StringUtils.EMPTY);
				resParams.add(dataParam);

				List<ResParam> children = new ArrayList<>();
				dataParam.setChildren(children);

				ResParam msgParam = new ResParam(++index, "message", "success", "处理信息", "String");
				children.add(msgParam);

				ResParam recordCountParam = new ResParam(++index, "recordCount", "3", "当前页记录数", "Integer");
				children.add(recordCountParam);

				ResParam totalParam = new ResParam(++index, "total", "30", "总记录数", "Integer");
				children.add(totalParam);

				ResParam totalCountParam = new ResParam(++index, "totalCount", "30", "总记录数", "Integer");
				children.add(totalCountParam);

				ResParam pageParam = new ResParam(++index, "page", "10", "总页数", "Integer");
				children.add(pageParam);

				ResParam sizeParam = new ResParam(++index, "size", "3", "每页大小", "Integer");
				children.add(sizeParam);

				ResParam listParam = new ResParam(++index, "list", StringUtils.EMPTY, "集合对象", "List<" + pages.getSimpleName() + ">");
				children.add(listParam);

				List<ResParam> listChildren = new ArrayList<>();
				listParam.setChildren(listChildren);

				for (int j=0; j < 3; j++) {
					ResParam listItem = new ResParam(++index, "[" + j + "]", StringUtils.EMPTY, StringUtils.EMPTY, pages.getSimpleName());
					listChildren.add(listItem);

					List<ResParam> itemChildren = new ArrayList<>();
					listItem.setChildren(itemChildren);

					List<Field> fieldList = getFields(pages);

					for (Field field : fieldList) {
						index = buildFieldParamsForDoc(index, itemChildren, field);
					}
				}
			} else {
				ResParam codeParam = new ResParam(++index, "code", "200", "HTTP状态", "Integer");
				resParams.add(codeParam);

				ResParam dataParam = new ResParam(++index, "data", StringUtils.EMPTY, "响应数据", StringUtils.EMPTY);
				resParams.add(dataParam);

				List<ResParam> children = new ArrayList<>();
				dataParam.setChildren(children);

				ResParam msgParam = new ResParam(++index, "message", "success", "处理信息", "String");
				children.add(msgParam);
			}

			ModelResult modelResult = responseList(ModelResult.CODE_200, ModelResult.SUCCESS, resParams);

			logMsg.append("\nResponse    : ").append(GsonUtils.toJson(modelResult));
			logMsg.append("\nCost Time   : ").append(System.currentTimeMillis() - ThreadLocalUtils.getTime()).append(" ms");
			logMsg.append("\n---------------------------------------------------------------------------------------------------------");
			log.info(logMsg.toString());
			return "@json:" + GsonUtils.toJson(modelResult);
		}

		// 构建右面接口参数
		if (isDisplay == 1) {
			Map<String, Object> inputParams = new HashMap<>();

			Map<String, Object> bodyResult = new HashMap<>();
			Map<String, Object> kvResult = new HashMap<>();

			List<KvParam> kvParams = new ArrayList<>();
			List<BodyParam> bodyParams = new ArrayList<>();
			BodyParam appDevice = new BodyParam(1l, "appDevice", StringUtils.EMPTY, "设备信息", "Object", StringUtils.EMPTY);
			bodyParams.add(appDevice);

			BodyParam qdVersion = new BodyParam(2l, "qdVersion", "1.0", "客户版本", "String", StringUtils.EMPTY);
			qdVersion.set_parentId(appDevice.getId());
			bodyParams.add(qdVersion);

			BodyParam qdPlatform = new BodyParam(3l, "qdPlatform", "APP", "客户平台", "String", StringUtils.EMPTY);
			qdPlatform.set_parentId(appDevice.getId());
			bodyParams.add(qdPlatform);

			BodyParam qdDevice = new BodyParam(4l, "qdDevice", "IOS", "客户设备", "String", StringUtils.EMPTY);
			qdDevice.set_parentId(appDevice.getId());
			bodyParams.add(qdDevice);

			List<MethodParameter> methodParameters = buildMethodParameters(inv.getMethod());
			long index = 4;
			for (MethodParameter methodParameter : methodParameters) {
				if (methodParameter.hasParameterAnnotation(FromJson.class)) {
					// 带有@FromJson一律构建为JSON格式参数
					index = buildJsonParams(bodyParams, index, methodParameter);
				} else {
					// 未带有@FromJson一律构建为KV格式参数
					buildKvParams(kvParams, methodParameter);
				}
			}

			bodyResult.put("total", bodyParams.size());
			bodyResult.put("rows", bodyParams);

			kvResult.put("total", kvParams.size());
			kvResult.put("rows", kvParams);

			inputParams.put("body", bodyResult);
			inputParams.put("kv", kvResult);

			ModelResult modelResult = responseEntity(ModelResult.CODE_200, ModelResult.SUCCESS, inputParams);

			logMsg.append("\nResponse    : ").append(GsonUtils.toJson(modelResult));
			logMsg.append("\nCost Time   : ").append(System.currentTimeMillis() - ThreadLocalUtils.getTime()).append(" ms");
			logMsg.append("\n---------------------------------------------------------------------------------------------------------");
			log.info(logMsg.toString());

			return "@json:" + GsonUtils.toJson(modelResult);
		}
		return true;
	}

	private long buildFieldParamsForDoc(long index, List<ResParam> itemChildren, Field field) {
		InitField initField = field.getAnnotation(InitField.class);
		if (initField == null) {
			return index;
		}

		ResParam fieldParam = new ResParam(++index, field.getName(), StringUtils.EMPTY, initField.desc(), field.getType().getSimpleName());
		if (field.getType().equals(List.class) || field.getType().equals(Set.class)) {
			Class genericClass = (Class) ((ParameterizedType) field.getGenericType()).getActualTypeArguments()[0];
			index = buildCollectionParamsForDoc(index, field, initField, fieldParam, genericClass);
		} else if (field.getType().isArray()) {
			Class genericClass = field.getType().getComponentType();
			index = buildCollectionParamsForDoc(index, field, initField, fieldParam, genericClass);
		} else if (StringUtils.isBlank(initField.value())) {
			List<ResParam> fieldParams = new ArrayList<>();
			fieldParam.setChildren(fieldParams);

			List<Field> fieldList = getFields(field.getType());

			for (Field f : fieldList) {
				index = buildFieldParamsForDoc(index, fieldParams, f);
			}
		} else {
			fieldParam.setValue(initField.value());
		}

		itemChildren.add(fieldParam);
		return index;
	}

	private long buildCollectionParamsForDoc(long index, Field field, InitField initField, ResParam fieldParam, Class genericClass) {
		List fieldValue =  GsonUtils.fromJson(initField.value(), List.class);

		List<ResParam> fieldChildren = new ArrayList<>();
		fieldParam.setChildren(fieldChildren);

		if (fieldValue != null) {
			int i = 0;
			for (Object item : fieldValue) {
				ResParam itemParam = new ResParam(++index, "[" + i++ + "]", item.toString(), StringUtils.EMPTY, genericClass.getSimpleName());
				fieldChildren.add(itemParam);
			}
		} else {
			if (field.getType().isArray()) {
				genericClass = field.getType().getComponentType();
			} else {
				genericClass =  (Class) ((ParameterizedType) field.getGenericType()).getActualTypeArguments()[0];
			}

			List<Field> fieldList = getFields(genericClass);

			for (int i = 0; i < 3; i++) {
				ResParam itemParam = new ResParam(++index, "[" + i + "]", StringUtils.EMPTY, StringUtils.EMPTY, genericClass.getSimpleName());
				fieldChildren.add(itemParam);

				List<ResParam> filedParams = new ArrayList<>();
				itemParam.setChildren(filedParams);
				for (Field f : fieldList) {
					index = buildFieldParamsForDoc(index, filedParams, f);
				}
			}
		}
		return index;
	}

	private void buildKvParams(List<KvParam> kvParams, MethodParameter methodParameter) {
		InitField initField = (InitField) methodParameter.getAnnotation(InitField.class);
		if (initField == null) {
			return;
		}

		if (methodParameter.getType().equals(String.class)) {
			KvParam kvParam = new KvParam(initField.name(), initField.value(), "text", "String", initField.desc(), buildRuleDesc(methodParameter.getAnnotations()));
			kvParams.add(kvParam);
		} else if (methodParameter.getType().equals(Long.class)) {
			KvParam kvParam = new KvParam(initField.name(), initField.value(), "text", "Long", initField.desc(), buildRuleDesc(methodParameter.getAnnotations()));
			kvParams.add(kvParam);
		} else if (methodParameter.getType().equals(Integer.class)) {
			KvParam kvParam = new KvParam(initField.name(), initField.value(), "text", "Integer", initField.desc(), buildRuleDesc(methodParameter.getAnnotations()));
			kvParams.add(kvParam);
		} else if (methodParameter.getType().equals(Double.class)) {
			KvParam kvParam = new KvParam(initField.name(), initField.value(), "text", "Double", initField.desc(), buildRuleDesc(methodParameter.getAnnotations()));
			kvParams.add(kvParam);
		} else if (methodParameter.getType().equals(Float.class)) {
			KvParam kvParam = new KvParam(initField.name(), initField.value(), "text", "Float", initField.desc(), buildRuleDesc(methodParameter.getAnnotations()));
			kvParams.add(kvParam);
		} else if (methodParameter.getType().equals(List.class)) {
			Class genericClass = (Class) ((ParameterizedType) methodParameter.getGenericType()).getActualTypeArguments()[0];
			List fieldValue =  GsonUtils.fromJson(initField.value(), List.class);
			if (fieldValue != null) {
				buildCollectionParams(kvParams, methodParameter.getType(), initField, genericClass, fieldValue);
			}
		} else if (methodParameter.getType().equals(Set.class)) {
			Class genericClass = (Class) ((ParameterizedType) methodParameter.getGenericType()).getActualTypeArguments()[0];
			List fieldValue =  GsonUtils.fromJson(initField.value(), List.class);
			if (fieldValue != null) {
				buildCollectionParams(kvParams, methodParameter.getType(), initField, genericClass, fieldValue);
			}
		} else if (methodParameter.getType().isArray()) {
			Class genericClass = methodParameter.getType().getComponentType();
			List fieldValue =  GsonUtils.fromJson(initField.value(), List.class);
			if (fieldValue != null) {
				buildCollectionParams(kvParams, methodParameter.getType(), initField, genericClass, fieldValue);
			}
		} else {
			if (StringUtils.isBlank(initField.value())) {
				buildObjectKvParams(kvParams, methodParameter.getType());
			}
		}
	}

	private void buildObjectKvParams(List<KvParam> kvParams, Class genericClass) {
		List<Field> fieldList = getFields(genericClass);
		for (Field field : fieldList) {
			InitField initField = field.getAnnotation(InitField.class);
			if (field.getType().equals(String.class)) {
				KvParam kvParam = new KvParam(field.getName(), initField.value(), "text", "String", initField.desc(), buildRuleDesc(field.getAnnotations()));
				kvParams.add(kvParam);
			} else if (field.getType().equals(Long.class)) {
				KvParam kvParam = new KvParam(field.getName(), Long.valueOf(initField.value()).toString(), "text", "Long", initField.desc(), buildRuleDesc(field.getAnnotations()));
				kvParams.add(kvParam);
			} else if (field.getType().equals(Integer.class)) {
				KvParam kvParam = new KvParam(field.getName(), Integer.valueOf(initField.value()).toString(), "text", "Integer", initField.desc(), buildRuleDesc(field.getAnnotations()));
				kvParams.add(kvParam);
			} else if (field.getType().equals(Double.class)) {
				KvParam kvParam = new KvParam(field.getName(), Double.valueOf(initField.value()).toString(), "text", "Double", initField.desc(), buildRuleDesc(field.getAnnotations()));
				kvParams.add(kvParam);
			} else if (field.getType().equals(Float.class)) {
				KvParam kvParam = new KvParam(field.getName(), Float.valueOf(initField.value()).toString(), "text", "Float", initField.desc(), buildRuleDesc(field.getAnnotations()));
				kvParams.add(kvParam);
			}
		}
	}

	private void buildCollectionParams(List<KvParam> kvParams, Class methodParameterType, InitField initField, Class genericClass, List fieldValue) {
		int i = 0;
		for (Object item : fieldValue) {
			if (genericClass.equals(String.class)) {
				KvParam kvParam = new KvParam(initField.name() + "[" + i++ + "]", item.toString(), "text", "String", initField.desc(), buildRuleDesc(methodParameterType.getAnnotations()));
				kvParams.add(kvParam);
			} else if (genericClass.equals(Long.class)) {
				KvParam kvParam = new KvParam(initField.name() + "[" + i++ + "]", Long.valueOf(item.toString()).toString(), "text", "Long", initField.desc(), buildRuleDesc(methodParameterType.getAnnotations()));
				kvParams.add(kvParam);
			} else if (genericClass.equals(Integer.class)) {
				KvParam kvParam = new KvParam(initField.name() + "[" + i++ + "]", Integer.valueOf(item.toString()).toString(), "text", "Integer", initField.desc(), buildRuleDesc(methodParameterType.getAnnotations()));
				kvParams.add(kvParam);
			} else if (genericClass.equals(Double.class)) {
				KvParam kvParam = new KvParam(initField.name() + "[" + i++ + "]", Double.valueOf(item.toString()).toString(), "text", "Double", initField.desc(), buildRuleDesc(methodParameterType.getAnnotations()));
				kvParams.add(kvParam);
			} else if (genericClass.equals(Float.class)) {
				KvParam kvParam = new KvParam(initField.name() + "[" + i++ + "]", Float.valueOf(item.toString()).toString(), "text", "Float", initField.desc(), buildRuleDesc(methodParameterType.getAnnotations()));
				kvParams.add(kvParam);
			}
		}
	}

	private long buildJsonParams(List<BodyParam> bodyParams, long index, MethodParameter methodParameter) {
		Class curClass = methodParameter.getType();
		if (curClass.equals(String.class)
				|| curClass.equals(Long.class)
				|| curClass.equals(Integer.class)
				|| curClass.equals(Double.class)
				|| curClass.equals(Float.class)) {
			// 构建基本类型参数
			InitField initField = (InitField) methodParameter.getAnnotation(InitField.class);
			if (initField == null) {
				return index;
			}

			BodyParam fieldParam = new BodyParam(++index, initField.name(), initField.value(), initField.desc(), curClass.getSimpleName(), buildRuleDesc(methodParameter.getAnnotations()));
			bodyParams.add(fieldParam);
		} else if (curClass.equals(List.class) || curClass.equals(Set.class) || curClass.isArray()) {
			// 构建集合类型参数
			InitField initField = (InitField) methodParameter.getAnnotation(InitField.class);
			if (initField == null) {
				return index;
			}
			BodyParam fieldParam = new BodyParam(++index, initField.name(), StringUtils.EMPTY, initField.desc(), curClass.getSimpleName(), buildRuleDesc(methodParameter.getAnnotations()));
			bodyParams.add(fieldParam);

			List fieldValue =  GsonUtils.fromJson(initField.value(), List.class);
			if (fieldValue != null) {
				// 构建基本包装类型集合参数
				if (curClass.isArray()) {
					Class genericClass = curClass.getComponentType();
					index = buildFieldParams(bodyParams, ++index, fieldParam, fieldValue, genericClass);
				} else {
					Class genericClass = (Class) ((ParameterizedType) methodParameter.getGenericType()).getActualTypeArguments()[0];
					index = buildFieldParams(bodyParams, ++index, fieldParam, fieldValue, genericClass);
				}
			} else {
				// 构建Object类型集合参数
				if (curClass.isArray()) {
					int recursiveCount = 0;
					Class genericClass = curClass.getComponentType();
					index = buildObjectsParams(++recursiveCount, bodyParams, ++index, fieldParam, genericClass);
				} else {
					int recursiveCount = 0;
					Class genericClass = (Class) ((ParameterizedType) methodParameter.getGenericType()).getActualTypeArguments()[0];
					index = buildObjectsParams(++recursiveCount, bodyParams, ++index, fieldParam, genericClass);
				}
			}
		} else {
			// 构建Object类型参数
			List<Field> fieldList = getFields(curClass);
			for (Field field : fieldList) {
				InitField initField = field.getAnnotation(InitField.class);
				if (initField != null) {
					BodyParam fieldParam = new BodyParam(++index, field.getName(), StringUtils.EMPTY, initField.desc(), field.getType().getSimpleName(), buildRuleDesc(field.getAnnotations()));
					bodyParams.add(fieldParam);
					if (field.getType().equals(List.class) || field.getType().isArray()) {
						if (StringUtils.isNotBlank(initField.value())) {
							List fieldValue =  GsonUtils.fromJson(initField.value(), List.class);
							if (fieldValue != null) {
								// 构建基本包装类型集合参数
								if (field.getType().isArray()) {
									Class genericClass = field.getType().getComponentType();
									index = buildFieldParams(bodyParams, ++index, fieldParam, fieldValue, genericClass);
								} else {
									Class genericClass = (Class) ((ParameterizedType) field.getGenericType()).getActualTypeArguments()[0];
									index = buildFieldParams(bodyParams, ++index, fieldParam, fieldValue, genericClass);
								}
							}
						} else {
							// 构建Object类型集合参数
							if (field.getType().isArray()) {
								int recursiveCount = 0;
								Class genericClass = field.getType().getComponentType();
								index = buildObjectsParams(++recursiveCount, bodyParams, ++index, fieldParam, genericClass);
							} else {
								int recursiveCount = 0;
								Class genericClass = (Class) ((ParameterizedType) field.getGenericType()).getActualTypeArguments()[0];
								index = buildObjectsParams(++recursiveCount, bodyParams, ++index, fieldParam, genericClass);
							}
						}
					} else if (field.getType().equals(String.class)
							|| field.getType().equals(Long.class)
							|| field.getType().equals(Integer.class)
							|| field.getType().equals(Double.class)
							|| field.getType().equals(Float.class)) {
						fieldParam.setValue(initField.value());
						fieldParam.setEditor("text");
					} else {
						// 对象类型
						if (StringUtils.isBlank(initField.value())) {
							int recursiveCount = 0;
							index = buildObjectParams(++recursiveCount, bodyParams, ++index, fieldParam, field.getType());
						}
					}
				}
			}
		}
		return index;
	}

	private long buildObjectsParams(int recursiveCount, List<BodyParam> bodyParams, long index, BodyParam fieldParam, Class clazz) {
		List<Field> fieldList = getFields(clazz);
		for (int i = 0; i < 3; i ++) {
			BodyParam param = new BodyParam(++index, "[" + i + "]", StringUtils.EMPTY, StringUtils.EMPTY, clazz.getSimpleName(), StringUtils.EMPTY);
			param.set_parentId(fieldParam.getId());
			bodyParams.add(param);

			for (Field field : fieldList) {
				// 基本包装类型
				if (field.getType().equals(String.class)
						|| field.getType().equals(Long.class)
						|| field.getType().equals(Integer.class)
						|| field.getType().equals(Double.class)
						|| field.getType().equals(Float.class)) {
					InitField initField = field.getAnnotation(InitField.class);
					if (initField != null) {
						BodyParam itemParam = new BodyParam(++index, field.getName(), initField.value(), StringUtils.EMPTY, field.getType().getSimpleName(), buildRuleDesc(field.getAnnotations()));
						itemParam.setDesc(initField.desc());
						itemParam.set_parentId(param.getId());
						itemParam.setEditor("text");
						bodyParams.add(itemParam);
					}
				} else if (field.getType().equals(List.class) || field.getType().isArray()) {
					// 集合类型 仅支持List/Array
					Class genericClass;
					if (field.getType().isArray()) {
						genericClass = field.getType().getComponentType();
					} else {
						genericClass = (Class) ((ParameterizedType) field.getGenericType()).getActualTypeArguments()[0];
					}

					InitField initField = field.getAnnotation(InitField.class);
					if (initField != null) {
						BodyParam itemParam = new BodyParam(++index, field.getName(), StringUtils.EMPTY, StringUtils.EMPTY, field.getType().getSimpleName(), buildRuleDesc(field.getAnnotations()));
						itemParam.setDesc(initField.desc());
						itemParam.set_parentId(param.getId());
						itemParam.setEditor("text");
						bodyParams.add(itemParam);
						// 构建：集合元素为基本类型
						if (StringUtils.isNotBlank(initField.value())) {
							List fieldValue =  GsonUtils.fromJson(initField.value(), List.class);
							index = buildFieldParams(bodyParams, ++index, itemParam, fieldValue, genericClass);
						} else {
							// 构建：集合元素为Object类型
							index = buildObjectsParams(++recursiveCount, bodyParams, ++index, itemParam, genericClass);
						}
					}
				} else {
					// 对象类型
					InitField initField = field.getAnnotation(InitField.class);
					if (initField != null) {
						BodyParam itemParam = new BodyParam(++index, field.getName(), StringUtils.EMPTY, StringUtils.EMPTY, field.getType().getSimpleName(), buildRuleDesc(field.getAnnotations()));
						itemParam.setDesc(initField.desc());
						itemParam.set_parentId(param.getId());
						itemParam.setEditor("text");
						bodyParams.add(itemParam);

						if (StringUtils.isBlank(initField.value())) {
							index = buildObjectParams(++recursiveCount, bodyParams, ++index, itemParam, field.getType());
						}
					}
				}
			}
		}
		return index;
	}

	private long buildObjectParams(int recursiveCount, List<BodyParam> bodyParams, long index, BodyParam fieldParam, Class clazz) {
		List<Field> fieldList = getFields(clazz);
		for (Field field : fieldList) {
			// 基本包装类型
			if (field.getType().equals(String.class)
					|| field.getType().equals(Long.class)
					|| field.getType().equals(Integer.class)
					|| field.getType().equals(Double.class)
					|| field.getType().equals(Float.class)) {
				InitField initField = field.getAnnotation(InitField.class);
				if (initField != null) {
					BodyParam itemParam = new BodyParam(++index, field.getName(), initField.value(), StringUtils.EMPTY, field.getType().getSimpleName(), buildRuleDesc(field.getAnnotations()));
					itemParam.setDesc(initField.desc());
					itemParam.set_parentId(fieldParam.getId());
					itemParam.setEditor("text");
					bodyParams.add(itemParam);
				}
			} else if (field.getType().equals(List.class) || field.getType().isArray()) {
				// 集合类型 仅支持List/Array
				Class genericClass;
				if (field.getType().isArray()) {
					genericClass = field.getType().getComponentType();
				} else {
					genericClass = (Class) ((ParameterizedType) field.getGenericType()).getActualTypeArguments()[0];
				}

				InitField initField = field.getAnnotation(InitField.class);
				if (initField != null) {
					BodyParam itemParam = new BodyParam(++index, field.getName(), StringUtils.EMPTY, StringUtils.EMPTY, field.getType().getSimpleName(), buildRuleDesc(field.getAnnotations()));
					itemParam.setDesc(initField.desc());
					itemParam.set_parentId(fieldParam.getId());
					itemParam.setEditor("text");
					bodyParams.add(itemParam);
					// 构建：集合元素为基本类型
					if (StringUtils.isNotBlank(initField.value())) {
						List fieldValue =  GsonUtils.fromJson(initField.value(), List.class);
						index = buildFieldParams(bodyParams, ++index, itemParam, fieldValue, genericClass);
					} else {
						// 构建：集合元素为Object类型
						index = buildObjectsParams(++recursiveCount, bodyParams, ++index, itemParam, genericClass);
					}
				}
			} else {
				// 对象类型
				InitField initField = field.getAnnotation(InitField.class);
				if (initField != null) {
					BodyParam itemParam = new BodyParam(++index, field.getName(), StringUtils.EMPTY, StringUtils.EMPTY, field.getType().getSimpleName(), buildRuleDesc(field.getAnnotations()));
					itemParam.setDesc(initField.desc());
					itemParam.set_parentId(fieldParam.getId());
					itemParam.setEditor("text");
					bodyParams.add(itemParam);

					if (StringUtils.isBlank(initField.value())) {
						index = buildObjectParams(++recursiveCount, bodyParams, ++index, itemParam, field.getType());
					}
				}
			}
		}
		return index;
	}

	private long buildFieldParams(List<BodyParam> bodyParams, long index, BodyParam fieldParam, List fieldValue, Class genericClass) {
		int i = 0;
		for (Object item : fieldValue) {
			if (genericClass.equals(String.class)) {
				BodyParam itemParam = new BodyParam(++index, "[" + i++ + "]", item.toString(), StringUtils.EMPTY, genericClass.getSimpleName(), StringUtils.EMPTY);
				itemParam.set_parentId(fieldParam.getId());
				itemParam.setEditor("text");
				bodyParams.add(itemParam);
			} else if (genericClass.equals(Long.class)) {
				BodyParam itemParam = new BodyParam(++index, "[" + i++ + "]", Long.valueOf(item.toString()).toString(), StringUtils.EMPTY, genericClass.getSimpleName(), StringUtils.EMPTY);
				itemParam.set_parentId(fieldParam.getId());
				itemParam.setEditor("text");
				bodyParams.add(itemParam);
			} else if (genericClass.equals(Integer.class)) {
				BodyParam itemParam = new BodyParam(++index, "[" + i++ + "]", Integer.valueOf(item.toString()).toString(), StringUtils.EMPTY, genericClass.getSimpleName(), StringUtils.EMPTY);
				itemParam.set_parentId(fieldParam.getId());
				itemParam.setEditor("text");
				bodyParams.add(itemParam);
			} else if (genericClass.equals(Double.class)) {
				BodyParam itemParam = new BodyParam(++index, "[" + i++ + "]", Double.valueOf(item.toString()).toString(), StringUtils.EMPTY, genericClass.getSimpleName(), StringUtils.EMPTY);
				itemParam.set_parentId(fieldParam.getId());
				itemParam.setEditor("text");
				bodyParams.add(itemParam);
			} else if (genericClass.equals(Float.class)) {
				BodyParam itemParam = new BodyParam(++index, "[" + i++ + "]", Float.valueOf(item.toString()).toString(), StringUtils.EMPTY, genericClass.getSimpleName(), StringUtils.EMPTY);
				itemParam.set_parentId(fieldParam.getId());
				itemParam.setEditor("text");
				bodyParams.add(itemParam);
			}
		}
		return index;
	}

	private String buildRuleDesc(Annotation[] annotations) {
		StringBuilder rule = new StringBuilder();
		for (Annotation annotation : annotations) {
			if (ValidateDigit.class.isInstance(annotation)) {
				rule.append(((ValidateDigit)annotation).message()).append(";");
			} else if (ValidateInt.class.isInstance(annotation)) {
				rule.append(((ValidateInt)annotation).message()).append(";");
			} else if (ValidateLength.class.isInstance(annotation)) {
				rule.append(((ValidateLength)annotation).message()).append(";");
			} else if (ValidateLong.class.isInstance(annotation)) {
				rule.append(((ValidateLong)annotation).message()).append(";");
			} else if (ValidateNotEmpty.class.isInstance(annotation)) {
				rule.append(((ValidateNotEmpty)annotation).message()).append(";");
			} else if (ValidateNotNull.class.isInstance(annotation)) {
				rule.append(((ValidateNotNull)annotation).message()).append(";");
			} else if (ValidatePattern.class.isInstance(annotation)) {
				rule.append(((ValidatePattern)annotation).message()).append(";");
			} else if (ValidateStringIn.class.isInstance(annotation)) {
				rule.append(((ValidateStringIn)annotation).message()).append(";");
			}
		}
		return rule.toString();
	}


	@Override
	protected Object after(Invocation inv, Object instruction) throws Exception {
		int isDoc = Integer.valueOf(inv.getRequest().getParameter("doc") == null ? "0" : inv.getRequest().getParameter("doc"));

		if (isDoc == 2) {

			StringBuilder logMsg = new StringBuilder("\nAPI doc handle report -------- " + DateExUtils.currentDatetime() + " ------------------------------------------------------");
			logMsg.append("\nURI         : ").append(inv.getRequest().getRequestURI()).append(", Method : ").append(inv.getRequest().getMethod());
			logMsg.append("\nController  : ").append(inv.getControllerClass().getName()).append(", Method : ").append(inv.getMethod().getName());

			if (inv.getRequest().getMethod().equalsIgnoreCase("GET")) {
				logMsg.append("\nQueryString : ").append(URLDecoder.decode((inv.getRequest().getQueryString() == null ? "null" : inv.getRequest().getQueryString()), "UTF-8"));
			} else if (inv.getRequest().getMethod().equalsIgnoreCase("POST")) {
				logMsg.append("\nParameter   : ").append(inv.getRequest().getParameterMap());
			}

			List<ResParam> resParams = new ArrayList<>();
			ModelResult result = (ModelResult) inv.getRequest().getAttribute("result");

			long index = 0;
			ResParam codeParam = new ResParam(++index, "code", String.valueOf(result.getCode()), "HTTP状态", "Integer");
			resParams.add(codeParam);

			ResParam dataParam = new ResParam(++index, "data", StringUtils.EMPTY, "响应数据", StringUtils.EMPTY);
			resParams.add(dataParam);

			List<ResParam> children = new ArrayList<>();
			dataParam.setChildren(children);

			ResParam msgParam = new ResParam(++index, "message", result.getMessage(), "处理信息", "String");
			children.add(msgParam);

			if (result.getEntity() != null) {
				Object obj = result.getEntity();

				ResParam entityParam = new ResParam(++index, "entity", StringUtils.EMPTY, "实体对象", obj.getClass().getSimpleName());
				children.add(entityParam);

				List<ResParam> entityChildren = new ArrayList<>();
				entityParam.setChildren(entityChildren);

				List<Field> fieldList = getFields(obj.getClass());

				for (Field field : fieldList) {
					index = buildFieldParams(index, obj, entityChildren, field);
				}
			} else if (CollectionUtils.isNotEmpty(result.getList())) {
				if (result.getRecordCount() > 0) {
					ResParam recordCountParam = new ResParam(++index, "recordCount", String.valueOf(result.getRecordCount()), "当前页记录数", "Integer");
					children.add(recordCountParam);
				}

				if (result.getTotal() > 0) {
					ResParam totalParam = new ResParam(++index, "total", String.valueOf(result.getTotal()), "总记录数", "Integer");
					children.add(totalParam);
				}

				if (result.getTotalCount() > 0) {
					ResParam totalCountParam = new ResParam(++index, "totalCount", String.valueOf(result.getTotalCount()), "总记录数", "Integer");
					children.add(totalCountParam);
				}

				if (result.getPage() > 0) {
					ResParam pageParam = new ResParam(++index, "page", String.valueOf(result.getPage()), "总页数", "Integer");
					children.add(pageParam);
				}

				if (result.getSize() > 0) {
					ResParam sizeParam = new ResParam(++index, "size", String.valueOf(result.getSize()), "每页大小", "Integer");
					children.add(sizeParam);
				}

				List items = result.getList();

				ResParam listParam = new ResParam(++index, "list", StringUtils.EMPTY, "集合对象", "List");
				children.add(listParam);

				List<ResParam> listChildren = new ArrayList<>();
				listParam.setChildren(listChildren);

				for (int j = 0; j < items.size(); j++) {
					ResParam listItem = new ResParam(++index, "[" + j + "]", StringUtils.EMPTY, StringUtils.EMPTY, items.get(j).getClass().getSimpleName());
					listChildren.add(listItem);

					List<ResParam> itemChildren = new ArrayList<>();
					listItem.setChildren(itemChildren);

					List<Field> fieldList = getFields(items.get(j).getClass());

					for (Field field : fieldList) {
						index = buildFieldParams(index, items.get(j), itemChildren, field);
					}
				}
			}

			ModelResult modelResult = responseList(ModelResult.CODE_200, ModelResult.SUCCESS, resParams);

			logMsg.append("\nResponse    : ").append(GsonUtils.toJson(modelResult));
			logMsg.append("\nCost Time   : ").append(System.currentTimeMillis() - ThreadLocalUtils.getTime()).append(" ms");
			logMsg.append("\n---------------------------------------------------------------------------------------------------------");
			log.info(logMsg.toString());

			return "@json:" + GsonUtils.toJson(modelResult);
		}
		return instruction;
	}

	private long buildFieldParams(long index, Object obj, List<ResParam> children, Field field) {

		if (field.getName().equalsIgnoreCase("serialVersionUID")) {
			return index;
		}

		boolean isFlag = field.getType().equals(String.class)
				|| field.getType().equals(Integer.class)
				|| field.getType().equals(Long.class)
				|| field.getType().equals(Double.class)
				|| field.getType().equals(Float.class);
		InitField initField = field.getAnnotation(InitField.class);
		ResParam fieldParam = new ResParam(++index, field.getName(), StringUtils.EMPTY, initField == null ? StringUtils.EMPTY : initField.desc(), field.getType().getSimpleName());
		if (field.getType().equals(List.class)) {
			List fieldValue =  (List) getFieldValue(obj, field.getName());
			if (fieldValue != null) {
				List<ResParam> fieldChildren = new ArrayList<>();
				fieldParam.setChildren(fieldChildren);

				Class genericClass = (Class) ((ParameterizedType) field.getGenericType()).getActualTypeArguments()[0];
				int i = 0;
				for (Object item : fieldValue) {
					initField = item.getClass().getAnnotation(InitField.class);
					ResParam itemParam = new ResParam(++index, "[" + i++ + "]", StringUtils.EMPTY, initField == null ? StringUtils.EMPTY : initField.desc(), genericClass.getSimpleName());
					fieldChildren.add(itemParam);

					if (item.getClass().equals(String.class)
							|| item.getClass().equals(Integer.class)
							|| item.getClass().equals(Long.class)
							|| item.getClass().equals(Double.class)
							|| item.getClass().equals(Float.class)) {
						itemParam.setValue(item.toString());
					} else {
						List<ResParam> childrenParams = new ArrayList<>();
						itemParam.setChildren(childrenParams);

						List<Field> fieldList = getFields(item.getClass());

						for (Field f : fieldList) {
							index = buildFieldParams(index, item, childrenParams, f);
						}
					}
				}
			}
		} else if (field.getType().equals(Set.class)) {
			Set fieldValue =  (Set) getFieldValue(obj, field.getName());
			if (fieldValue != null) {
				List<ResParam> fieldChildren = new ArrayList<>();
				fieldParam.setChildren(fieldChildren);

				Class genericClass = (Class) ((ParameterizedType) field.getGenericType()).getActualTypeArguments()[0];
				int i = 0;
				for (Object item : fieldValue) {
					initField = item.getClass().getAnnotation(InitField.class);
					ResParam itemParam = new ResParam(++index, "[" + i++ + "]", StringUtils.EMPTY, initField == null ? StringUtils.EMPTY : initField.desc(), genericClass.getSimpleName());
					fieldChildren.add(itemParam);

					if (item.getClass().equals(String.class)
							|| item.getClass().equals(Integer.class)
							|| item.getClass().equals(Long.class)
							|| item.getClass().equals(Double.class)
							|| item.getClass().equals(Float.class)) {
						itemParam.setValue(item.toString());
					}  else {
						List<ResParam> childrenParams = new ArrayList<>();
						itemParam.setChildren(childrenParams);

						List<Field> fieldList = getFields(item.getClass());
						for (Field f : fieldList) {
							index = buildFieldParams(index, item, childrenParams, f);
						}
					}
				}
			}
		} else if (field.getType().isArray()) {
			Object[] fieldValue =  (Object[]) getFieldValue(obj, field.getName());
			if (fieldValue != null) {
				List<ResParam> fieldChildren = new ArrayList<>();
				fieldParam.setChildren(fieldChildren);

				Class genericClass = field.getType().getComponentType();
				int i = 0;
				for (Object item : fieldValue) {
					initField = item.getClass().getAnnotation(InitField.class);
					ResParam itemParam = new ResParam(++index, "[" + i++ + "]", StringUtils.EMPTY, initField == null ? StringUtils.EMPTY : initField.desc(), genericClass.getSimpleName());
					fieldChildren.add(itemParam);

					if (item.getClass().equals(String.class)
							|| item.getClass().equals(Integer.class)
							|| item.getClass().equals(Long.class)
							|| item.getClass().equals(Double.class)
							|| item.getClass().equals(Float.class)) {
						itemParam.setValue(item.toString());
					} else {
						List<ResParam> childrenParams = new ArrayList<>();
						itemParam.setChildren(childrenParams);

						List<Field> fieldList = getFields(item.getClass());
						for (Field f : fieldList) {
							index = buildFieldParams(index, item, childrenParams, f);
						}
					}
				}
			}
		} else {
			if (!isFlag) {
				Object fieldValue = getFieldValue(obj, field.getName());
				if (fieldValue != null) {
					List<ResParam> fieldChildren = new ArrayList<>();
					fieldParam.setChildren(fieldChildren);

					List<Field> fieldList = getFields(fieldValue.getClass());
					for (Field f : fieldList) {
						index = buildFieldParams(index, fieldValue, fieldChildren, f);
					}
				}
			} else {
				fieldParam.setValue(String.valueOf(getFieldValue(obj, field.getName())));
			}
		}
		children.add(fieldParam);
		return index;
	}

	private List<Field> getFields(Class clazz) {
		List<Field> fieldList = new ArrayList<>();
//		Class superClass = clazz.getSuperclass();
//		if (superClass.equals(BaseModel.class)) {
//			fieldList.addAll(Arrays.asList(superClass.getDeclaredFields()));
//		}
		fieldList.addAll(Arrays.asList(clazz.getDeclaredFields()));
		return fieldList;
	}

	/**
	 * 处理响应单个实体
	 * @param code
	 * @param message
	 * @param entity
	 * @return
	 */
	protected final ModelResult responseEntity(int code, String message, Object entity){
		ModelResult modelResult = new ModelResult(code);
		modelResult.setMessage(message);
		modelResult.setEntity(entity);

		return modelResult;
	}

	/**
	 * 处理响应list
	 * @param code
	 * @param message
	 * @param list
	 * @return
	 */
	protected final ModelResult responseList(int code, String message, List list){
		ModelResult modelResult = new ModelResult(code);
		modelResult.setMessage(message);
		modelResult.setList(list);

		return modelResult;
	}

	private Object getFieldValue(Object obj, String field) {
		String firstLetter = field.substring(0, 1).toUpperCase();
		String getMethodName = "get" + firstLetter + field.substring(1);
		Method getMethod;
		try {
			getMethod = obj.getClass().getMethod(getMethodName);
			return getMethod.invoke(obj);
		} catch (Exception e) {
			e.printStackTrace();
			return StringUtils.EMPTY;
		}
	}

	private List<MethodParameter> buildMethodParameters(Method method) {
		Class[] parameterTypes = method.getParameterTypes();
		Annotation[][] parameterAnnotations = method.getParameterAnnotations();
		Type[] genericParameterTypes = method.getGenericParameterTypes();

		List<MethodParameter> methodParameters = Lists.newArrayList();
		for (int i = 0; i < parameterTypes.length; i++) {
			methodParameters.add(new MethodParameter(parameterTypes[i], parameterAnnotations[i], genericParameterTypes[i]));
		}
		return methodParameters;
	}

	/**
	 * 构建匿名内部类
	 */
	class MethodParameter {

		@Getter
		private final Class type;

		@Getter
		private final Annotation[] annotations;

		@Getter
		private final Type genericType;

		private MethodParameter(Class type, Annotation[] annotations, Type genericType) {
			this.type = type;
			this.annotations = annotations;
			this.genericType = genericType;
		}

		public boolean hasParameterAnnotation(Class annotationClass){
			for (Annotation annotation : annotations) {
				if (annotation.annotationType().equals(annotationClass)) {
					return true;
				}
			}
			return false;
		}

		public Annotation getAnnotation(Class annotationClass) {
			for (Annotation annotation : annotations) {
				if (annotation.annotationType().equals(annotationClass)) {
					return annotation;
				}
			}
			return null;
		}
	}
}
