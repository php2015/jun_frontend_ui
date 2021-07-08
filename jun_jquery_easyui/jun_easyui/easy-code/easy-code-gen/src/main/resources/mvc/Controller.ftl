package ${conf.basePackage}.${table.camelName}.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jeasy.base.controller.BaseController;
import com.jeasy.base.resolver.FromJson;
import com.jeasy.collection.MapExUtils;
import ${conf.basePackage}.${table.camelName}.model.${table.className};
import ${conf.basePackage}.${table.camelName}.service.${table.className}Service;
import com.jeasy.doc.annotation.AuthorEnum;
import com.jeasy.doc.annotation.InitField;
import com.jeasy.doc.annotation.MethodDoc;
import com.jeasy.doc.annotation.StatusEnum;
import com.jeasy.validate.ValidateNotNull;

import lombok.extern.slf4j.Slf4j;

/**
 * ${table.comment}
 * @author ${conf.author}
 * @version ${conf.version}
 * @since ${conf.createDate}
 */
@Slf4j
@Controller
@RequestMapping("/${table.camelName}")
public class ${table.className}Controller extends BaseController<${table.className}Service, ${table.className}> {

	@MethodDoc(lists = ${table.className}.class, desc={"APP端", "${table.className}", "列表"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
	@RequestMapping(value = "list")
	@ResponseBody
	public void list(@FromJson ${table.className} ${table.camelName}) {
		super.list(MapExUtils.toObjMap(${table.camelName}));
	}

	@MethodDoc(pages = ${table.className}.class, desc={"APP端", "${table.className}", "分页"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
	@RequestMapping(value = "page")
	@ResponseBody
	public void page(@FromJson ${table.className} ${table.camelName},
					 @InitField(name = "pageNo", value = "1", desc = "当前页码") @FromJson Integer pageNo,
					 @InitField(name = "pageSize", value = "10", desc = "每页大小") @FromJson Integer pageSize) {
		super.page(MapExUtils.toObjMap(${table.camelName}), pageSize, pageNo);
	}

	@MethodDoc(desc={"APP端", "${table.className}", "新增"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
	@RequestMapping(value = "add")
	@ResponseBody
	public void add(@FromJson ${table.className} ${table.camelName}) {
		super.save(${table.camelName});
	}

	@MethodDoc(entity = ${table.className}.class, desc={"APP端", "${table.className}", "详情"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
	@RequestMapping(value = "show")
	@ResponseBody
	public void show(@InitField(name = "id", value = "10", desc = "主键ID") @FromJson @ValidateNotNull(message = "ID不允许为空") Long id) {
		super.detail(id);
	}

	@MethodDoc(desc={"APP端", "${table.className}", "更新"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
	@RequestMapping(value = "modify")
	@ResponseBody
	public void modify(@FromJson ${table.className} ${table.camelName}) {
		super.update(${table.camelName});
	}

	@MethodDoc(desc={"APP端", "${table.className}", "删除"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
	@RequestMapping(value = "remove")
	@ResponseBody
	public void remove(@InitField(name = "id", value = "10", desc = "主键ID") @FromJson @ValidateNotNull(message = "ID不允许为空") Long id) {
		super.delete(id);
	}
}