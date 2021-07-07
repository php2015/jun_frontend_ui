package cn.com.smart.form.controller;

import cn.com.smart.bean.SmartResponse;
import cn.com.smart.form.bean.entity.TFormImport;
import cn.com.smart.form.bean.entity.TFormImportField;
import cn.com.smart.form.service.FormImportFieldService;
import cn.com.smart.form.service.FormImportService;
import cn.com.smart.web.bean.UserInfo;
import com.mixsmart.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * @author lmq
 * @version 1.0
 * @since 1.0
 */
@Controller
@RequestMapping("/form/import")
public class FormImportController extends BaseFormController {

    private final String VIEW_DIR = BASE_FORM_VIEW_DIR+"import/";

    @Autowired
    private FormImportService formImportServ;
    @Autowired
    private FormImportFieldService formImportFieldServ;

    @RequestMapping("/config")
    public ModelAndView config(String formId) {
        ModelAndView modelView = new ModelAndView();
        ModelMap modelMap = modelView.getModelMap();
        int rowsCount = 1;
        if(StringUtils.isNotEmpty(formId)) {
            Map<String, Object> param = new HashMap<>(1);
            param.put("formId", formId);
            SmartResponse<TFormImport> response = formImportServ.findByParam(param);
            if(OP_SUCCESS.equals(response.getResult())) {

                TFormImport formImport = response.getDatas().get(0);
                modelMap.put("objBean", formImport);
                param.clear();
                param.put("formImportId", formImport.getId());
                SmartResponse<TFormImportField> queryResp = formImportFieldServ.findByParam(param);
                if(OP_SUCCESS.equals(queryResp.getResult())) {
                    modelMap.put("fields", queryResp.getDatas());
                    rowsCount = queryResp.getDatas().size();
                }
            }
        }
        modelMap.put("rowsCount", rowsCount);
        modelView.setViewName(VIEW_DIR+"config");
        return modelView;
    }

    /**
     * 上传导入文件
     * @param importFile
     * @param formId
     * @param request
     * @return
     */
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @ResponseBody
    public SmartResponse<String> upload(@RequestParam MultipartFile importFile, String formId, HttpServletRequest request) {
        SmartResponse<String> smartResp = new SmartResponse<>();
        smartResp.setMsg("导入失败");
        UserInfo userInfo = super.getUserInfoFromSession(request);
        if(StringUtils.isEmpty(formId)) {
            return smartResp;
        }
        if(null != importFile && importFile.getSize() > 0) {
            try {
                smartResp = formImportServ.executeImport(importFile.getInputStream(), formId, userInfo.getId());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return smartResp;
    }
}
