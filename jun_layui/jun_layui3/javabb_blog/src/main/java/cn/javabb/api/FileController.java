package cn.javabb.api;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import cn.javabb.common.base.BaseController;
import cn.javabb.common.model.ImgResultModel;
import cn.javabb.common.model.R;
import cn.javabb.common.model.ResponseModel;
import cn.javabb.common.util.FileUtils;
import cn.javabb.sys.service.SysImageService;
@Controller
@RequestMapping("/api/file")
public class FileController extends BaseController{

	@Value("${bms.uploadPath}")
	private String uploadPath;
	//图片上传路径
	@Value("${bms.imgUploadPath}")
	private String imgUploadPath;
	
	/**
	 * Description: 
	 * 文件上传  
	 * @author QINB
	 * @param file
	 * @return
	 */
	@ResponseBody
	@PostMapping("/upload")
	public Object upload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return "文件为空";
        }
        // 获取文件名
        String fileName = file.getOriginalFilename();
        // 获取文件的后缀名
        String suffixName = FileUtils.getSuffix(fileName);
        // 解决中文问题，liunx下中文路径，图片显示问题
        // fileName = UUID.randomUUID() + suffixName;
        File dest = new File(uploadPath + fileName);

        // 检测是否存在目录
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }
        try {
            file.transferTo(dest);
            return new R(0,"上传成功",dest.getName());
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return R.error();
    }
	/**
	 * 图片上传
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
        // 获取文件名
        String fileName = file.getOriginalFilename();
        // 获取文件的后缀名
        String suffixName = FileUtils.getSuffix(fileName);
        if(!FileUtils.isImg(suffixName)){
            return ResponseModel.Failure("上传文件不是常用的图片格式");
        }
        fileName = FileUtils.renameToUUID(fileName);//用uuid重命名
        // 解决中文问题，liunx下中文路径，图片显示问题
        // fileName = UUID.randomUUID() + suffixName;
        File dest = new File(imgUploadPath + fileName);

        // 检测是否存在目录
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }
        try {
            file.transferTo(dest);
            return ResponseModel.Success(fileName, 0);
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseModel.Failure("上传文件失败");
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
	    ImgResultModel imgModel = new ImgResultModel();
	    List<String> data = new ArrayList<>();
	    if(list.size()==0){
	        imgModel.setErrno(1);
	        imgModel.setData(data);
	        return imgModel;
	    }
	    
	    for (MultipartFile file : list) {
	        if(file != null){
	         // 获取文件名
	            String fileName = file.getOriginalFilename();
	           fileName = FileUtils.renameToUUID(fileName);
	            String path = imgUploadPath+fileName;
	            File newFile = new File(path);
	            // 检测是否存在目录
	            if (!newFile.getParentFile().exists()) {
	                newFile.getParentFile().mkdirs();
	            }
	            try {
                    file.transferTo(newFile);
                    data.add(fileName);
                }
                catch (IllegalStateException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
                catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
	        }
	    }
	    imgModel.setErrno(0);
	    imgModel.setData(data);
	    return imgModel;
	}
}
