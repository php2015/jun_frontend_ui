package com.jeasy.file;

import java.io.File;
import java.net.URL;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
public final class UploadUtils {

	private UploadUtils() {
	}

	private static final Log log = LogFactory.getLog(UploadUtils.class);

	public static final String DEFAULT_UPLOAD_DIR_PREFIX = "/data/temp/";

	/**
	 * 上传文件至目标路径
	 *
	 * @param srcFile
	 * @param destDir
	 * @return
	 */
	public boolean upload(File srcFile, String destDir) {
		if (!srcFile.exists()) {
			log.warn("srcFile must exist!!");
			return false;
		}

		if (StringUtils.isBlank(destDir)) {
			log.warn("destDir must not be null!!");
			return false;
		}

		File destFile = new File(destDir);
		try {
			FileUtils.copyFile(srcFile, destFile);
		} catch (Exception ex) {
			log.warn("copy file occurs exception", ex);
			return false;
		}


		return true;
	}

	/**
	 * 上传文件至目标路径
	 *
	 * @param srcUrl
	 * @param destDir
	 * @return
	 */
	public boolean upload(URL srcUrl, String destDir) {
		if (srcUrl == null) {
			log.warn("srcUrl must not be null!!");
			return false;
		}

		if (StringUtils.isBlank(destDir)) {
			log.warn("destDir must not be null!!");
			return false;
		}

		File destFile = new File(destDir);
		try {
			FileUtils.copyURLToFile(srcUrl, destFile);
		} catch (Exception ex) {
			log.warn("copy file occurs exception", ex);
			return false;
		}
		return true;
	}

	/**
	 * 上传文件
	 *
	 * @param srcFile 源文件
	 * @return 上传成功后，返回文件的保存路径
	 */
	public String upload(File srcFile) {
		boolean result = upload(srcFile, getFileName(srcFile));
		if (!result) {
			return "";
		}
		return getFileName(srcFile);
	}

	/**
	 * 上传文件
	 *
	 * @param srcUrl 源文件的url
	 * @return 上传成功，返回文件的保存路径，上传失败，返回空串
	 */
	public String upload(URL srcUrl) {
		boolean result = upload(srcUrl, getFileName(srcUrl));
		if (!result) {
			return "";
		}
		return getFileName(srcUrl);
	}

	private String getFileName(File file) {
		return getFileName(file.getAbsolutePath());
	}

	private String getFileName(URL url) {
		return getFileName(url.getPath());
	}

	private String getFileName(String filePath) {
		int index = StringUtils.lastIndexOf(filePath, "/");
		if (index > -1) {
			return DEFAULT_UPLOAD_DIR_PREFIX + StringUtils.substring(filePath, index + 1);
		}
		return DEFAULT_UPLOAD_DIR_PREFIX + filePath;
	}
}
