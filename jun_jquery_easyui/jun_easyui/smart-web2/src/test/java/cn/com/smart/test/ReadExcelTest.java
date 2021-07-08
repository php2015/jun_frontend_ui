package cn.com.smart.test;

import cn.com.smart.report.poi.AbstractReadExcel;
import cn.com.smart.report.poi.DefaultReadExcel;

import java.io.IOException;
import java.util.Map;

/**
 * @author lmq
 * @version 1.0
 * @since 1.0
 */
public class ReadExcelTest {

    public static void main(String[] args) {
        String filePath = "E:\\test\\test.xlsx";

        try {
            AbstractReadExcel readExcel = new DefaultReadExcel(filePath);
            Map<String, String[][]> dataMap = readExcel.read();
            if(null == dataMap) {
                System.out.println("获取失败");
                return;
            }
            String[][] datas = dataMap.get("0");
            for(String[] data : datas) {
                System.out.println("\n==============");
                for(String value : data) {
                    System.out.print(value + "|\t");
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
