package com.chensi.util;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * 文件工具类
 * @author chensi
 * @version 2016-6-27 上午11:19:59
 */
public class FileUtil {
	/**
	 * 目录是否为空
	 * @param file 目录
	 * @return 是否为空，当提供非目录时，返回false
	 */
	public static boolean isEmpty(File file) {
		if (null == file) {
			return true;
		}

		if (file.isDirectory()) {
			String[] subFiles = file.list();
			if (subFiles == null || subFiles.length <= 0) {
				return true;
			}
		}

		return false;
	}

	/**
	 * 递归遍历目录以及子目录中的所有文件
	 * @param file 当前遍历文件
	 * @param fileFilter 文件过滤规则对象(文件名包含xx)
	 */
	public static List<File> loopFiles(File file, String[] pathFilter) {
		List<File> fileList = new ArrayList<File>();
		if (file == null) {
			return fileList;
		} else if (file.exists() == false) {
			return fileList;
		}

		if (file.isDirectory()) {
			for (File tmp : file.listFiles()) {
				fileList.addAll(loopFiles(tmp, pathFilter));
			}
		} else {
			if (pathFilter != null) {
				boolean flag = false;
				for (String s : pathFilter) {
					if (file.getAbsolutePath().contains(s)) {
						flag = true;
					}
				}
				if (!flag)
					fileList.add(file);
			} else {
				fileList.add(file);
			}
		}

		return fileList;
	}

	/**
	 * 递归遍历目录以及子目录中的所有文件
	 * @param file 当前遍历文件
	 */
	public static List<File> loopFiles(File file) {
		return loopFiles(file, null);
	}

	/**
	 * 判断文件是否存在，如果file为null，则返回false
	 * @param file 文件
	 * @return 如果存在返回true
	 */
	public static boolean exist(File file) {
		return (file == null) ? false : file.exists();
	}

}
