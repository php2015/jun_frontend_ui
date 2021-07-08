package cn.com.smart.form.bean.entity;

import cn.com.smart.bean.BaseBeanImpl;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 表单导入字段配置 -- 实体类
 * @author lmq
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "t_form_import_field")
public class TFormImportField extends BaseBeanImpl {

    private String id;

    private String formImportId;

    private String tableFieldId;

    private Integer columnIndex;

    @Id
    @Column(name = "id", length = 50)
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Column(name = "form_import_id", length = 50, nullable = false)
    public String getFormImportId() {
        return formImportId;
    }

    public void setFormImportId(String formImportId) {
        this.formImportId = formImportId;
    }

    @Column(name = "table_field_id", length = 50, nullable = false)
    public String getTableFieldId() {
        return tableFieldId;
    }

    public void setTableFieldId(String tableFieldId) {
        this.tableFieldId = tableFieldId;
    }

    @Column(name = "column_index")
    public Integer getColumnIndex() {
        return columnIndex;
    }

    public void setColumnIndex(Integer columnIndex) {
        this.columnIndex = columnIndex;
    }
}
