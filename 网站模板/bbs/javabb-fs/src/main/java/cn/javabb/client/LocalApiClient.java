package cn.javabb.client;

import cn.javabb.exception.FileException;
import cn.javabb.exception.FileUploadException;
import cn.javabb.model.FileModel;
import cn.javabb.model.FileUploadPath;
import cn.javabb.response.FileResponse;
import cn.javabb.response.FileUploadResponse;
import cn.javabb.util.FileUtil;
import cn.javabb.util.StreamUtil;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.apache.tika.Tika;
import org.springframework.util.DigestUtils;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

/**
 * @author yadong.zhang (yadong.zhang0415(a)gmail.com)
 * @modify javabb
 * @version 1.0
 * @website https://www.zhyd.me
 * @date 2019/2/11 15:06
 * @since 1.8
 */
@Slf4j
public class LocalApiClient extends BaseApiClient {

    private String url;
    private String rootPath;
    private String pathPrefix;
    private Boolean useSm; //是否生成缩略图
    private Boolean useNginx; //是否开启Nginx
    private String nginxUrl; // nginx的地址
    private String serverUrl; // 服务器地址，默认admin的地址
    private String uploadType;


    public LocalApiClient() {
        super("本地服务器");
    }

    public LocalApiClient init(String url,
                               Boolean useSm,String serverUrl,Boolean useNginx,String nginxUrl,
                               String rootPath,String uploadType) {
        this.url = url;
        this.nginxUrl = nginxUrl;
        this.serverUrl = serverUrl;
        this.useSm = useSm==null?true:useSm;
        this.useNginx = useNginx==null?false:useNginx;
        this.rootPath = StringUtils.isEmpty(rootPath)? "/" : rootPath.endsWith("/")?rootPath:rootPath+"/";
        this.uploadType = StringUtils.isEmpty(uploadType)||"/".equals(uploadType)? FileUploadPath.COMMEN.getPath() : uploadType.endsWith("/")?uploadType:uploadType+"/";
        this.pathPrefix = rootPath+uploadType;
        return this;
    }


    public String generateSmFile(String fileUrl){
        // 这个文件一定要是存在的
        File file = new File(fileUrl);
        // 获取文件类型
        String contentType = null;
        try {
            // 下面的方法如果在linux，获取为空 所以改成了 new Tika().detect(file);
            // contentType = Files.probeContentType(Paths.get(outFile.getName()));
            contentType = new Tika().detect(file);
            if (contentType != null && contentType.startsWith("image/")) {
                File smImg = new File(rootPath + "sm/" + newFileName);
                if (!smImg.getParentFile().exists()) {
                    smImg.getParentFile().mkdirs();
                }
                // 压缩图片,如果是gif图片，无法使用Thumbnails压缩
                if ("image/gif".equals(contentType)) {
                    FileUtil.copy(file,smImg,true);
                }else{
                    Thumbnails.of(file).scale(1f).outputQuality(0.25f).toFile(smImg);
                }

                return "sm/"+newFileName;
            }
        } catch (IOException e) {
            throw new FileUploadException("[" + this.storageType + "]文件缩略图生成失败：" + e.getMessage() + fileUrl);
        }
        return null;
    }
    @Override
    public FileUploadResponse upload(InputStream is,String fileUrl){
        this.check();
        // 生成 temp.png
        String key = FileUtil.generateTempFileName(fileUrl);
        this.createNewFileName(key,uploadType);
        Date startTime = new Date();
        String realFilePath = this.rootPath + this.newFileName;
        FileUtil.checkFilePath(realFilePath);
        FileUploadResponse response = new FileUploadResponse();
        try (InputStream uploadIs = StreamUtil.clone(is);
             InputStream fileHashIs = StreamUtil.clone(is);
             FileOutputStream fos = new FileOutputStream(realFilePath)) {
            FileCopyUtils.copy(uploadIs, fos);
            if(useSm != null && useSm){
                response.setSmUrl(generateSmFile(realFilePath));
            }
            return response
                    .setCode(200)
                    .setUploadType(uploadType)
                    .setOriginalFileName(FileUtil.getName(key))
                    .setUploadStartTime(startTime)
                    .setUploadEndTime(new Date())
                    .setFilePath(this.newFileName) //带前缀
                    .setFileHash(DigestUtils.md5DigestAsHex(fileHashIs))
                    .setFullFilePath(this.url + this.newFileName);
        } catch (Exception e) {
            throw new FileUploadException("[" + this.storageType + "]文件上传失败：" + e.getMessage() + fileUrl);
        } finally {
            if (is != null) {
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     * 删除本地文件，包括缩略图
     * @param key
     * @return
     */
    @Override
    public boolean removeFile(String key) {
        this.check();
        if (StringUtils.isEmpty(key)) {
            throw new FileException("[" + this.storageType + "]删除文件失败：文件key为空");
        }
        File file = new File(this.rootPath + key);
        if (!file.exists()) {
            throw new FileException("[" + this.storageType + "]删除文件失败：文件不存在[" + this.rootPath + key + "]");
        }
        try {
            if(file.delete()){
                // 删除缩略图
                if(useSm != null && useSm){
                    File smFile = new File(this.rootPath+"sm/"+key);
                    if (smFile.exists()) {
                        smFile.delete();
                    }
                }

            }
            return true;
        } catch (Exception e) {
            throw new FileException("[" + this.storageType + "]删除文件失败：" + e.getMessage());
        }
    }

    @Override
    public void check() {
        if((useNginx != null || useNginx) && StringUtils.isEmpty(nginxUrl)){
            useNginx =false;
            log.warn("[{}]尚未配置Nginx文件服务器或者配置错误");
        }
        if (StringUtils.isEmpty(url) || StringUtils.isEmpty(rootPath)) {
            throw new FileUploadException("[" + this.storageType + "]服务地址配置错误，文件上传功能暂时不可用！");
        }
    }

    @Override
    public FileResponse listFiles(String dir, String accept, String exts) {
        String[] mExts = null;
        if (exts != null && !exts.trim().isEmpty()) {
            mExts = exts.split(",");
        }
        Map<String, Object> rs = new HashMap<>();
        // 如果是根目录，就直接展示rootPath下的文件
        if (dir == null || "/".equals(dir)) {
            dir = "";
        } else if (dir.startsWith("/")) {
            dir = dir.substring(1);
        }
        File file = new File(rootPath + dir);
        File[] listFiles = file.listFiles();
        List<FileModel> dataList = new ArrayList<>();
        FileResponse response = new FileResponse();
        if (listFiles != null) {
            // 遍历文件夹下的文件
            for (File f : listFiles) {
                //排除缩略图显示
                if ("sm".equals(f.getName())) {
                    continue;
                }
                FileModel fileModel = new FileModel();
                fileModel.setName(f.getName());
                fileModel.setUpdateTime(f.lastModified());
                fileModel.setDir(f.isDirectory());
                if (f.isDirectory()) {
                    fileModel.setType("dir");
                } else {
                    String type = FileUtil.getFileType(f); // 获取文件类型
                    fileModel.setType(type);
                    fileModel.setFilePath(dir+f.getName()); // 文件地址
                    fileModel.setUrl(this.serverUrl+"file/"+dir+f.getName()); //带域名的完整地址
                    // 获取文件类型
                    String contentType = FileUtil.getContentType(f);
                    // 筛选文件类型
                    if (accept != null && !accept.trim().isEmpty() && !accept.equals("file")) {
                        if (contentType == null || !contentType.startsWith(accept + "/")) {
                            continue;
                        }
                        if (mExts != null) {
                            for (String ext : mExts) {
                                if (!f.getName().endsWith("." + ext)) {
                                    continue;
                                }
                            }
                        }
                    }
                    // 是否有缩略图
                    String smUrl = "sm/" + dir + f.getName();
                    if (new File(rootPath + smUrl).exists()) {
                        fileModel.setHasSm(true);
                        fileModel.setSmUrl(this.serverUrl+"file/"+smUrl); // 缩略图地址
                    }
                }
                dataList.add(fileModel);
            }
        }
        // 根据上传时间排序
        Collections.sort(dataList, new Comparator<FileModel>() {
            public int compare(FileModel m1, FileModel m2) {
                Long l1 = m1.getUpdateTime();
                Long l2 = m2.getUpdateTime();
                return l1.compareTo(l2);
            }
        });
        // 把文件夹排在前面
        Collections.sort(dataList, new Comparator<FileModel>() {
            public int compare(FileModel m1, FileModel m2) {
                Boolean l1 = m1.isDir();
                Boolean l2 = m2.isDir();
                return l2.compareTo(l1);
            }
        });
        response.setData(dataList);
        response.setMsg("查询成功");
        response.setCode(200);
        return response;
    }
}
