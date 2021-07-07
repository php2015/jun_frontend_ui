package com.baidu.ueditor.utils;

public class PathUtils {
	private PathUtils() {
	}

	public static String format(String path) {
		while (true) {
			if (path.contains("\\")) {
				path = path.replace("\\", "/");
			} else {
				break;
			}
		}
		return path;
	}
}
