package cn.com.smart.report.poi;

import com.mixsmart.utils.CollectionUtils;
import org.apache.poi.ss.usermodel.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * @author lmq 2018-06-10
 * @version 1.0
 * @since 1.0
 */
public abstract class AbstractReadExcel implements IReadExcel {

    /**
     * 最大行数
     */
    protected static final int MAX_ROW_NUM = 65536;

    /**
     * 最大列数
     */
    protected static final int MAX_COL_NUM = 256;

    protected Logger logger;

    protected Workbook wb;

    public AbstractReadExcel(Workbook wb) {
        logger = LoggerFactory.getLogger(getClass());
        this.wb = wb;
    }

    @Override
    public Map<String, String[][]> read() {
        List<Sheet> sheets = getSheets();
        if(CollectionUtils.isEmpty(sheets)) {
            throw new RuntimeException("子类未实现getSheets方法或返回为空");
        }
        Integer startRow = getStartReadRow();
        startRow = (null == startRow || startRow <= 0 || startRow > MAX_ROW_NUM) ? 0 : (startRow - 1);
        Integer[] colsNum = getReadCols();

        Map<String, String[][]> dataMap = new HashMap<>();
        for(int i = 0; i < sheets.size(); i++) {
            Sheet sheet = wb.getSheetAt(i);
            int lastRowNum = sheet.getLastRowNum() + 1;
            int lastCellNum = sheet.getRow(startRow).getLastCellNum();
            System.out.println("总行："+lastRowNum+";总列:"+lastCellNum);
            int colLen = (null == colsNum) ? lastCellNum : colsNum.length;
            String[][] datas = new String[lastRowNum - startRow][colLen];

            for(int j = startRow; j < lastRowNum; j++) {
                Row row = sheet.getRow(j);
                if(null != row) {
                    if(null == colsNum) {
                        for (int k = 0; k < lastCellNum; k++) {
                            row.getCell(k).setCellType(CellType.STRING);
                            datas[j - startRow][k] = row.getCell(k).getStringCellValue();
                        }
                    } else {
                        for (int k = 0; k < colsNum.length; k++) {
                            if(null != colsNum[k]) {
                                row.getCell(colsNum[k]).setCellType(CellType.STRING);
                                datas[j - startRow][k] = row.getCell(colsNum[k]).getStringCellValue();
                            }
                        }
                    }
                }
            }
            dataMap.put(String.valueOf(i), datas);
        }
        return dataMap;
    }

    /**
     * 开始读取的行
     * @return 返回开始读取的行
     */
    protected abstract Integer getStartReadRow();

    /**
     * 需要读取的列
     * @return 返回需要读取列的数组
     */
    protected abstract Integer[] getReadCols();

    /**
     * 获取Sheet表
     * @return 返回需要读取的Sheet表
     */
    protected abstract List<Sheet> getSheets();
}

