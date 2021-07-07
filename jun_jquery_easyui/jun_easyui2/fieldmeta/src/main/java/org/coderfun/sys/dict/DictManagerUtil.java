package org.coderfun.sys.dict;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.commons.io.FileUtils;
import org.coderfun.config.MyWebAppConfigurer;
import org.coderfun.config.WebRes;
import org.coderfun.sys.dict.dao.CodeClassDAO;
import org.coderfun.sys.dict.dao.CodeItemDAO;
import org.coderfun.sys.dict.entity.CodeClass;
import org.coderfun.sys.dict.entity.CodeItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Function;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Maps;

import klg.common.utils.CollectionTools;
@Component
public class DictManagerUtil {
	@Autowired
    private CodeItemDAO itemDao;
	@Autowired
    private CodeClassDAO classDao;
	
	static Map<String, ImmutableMap<String, CodeItem>> codeMap = new LinkedHashMap<>();
	static Map<String,String> classMap=new HashMap();

	/**
	 * 不可变的常量集合Immutable有如下优点<br>
	 *　 1.对不可靠的客户代码库来说，它使用安全，可以在未受信任的类库中安全的使用这些对象<br>
	 *　 2.线程安全的：immutable对象在多线程下安全，没有竞态条件<br>
	 *　 3.不需要支持可变性, 可以尽量节省空间和时间的开销. 所有的不可变集合实现都比可变集合更加有效的利用内存 (analysis)<br>
	 *　 4.可以被使用为一个常量，并且期望在未来也是保持不变的<br>
	 * 
	 */
	public static ImmutableMap<String, CodeItem> buildChildItemMap(
			List<CodeItem> codeItemList) {
		return Maps.uniqueIndex(codeItemList,
				new Function<CodeItem, String>() {
					@Override
					public String apply(CodeItem arg0) {
						return arg0.getCode();
					}
				});
	}

	
	@SuppressWarnings("unchecked")
	public static ImmutableMap<String, CodeItem> getChildItemMap(int classCode){
		return (ImmutableMap<String, CodeItem>) codeMap.get("" + classCode);
	}
	
	public static String getClassName(String classCode) {
		return classMap.get(classCode);
	}
	
	public static String getCodeName(String code, int classCode) {
		CodeItem codeItem = (CodeItem) (codeMap.get("" + classCode)).get(code);
		if(codeItem==null)
			return null;
		return codeItem.getName();
	}

	public static Map<String,String> mapClassName(List<CodeClass> codeClassList){
		classMap.clear();
		for(CodeClass codeClass:codeClassList){
			classMap.put(codeClass.getCode(), codeClass.getName());
		}
		return classMap;
	}
	
	public static Map<String, ImmutableMap<String, CodeItem>> getCodeMap() {
		return codeMap;
	}


	public static Map<String, String> getClassMap() {
		return classMap;
	}
	
	//会执行两次，
	@PostConstruct
	public void load() throws IOException {
		if(codeMap.isEmpty())
			reload();
	}
	
	public void reload() throws IOException {
		Sort sort=new Sort(new Order(Direction.ASC,"classCode"),
						   new Order(Direction.DESC,"orderNum"));
		List<CodeItem> codeItemList = itemDao.findAll(sort);
		List<CodeClass> codeClassList=classDao.findAll();
		mapClassName(codeClassList);
		codeMap.clear();
		
		Map<String, List> tempMap = null;
		try {
			// 根据classCode分类
			tempMap = CollectionTools
					.classify(false, codeItemList, "classCode");
		} catch (IllegalAccessException | InvocationTargetException
				| NoSuchMethodException e) {
			e.printStackTrace();
		}
		// 将codeItem的code字段映射为map的key
		for (Map.Entry<String, List> entry : tempMap.entrySet()) {
			@SuppressWarnings("unchecked")
			ImmutableMap<String, CodeItem> temp=buildChildItemMap(entry.getValue());	
			codeMap.put(entry.getKey(), temp);
		}

		//将原有的数据字典的js文件覆盖 ,js对象中key是没有顺序的,所有排序不好使
		//String dictJson=new ObjectMapper().writeValueAsString(getCodeMap());		
		String dictJson=new ObjectMapper().writeValueAsString(tempMap);
		dictJson = "var dictJson=" + dictJson;
		String dictFile = webRes.getAbsolutePath() + "/js/dictData.js";
		FileUtils.writeStringToFile(new File(dictFile), dictJson, "utf-8");
		logger.info("reload dictData.js:{}", dictFile);
		
	}	
	Logger logger = LoggerFactory.getLogger(DictManagerUtil.class);
	
	@Autowired
	WebRes webRes;
}
