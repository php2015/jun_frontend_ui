package com.jeasy.env;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Map.Entry;
import java.util.Properties;

/**
 * ducat 服务配置映射
 * 
 * @author wensong
 * @since 2013-8-23 下午4:43:40 [wensong1987@gmail.com]
 */
public class DucatServerMappingFactory {

    public DucatServerMapping getDucatServerMapping() throws IOException {
        URL url = new URL(UrlServerMappingFactory.CONF_LOCATION);
        return readConf(url);
    }

    /**
     * 读配置文件获取ducatServer映射列表
     *
     * @param url
     * @return
     * @throws java.io.IOException
     */
    DucatServerMapping readConf(URL url) throws IOException {
        InputStream is = null;
        try {
            is = url.openStream();
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(is));
            Env headEnv = null;
            DucatServerMapping ducatServerMapping = new DucatServerMapping();
            while (bufferedReader.ready()) {
                String readData = bufferedReader.readLine();
                // 排除空行
                if (readData == null || readData == "") {
                    continue;
                }
                // 排除注释
                if (readData.startsWith("#")) {
                    continue;
                }
                // 找到env
                if (readData.endsWith(":")) {
                    for (Env li : Env.values()) {
                        // 匹配与env字符串一致，切已":"结尾的
                        if (readData.trim().substring(0, readData.toString().lastIndexOf(":"))
                                .equalsIgnoreCase(li.toString())) {
                            headEnv = li;
                        }
                    }
                }

                // 匹配ducat.开头的，并且headEnv不为空
                if (readData.startsWith("ducat.") && headEnv != null) {
                    String[] ducatProps = readData.split("=");
                    // 符合key value规范
                    if (ducatProps.length == 2) {
                        ducatServerMapping.addConf(headEnv, ducatProps[0], ducatProps[1]);
                    }
                }
            }
            return ducatServerMapping;
        } finally {
            if (is != null) {
                try {
                    is.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public static void main(String[] args) {
        DucatServerMappingFactory factory = new DucatServerMappingFactory();
        try {
            DucatServerMapping mapping = factory.getDucatServerMapping();
            Properties prop = mapping.getDucatProperties(Env.CURRENT);
            for (Entry<Object, Object> li : prop.entrySet()) {
                System.out.println(li.getKey() + ":" + li.getValue());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
