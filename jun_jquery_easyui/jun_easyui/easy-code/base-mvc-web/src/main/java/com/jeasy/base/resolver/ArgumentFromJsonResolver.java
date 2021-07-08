package com.jeasy.base.resolver;

import javax.servlet.ServletRequest;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.*;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.servlet.mvc.method.annotation.ExtendedServletRequestDataBinder;

import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import com.google.gson.*;

/**
 * @author taomk
 * @version 1.0
 * @since 15-8-4 下午4:45
 */
public class ArgumentFromJsonResolver implements HandlerMethodArgumentResolver {

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return true;
	}

	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
		return bindParametersToTarget(parameter, mavContainer, webRequest, binderFactory);
	}

	private Object bindParametersToTarget(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
		// 获取请求参数别名
		String alias = getAlias(parameter);

		// 拿到obj, 先从ModelAndViewContainer中拿，若没有则创建参数类型的实例
		Object obj = (mavContainer.containsAttribute(alias)) ? mavContainer.getModel().get(alias) : createAttribute(parameter.getParameterType());
		// 获得WebDataBinder，这里的具体WebDataBinder是ExtendedServletRequestDataBinder
		WebDataBinder binder = binderFactory.createBinder(webRequest, obj, alias);

		if (parameter.hasParameterAnnotation(FromJson.class)) {
			// 带有@FromJson注解，则必须从JSON参数中取值
			return buildTargetFromJsonParams(alias, parameter, webRequest, binder);
		} else {
			// 未带有@FromJson注解，则必须从KV参数中取值
			return buildTargetFromKvParams(alias, parameter, webRequest, binder);
		}
	}

	private Object buildTargetFromJsonParams(String alias, MethodParameter parameter, NativeWebRequest webRequest, WebDataBinder binder) {
		JsonObject jsonObject = null;
		Map<String, String[]> params = webRequest.getParameterMap();
		for (Map.Entry<String, String[]> param : params.entrySet()) {
			String[] paramVals = param.getValue();
			if (paramVals.length == 1 && paramVals[0].startsWith("{\"") && paramVals[0].endsWith("}")) {
				jsonObject =  new JsonParser().parse(paramVals[0]).getAsJsonObject();
				break;
			}
		}

		if (jsonObject != null) {
			if (parameter.getParameterType().equals(String.class)) {
				if (jsonObject.get(alias) != null && jsonObject.get(alias).isJsonPrimitive()) {
					return jsonObject.get(alias).getAsString();
				}
			} else if (parameter.getParameterType().equals(Integer.class)) {
				if (jsonObject.get(alias) != null && jsonObject.get(alias).isJsonPrimitive()) {
					return jsonObject.get(alias).getAsInt();
				}
			} else if (parameter.getParameterType().equals(Long.class)) {
				if (jsonObject.get(alias) != null && jsonObject.get(alias).isJsonPrimitive()) {
					return jsonObject.get(alias).getAsLong();
				}
				return null;
			} else if (parameter.getParameterType().equals(Double.class)) {
				if (jsonObject.get(alias) != null && jsonObject.get(alias).isJsonPrimitive()) {
					return jsonObject.get(alias).getAsDouble();
				}
			} else if (parameter.getParameterType().equals(Float.class)) {
				if (jsonObject.get(alias) != null && jsonObject.get(alias).isJsonPrimitive()) {
					return jsonObject.get(alias).getAsFloat();
				}
			} else if (parameter.getParameterType().equals(List.class)) {
				if (jsonObject.get(alias) != null && jsonObject.get(alias).isJsonArray()) {
					ParameterizedType type = (ParameterizedType) parameter.getGenericParameterType();
					Type [] types = type.getActualTypeArguments();
					if (types.length == 1) {
						if (types[0].equals(String.class)) {
							List<String> target = new ArrayList<>();
							JsonArray jsonArray = jsonObject.get(alias).getAsJsonArray();
							for (int i = 0; i < jsonArray.size(); i++) {
								JsonElement jsonElement = jsonArray.get(i);
								target.add(jsonElement.getAsString());
							}
							return target;
						} else if (types[0].equals(Integer.class)) {
							List<Integer> target = new ArrayList<>();
							JsonArray jsonArray = jsonObject.get(alias).getAsJsonArray();
							for (int i = 0; i < jsonArray.size(); i++) {
								JsonElement jsonElement = jsonArray.get(i);
								target.add(jsonElement.getAsInt());
							}
							return target;
						} else if (types[0].equals(Long.class)) {
							List<Long> target = new ArrayList<>();
							JsonArray jsonArray = jsonObject.get(alias).getAsJsonArray();
							for (int i = 0; i < jsonArray.size(); i++) {
								JsonElement jsonElement = jsonArray.get(i);
								target.add(jsonElement.getAsLong());
							}
							return target;
						} else if (types[0].equals(Double.class)) {
							List<Double> target = new ArrayList<>();
							JsonArray jsonArray = jsonObject.get(alias).getAsJsonArray();
							for (int i = 0; i < jsonArray.size(); i++) {
								JsonElement jsonElement = jsonArray.get(i);
								target.add(jsonElement.getAsDouble());
							}
							return target;
						} else if (types[0].equals(Float.class)) {
							List<Float> target = new ArrayList<>();
							JsonArray jsonArray = jsonObject.get(alias).getAsJsonArray();
							for (int i = 0; i < jsonArray.size(); i++) {
								JsonElement jsonElement = jsonArray.get(i);
								target.add(jsonElement.getAsFloat());
							}
							return target;
						} else {
							// 其他，Object类型
							List<Object> target = new ArrayList<>();
							JsonArray jsonArray = jsonObject.get(alias).getAsJsonArray();
							for (int i = 0; i < jsonArray.size(); i++) {
								JsonElement jsonElement = jsonArray.get(i);
								target.add(new Gson().fromJson(jsonElement, types[0]));
							}
							return target;
						}
					}
				}
			} else if (parameter.getParameterType().equals(Set.class)) {
				if (jsonObject.get(alias) != null && jsonObject.get(alias).isJsonArray()) {
					ParameterizedType type = (ParameterizedType) parameter.getGenericParameterType();
					Type [] types = type.getActualTypeArguments();
					if (types.length == 1) {
						if (types[0].equals(String.class)) {
							Set<String> target = new HashSet<>();
							JsonArray jsonArray = jsonObject.get(alias).getAsJsonArray();
							for (int i = 0; i < jsonArray.size(); i++) {
								JsonElement jsonElement = jsonArray.get(i);
								target.add(jsonElement.getAsString());
							}
							return target;
						} else if (types[0].equals(Integer.class)) {
							Set<Integer> target = new HashSet<>();
							JsonArray jsonArray = jsonObject.get(alias).getAsJsonArray();
							for (int i = 0; i < jsonArray.size(); i++) {
								JsonElement jsonElement = jsonArray.get(i);
								target.add(jsonElement.getAsInt());
							}
							return target;
						} else if (types[0].equals(Long.class)) {
							Set<Long> target = new HashSet<>();
							JsonArray jsonArray = jsonObject.get(alias).getAsJsonArray();
							for (int i = 0; i < jsonArray.size(); i++) {
								JsonElement jsonElement = jsonArray.get(i);
								target.add(jsonElement.getAsLong());
							}
							return target;
						} else if (types[0].equals(Double.class)) {
							Set<Double> target = new HashSet<>();
							JsonArray jsonArray = jsonObject.get(alias).getAsJsonArray();
							for (int i = 0; i < jsonArray.size(); i++) {
								JsonElement jsonElement = jsonArray.get(i);
								target.add(jsonElement.getAsDouble());
							}
							return target;
						} else if (types[0].equals(Float.class)) {
							Set<Float> target = new HashSet<>();
							JsonArray jsonArray = jsonObject.get(alias).getAsJsonArray();
							for (int i = 0; i < jsonArray.size(); i++) {
								JsonElement jsonElement = jsonArray.get(i);
								target.add(jsonElement.getAsFloat());
							}
							return target;
						} else {
							// 其他，Object类型
							Set<Object> target = new HashSet<>();
							JsonArray jsonArray = jsonObject.get(alias).getAsJsonArray();
							for (int i = 0; i < jsonArray.size(); i++) {
								JsonElement jsonElement = jsonArray.get(i);
								target.add(new Gson().fromJson(jsonElement, types[0]));
							}
							return target;
						}
					}
				}
			} else if (parameter.getParameterType().isArray()) {
				if (jsonObject.get(alias) != null && jsonObject.get(alias).isJsonArray()) {
					ParameterizedType type = (ParameterizedType) parameter.getGenericParameterType();
					Type [] types = type.getActualTypeArguments();
					if (types.length == 1) {
						if (types[0].equals(String.class)) {
							List<String> target = new ArrayList<>();
							JsonArray jsonArray = jsonObject.get(alias).getAsJsonArray();
							for (int i = 0; i < jsonArray.size(); i++) {
								JsonElement jsonElement = jsonArray.get(i);
								target.add(jsonElement.getAsString());
							}
							return target.toArray();
						} else if (types[0].equals(Integer.class)) {
							List<Integer> target = new ArrayList<>();
							JsonArray jsonArray = jsonObject.get(alias).getAsJsonArray();
							for (int i = 0; i < jsonArray.size(); i++) {
								JsonElement jsonElement = jsonArray.get(i);
								target.add(jsonElement.getAsInt());
							}
							return target.toArray();
						} else if (types[0].equals(Long.class)) {
							List<Long> target = new ArrayList<>();
							JsonArray jsonArray = jsonObject.get(alias).getAsJsonArray();
							for (int i = 0; i < jsonArray.size(); i++) {
								JsonElement jsonElement = jsonArray.get(i);
								target.add(jsonElement.getAsLong());
							}
							return target.toArray();
						} else if (types[0].equals(Double.class)) {
							List<Double> target = new ArrayList<>();
							JsonArray jsonArray = jsonObject.get(alias).getAsJsonArray();
							for (int i = 0; i < jsonArray.size(); i++) {
								JsonElement jsonElement = jsonArray.get(i);
								target.add(jsonElement.getAsDouble());
							}
							return target.toArray();
						} else if (types[0].equals(Float.class)) {
							List<Float> target = new ArrayList<>();
							JsonArray jsonArray = jsonObject.get(alias).getAsJsonArray();
							for (int i = 0; i < jsonArray.size(); i++) {
								JsonElement jsonElement = jsonArray.get(i);
								target.add(jsonElement.getAsFloat());
							}
							return target.toArray();
						} else {
							// 其他，Object类型
							List<Object> target = new ArrayList<>();
							JsonArray jsonArray = jsonObject.get(alias).getAsJsonArray();
							for (int i = 0; i < jsonArray.size(); i++) {
								JsonElement jsonElement = jsonArray.get(i);
								target.add(new Gson().fromJson(jsonElement, types[0]));
							}
							return target.toArray();
						}
					}
				}
			} else {
				if (jsonObject.get(alias) != null && jsonObject.get(alias).isJsonObject()) {
					return new Gson().fromJson(jsonObject.get(alias), parameter.getParameterType());
				} else {
					return new Gson().fromJson(jsonObject, parameter.getParameterType());
				}
			}
		}
		return null;
	}

	private Object buildTargetFromKvParams(String alias, MethodParameter parameter, NativeWebRequest webRequest, WebDataBinder binder) {
		if (parameter.getParameterType().equals(String.class)) {
			return webRequest.getParameter(alias);
		} else if (parameter.getParameterType().equals(Integer.class)) {
			return webRequest.getParameter(alias) == null ? null : Integer.valueOf(webRequest.getParameter(alias));
		} else if (parameter.getParameterType().equals(Long.class)) {
			return webRequest.getParameter(alias) == null ? null : Long.valueOf(webRequest.getParameter(alias));
		} else if (parameter.getParameterType().equals(Double.class)) {
			return webRequest.getParameter(alias) == null ? null : Double.valueOf(webRequest.getParameter(alias));
		} else if (parameter.getParameterType().equals(Float.class)) {
			return webRequest.getParameter(alias) == null ? null : Float.valueOf(webRequest.getParameter(alias));
		} else if (parameter.getParameterType().equals(List.class)) {
			// 参数List类型，仅支持基本包装类型集合，不支持对象类型集合
			String [] values = webRequest.getParameterValues(alias);
			if (values != null && values.length > 0) {
				ParameterizedType type = (ParameterizedType) parameter.getGenericParameterType();
				Type [] types = type.getActualTypeArguments();
				if (types.length == 1) {
					if (types[0].equals(String.class)) {
						return Lists.newArrayList(values);
					} else if (types[0].equals(Integer.class)) {
						List<Integer> resultTarget = Lists.newArrayList();
						for (String val : values) {
							resultTarget.add(Integer.parseInt(val));
						}
						return resultTarget;
					} else if (types[0].equals(Long.class)) {
						List<Long> resultTarget = Lists.newArrayList();
						for (String val : values) {
							resultTarget.add(Long.parseLong(val));
						}
						return resultTarget;
					} else if (types[0].equals(Double.class)) {
						List<Double> resultTarget = Lists.newArrayList();
						for (String val : values) {
							resultTarget.add(Double.parseDouble(val));
						}
						return resultTarget;
					} else if (types[0].equals(Float.class)) {
						List<Float> resultTarget = Lists.newArrayList();
						for (String val : values) {
							resultTarget.add(Float.parseFloat(val));
						}
						return resultTarget;
					}
				}
			}
		} else if (parameter.getParameterType().equals(Set.class)) {
			// 参数Set类型，仅支持基本包装类型集合，不支持对象类型集合
			String [] values = webRequest.getParameterValues(alias);
			if (values != null && values.length > 0) {
				ParameterizedType type = (ParameterizedType) parameter.getGenericParameterType();
				Type [] types = type.getActualTypeArguments();
				if (types.length == 1) {
					if (types[0].equals(String.class)) {
						return Sets.newHashSet(values);
					} else if (types[0].equals(Integer.class)) {
						Set<Integer> resultTarget = Sets.newHashSet();
						for (String val : values) {
							resultTarget.add(Integer.parseInt(val));
						}
						return resultTarget;
					} else if (types[0].equals(Long.class)) {
						Set<Long> resultTarget = Sets.newHashSet();
						for (String val : values) {
							resultTarget.add(Long.parseLong(val));
						}
						return resultTarget;
					} else if (types[0].equals(Double.class)) {
						Set<Double> resultTarget = Sets.newHashSet();
						for (String val : values) {
							resultTarget.add(Double.parseDouble(val));
						}
						return resultTarget;
					} else if (types[0].equals(Float.class)) {
						Set<Float> resultTarget = Sets.newHashSet();
						for (String val : values) {
							resultTarget.add(Float.parseFloat(val));
						}
						return resultTarget;
					}
				}
			}
		} else if (parameter.getParameterType().isArray()) {
			// 参数Array类型，仅支持基本包装类型集合，不支持对象类型集合
			String [] values = webRequest.getParameterValues(alias);
			if (values != null && values.length > 0) {
				Class genericClass = parameter.getParameterType().getComponentType();
				if (genericClass.equals(String.class)) {
					return values;
				} else if (genericClass.equals(Integer.class)) {
					Integer[] resultTarget = new Integer[values.length];
					for (int i = 0; i < resultTarget.length; i++) {
						resultTarget[i] = Integer.parseInt(values[i]);
					}
					return resultTarget;
				} else if (genericClass.equals(Long.class)) {
					Long[] resultTarget = new Long[values.length];
					for (int i = 0; i < resultTarget.length; i++) {
						resultTarget[i] = Long.parseLong(values[i]);
					}
					return resultTarget;
				} else if (genericClass.equals(Double.class)) {
					Double[] resultTarget = new Double[values.length];
					for (int i = 0; i < resultTarget.length; i++) {
						resultTarget[i] = Double.parseDouble(values[i]);
					}
					return resultTarget;
				} else if (genericClass.equals(Float.class)) {
					Float[] resultTarget = new Float[values.length];
					for (int i = 0; i < resultTarget.length; i++) {
						resultTarget[i] = Float.parseFloat(values[i]);
					}
					return resultTarget;
				}
			}
		} else {
			// 其他，处理Object参数
			Object target = binder.getTarget();
			ServletRequest servletRequest = webRequest.getNativeRequest(ServletRequest.class);
			((ExtendedServletRequestDataBinder)binder).bind(servletRequest);
			return target;
		}
		return null;
	}

	private Object createAttribute(Class<?> parameterType) {
		if (parameterType.equals(String.class)) {
			return "";
		} else if (parameterType.equals(Integer.class)) {
			return 0;
		} else if (parameterType.equals(Long.class)) {
			return 0l;
		} else if (parameterType.equals(Double.class)) {
			return (double) 0;
		} else if (parameterType.equals(Float.class)) {
			return (float) 0;
		} else if (parameterType.equals(List.class)) {
			return Lists.newArrayList();
		} else if (parameterType.equals(Set.class)) {
			return Sets.newHashSet();
		} else if (parameterType.isArray()) {
			return new Object [0];
		} else {
			return BeanUtils.instantiateClass(parameterType);
		}
	}

	/**
	 * 获取对象参数的简称
	 * @param parameter
	 * @return
	 */
	private String getAlias(MethodParameter parameter) {
		String alias = null;
		if (parameter.hasParameterAnnotation(FromJson.class)) {
			alias = parameter.getParameterAnnotation(FromJson.class).key();
		}

		if (parameter.hasParameterAnnotation(RequestParam.class)) {
			alias = parameter.getParameterAnnotation(RequestParam.class).value();
		}

		if(StringUtils.isBlank(alias)) {
			alias = parameter.getParameterName();
		}
		return alias;
	}
}