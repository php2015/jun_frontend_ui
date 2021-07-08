package com.yitong.fasdmain.service;

import com.yitong.fasdmain.Exception.ErrorException;
import com.yitong.fasdmain.config.BaseUrlLinkBuilder;
import com.yitong.fasdmain.config.FasdOssConfig;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.converter.ResourceHttpMessageConverter;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLDecoder;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
@Slf4j
@Service
public class FileStorageService extends ResourceHttpRequestHandler {
    @Autowired
    ResourceLoader resourceLoader;

    @Autowired
    private FasdOssConfig fasdOssConfig;

    TemplateEngine templateEngine;

    BaseUrlLinkBuilder baseUrlLinkBuilder;

    public FileStorageService() {
    }

    @Autowired
    public FileStorageService(TemplateEngine templateEngine, BaseUrlLinkBuilder baseUrlLinkBuilder) {
        this.templateEngine = templateEngine;
        this.baseUrlLinkBuilder = baseUrlLinkBuilder;
        this.templateEngine.setLinkBuilder( this.baseUrlLinkBuilder );
    }

    public void getfile(
            HttpServletRequest request,
            HttpServletResponse response,
            ResourceHttpMessageConverter resourceHttpMessageConverter
    ) throws IOException, ServletException {

        String requestURI = URLDecoder.decode(request.getRequestURI(),"UTF-8");


        String[] split = requestURI.substring( 1, requestURI.length() ).split( "\\/" );
        List <Href> hrefs = new ArrayList <Href>();
        String hre = "";
        Context context = new Context();
        context.setVariable( "epath",requestURI );
        context.setVariable( "ebasepath",baseUrlLinkBuilder.getBaseUrl());

        for (int i = 0; i < split.length; i++) {
            if (split[i] == "") continue;
            Href href = new Href();
            hre = hre + "/" + split[i];
            href.setHref( hre );
            href.setName( split[i] );
            hrefs.add( href );
        }
        context.setVariable( "eParent",hrefs.size()>=2?hrefs.get( hrefs.size()-2 ).getHref(): baseUrlLinkBuilder.getBaseUrl());
        String attribute = fasdOssConfig.getFilehome() + requestURI;
            File file = new File( attribute );
        Resource resource;
        if(requestURI.matches( ".*/assets/.*" )){
            boolean matches = requestURI.matches( "^" + baseUrlLinkBuilder.getBaseUrl() + "/assets/.*" );
            if(matches){
                resource=resourceLoader.getResource( "classpath:/static" + requestURI.substring(baseUrlLinkBuilder.getBaseUrl().length() ,requestURI.length() ) );
            }else{
                resource=resourceLoader.getResource( "classpath:/static" + requestURI );
            }
            ServletServerHttpResponse outputMessage = new ServletServerHttpResponse( response );
            MediaType mediaType = getMediaType( request, resource );
            resourceHttpMessageConverter.write( resource, mediaType, outputMessage );
            return;
        }else {
            resource=resourceLoader.getResource( "file:" + attribute );
        }
        if (!resource.getFile().exists()||resource.getFile().isDirectory()) {

            response.setCharacterEncoding( "utf-8" );
            response.setContentType( "text/html; charset=utf-8" );
            PrintWriter writer = response.getWriter();
            //放入数据
            context.setVariable( "fileaddr", hrefs );
            context.setVariable( "file", file );
            templateEngine.process( "index", context, writer );
        } else {
            ServletServerHttpResponse outputMessage = new ServletServerHttpResponse( response );
            MediaType mediaType = getMediaType( request, resource );
            resourceHttpMessageConverter.write( resource, mediaType, outputMessage );
        }
    }

    /**
     * 删除文件
     * @param request
     */
    public void deletefile(HttpServletRequest request) {
        String requestURI = null;
        try {
            requestURI = URLDecoder.decode(request.getRequestURI(),"UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        String attribute = fasdOssConfig.getFilehome() + requestURI;
        File file = new File( attribute );
        delFile(file);
    }
    static boolean delFile(File file) {
        if (!file.exists()) {
            return false;
        }

        if (file.isFile()) {
            return file.delete();
        } else {
            File[] files = file.listFiles();
            for (File f : files) {
                delFile(f);
            }
            return file.delete();
        }
    }

    /**
     *  检查上传文件
     * @param fileName
     * @param fileMd5
     * @param chunk
     * @param chunkSize
     */
    public Integer checkMd5(String fileName, String fileMd5, String chunk, String chunkSize) {
        //分片上传路径
        String tempPath = fasdOssConfig.getFilehome() + File.separator + "temp";
        File checkFile = new File(tempPath + File.separator + fileMd5 + File.separator + chunk);
        if (checkFile.exists() && checkFile.length() == Integer.parseInt(chunkSize)) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * 保存单边
     * @param file
     * @param fileMd5
     * @param chunk
     * @return
     */
    public void uploadMD5(MultipartFile file, String fileMd5, Integer chunk) {
        String filePath = fasdOssConfig.getFilehome() + File.separator + "temp" + File.separator + fileMd5;
        File tempfile = new File(filePath);
        if (!tempfile.exists()) {
            tempfile.mkdirs();
        }
        RandomAccessFile raFile = null;
        BufferedInputStream inputStream = null;
        if (chunk == null) {
            chunk = 0;
        }
        try {
            File dirFile = new File(filePath, String.valueOf(chunk));
            //以读写的方式打开目标文件
            raFile = new RandomAccessFile(dirFile, "rw");
            raFile.seek(raFile.length());
            inputStream = new BufferedInputStream(file.getInputStream());
            byte[] buf = new byte[1024];
            int length = 0;
            while ((length = inputStream.read(buf)) != -1) {
                raFile.write(buf, 0, length);
            }
        } catch (Exception e) {
            throw new ErrorException(e.getMessage());
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (raFile != null) {
                try {
                    raFile.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }

    /**
     * 合并分片
     * @param request
     * @param guid
     * @param fileName
     */
    public void combineBlock(HttpServletRequest request, String guid, String fileName) {
        //分片文件临时目录
        File tempPath = new File(fasdOssConfig.getFilehome()  + File.separator + "temp" + File.separator + guid);
        //真实上传路径
        String requestURI = null;
        try {
            requestURI = URLDecoder.decode(request.getRequestURI(),"UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        File realPath = new File(fasdOssConfig.getFilehome()  + requestURI);
        if (!realPath.exists()) {
            realPath.mkdirs();
        }
        File realFile = new File(fasdOssConfig.getFilehome()  + requestURI+File.separatorChar+fileName);
        FileOutputStream os = null;// 文件追加写入
        FileChannel fcin = null;
        FileChannel fcout = null;
        try {
            log.info("合并文件——开始 [ 文件名称：" + fileName + " ，MD5值：" + guid + " ]");
            os = new FileOutputStream(realFile, true);
            fcout = os.getChannel();
            if (tempPath.exists()) {
                //获取临时目录下的所有文件
                File[] tempFiles = tempPath.listFiles();
                //按名称排序
                Arrays.sort(tempFiles, (o1, o2) -> {
                    if (Integer.parseInt(o1.getName()) < Integer.parseInt(o2.getName())) {
                        return -1;
                    }
                    if (Integer.parseInt(o1.getName()) == Integer.parseInt(o2.getName())) {
                        return 0;
                    }
                    return 1;
                });
                //每次读取10MB大小，字节读取
                //byte[] byt = new byte[10 * 1024 * 1024];
                //int len;
                //设置缓冲区为10MB
                ByteBuffer buffer = ByteBuffer.allocate(10 * 1024 * 1024);
                for (int i = 0; i < tempFiles.length; i++) {
                    FileInputStream fis = new FileInputStream(tempFiles[i]);
                    /*while ((len = fis.read(byt)) != -1) {
                        os.write(byt, 0, len);
                    }*/
                    fcin = fis.getChannel();
                    if (fcin.read(buffer) != -1) {
                        buffer.flip();
                        while (buffer.hasRemaining()) {
                            fcout.write(buffer);
                        }
                    }
                    buffer.clear();
                    fis.close();
                    //删除分片
                    tempFiles[i].delete();
                }
                os.close();
                //删除临时目录
                if (tempPath.isDirectory() && tempPath.exists()) {
                    System.gc(); // 回收资源
                    tempPath.delete();
                }
                log.info("文件合并——结束 [ 文件名称：" + fileName + " ，MD5值：" + guid + " ]");
            }
        } catch (Exception e) {
            log.error("文件合并——失败 " + e.getMessage());
        }finally {
            delFile( tempPath );
            System.gc();
        }
    }


    @Setter
    @Getter
    static class Href {
        private String name;
        private String href;
    }



    protected MediaType getMediaType(HttpServletRequest request, Resource resource) {
        MediaType result = null;
        String mimeType = request.getServletContext().getMimeType( resource.getFilename() );
        if (StringUtils.hasText( mimeType )) {
            result = MediaType.parseMediaType( mimeType );
        }
        if (result == null || MediaType.APPLICATION_OCTET_STREAM.equals( result )) {
            MediaType mediaType = null;
            String filename = resource.getFilename();
            String ext = StringUtils.getFilenameExtension( filename );
            if (mediaType == null) {
                mediaType = MediaTypeFactory.getMediaType( filename ).orElse( null );
            }
            if (mediaType != null) {
                result = mediaType;
            }
        }
        return result;
    }

    /**
     * 存储文件
     *
     * @param file
     * @param request
     */
    public void postfile(MultipartFile file, HttpServletRequest request) throws UnsupportedEncodingException {

        String requestURI = URLDecoder.decode(request.getRequestURI(),"UTF-8");
        String filehome = fasdOssConfig.getFilehome();
        String s = filehome + requestURI;


        if (file != null) {
            s = s + "/"+file.getResource().getFilename();
        }
        File dest = new File( s );

        if (file == null) {
            //新建文件夹
            // 如果该文件的上级文件夹不存在，则创建该文件的上级文件夹及其祖辈级文件夹;
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            } else {
                dest.mkdir();
            }
            return;
        } else {
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();

            }

            //创建索引

            // 将获取到的附件file,transferTo写入到指定的位置(即:创建dest时，指定的路径)
            try {

                FileCopyUtils.copy(file.getBytes(),dest);
            } catch (IOException e) {
                throw new ErrorException( -1, e.getMessage() );
            }
        }


    }

}
