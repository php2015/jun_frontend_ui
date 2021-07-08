package com.jeasy.doc.controllers;

import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Delete;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;
import net.paoding.rose.web.annotation.rest.Put;

import java.lang.reflect.Method;
import java.util.*;

import org.apache.commons.lang3.StringUtils;

import com.google.common.base.Joiner;
import com.google.common.collect.HashBasedTable;
import com.google.common.collect.Lists;
import com.google.common.collect.Table;
import com.jeasy.base.controllers.BaseController;
import com.jeasy.base.controllers.ModelResult;
import com.jeasy.base.resolver.FromJson;
import com.jeasy.doc.annotation.AuthorEnum;
import com.jeasy.doc.annotation.InitField;
import com.jeasy.doc.annotation.MethodDoc;
import com.jeasy.doc.annotation.StatusEnum;
import com.jeasy.doc.model.MenuTree;
import com.jeasy.doc.model.NodeUrl;
import com.jeasy.util.ClassUtils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Path("doc")
public class DocController extends BaseController {

	@Get
	public String index() throws Exception {
		return "doc";
	}

	@Get("listUrl")
	public String listUrl(@Param("node") String node) throws Exception {
		List<Class> controllerClasses = ClassUtils.getAllClassByType("com.jeasy", Class.forName("com.jeasy.base.controllers.BaseController"));
		List<NodeUrl> nodeUrls = new ArrayList<>();

		for (Class controllerClass : controllerClasses) {
			Path controllerPath = (Path) controllerClass.getAnnotation(Path.class);

			Method[] methods = controllerClass.getMethods();
			for (Method method : methods) {
				MethodDoc methodDoc = method.getAnnotation(MethodDoc.class);
				if (methodDoc == null) continue;

				String methodPath = method.getName();
				String [] methodTypes = null;
				if (method.getAnnotation(Get.class) != null) {
					Get get = method.getAnnotation(Get.class);
					methodPath = get.value()[0];
					methodTypes = new String[1];
					methodTypes[0] = "GET";
				}

				if (method.getAnnotation(Post.class) != null) {
					Post post = method.getAnnotation(Post.class);
					methodPath = post.value()[0];
					methodTypes = new String[1];
					methodTypes[0] = "POST";
				}

				if (method.getAnnotation(Put.class) != null) {
					Put put = method.getAnnotation(Put.class);
					methodPath = put.value()[0];
					methodTypes = new String[1];
					methodTypes[0] = "PUT";
				}

				if (method.getAnnotation(Delete.class) != null) {
					Delete delete = method.getAnnotation(Delete.class);
					methodPath = delete.value()[0];
					methodTypes = new String[1];
					methodTypes[0] = "DELETE";
				}

				if (methodTypes == null) {
					methodTypes = new String[2];
					methodTypes[0] = "GET";
					methodTypes[1] = "POST";
				}

				String[] methodDesc = methodDoc.desc();
				boolean isNode = false;
				for (String nodeDesc : methodDesc) {
					if (nodeDesc.equals(node)) {
						isNode = true;
					}
				}

				if (isNode && methodDesc.length >= 3) {
					String url = "/" + controllerPath.value()[0] + "/" + methodPath;
					String classDesc = controllerClass.getSimpleName() + "." + method.getName();
					String methodType = Joiner.on("/").join(methodTypes);
					NodeUrl nodeUrl = new NodeUrl(url, methodDesc[2], classDesc, StringUtils.isBlank(methodType) ? "GET/POST" : methodType, methodDoc.status().statusName(), methodDoc.author().authorName(), methodDoc.finishTime());
					nodeUrls.add(nodeUrl);
				}
			}
		}

        Collections.sort(nodeUrls, new Comparator<NodeUrl>() {
			@Override
			public int compare(NodeUrl o1, NodeUrl o2) {
				if (o1.getDesc().compareToIgnoreCase(o2.getDesc()) > 0) {
					return 1;
				}
				return -1;
			}
		});

		Map<String, Object> result = new HashMap<>();
		result.put("total", nodeUrls.size());
		result.put("rows", nodeUrls);
		return renderEntity(ModelResult.CODE_200, ModelResult.SUCCESS, result);
	}

	@Get("menu")
	public String menu() throws Exception {
		List<MenuTree> menuTree = new ArrayList<>();
		List<Class> controllerClasses = ClassUtils.getAllClassByType("com.jeasy", Class.forName("com.jeasy.base.controllers.BaseController"));

		Table<String, String, List<String>> treeTable = HashBasedTable.create();
		for (Class controllerClass : controllerClasses) {
			Method[] methods = controllerClass.getMethods();
			for (Method method : methods) {
				MethodDoc methodDoc = method.getAnnotation(MethodDoc.class);
				if (methodDoc == null) continue;

				String[] methodDesc = methodDoc.desc();
				if (methodDesc.length >= 3) {
					if (treeTable.contains(methodDesc[0], methodDesc[1])) {
						List<String> nodeList = treeTable.get(methodDesc[0], methodDesc[1]);
						nodeList.add(methodDesc[2]);
					} else {
						treeTable.put(methodDesc[0], methodDesc[1], Lists.newArrayList(methodDesc[2]));
					}
				}
			}
		}

		for (String rowKey : treeTable.rowKeySet()) {
			MenuTree nodeMenu1 = new MenuTree(0, rowKey);
			List<MenuTree> nodeLevel2 = new ArrayList<>();
			for (String columnKey : treeTable.row(rowKey).keySet()) {
				MenuTree nodeMenu2 = new MenuTree(1, columnKey);
				List<MenuTree> nodeLevel3 = new ArrayList<>();
				for (String value : treeTable.get(rowKey, columnKey)) {
					nodeLevel3.add(new MenuTree(2, value));
				}

				Collections.sort(nodeLevel3, new Comparator<MenuTree>() {
					@Override
					public int compare(MenuTree o1, MenuTree o2) {
						if (o1.getText().compareToIgnoreCase(o2.getText()) > 0) {
							return 1;
						}
						return -1;
					}
				});
				nodeMenu2.setChildren(nodeLevel3);
				nodeLevel2.add(nodeMenu2);
			}

			Collections.sort(nodeLevel2, new Comparator<MenuTree>() {
				@Override
				public int compare(MenuTree o1, MenuTree o2) {
					if (o1.getText().compareToIgnoreCase(o2.getText()) > 0) {
						return 1;
					}
					return -1;
				}
			});

			nodeMenu1.setChildren(nodeLevel2);
			menuTree.add(nodeMenu1);
		}

		return renderList(ModelResult.CODE_200, ModelResult.SUCCESS, menuTree);
	}

	@MethodDoc(entity = Person0.class, desc={"1-接口演示", "1. @FromJson参数", "1.1 基本类型+集合"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
	@Get("test0")
	public String test0(@FromJson Person0 person0) throws Exception {
		return renderEntity(ModelResult.CODE_200, ModelResult.SUCCESS, person0);
	}

	@MethodDoc(entity = Person1.class, desc={"1-接口演示", "1. @FromJson参数", "1.2 基本类型+集合+对象属性"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
	@Get("test1")
	public String test1(@FromJson Person1 person1) throws Exception {
		return renderEntity(ModelResult.CODE_200, ModelResult.SUCCESS, person1);
	}

	@MethodDoc(entity = Page.class, desc={"1-接口演示", "2. KV参数", "2.1 @FromJson基本类型"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
	@Get("test2")
	public String test2(@InitField(name = "pageNo", value = "1", desc = "当前页码") @FromJson Integer pageNo,
					  @InitField(name = "pageSize", value = "10", desc = "每页大小") @FromJson Integer pageSize) throws Exception {
		Page page = new Page();
		page.setPageNo(pageNo);
		page.setPageSize(pageSize);
		return renderEntity(ModelResult.CODE_200, ModelResult.SUCCESS, page);
	}

	@MethodDoc(entity = Person1Page.class, desc={"1-接口演示", "2. KV参数", "2.2 @FromJson对象类型 + 基本类型"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
	@Get("test3")
	public String test3(@FromJson Person1Page person1Page,
					  @InitField(name = "pageNo", value = "1", desc = "当前页码") Integer pageNo,
					  @InitField(name = "pageSize", value = "10", desc = "每页大小") Integer pageSize) throws Exception {
		person1Page.setPageNo(pageNo);
		person1Page.setPageSize(pageSize);
		return renderEntity(ModelResult.CODE_200, ModelResult.SUCCESS, person1Page);
	}

	@MethodDoc(entity = Person2.class, desc={"1-接口演示", "2. KV参数", "2.3 @FromJson对象类型 + 基本类型集合"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
	@Get("test4")
	public String test4(@FromJson Person2 person2,
					  @InitField(name = "personAges", value = "[\"1\",\"2\",\"3\",\"4\",\"5\"]", desc = "家庭成员年龄") @FromJson List<Integer> personAges,
					  @InitField(name = "personNames", value = "[\"小红\",\"小明\",\"小亮\",\"小涛\",\"张三\"]", desc = "家庭成员姓名") List<String> personNames,
					  @InitField(name = "personWeights", value = "[\"40.2\",\"50.6\",\"70.2\"]", desc = "家庭成员体重") Set<Double> personWeights,
					  @InitField(name = "personHeights", value = "[\"188\",\"189\",\"200\"]", desc = "家庭成员身高") Long[] personHeights) throws Exception {
		person2.setPersonAges(personAges);
		person2.setPersonHeights(personHeights);
		person2.setPersonWeights(personWeights);
		person2.setPersonNames(personNames);
		return renderEntity(ModelResult.CODE_200, ModelResult.SUCCESS, person2);
	}
}
