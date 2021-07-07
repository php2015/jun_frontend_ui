package cn.javabb.api.support;

import java.awt.Color;
import java.awt.Image;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;

import cn.javabb.common.model.ImgResultModel;
import cn.javabb.common.model.ResponseModel;
import cn.javabb.common.util.BUtil;
import cn.javabb.common.util.FileUtils;
import cn.javabb.common.util.ImageUtils;
import cn.javabb.common.util.ListUtils;
import cn.javabb.common.util.UUIDUtil;
import cn.javabb.sys.entity.SysImage;
import cn.javabb.sys.service.SysConfigService;
import cn.javabb.sys.service.SysImageService;
import net.coobird.thumbnailator.Thumbnails;

@Component
public class PictureSupport {
	
	@Autowired
	private SysConfigService sysConfigService;
	
	@Autowired
	private SysImageService sysImageService;
	/**
	 * 素材库上传文件
	 * @author QINB
	 * @param file
	 * @return
	 */
	public ResponseModel uploadPicture(MultipartFile file){
		// 获取文件名
        String fileName = file.getOriginalFilename();
        // 获取文件的后缀名
        String suffixName = FileUtils.getSuffix(fileName);
        if(!FileUtils.isImg(suffixName)){
            return ResponseModel.Failure("上传文件不是常用的图片格式");
        }
        String fileId = UUIDUtil.getUUID();
        // 解决中文问题，liunx下中文路径，图片显示问题
        fileName = fileId + suffixName;
        
        String imgUploadPath = sysConfigService.querySysValueByCode("pictureUploadPath");
        if(BUtil.isNull(imgUploadPath)){
        	return ResponseModel.Failure("无法获取上传路径，配置【pictureUploadPath】");
        }
        if(!imgUploadPath.endsWith("/")){
        	imgUploadPath += File.separator;
        }
        
        File dest = new File(imgUploadPath + fileName);
       
        // 检测是否存在目录
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }
        try {
        	Image src = ImageIO.read(file.getInputStream());
            file.transferTo(dest);
            String imageOutPutQuality = sysConfigService.querySysValueByCode("imageOutPutQuality");
            if(StringUtils.isNotBlank(imageOutPutQuality)){
                //压缩图片质量
                Thumbnails.of(dest)
                .scale(1f)
                .outputQuality(Float.parseFloat(imageOutPutQuality))
                .toFile(dest);
            }
            String md5 = FileUtils.getFileMD5(dest);
            SysImage img = sysImageService.hasImageMd5(md5);
            //如果数据库中有存在该图片就直接查询返回这个图片
            if(img == null){
                //插入数据库
                img = new SysImage();
                img.setId(fileId);
                img.setWidth(src.getWidth(null));
                img.setHeight(src.getHeight(null));
                img.setSize(Double.valueOf(file.getSize()/1024.0));
                img.setImageSrc(imgUploadPath+fileName);
                img.setImageName(fileName);
                img.setImageMd5(md5);
                img.setState(1);
                sysImageService.insertSelective(img);
                
            }
            
            return ResponseModel.Success(img, 0);
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseModel.Failure("上传文件失败");
	}
	/**
	 * 文章图片上传
	 * @author QINB
	 * @param fileList
	 * @return
	 */
	public ImgResultModel uploadPictureWithShuiyin(List<MultipartFile> fileList){
	    ImgResultModel imgModel = new ImgResultModel();
	    List<String> data = new ArrayList<>();
        if(ListUtils.isEmpty(fileList)){
            imgModel.setErrno(1);
            imgModel.setData(data);
            return imgModel;
        }
	    JSONObject imageParam = sysConfigService.querySysConfigMapByType("image");
	    String imgUploadPath = imageParam.getString("pictureUploadPath"); //上传文件路径
        if(!imgUploadPath.endsWith("/")){
            imgUploadPath += File.separator;
        }
	    for(MultipartFile file:fileList){
	     // 获取文件名
	        String fileName = file.getOriginalFilename();
	        // 获取文件的后缀名
	        String suffixName = FileUtils.getSuffix(fileName);
	        String fileId = UUIDUtil.getUUID();
	        // 解决中文问题，liunx下中文路径，图片显示问题
	        fileName = fileId + suffixName;
	        
	        File dest = new File(imgUploadPath + fileName);
	       
	        // 检测是否存在目录
	        if (!dest.getParentFile().exists()) {
	            dest.getParentFile().mkdirs();
	        }
	        try {
	            Image src = ImageIO.read(file.getInputStream());
	            file.transferTo(dest);
	            //是否 开启水印
	            String imageShuiyin = imageParam.getString("imageShuiyin");
                String imageShuiyinText =  imageParam.getString("imageShuiyinText")==null?"":imageParam.getString("imageShuiyinText");
                String imageShuiyinMinWidth =  imageParam.getString("imageShuiyinMinWidth");
                String imageShuiyinMinHeight =  imageParam.getString("imageShuiyinMinHeight");
                String imageOutPutQuality =  imageParam.getString("imageOutPutQuality");
                if("1".equals(imageShuiyin) && (imageShuiyinMinWidth!="" && src.getWidth(null)>Integer.parseInt(imageShuiyinMinWidth))
                    && (imageShuiyinMinHeight!="" && src.getHeight(null)>Integer.parseInt(imageShuiyinMinHeight))){
                    ImageUtils.pressText2(imageShuiyinText, dest,imgUploadPath + fileName, "Georgia", 20, Color.BLACK, 40, 2, 2, 1f);
                }
                if(StringUtils.isNotBlank(imageOutPutQuality)){
                    //压缩图片质量
                    Thumbnails.of(dest)
                    .scale(1f)
                    .outputQuality(Float.parseFloat(imageOutPutQuality))
                    .toFile(dest);
                }
                data.add(fileName);
	            
	        } catch (IllegalStateException e) {
	            e.printStackTrace();
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    }
	    imgModel.setErrno(0);
        imgModel.setData(data);
        return imgModel;
    }
}
