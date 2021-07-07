package cn.com.smart.form.service;

import cn.com.smart.bean.SmartResponse;
import cn.com.smart.form.bean.FormImportFieldRelate;
import cn.com.smart.form.bean.FormImportFieldVO;
import cn.com.smart.form.bean.FormImportVO;
import cn.com.smart.form.bean.entity.TFormImport;
import cn.com.smart.form.bean.entity.TFormImportField;
import cn.com.smart.report.poi.DefaultReadExcel;
import cn.com.smart.service.impl.MgrServiceImpl;
import cn.com.smart.web.service.IOPService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mixsmart.exception.NullArgumentException;
import com.mixsmart.utils.CollectionUtils;
import com.mixsmart.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author lmq
 * @version 1.0
 * @since 1.0
 */
@Service
public class FormImportService extends MgrServiceImpl<TFormImport> {

    @Autowired
    private FormImportFieldService formImportFieldServ;
    @Autowired
    private IOPService opServ;

    /**
     * 获取表单导入配置信息通过表单ID
     * @param formId 表单ID
     * @return
     */
    public TFormImport getFormImportByFormId(String formId) {
        if(StringUtils.isEmpty(formId)) {
            return null;
        }
        Map<String, Object> param = new HashMap<>(1);
        param.put("formId", formId);
        SmartResponse<TFormImport> response = super.findByParam(param);
        TFormImport formImport = null;
        if(OP_SUCCESS.equals(response.getResult())) {
            formImport = response.getDatas().get(0);
        }
        return formImport;
    }

    /**
     * 保存配置信息
     * @param formId
     * @param formImportConfig
     * @param userId
     * @return
     */
    public SmartResponse<String> saveConfig(String formId, String formImportConfig, String userId) {
        SmartResponse<String> smartResp = new SmartResponse<>();
        if(StringUtils.isEmpty(formId) || StringUtils.isEmpty(formImportConfig) || StringUtils.isEmpty(userId)) {
            return smartResp;
        }
        try {
            FormImportVO formImportVO = new ObjectMapper().readValue(formImportConfig, FormImportVO.class);
            if(CollectionUtils.isEmpty(formImportVO.getFields())) {
                throw new NullArgumentException("关联字段为空");
            }
            TFormImport formImport = getFormImportByFormId(formId);
            if(null != formImport) {
                assignFormImport(formImport, formImportVO, formId);
                formImport.setLastUpdateTime(new Date());
                formImport.setLastUserId(userId);
                super.update(formImport);
                Map<String, Object> param = new HashMap<>(1);
                param.put("formImportId", formImport.getId());
                formImportFieldServ.deleteByField(param);
            } else {
                formImport = new TFormImport();
                assignFormImport(formImport, formImportVO, formId);
                formImport.setUserId(userId);
                super.save(formImport);
            }
            List<TFormImportField> fields = getFormImportFields(formImport.getId(), formImportVO);
            if(CollectionUtils.isNotEmpty(fields)) {
                formImportFieldServ.save(fields);
            }
            smartResp.setResult(OP_SUCCESS);
            smartResp.setMsg(OP_SUCCESS_MSG);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return smartResp;
    }

    /**
     * 执行导入操作
     * @param is
     * @param formId
     * @param userId
     * @return
     */
    public SmartResponse<String> executeImport(InputStream is, String formId, String userId) {
        SmartResponse<String> smartResp = new SmartResponse<>();
        if(null == is || StringUtils.isEmpty(formId) || StringUtils.isEmpty(userId)) {
            throw new NullArgumentException();
        }
        Map<String, Object> param = new HashMap<>(1);
        param.put("formId", formId);
        TFormImport formImport = null;
        SmartResponse<TFormImport> response = findByParam(param);
        if(OP_SUCCESS.equals(response.getResult()))  {
            formImport = response.getDatas().get(0);
        }
        if(null == formImport) {
            throw new RuntimeException("未找到导入配置信息，无法导入数据");
        }
        String[] importIdAndTableName = getImportIdAndTableName(formId);
        if(null == importIdAndTableName || importIdAndTableName.length == 0) {
            throw new RuntimeException("获取表名或导入ID失败");
        }
        List<FormImportFieldRelate> relates = getRelateFields(importIdAndTableName[0]);
        if(CollectionUtils.isEmpty(relates)) {
            throw new RuntimeException("未获取到关联字段");
        }
        int startRow = (null == formImport.getStartRow()) ? 1 : formImport.getStartRow();
        DefaultReadExcel readExcel = null;
        try {
            readExcel = new DefaultReadExcel(is);
            readExcel.setStartRow(startRow);
            Map<String, String[][]> dataMap = readExcel.read();
            is.close();

            //清空以前导入的数据（导入了未提交的）
            String delSql = "delete from "+importIdAndTableName[1]+" where state=1 and creator=:creator and form_data_id is null";
            Map<String, Object> deleteParam = new HashMap<>(1);
            deleteParam.put("creator", userId);
            opServ.executeBySql(delSql, deleteParam);
            String insertSql = generateInsertSql(importIdAndTableName[1], relates);
            List<Map<String, Object>> params = handleInsertParams(userId, dataMap.get("0"), relates);
            if(CollectionUtils.isNotEmpty(params)) {
                opServ.executeBySql(insertSql, params);
            }
            smartResp.setResult(OP_SUCCESS);
            smartResp.setMsg("导入成功");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return smartResp;
    }

    /**
     * 重新给formImport对象赋值
     * @param formImport
     * @param formImportVO
     * @param formId
     */
    private void assignFormImport(TFormImport formImport, FormImportVO formImportVO, String formId) {
        formImport.setFormId(formId);
        formImport.setImportType(formImportVO.getImportType());
        formImport.setFieldSeparator(formImportVO.getSeparator());
        formImport.setTableId(formImportVO.getTableId());
        formImport.setStartRow(formImportVO.getStartRow());
    }

    /**
     * 获取
     * @param formImportId
     * @param formImportVO
     * @return
     */
    private List<TFormImportField> getFormImportFields(String formImportId, FormImportVO formImportVO) {
        List<TFormImportField> fields = new ArrayList<>(formImportVO.getFields().size());
        for(FormImportFieldVO fieldVO : formImportVO.getFields()) {
            TFormImportField field = new TFormImportField();
            field.setColumnIndex(fieldVO.getColumnNum());
            field.setTableFieldId(fieldVO.getTableFieldId());
            field.setFormImportId(formImportId);
            fields.add(field);
        }
        return fields;
    }

    /**
     * 获取导入ID和数据库表名称
     * @param formId 表单ID
     * @return 返回一个数组，第一个字段为表单导入ID；第二个字段为表名称
     */
    private String[] getImportIdAndTableName(String formId) {
        String[] array = null;
        Map<String, Object> param = new HashMap<>(1);
        param.put("formId", formId);
        SmartResponse<Object> response = opServ.getDatas("get_form_import_table_name", param);
        if(OP_SUCCESS.equals(response.getResult())) {
            Object obj = response.getDatas().get(0);
            Object[] objArray = (Object[]) obj;
            array = new String[2];
            array[0] = StringUtils.handleNull(objArray[0]);
            array[1] = StringUtils.handleNull(objArray[1]);
        }
        return array;
    }

    /**
     * 获取关联字段
     * @param formImportId
     * @return
     */
    private List<FormImportFieldRelate> getRelateFields(String formImportId) {
        List<FormImportFieldRelate> relates = new ArrayList<>();
        Map<String, Object> param = new HashMap<>(1);
        param.put("formImportId", formImportId);
        SmartResponse<Object> response = opServ.getDatas("get_form_import_table_fields", param);
        if(OP_SUCCESS.equals(response.getResult())) {
            for(Object obj : response.getDatas()) {
                Object[] objArray = (Object[]) obj;
                FormImportFieldRelate relate = new FormImportFieldRelate();
                relate.setTableFieldId(StringUtils.handleNull(objArray[0]));
                relate.setColumnNum(Integer.parseInt(StringUtils.handleNumNull(objArray[1])));
                relate.setTableFieldName(StringUtils.handleNull(objArray[2]));
                relates.add(relate);
            }
        }
        return relates;
    }

    /**
     * 生成插入语句
     * @param tableName
     * @param relates
     * @return
     */
    private String generateInsertSql(String tableName, List<FormImportFieldRelate> relates) {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("insert into ").append(tableName).append(" (id,");
        StringBuilder valueBuilder = new StringBuilder();
        valueBuilder.append(":id,");
        for(FormImportFieldRelate relate : relates) {
            sqlBuilder.append(relate.getTableFieldName()).append(",");
            valueBuilder.append(":").append(relate.getTableFieldName()).append(",");
        }
        sqlBuilder.append("creator,state,create_time").append(") values (");
        valueBuilder.append(":creator,:state,:createTime");
        sqlBuilder.append(valueBuilder).append(")");
        return sqlBuilder.toString();
    }

    /**
     * 处理插入参数
     * @param userId
     * @param datas
     * @param relates
     * @return
     */
    private List<Map<String, Object>> handleInsertParams(String userId, String[][] datas,
                                                         List<FormImportFieldRelate> relates) {
        List<Map<String, Object>> params = new ArrayList<>(datas.length);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for(String[] data: datas) {
            Map<String, Object> param = new HashMap<>(relates.size() + 2);
            for(FormImportFieldRelate relate : relates) {
                String value = "";
                if(relate.getColumnNum() <= data.length) {
                    value = data[relate.getColumnNum() - 1];
                }
                param.put(relate.getTableFieldName(), value);
            }
            param.put("creator", userId);
            param.put("state", 1);
            param.put("id", StringUtils.createSerialNum());
            param.put("createTime", dateFormat.format(new Date()));
            params.add(param);
        }
        return params;
    }
}
