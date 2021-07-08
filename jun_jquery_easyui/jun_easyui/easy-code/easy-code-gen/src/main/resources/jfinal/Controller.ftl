package ${conf.basePackage}.${table.camelName}.controller;

import java.util.List;

import com.jeasy.base.controller.ControllerSupport;
import com.jeasy.base.controller.ModelResult;
import ${conf.basePackage}.${table.camelName}.model.${table.className};
import ${conf.basePackage}.${table.camelName}.service.${table.className}Service;
import com.jfinal.aop.Before;
import com.jfinal.ext.interceptor.GET;
import com.jfinal.ext.interceptor.POST;

import lombok.extern.slf4j.Slf4j;

/**
 * ${table.comment}
 * @author ${conf.author}
 * @version ${conf.version}
 * @since ${conf.createDate}
 */
@Slf4j
public class ${table.className}Controller extends ControllerSupport {

	@Before(GET.class)
	public void list() {
		List<${table.className}> ${table.camelName}List = ${table.className}Service.me.find(getModel(${table.className}.class));
    	renderList(ModelResult.CODE_200, ModelResult.SUCCESS, transfer(${table.camelName}List));
    }

    @Before(GET.class)
    public void page() {
    	int pageNo = getParaToInt("pageNo", 1);
    	int pageSize = getParaToInt("pageSize", 10);
    	List<${table.className}> ${table.camelName}List = ${table.className}Service.me.page(getModel(${table.className}.class), pageNo, pageSize);
        int totalCount = ${table.className}Service.me.count(getModel(${table.className}.class));
        renderPage(ModelResult.CODE_200, ModelResult.SUCCESS, totalCount, transfer(${table.camelName}List), pageSize, pageNo);
	}

	@Before(POST.class)
    public void add() {
		${table.className}Service.me.save(getModel(${table.className}.class));
        renderMessage(ModelResult.CODE_200, ModelResult.SUCCESS);
	}

	@Before(GET.class)
	public void show() {
        renderEntity(ModelResult.CODE_200, ModelResult.SUCCESS, transfer(${table.className}Service.me.getById(getParaToLong("id", 0l))));
	}

	@Before(POST.class)
    public void modify() {
		${table.className}Service.me.modify(getModel(${table.className}.class));
        renderMessage(ModelResult.CODE_200, ModelResult.SUCCESS);
    }

	@Before(POST.class)
    public void remove() {
		${table.className}Service.me.remove(getParaToLong("id", 0l));
        renderMessage(ModelResult.CODE_200, ModelResult.SUCCESS);
    }
}