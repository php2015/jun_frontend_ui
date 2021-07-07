package cn.com.smart.report.poi;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * 默认读取Excel的实现类
 * @author lmq
 * @version 1.0
 * @since 1.0
 */
public class DefaultReadExcel extends AbstractReadExcel {

    private Integer startRow = 0;

    public DefaultReadExcel(String filePath) throws IOException {
        this(new File(filePath));
    }

    public DefaultReadExcel(File file) throws IOException {
        this(new FileInputStream(file));
    }

    public DefaultReadExcel(InputStream is) throws IOException {
        super(new XSSFWorkbook(is));
    }

    @Override
    protected Integer getStartReadRow() {
        return this.startRow;
    }

    @Override
    protected Integer[] getReadCols() {
        return null;
    }

    @Override
    protected List<Sheet> getSheets() {
        List<Sheet> sheets = new ArrayList<>(1);
        sheets.add(wb.getSheetAt(0));
        return sheets;
    }

    public void setStartRow(Integer startRow) {
        this.startRow = startRow;
    }
}
