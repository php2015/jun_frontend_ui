package com.controller.system;

import com.controller.BaseController;
import com.entity.Menu;
import com.framework.annotation.Action;
import com.framework.annotation.Controller;
import com.vo.ResultVO;

import javax.servlet.http.HttpSession;
import javax.servlet.jsp.jstl.sql.Result;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by john on 2015/12/10.
 */
@Controller({"/system/menu"})
public class MenuController extends BaseController<Menu> {

    @Action("myMenuTree")
    public Object myMenuTree(HttpSession session){
        List<ResultVO> list = new ArrayList<ResultVO>();
        list.add(ResultVO.data().p("id",1).p("text","系统管理").p("open",true));
        list.add(ResultVO.data().p("id",2).p("text","部门人员管理").p("url","/page/system/departmentUserManager.jsp").p("pId",1));
        list.add(ResultVO.data().p("id",3).p("text","配置管理").p("url","/page/system/configManager.jsp").p("pId",1));
        list.add(ResultVO.data().p("id",4).p("text","角色管理").p("url","/page/system/roleManager.jsp").p("pId",1));
        return list;
    }

}
