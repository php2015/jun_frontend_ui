package cn.javabb.api;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import cn.javabb.api.support.PictureSupport;
import cn.javabb.common.base.BaseController;
import cn.javabb.common.model.ImgResultModel;
import cn.javabb.common.model.ResponseModel;
import cn.javabb.common.util.BUtil;
import cn.javabb.common.util.FileUtils;
import cn.javabb.sys.service.SysConfigService;

@Controller
@RequestMapping("/api/picture")
public class PictureApiController extends BaseController{

	
	
	private static String PICTURE_UPLOAD_PATH = "";
	
	@Autowired
	SysConfigService sysConfigService;
	@Autowired
	PictureSupport pictureSupport;
	
	/**
	 * 素材库图片上传,会上传到数据库去
	 * Description: 
	 *  
	 * @author QINB
	 * @param file
	 * @return
	 */
	@ResponseBody
    @PostMapping("/imgUpload")
    public Object uploadImg(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseModel.Failure("上传文件为空");
        }
        ResponseModel responseModel = pictureSupport.uploadPicture(file);
        return responseModel;
    }
	
	/**
     * 
     * Description: 
     *  wangEditor编辑器图片上传,支持批量上传
     * @author QINB
     * @param list
     * @return
     */
    @ResponseBody
    @PostMapping("/wangEditorImgUpload")
    public ImgResultModel wangEditorImgUpload(@RequestParam("img") List<MultipartFile> list){
            return pictureSupport.uploadPictureWithShuiyin(list);
    }
}
