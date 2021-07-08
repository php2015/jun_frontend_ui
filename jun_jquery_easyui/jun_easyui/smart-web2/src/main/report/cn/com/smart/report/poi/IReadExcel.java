package cn.com.smart.report.poi;

import java.io.File;
import java.io.InputStream;
import java.util.Map;

/**
 * 读取Excel数据接口
 * @author lmq
 * @version 1.0
 * @since 1.0
 */
public interface IReadExcel {

    /**
     * 读取Excel中的数据
     * @return 返回Map对象，key为sheet；value为sheet中的数据；一个字符串的二维数组表示行和列
     */
    Map<String, String[][]> read();
}
