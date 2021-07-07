package cn.javabb.content.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import cn.javabb.common.base.BaseService;
import cn.javabb.common.util.BUtil;
import cn.javabb.content.entity.Catalog;

@Service
public class CatalogService extends BaseService<Catalog>{

    public List<Catalog> queryAll(String catalogType){
        List<Catalog> catalogList = new ArrayList<Catalog>();
        //如果为空，则搜索全部
        if(BUtil.isNull(catalogType)){
            catalogList = this.queryAll();
        }else{
            Catalog catalog = new Catalog();
            catalog.setCatalogType(catalogType);
            catalogList = this.queryListByWhere(catalog);
        }
        return catalogList;
    }
}
