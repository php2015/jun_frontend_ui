package com.jeasy.env;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 *
 * 用于标记当前运行环境的枚举类型
 *
 * @author peng.du
 *
 */
public enum Env {
    TEST(null), //
    TEST_REAL(null), //还是测试环境，但数据库数据较接近生产数据
    TEST_STRESS(null),
    MIRROR(null),
    TEST_FOR_TEST(null), //
    TEST_REAL_SYNC(null), //还是测试环境，但数据库数据比TEST_REAL更接近生产数据
    PROD(null), //
    PROD_LIVE(PROD), // 面对用户的生产环境
    STAGING(PROD), // STAGING环境
    STAGING_NEW(null),
    ; //

    /**
     * 表达某种继承关系，例如PROD_LIVE和STAGING都是PROD的某种特列，在操作中，若需检查是否为PROD，需要根据root作进一步判断
     */
    private final Env root;

    private Env(Env root) {
        this.root = (root == null ? this : root);
    }

    public Env getRoot() {
        return root;
    }

    public static final Env CURRENT;
    
    private static Log log = LogFactory.getLog(Env.class);

    static {
        Env current = null;
        // Deprecated:: 不再推荐使用NIUX_TEST_DS指示测试环境
        if (StringUtils.equalsIgnoreCase("true", System.getProperty("NIUX_TEST_DS"))) {
            current = TEST;
        }
        else if (StringUtils.equalsIgnoreCase("TEST", System.getProperty("NIUX_ENV"))) {
            current = TEST;
        }
        else if (StringUtils.equalsIgnoreCase("TEST_REAL", System.getProperty("NIUX_ENV"))) {
            current = TEST_REAL;
        }
        else if (StringUtils.equalsIgnoreCase("TEST_STRESS", System.getProperty("NIUX_ENV"))) {
            current = TEST_STRESS;
        }
        else if (StringUtils.equalsIgnoreCase("TEST_FOR_TEST", System.getProperty("NIUX_ENV"))) {
            current = TEST_FOR_TEST;
        }
        else if (StringUtils.equalsIgnoreCase("TEST_REAL_SYNC", System.getProperty("NIUX_ENV"))) {
            current = TEST_REAL_SYNC;
        }
        else if (StringUtils.equalsIgnoreCase("PROD", System.getProperty("NIUX_ENV"))) {
            current = PROD;
        }
        else if (StringUtils.equalsIgnoreCase("PROD_LIVE", System.getProperty("NIUX_ENV"))) {
            current = PROD_LIVE;
        }
        else if (StringUtils.equalsIgnoreCase("STAGING", System.getProperty("NIUX_ENV"))) {
            current = STAGING;
        }
        else if (StringUtils.equalsIgnoreCase("STAGING_NEW", System.getProperty("NIUX_ENV"))) {
            current = STAGING_NEW;
        }
        else if (StringUtils.equalsIgnoreCase("MIRROR", System.getProperty("NIUX_ENV"))) {
            current = MIRROR;
        }
        if (current == null) {
            current = STAGING;
        }
        CURRENT = current;
        
        log.info("ENV.CURRENT=" + CURRENT.toString());
    }
    
    public static void main(String[] args) {
//		System.out.println(Env.PROD.toString());
//		System.out.println(Env.PROD_LIVE.toString());
		Env c = Env.PROD_LIVE;
		c = Env.PROD;
//		c = Env.TEST;
//		c = Env.TEST_REAL;
		if(Env.CURRENT.toString().startsWith("TEST")) {
			//do nothing
			//连接对方测试环境
		}
		System.out.println(c.toString());
		
		
		for (Env env : Env.values()) {
			System.out.println((env.toString() + ":"));
        }
		
		
//    	for (Env env : Env.values()) {
//    		System.out.println(env.toString());
//    	}
	}
}
