package com.study.it.util;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5Util {
    public static void main(String[] args) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        String pwd="2";
        System.out.println(md5(pwd));
        String ss=md5(pwd,new int[]{3,8,12,13,20,23});
        System.out.println(ss);
        System.out.println(md5NotSalt(ss,new int[]{3,8,12,13,20,23}));

    }

    public static String md5(String str)
    {
        if(str==null)
            throw new RuntimeException("md5加密参数不允许为null");
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            byte[] bytes = md5.digest(str.getBytes("UTF-8"));
            return new BigInteger(1, bytes).toString(16);
        }catch (Exception ex)
        {
            throw new RuntimeException("md5加密错误"+ex.getMessage(),ex);
        }
    }

    //MD5加盐
    public static String md5(String str,int[] salt)//[3,8,12,13,20,23]
    {
        String old=md5(str);
        StringBuilder sb=new StringBuilder(old);
        for(int n=salt.length-1;n>=0;n--)
        {
            int r=(int)(Math.random()*10);
            sb.insert(salt[n],r);
        }
        return sb.toString();
    }

    //脱盐
    public static String md5NotSalt(String saltMd5Str,int[] salt)
    {
        StringBuilder sb=new StringBuilder(saltMd5Str);
        for(int n=0;n<salt.length;n++)
        {
            sb.deleteCharAt(salt[n]);
        }
        return sb.toString();
    }
}
