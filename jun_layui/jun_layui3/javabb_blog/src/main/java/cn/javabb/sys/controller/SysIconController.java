package cn.javabb.sys.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/sys/icon")
public class SysIconController {

    private static final String ICON_LIST_PAGE="page/admin/system/icon/icon";
    
    @GetMapping("/list")
    public String toListPage(){
       return ICON_LIST_PAGE;
    }
}
