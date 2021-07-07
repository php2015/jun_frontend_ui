package cn.javabb.common.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.security.MessageDigest;
import java.util.Arrays;

import org.springframework.util.StringUtils;

public class FileUtils {
    
    private static final String[] IMG_SUFFIXS = {".jpg", ".jpeg", ".png", ".gif", ".bmp"};

    public static String getPrefix(File file) {
        return getPrefix(file.getName());
    }

    public static String getPrefix(String fileName) {
        int idx = fileName.lastIndexOf(".");
        int xie = fileName.lastIndexOf("/");
        idx = idx == -1 ? fileName.length() : idx;
        xie = xie == -1 ? 0 : xie + 1;
        return fileName.substring(xie, idx);
    }

    public static String getSuffix(File file) {
        return getSuffix(file.getName());
    }

    public static String getSuffix(String fileName) {
        int idx = fileName.lastIndexOf(".");
        idx = idx == -1 ? fileName.length() : idx;
        return fileName.substring(idx);
    }
    
    public static boolean isImg(String suffix) {
        return !StringUtils.isEmpty(suffix) && Arrays.asList(IMG_SUFFIXS).contains(suffix.toLowerCase());
    }
   /**
    * Description: 
    * 重命名为UUID xx.jpg --> uuid.jpg
    *  
    * @author QINB
    * @param fileName
    * @return
    */
    public static String renameToUUID(String fileName) {
        return UUIDUtil.getUUID() + "." + fileName.substring(fileName.lastIndexOf(".") + 1);
    }
    
    /**
     * 生成md5
     * @author QINB
     * @param file 图片文件
     * @return MD5值
     * @throws FileNotFoundException
     */
    public static String getFileMd5(File file) throws FileNotFoundException {
        String value = null;
        FileInputStream in = null;
        try {
            in = new FileInputStream(file);
            MappedByteBuffer byteBuffer = in.getChannel().map(FileChannel.MapMode.READ_ONLY, 0, file.length());
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            md5.update(byteBuffer);
            BigInteger bi = new BigInteger(1, md5.digest());
            value = bi.toString(16);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            closeStream(in);
            
        }
        return value;
    }
    
    private static void closeStream(FileInputStream closeable) {
        try {
            if (closeable != null) {
                closeable.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public static String getFileMD5(File file) {
        if (!file.isFile()) {
            return null;
        }
        MessageDigest digest = null;
        FileInputStream in = null;
        byte buffer[] = new byte[1024];
        int len;
        try {
            digest = MessageDigest.getInstance("MD5");
            in = new FileInputStream(file);
            while ((len = in.read(buffer, 0, 1024)) != -1) {
                digest.update(buffer, 0, len);
            }
            in.close();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        BigInteger bigInt = new BigInteger(1, digest.digest());
        return bigInt.toString(16);
    }
    
}
