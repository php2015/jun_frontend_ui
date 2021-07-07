package cn.javabb.sys.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.druid.util.StringUtils;
import com.alibaba.fastjson.JSONObject;

import cn.javabb.common.base.BaseService;
import cn.javabb.common.util.BUtil;
import cn.javabb.content.entity.Content;
import cn.javabb.content.service.ContentService;
import cn.javabb.sys.entity.SysMenu;
import cn.javabb.sys.mapper.SysMenuMapper;
import tk.mybatis.mapper.entity.Example;

@Service
public class SysMenuService extends BaseService<SysMenu>{

    @Autowired
    ContentService contentService;
    
    /**
     * 查询Menu列表
     * @author QINB
     * @param param
     * @return
     */
    public List<SysMenu> listMenusAll(JSONObject param){
        param.put("sqlid", SysMenuMapper.class.getName()+".listMenus");
        return this.queryList(param);
    }
    
    /**
     * 查询单个数据
     * @author QINB
     * @param id
     * @return
     */
    public SysMenu getMenuAllById(Integer id){
        JSONObject param = new JSONObject();
        param.put("menuId", id);
        param.put("sqlid", SysMenuMapper.class.getName()+".listMenus");
        return this.queryOne(param);
    }
    /**
     * 查询单个数据
     * @author QINB
     * @param menuCode
     * @return
     */
    public SysMenu getMenuAllByCode(String menuCode){
        JSONObject param = new JSONObject();
        param.put("menuCode", menuCode);
        param.put("sqlid", SysMenuMapper.class.getName()+".listMenus");
        return this.queryOne(param);
    }
    
    @Transactional
    public int save(SysMenu menu){
        int num = 0;
        if(BUtil.isNull(menu.getId())){
            //insert
            //先insert content
            contentService.insert(menu.getContent());
            menu.setContentId(menu.getContent().getContentId());
            num = this.insert(menu);
        }else{
            //update
            num = this.updateSelective(menu);
            Content content = menu.getContent();
            content.setContentId(this.queryById(menu.getId()).getContentId());
            /*menu.getContent().setContentId(this.queryById(menu.getId()).getContentId());*/
           num = contentService.updateSelective(menu.getContent());
        }
        //保存标签
        return num;
    }
    /**
     * 查询前台导航页面
     * 1,前台导航 内部功能url
     * 2,前台导航 定义导航url
     * @author QINB
     * @return
     */
    public List<SysMenu> listNavMenus(){
        SysMenu m = new SysMenu();
        m.setMenuType(1);//前台导航
        Example example = new Example(m.getClass());
        example.orderBy("sort").desc();//
        List<SysMenu> menuList = this.queryListByExample(example);
        return menuList;
    }
    
    /**
     * 获取博客的SEO
     * @author QINB
     * @param blogId
     * @return
     */
    public Map<String,Object> loadMenuTDK(String menuCode){
        if(StringUtils.isEmpty(menuCode)){
            menuCode = "index";
        }
        Map<String,Object> map = new HashMap<String,Object>();
        SysMenu menu = this.getMenuAllByCode(menuCode);
        map.put("title", menu.getMenuName());
        map.put("keywords",menu.getContent().getKeywords());
        map.put("description",menu.getContent().getDescription());
        return map;
    }
}
