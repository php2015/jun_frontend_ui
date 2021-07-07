package com.ckeditor.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.util.Streams;

public class FileUploadUtil {

	public void upload(HttpServletRequest request, HttpServletResponse response) {
		InputStream stream = null;
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;
		String fullLocalPath = "";
		try {
			ServletFileUpload upload = new ServletFileUpload();
			FileItemIterator iter = upload.getItemIterator(request);
			while (iter.hasNext()) {
				FileItemStream item = (FileItemStream) iter.next();
				stream = item.openStream();
				if (!item.isFormField()) {
					if (item.getName() != null
							&& !item.getName().trim().equals("")) {
						@SuppressWarnings("unused")
						String upLoadName = item.getName();
						// 上传在服务器上的文件路径,此处在使用过程中应该用日期和随机数组成文件名，以防止文件名一致被覆盖
						fullLocalPath = "d:/picTemp/" + "teste.jpg";
						bis = new BufferedInputStream(stream);
						bos = new BufferedOutputStream(new FileOutputStream(
								fullLocalPath));
						Streams.copy(bis, bos, true);

					}

				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			String errorMsg = "对不起，文件上传失败！" + e.toString();
			request.setAttribute("PicInfoUpload.error", errorMsg);
		} finally {
			if (stream != null) {
				try {
					stream.close();
				} catch (IOException e) {
					stream = null;
				}
			}
			if (bis != null) {
				try {
					bis.close();
				} catch (IOException e) {
					bis = null;
				}
			}
			if (bos != null) {
				try {
					bos.close();
				} catch (IOException e) {
					bos = null;
				}
			}
		}
	}
}
