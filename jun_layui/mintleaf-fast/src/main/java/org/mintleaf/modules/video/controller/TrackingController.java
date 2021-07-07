package org.mintleaf.modules.video.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * 图像识别相关控制器
 * @Author: MengchuZhang
 * @Date: 2018/9/14 9:17
 * @Version 1.0
 */
@Api(tags="图像识别相关控制器",description="描述")
@Controller
@RequestMapping("tracking")
public class TrackingController {

    /**
     * 进入首页
     * @return
     */
    @ApiOperation(value="进入首页", notes="描述")
    @RequestMapping(value="index.html",method = {RequestMethod.GET})
    public ModelAndView index(){
        ModelAndView view =new ModelAndView("modules/video/tracking/index.html");
        return view;
    }

}
