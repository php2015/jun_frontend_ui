package cn.javabb.sys.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;

import cn.javabb.common.base.BaseService;
import cn.javabb.sys.entity.SysConfig;
@Service
public class SysConfigService extends BaseService<SysConfig>{

    /**
     * 
     * Description: 
     * 根据 code 获取系统配置值
     * @author QINB
     * @param code
     * @return value
     */
    public String querySysValueByCode(String code){
        SysConfig config = new SysConfig();
        config.setConfigCode(code);
        SysConfig sysConfig = this.queryOne(config);
        return sysConfig==null?"":sysConfig.getConfigValue();
    }
    public JSONObject querySysConfigMapByType(String type){
        SysConfig  config  = new SysConfig();
        config.setConfigType(type);
        List<SysConfig> configList = this.queryListByWhere(config);
        JSONObject json = new JSONObject();
        for(SysConfig c:configList){
            json.put(c.getConfigCode(), c.getConfigValue());
        }
        return json;
    }
}
