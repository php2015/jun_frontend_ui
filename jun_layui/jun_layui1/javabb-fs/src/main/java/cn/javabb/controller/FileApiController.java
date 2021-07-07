package cn.javabb.controller;

import cn.javabb.config.ConfigProperties;
import cn.javabb.model.FileUploadPath;
import cn.javabb.response.FileResponse;
import cn.javabb.response.FileUploadResponse;
import cn.javabb.service.FileService;
import cn.javabb.uploader.FileUploader;
import cn.javabb.uploader.GlobalFileShower;
import cn.javabb.uploader.GlobalFileUploader;
import cn.javabb.util.FileUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 文件服务器
 */
@Slf4j
@Controller
public class FileApiController {
    @Autowired
    protected HttpServletRequest request;
    @Autowired
    ConfigProperties configProperties;
    Boolean useNginx,useSm;
    String rootPath,nginxUrl,serverUrl;
    // 首页
    @GetMapping({"/", "/index"})
    public String index() {
        return "index.html";
    }

    @Autowired
    FileService fileService;

    /**
     * 上传文件
     */
    @ResponseBody
    @PostMapping("/file/upload")
    public Object upload(@RequestParam MultipartFile file){
        //String storageType = request.getParameter("storageType")==null?"local":request.getParameter("storageType");
        String uploadType = request.getParameter("uploadType");
        uploadType = StringUtils.isEmpty(uploadType)||"/".equals(uploadType)? FileUploadPath.COMMEN.getPath():request.getParameter("uploadType");
        uploadType = uploadType.startsWith("/")?uploadType.substring(1):uploadType;
        configProperties.setUploadType(uploadType);
        FileUploader uploader = new GlobalFileUploader(configProperties);
        FileUploadResponse response = uploader.upload(file, configProperties.getUploadType());
        return response;
    }

    public void init(){
        String uploadType = FileUploadPath.COMMEN.getPath();
        this.useNginx = configProperties.getUseNginx()==null?false:configProperties.getUseNginx();
        this.useSm = configProperties.getUseSm()==null?true:false;
        this.nginxUrl = configProperties.getNginxUrl();
        this.serverUrl = configProperties.getServerUrl();
        this.rootPath = configProperties.getRootPath();
    }
    /**
     * 查看原文件
     */
    @GetMapping("/file/{type}/{file:.+}")
    public String file(@PathVariable("type") String type,@PathVariable("file") String filename, HttpServletResponse response) {
        String filePath = type+"/"+ filename;
        this.init();
        if (useNginx) {
            return redirectNginxFile(filePath,nginxUrl);
        }
        outputFile(this.rootPath + filePath, response);
        return null;
    }

    /**
     * 查看缩略图
     */
    @GetMapping("/file/sm/{type}/{file:.+}")
    public String fileSm(@PathVariable("type") String type, @PathVariable("file") String filename, HttpServletResponse response) {
        String filePath = "sm/"+ type +"/"+ filename;
        if (useNginx) {
            return redirectNginxFile(filePath,nginxUrl);
        }
        outputFile(rootPath + filePath, response);
        return null;
    }

    private String redirectNginxFile(String filePath,String nginxUrl){
        if (nginxUrl == null) {
            nginxUrl = "/";
        }
        if (!nginxUrl.endsWith("/")) {
            nginxUrl += "/";
        }
        String newName;
        try {
            newName = URLEncoder.encode(filePath, "utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            newName = filePath;
        }
        return "redirect:" + nginxUrl + newName;
    }
    // 输出文件流
    private void outputFile(String file, HttpServletResponse response) {
        // 判断文件是否存在
        File inFile = new File(file);
        if (!inFile.exists()) {
            PrintWriter writer = null;
            try {
                response.setContentType("text/html;charset=UTF-8");
                writer = response.getWriter();
                writer.write("<!doctype html><title>404 Not Found</title><h1 style=\"text-align: center\">404 Not Found</h1><hr/><p style=\"text-align: center\">Javabb File Server</p>");
                writer.flush();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return;
        }
        // 获取文件类型
        String contentType = null;
        try {
            // Path path = Paths.get(inFile.getName());
            // contentType = Files.probeContentType(path);
            contentType = new Tika().detect(inFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (contentType != null) {
            response.setContentType(contentType);
        } else {
            response.setContentType("application/force-download");
            String newName;
            try {
                newName = URLEncoder.encode(inFile.getName(), "utf-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
                newName = inFile.getName();
            }
            response.setHeader("Content-Disposition", "attachment;fileName=" + newName);
        }
        // 输出文件流
        OutputStream os = null;
        FileInputStream is = null;
        try {
            is = new FileInputStream(inFile);
            os = response.getOutputStream();
            byte[] bytes = new byte[1024];
            int len;
            while ((len = is.read(bytes)) != -1) {
                os.write(bytes, 0, len);
            }
            os.flush();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                is.close();
                os.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 获取全部文件
     */
    @ResponseBody
    @RequestMapping("/api/list")
    public Object list(String dir, String accept, String exts) {
        this.init();
        FileUploader uploader = new GlobalFileUploader(configProperties);
        FileResponse response = uploader.listFiles(dir,accept,exts, FileUploadPath.COMMEN.getPath());
        return response;
    }
    @ResponseBody
    @RequestMapping("/file/newFolder")
    public Object newFolder(String folderName){
        if(folderName !=null && folderName !=""){
            folderName = configProperties.getRootPath().endsWith("/")?configProperties.getRootPath()+folderName:configProperties.getRootPath()+"/"+folderName;
            System.out.println(folderName);
            FileUtil.mkdir(folderName);
            return new FileResponse(200,"新建成功").setData(folderName);
        }
        return new FileResponse(500,"创建文件夹失败");
    }
    @ResponseBody
    @RequestMapping("/file/show")
    public Object show(String folderName){
        GlobalFileShower fileShower = new GlobalFileShower(configProperties);
        FileResponse response = fileShower.show(FileUploadPath.COMMEN.getPath());
        return response;
    }
    /**
     * 删除
     */
    @ResponseBody
    @RequestMapping("/file/del")
    public Object del(String file) {
        //configProperties.setStorageType("local");
        String uploadType = request.getParameter("uploadType");
        uploadType = StringUtils.isEmpty(uploadType)||"/".equals(uploadType)? FileUploadPath.COMMEN.getPath():request.getParameter("uploadType");
        uploadType = uploadType.startsWith("/")?uploadType.substring(1):uploadType;

        configProperties.setUploadType(uploadType);
        if (file != null && !file.isEmpty()) {
            FileUploader uploader = new GlobalFileUploader(configProperties);
            if(uploader.removeFile(file)){
                return new FileResponse(200,"删除成功");
            }
        }
        return new FileResponse(500,"删除失败");
    }

    // 获取当前日期
    private String getDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd/");
        return sdf.format(new Date());
    }
}
