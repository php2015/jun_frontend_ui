package com.yitong.fasdmain.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yitong.fasdmain.service.FileStorageService;
import com.yitong.fasdmain.util.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.converter.ResourceHttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

@Controller
public class FileManageController {


    @Autowired
    FileStorageService fileStorageService;


    RequestMappingHandlerMapping requestMappingHandlerMapping;




    @GetMapping("/**")
    public void getfile(
            HttpServletRequest request,
            HttpServletResponse response,
            ResourceHttpMessageConverter resourceHttpMessageConverter
    ) throws IOException, ServletException {
        fileStorageService.getfile(request,response,resourceHttpMessageConverter);
    }


    /**
     * 上传文件
     * @param request
     * @throws IOException
     */
    @PostMapping("/**")
    @ResponseBody
    public R postfile(
            MultipartFile file,
            HttpServletRequest request
    ) throws UnsupportedEncodingException {

        fileStorageService.postfile(file,request);
        return R.ok();
    }
    @Autowired
    ObjectMapper objectMapper;
    /**
     * 删除文件
     */
    @DeleteMapping(value = "/**",produces=MediaType.ALL_VALUE)
    public void deletefile(HttpServletRequest request,HttpServletResponse response
    ) throws IOException {

        fileStorageService.deletefile(request);
        response.setCharacterEncoding("utf-8");
        response.setContentType("application/json; charset=utf-8");
        PrintWriter writer = response.getWriter();
        writer.write("{\"msg\":\"success\",\"code\":200}");

    }

    /**
     * 分片记载
     */
    @PutMapping("/**")
    @ResponseBody
    public R checkMd5(
            HttpServletRequest request,
            Integer k,
            @RequestParam("fileName") String fileName,
            @RequestParam("fileMd5") String fileMd5, //文件唯一标记
            String chunk, //当前分块下标
            String chunkSize//当前分块大小
    ) {
        if(k==3){
            fileStorageService.combineBlock(request,fileMd5,fileName  );
            return R.ok();
        }
        Integer integer = fileStorageService.checkMd5(fileName, fileMd5, chunk, chunkSize );
        return R.ok().put( "ifExist", integer);
    }
    /**
     * 保存分片
     */
    @PatchMapping("/**")
    @ResponseBody
    public R uploadMD5(
            @RequestParam MultipartFile file,
            Integer chunk,
            String fileMd5
    ) {

        fileStorageService.uploadMD5(file, fileMd5, chunk );
        return R.ok();
    }

}
