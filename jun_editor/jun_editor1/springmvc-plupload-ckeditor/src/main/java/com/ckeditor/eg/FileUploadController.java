package com.ckeditor.eg;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class FileUploadController {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger
			.getLogger(FileUploadController.class);

	/**
	 * 图片上传
	 * 
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("upload.do")
	public String imgUpload(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam(value = "upload", required = false) MultipartFile file)
			throws IOException {
		logger.info(123);
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		// CKEditor提交的很重要的一个参数
		String callback = request.getParameter("CKEditorFuncNum");
		@SuppressWarnings("unused")
		String expandedName = ""; // 文件扩展名
		String uploadContentType = file.getContentType();
		logger.info(uploadContentType);
		if (uploadContentType.equals("image/jpeg")
				|| uploadContentType.equals("image/jpeg")) {
			// IE6上传jpg图片的headimageContentType是image/pjpeg，而IE9以及火狐上传的jpg图片是image/jpeg
			expandedName = ".jpg";
		} else if (uploadContentType.equals("image/png")
				|| uploadContentType.equals("image/x-png")) {
			// IE6上传的png图片的headimageContentType是"image/x-png"
			expandedName = ".png";
		} else if (uploadContentType.equals("image/gif")) {
			expandedName = ".gif";
		} else if (uploadContentType.equals("image/bmp")) {
			expandedName = ".bmp";
		} else {
			out.println("<script type=\"text/javascript\">");
			out.println("window.parent.CKEDITOR.tools.callFunction(" + callback
					+ ",''," + "'文件格式不正确（必须为.jpg/.gif/.bmp/.png文件）');");
			out.println("</script>");
			return null;
		}
		if (file.getSize() > 1024 * 1024 * 2) {
			out.println("<script type=\"text/javascript\">");
			out.println("window.parent.CKEDITOR.tools.callFunction(" + callback
					+ ",''," + "'文件大小不得大于2m');");
			out.println("</script>");
			return null;
		}

		String path = request.getSession().getServletContext().getRealPath("/img/uploadImg");  
        String fileName = file.getOriginalFilename();  
        //        String fileName = new Date().getTime()+".jpg";  
        System.out.println(path);  
        File targetFile = new File(path, fileName);  
        if(!targetFile.exists()){  
            targetFile.mkdirs();  
        }  
  
        //保存  
        try {  
            file.transferTo(targetFile);  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
		
		// 返回"图像"选项卡并显示图片 request.getContextPath()为web项目名
		out.println("<script type=\"text/javascript\">");
		out.println("window.parent.CKEDITOR.tools.callFunction(" + callback
				+ ",'" + request.getContextPath() + "/img/uploadImg/"
				+ fileName + "','')");
		out.println("</script>");
		return null;
	}

}