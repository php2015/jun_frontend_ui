package cn.javabb.sys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.javabb.common.annotation.Log;
import cn.javabb.common.base.BaseController;
import cn.javabb.common.model.R;
import cn.javabb.common.util.BUtil;
import cn.javabb.common.util.ListUtils;
import cn.javabb.sys.entity.User;
import cn.javabb.sys.service.UserService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("/sys/user")
public class UserController extends BaseController{

    @Autowired
    private UserService userService;
    
    @GetMapping({"","/"})
    public String user(){
       return"page/admin/system/user/userList";
    }
    @ApiOperation(value="获取用户列表",notes="")
    @ResponseBody
    @GetMapping("/list")
    public R list(User user){
        String page = request.getParameter("page");
        String rows = request.getParameter("limit");
        System.out.println("page"+page);
        Integer count = userService.queryCountByWhere(user);
        List<User> userList = userService.queryPageListByWhere(page,rows,user);
        if(ListUtils.isEmpty(userList)){
            return new R(1, "", userList,0);
        }
        return new R(0, "", userList,count);
    }
    @Log("更新用户状态")
    @ApiOperation(value="更新用户状态",notes="")
    @ApiImplicitParam(name="id",value="用户ID",required=true,dataType="Long")
    @ResponseBody
    @PostMapping("/updateState")
    public Object updateState(User user){
        if(BUtil.isNull(user)){
            return R.error();
        }
        int num = userService.updateSelective(user);
        if(num>0){
            return R.ok();
        }
        return R.error();
    }
    @GetMapping("/add")
    public String add(){
        return "page/admin/system/user/userSave";
    }
    @Log("保存用户信息")
    @ResponseBody
    @PostMapping("/save")
    public Object saveOrUpdate(User user){
        if(BUtil.isNull(user)){
            return R.error();
        }
        int num = 0;
        if(BUtil.isNull(user.getId())){
            //新增
            user.setId(null);
            user.setState(0);
            num = userService.insert(user);
        }else{
            num = userService.updateSelective(user);
        }
        if(num>0){
            return R.ok();
        }
        return R.error();
    }
    @ResponseBody
    @PostMapping("/remove/{ids}")
    public Object remove(@PathVariable String ids){
        if(BUtil.isNull(ids)){
            return R.error();
        }
       List<String> idList = ListUtils.stringToListString(ids);
       int num = userService.deleteByIds(User.class, "id", idList);
       if(num>0){
           return R.ok();
       }
       return R.error();
    }
    
}
