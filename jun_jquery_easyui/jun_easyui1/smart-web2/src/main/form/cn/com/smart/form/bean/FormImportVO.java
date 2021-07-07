package cn.com.smart.form.bean;

import com.mixsmart.utils.StringUtils;

import java.util.List;

/**
 * @author lmq
 * @version 1.0
 * @since 1.0
 */
public class FormImportVO {

    private String tableId;

    private String importType;

    private String separator;

    private Integer startRow;

    private List<FormImportFieldVO> fields;

    public String getTableId() {
        return tableId;
    }

    public void setTableId(String tableId) {
        this.tableId = tableId;
    }

    public String getImportType() {
        return importType;
    }

    public void setImportType(String importType) {
        this.importType = importType;
    }

    public String getSeparator() {
        if(StringUtils.isEmpty(separator)) {
            separator = null;
        }
        return separator;
    }

    public void setSeparator(String separator) {
        this.separator = separator;
    }

    public Integer getStartRow() {
        return startRow;
    }

    public void setStartRow(Integer startRow) {
        this.startRow = startRow;
    }

    public List<FormImportFieldVO> getFields() {
        return fields;
    }

    public void setFields(List<FormImportFieldVO> fields) {
        this.fields = fields;
    }
}
