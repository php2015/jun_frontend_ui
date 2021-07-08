package com.jeasy.base.resolver;

import net.paoding.rose.web.Invocation;
import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.paramresolver.ParamMetaData;
import net.paoding.rose.web.paramresolver.ParamResolver;

import javax.servlet.http.HttpServletRequest;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.*;

import org.apache.commons.lang3.StringUtils;

import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import com.google.gson.*;

/**
 * @author taomk
 * @version 1.0
 * @since 15-8-4 下午4:45
 */
public class ArgumentFromJsonResolver implements ParamResolver {

	@Override
	public Object resolve(Invocation inv, ParamMetaData metaData) throws Exception {
		// 获取请求参数别名
		String alias = getAlias(metaData);
		Object target;
		if (metaData.isAnnotationPresent(FromJson.class)) {
			// 带有@FromJson注解，则必须从JSON参数中取值
			target = buildTargetFromJsonParams(alias, metaData, inv.getRequest());
		} else {
			// 未带有@FromJson注解，则必须从KV参数中取值
			target = buildTargetFromKvParams(alias, metaData, inv.getRequest());
		}
		return target;
	}

	@Override
	public boolean supports(ParamMetaData metaData) {
		return true;
	}

	private Object buildTargetFromJsonParams(String alias, ParamMetaData metaData, HttpServletRequest request) {
		JsonObject jsonObject = null;
		Map<String, String[]> params = request.getParameterMap();
		for (Map.Entry<String, String[]> param : params.entrySet()) {
			String[] paramVals = param.getValue();
			if (paramVals.length == 1 && paramVals[0].startsWith("{\"") && paramVals[0].endsWith("}")) {
				jsonObject =  new JsonParser().parse(paramVals[0]).getAsJsonObject();
				break;
			}
		}

		if (jsonObject != null) {
			if (metaData.getParamType().equals(String.class)) {
				if (jsonObject.get(alias) != null && jsonObject.get(alias).isJsonPrimitive()) {
					return jsonObject.get(alias).getAsString();
				}
			} else if (metaData.getParamType().equals(Integer.class)) {
				if (jsonObject.get(alias) != null && jsonObject.get(alias).isJsonPrimitive()) {
					return jsonObject.get(alias).getAsInt();
				}
			} else if (metaData.getParamType().equals(Long.class)) {
				if (jsonObject.get(alias) != null && jsonObject.get(alias).isJsonPrimitive()) {
					return jsonObject.get(alias).getAsLong();
				}
				return null;
			} else if (metaData.getParamType().equals(Double.class)) {
				if (jsonObject.get(alias) != null && jsonObject.get(alias).isJsonPrimitive()) {
					return jsonObject.get(alias).getAsDouble();
				}
			} else if (metaData.getParamType().equals(Float.class)) {
				if (jsonObject.get(alias) != null && jsonObject.get(alias).isJsonPrimitive()) {
					return jsonObject.get(alias).getAsFloat();
				}
			} else if (metaData.getParamType().equals(List.class)) {
				if (jsonObject.get(alias) != null && jsonObject.get(alias).isJsonArray()) {
					ParameterizedType type = (ParameterizedType) metaData.getParamType().getGenericSuperclass();
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
			} else if (metaData.getParamType().equals(Set.class)) {
				if (jsonObject.get(alias) != null && jsonObject.get(alias).isJsonArray()) {
					ParameterizedType type = (ParameterizedType) metaData.getParamType().getGenericSuperclass();
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
			} else if (metaData.getParamType().isArray()) {
				if (jsonObject.get(alias) != null && jsonObject.get(alias).isJsonArray()) {
					ParameterizedType type = (ParameterizedType) metaData.getParamType().getGenericSuperclass();
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
					return new Gson().fromJson(jsonObject.get(alias), metaData.getParamType());
				} else {
					return new Gson().fromJson(jsonObject, metaData.getParamType());
				}
			}
		}
		return null;
	}

	private Object buildTargetFromKvParams(String alias, ParamMetaData metaData, HttpServletRequest request) {
		if (metaData.getParamType().equals(String.class)) {
			return request.getParameter(alias);
		} else if (metaData.getParamType().equals(Integer.class)) {
			return request.getParameter(alias) == null ? null : Integer.valueOf(request.getParameter(alias));
		} else if (metaData.getParamType().equals(Long.class)) {
			return request.getParameter(alias) == null ? null : Long.valueOf(request.getParameter(alias));
		} else if (metaData.getParamType().equals(Double.class)) {
			return request.getParameter(alias) == null ? null : Double.valueOf(request.getParameter(alias));
		} else if (metaData.getParamType().equals(Float.class)) {
			return request.getParameter(alias) == null ? null : Float.valueOf(request.getParameter(alias));
		} else if (metaData.getParamType().equals(List.class)) {
			// 参数List类型，仅支持基本包装类型集合，不支持对象类型集合
			String [] values = request.getParameterValues(alias);
			if (values != null && values.length > 0) {
				ParameterizedType type = (ParameterizedType) metaData.getParamType().getGenericSuperclass();
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
		} else if (metaData.getParamType().equals(Set.class)) {
			// 参数Set类型，仅支持基本包装类型集合，不支持对象类型集合
			String [] values = request.getParameterValues(alias);
			if (values != null && values.length > 0) {
				ParameterizedType type = (ParameterizedType) metaData.getParamType().getGenericSuperclass();
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
		} else if (metaData.getParamType().isArray()) {
			// 参数Array类型，仅支持基本包装类型集合，不支持对象类型集合
			String [] values = request.getParameterValues(alias);
			if (values != null && values.length > 0) {
				Class genericClass = metaData.getParamType().getComponentType();
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
//			Object target = binder.getTarget();
//			ServletRequest servletRequest = webRequest.getNativeRequest(ServletRequest.class);
//			((ExtendedServletRequestDataBinder)binder).bind(servletRequest);
//			return target;
		}
		return null;
	}

	/**
	 * 获取对象参数的简称
	 * @param parameter
	 * @return
	 */
	private String getAlias(ParamMetaData parameter) {
		String alias = null;
		if (parameter.isAnnotationPresent(FromJson.class)) {
			alias = parameter.getAnnotation(FromJson.class).key();
		}

		if (parameter.isAnnotationPresent(Param.class)) {
			alias = parameter.getAnnotation(Param.class).value();
		}

		if(StringUtils.isBlank(alias)) {
			alias = parameter.getParamName();
		}
		return alias;
	}
}