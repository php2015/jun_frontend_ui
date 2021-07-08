package cn.com.smart.form.bean.entity;

import cn.com.smart.bean.BaseBeanImpl;
import cn.com.smart.bean.DateBean;

import javax.persistence.*;
import java.util.Date;

/**
 * 表单导入配置 -- 实体类
 * @author lmq
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "t_form_import")
public class TFormImport extends BaseBeanImpl implements DateBean {

    private String id;

    /**
     * 表单ID
     */
    private String formId;

    /**
     * 表ID
     */
    private String tableId;

    /**
     * 导入类型；如：excel、txt等；默认为：excel
     */
    private String importType = "excel";

    /**
     * 分隔符；如果<code>importType</code>为“excel”时，该值为空
     */
    private String fieldSeparator;

    /**
     * 开始导入的行，默认为1，从第一行开始导入
     */
    private Integer startRow = 1;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 创建人ID
     */
    private String userId;

    private Date lastUpdateTime;

    private String lastUserId;

    @Id
    @Column(name = "id", length = 50)
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Column(name = "form_id", length = 50, nullable = false)
    public String getFormId() {
        return formId;
    }

    public void setFormId(String formId) {
        this.formId = formId;
    }

    @Column(name = "table_id", length = 50, nullable = false)
    public String getTableId() {
        return tableId;
    }

    public void setTableId(String tableId) {
        this.tableId = tableId;
    }

    @Column(name = "import_type", length = 127, nullable = false)
    public String getImportType() {
        return importType;
    }

    public void setImportType(String importType) {
        this.importType = importType;
    }

    @Column(name = "field_separator", length = 50)
    public String getFieldSeparator() {
        return fieldSeparator;
    }

    public void setFieldSeparator(String fieldSeparator) {
        this.fieldSeparator = fieldSeparator;
    }

    @Column(name = "start_row")
    public Integer getStartRow() {
        return startRow;
    }

    public void setStartRow(Integer startRow) {
        this.startRow = startRow;
    }

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_time", updatable = false)
    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Column(name = "user_id", length = 50, nullable = false, updatable = false)
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "last_update_time")
    public Date getLastUpdateTime() {
        return lastUpdateTime;
    }

    public void setLastUpdateTime(Date lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }

    @Column(name = "last_user_id", length = 50)
    public String getLastUserId() {
        return lastUserId;
    }

    public void setLastUserId(String lastUserId) {
        this.lastUserId = lastUserId;
    }
}
