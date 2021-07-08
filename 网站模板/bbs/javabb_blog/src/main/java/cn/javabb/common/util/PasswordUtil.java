package cn.javabb.common.util;

import org.apache.shiro.crypto.hash.Md5Hash;

import cn.javabb.common.constant.Constant;
/**
 * 密码加密工具
 * @author QINB
 * @CreateDate 2018年9月21日 下午10:28:56
 * @since V1.0
 * @see cn.javabb.common.util
 */
public class PasswordUtil {

    /**
     * MD5加密
     * @param str
     * @param salt
     * @return
     */
    public static String md5(String str,String salt){
        return new Md5Hash(str,salt).toString();
    }
    
    public static void main(String[] args) {
        String password="mima1008611";
        
        System.out.println("Md5密码："+PasswordUtil.md5(password,Constant.MD5_SALT));
    }
}
