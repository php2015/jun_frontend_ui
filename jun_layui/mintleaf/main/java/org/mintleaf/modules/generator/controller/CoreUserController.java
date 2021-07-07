package org.mintleaf.modules.generator.controller;

import java.util.Arrays;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.mintleaf.modules.generator.entity.CoreUserEntity;
import org.mintleaf.modules.generator.service.CoreUserService;
import org.mintleaf.common.utils.PageUtils;
import org.mintleaf.common.utils.R;



/**
 * 
 *
 * @author MengchuZhang
 * @email 6153629@qq.com
 * @date 2020-10-29 23:03:30
 */
@RestController
@RequestMapping("generator/coreuser")
public class CoreUserController {
    @Autowired
    private CoreUserService coreUserService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("generator:coreuser:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = coreUserService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("generator:coreuser:info")
    public R info(@PathVariable("id") Integer id){
			CoreUserEntity coreUser = coreUserService.selectById(id);

        return R.ok().put("coreUser", coreUser);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("generator:coreuser:save")
    public R save(@RequestBody CoreUserEntity coreUser){
			coreUserService.insert(coreUser);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("generator:coreuser:update")
    public R update(@RequestBody CoreUserEntity coreUser){
			coreUserService.updateById(coreUser);

        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("generator:coreuser:delete")
    public R delete(@RequestBody Integer[] ids){
			coreUserService.deleteBatchIds(Arrays.asList(ids));

        return R.ok();
    }

}
