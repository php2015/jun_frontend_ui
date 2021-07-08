package cn.com.smart.form.bean;

/**
 * @author lmq 2018-06-10
 * @version 1.0
 * @since 1.0
 */
public class FormImportFieldVO {

    private String tableFieldId;

    private Integer columnNum;

    public String getTableFieldId() {
        return tableFieldId;
    }

    public void setTableFieldId(String tableFieldId) {
        this.tableFieldId = tableFieldId;
    }

    public Integer getColumnNum() {
        return columnNum;
    }

    public void setColumnNum(Integer columnNum) {
        this.columnNum = columnNum;
    }
}
