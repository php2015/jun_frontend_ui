package ${conf.basePackage}.${table.camelName}.controllers;

import net.paoding.rose.web.annotation.Param;
import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;
import net.paoding.rose.web.annotation.rest.Post;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.jeasy.base.controllers.BaseController;
import com.jeasy.base.controllers.ModelResult;
import com.jeasy.base.resolver.FromJson;
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
@Path("${table.camelName}")
public class ${table.className}Controller extends BaseController {

    @Autowired
    private ${table.className}Service ${table.camelName}Service;

    @MethodDoc(lists = ${table.className}.class, desc={"APP端", "${table.className}", "列表"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
    @Get("list")
    public String list(@FromJson ${table.className} ${table.camelName}) {
        List<${table.className}> ${table.camelName}List = ${table.camelName}Service.find(${table.camelName});
        return renderList(ModelResult.CODE_200, ModelResult.SUCCESS, ${table.camelName}List);
    }

    @MethodDoc(pages = ${table.className}.class, desc={"APP端", "${table.className}", "分页"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
    @Get("page")
    public String page(@FromJson ${table.className} ${table.camelName},
                       @InitField(name = "pageNo", value = "1", desc = "当前页码") @FromJson @Param("pageNo") Integer pageNo,
                       @InitField(name = "pageSize", value = "10", desc = "每页大小") @FromJson @Param("pageSize") Integer pageSize) {
        Integer totalCount = ${table.camelName}Service.count(${table.camelName});
        Integer offset = (pageNo - 1) * pageSize;
        List<${table.className}> ${table.camelName}List = ${table.camelName}Service.page(${table.camelName}, offset, pageSize);
        return renderPage(ModelResult.CODE_200, ModelResult.SUCCESS, totalCount, ${table.camelName}List, pageSize, pageNo);
    }

    @MethodDoc(desc={"APP端", "${table.className}", "新增"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
    @Post("add")
    public String add(@FromJson ${table.className} ${table.camelName}) {
        Long id = ${table.camelName}Service.save(${table.camelName});
        return renderMessage(id > 0 ? ModelResult.CODE_200 : ModelResult.CODE_500, id > 0 ? ModelResult.SUCCESS : ModelResult.FAIL);
    }

    @MethodDoc(entity = ${table.className}.class, desc={"APP端", "${table.className}", "详情"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
    @Get("show")
    public String show(@InitField(name = "id", value = "10", desc = "主键ID") @FromJson @ValidateNotNull(message = "ID不允许为空") @Param("id") Long id) {
        ${table.className} ${table.camelName} = ${table.camelName}Service.getById(id);
        return renderEntity(ModelResult.CODE_200, ModelResult.SUCCESS, ${table.camelName});
    }

    @MethodDoc(desc={"APP端", "${table.className}", "更新"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
    @Post("modify")
    public String modify(@FromJson ${table.className} ${table.camelName}) {
        Integer result = ${table.camelName}Service.modify(${table.camelName});
        return renderMessage(result == 1 ? ModelResult.CODE_200 : ModelResult.CODE_500, result == 1 ? ModelResult.SUCCESS : ModelResult.FAIL);
    }

    @MethodDoc(desc={"APP端", "${table.className}", "删除"}, status = StatusEnum.DONE, author = AuthorEnum.TAO_MING_KAI, finishTime = "2015-07-31")
    @Post("remove")
    public String remove(@InitField(name = "id", value = "10", desc = "主键ID") @FromJson @ValidateNotNull(message = "ID不允许为空") @Param("id") Long id) {
        Integer result = ${table.camelName}Service.remove(id);
        return renderMessage(result == 1 ? ModelResult.CODE_200 : ModelResult.CODE_500, result == 1 ? ModelResult.SUCCESS : ModelResult.FAIL);
    }
}