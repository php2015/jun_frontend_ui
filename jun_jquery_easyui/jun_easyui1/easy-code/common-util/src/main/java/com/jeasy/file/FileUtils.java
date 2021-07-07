package com.jeasy.file;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

import com.jeasy.io.StreamUtils;

import lombok.extern.slf4j.Slf4j;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
@Slf4j
public final class FileUtils {

	private FileUtils() {
	}
	/**
	 * 将网络上的图片保存在本地
	 *
	 * @param httpUrl  图片地址
	 * @param fileName 保存路径和名称
	 * @throws Exception
	 */
	public static void saveAs(String httpUrl, String fileName) throws Exception {
		// new一个URL对象
		URL url = new URL(httpUrl);
		// 打开链接
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		// 设置请求方式为"GET"
		conn.setRequestMethod("GET");
		// 超时响应时间为5秒
		conn.setConnectTimeout(5 * 1000);
		// 通过输入流获取图片数据
		InputStream inStream = conn.getInputStream();
		// 得到图片的二进制数据，以二进制封装得到数据，具有通用性
		byte[] data = readInputStream(inStream);
		// new一个文件对象用来保存图片，默认保存当前工程根目录
		File imageFile = new File(fileName);
		// 创建输出流
		FileOutputStream outStream = new FileOutputStream(imageFile);
		// 写入数据
		outStream.write(data);
		// 关闭输出流
		outStream.close();
	}

	public static byte[] readInputStream(InputStream inStream) throws Exception {
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		// 创建一个Buffer字符串
		byte[] buffer = new byte[1024];
		// 每次读取的字符串长度，如果为-1，代表全部读取完毕
		int len = 0;
		// 使用一个输入流从buffer里把数据读取出来
		while ((len = inStream.read(buffer)) != -1) {
			// 用输出流往buffer里写入数据，中间参数代表从哪个位置开始读，len代表读取的长度
			outStream.write(buffer, 0, len);
		}
		// 关闭输入流
		inStream.close();
		// 把outStream里的数据写入内存
		return outStream.toByteArray();
	}

	/**
	 * 文件路径是否存在，不存在就创建，然会是否成功
	 *
	 * @param path
	 * @return
	 */
	public static Boolean validatePath(String path) {
		Boolean ret = false;
		File file = new File(path);

		if (!file.exists()) {
			ret = file.mkdirs();
		}

		return ret;
	}

	public static void writeFile(String path, boolean append, String content) {
		File myFilePath = new File(path);
		try {


			if (!myFilePath.exists()) {
				myFilePath.createNewFile();
			}
			FileWriter resultFile = new FileWriter(myFilePath, append);
			PrintWriter myFile = new PrintWriter(resultFile);
			myFile.println(content);
			resultFile.close();
		} catch (Exception e) {
			log.error("error exception", e);
		}
	}

	public static List<String> readFileAsList(String path) throws IOException {
		List<String> ls = new ArrayList<>();
		InputStream in = new FileInputStream(path);
		BufferedReader reader = new BufferedReader(new InputStreamReader(in, "UTF-8"));
		String line;
		while ((line = reader.readLine()) != null) {
			line = line.trim();
			if (line == null || "".equals(line)) {
				continue;
			}
			ls.add(line);
		}
		reader.close();
		return ls;
	}

	public static Set<String> readFileAsSet(String path) throws IOException {
		Set<String> set = new HashSet<>();
		InputStream in = new FileInputStream(path);
		BufferedReader reader = new BufferedReader(new InputStreamReader(in, "UTF-8"));
		String line;
		while ((line = reader.readLine()) != null) {
			line = line.trim();
			if (line == null || "".equals(line)) {
				continue;
			}
			if (!set.contains(line)) {
				set.add(line);
			}
		}
		reader.close();
		return set;
	}

	public static String readFileAsString(String path) throws IOException {
		StringBuffer sb = new StringBuffer();
		InputStream in = new FileInputStream(path);
		BufferedReader reader = new BufferedReader(new InputStreamReader(in, "UTF-8"));
		String line;
		while ((line = reader.readLine()) != null) {
			line = line.trim();
			if (line == null || "".equals(line)) {
				continue;
			}
			sb.append(line);
		}
		reader.close();
		return sb.toString();
	}


	public static String readFileAsString(File file) throws IOException {
		StringBuffer sb = new StringBuffer();
		InputStream in = new FileInputStream(file);
		BufferedReader reader = new BufferedReader(new InputStreamReader(in, "UTF-8"));
		String line = "";
		while ((line = reader.readLine()) != null) {
			line = line.trim();
			if (line == null || "".equals(line)) {
				continue;
			}
			sb.append(line);
		}
		reader.close();
		return sb.toString();
	}

	public static String readInputStreamAsString(InputStream is) throws IOException {
		StringBuffer sb = new StringBuffer();
		BufferedReader reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
		String line = "";
		while ((line = reader.readLine()) != null) {
			line = line.trim();
			if (line == null || "".equals(line)) {
				continue;
			}
			sb.append(line);
		}
		reader.close();
		return sb.toString();
	}

	public static String[] readFileAsArray(String path) throws IOException {
		String[] result = new String[]{};
		InputStream in = new FileInputStream(path);
		BufferedReader reader = new BufferedReader(new InputStreamReader(in, "UTF-8"));
		String line = "";
		int i = 0;
		while ((line = reader.readLine()) != null) {
			line = line.trim();
			if (line == null || "".equals(line)) {
				continue;
			}
			result[i] = line;
		}
		reader.close();
		return result;
	}

	public static List<String> readFileAsList(String path, String encode) throws IOException {
		List<String> ls = new ArrayList<String>();
		InputStream in = new FileInputStream(path);
		BufferedReader reader = new BufferedReader(new InputStreamReader(in, encode));
		String line = "";
		while ((line = reader.readLine()) != null) {
			line = line.trim();
			if (line == null || "".equals(line)) {
				continue;
			}
			ls.add(line);
		}
		reader.close();
		return ls;
	}

	public static String readFileByCharAsString(String path, String encode) throws IOException {

		InputStream in = new FileInputStream(path);
		BufferedReader reader = new BufferedReader(new InputStreamReader(in, encode));
		StringBuffer contentbuffer = new StringBuffer();
		char[] temp = new char[1024];
		int size = 0;
		while ((size = reader.read(temp, 0, 1024)) != -1) {
			String tempstr = new String(temp, 0, size);
			contentbuffer.append(tempstr);
		}

		String content = contentbuffer.toString();
		reader.close();
		return content;
	}

	public static boolean InputStreamToFile(InputStream in, String pathname) {
		try {
			File f = new File(pathname);
			OutputStream out = org.apache.commons.io.FileUtils.openOutputStream(f);
			byte buf[] = new byte[1024];
			int len;
			while ((len = in.read(buf)) > 0) {
				out.write(buf, 0, len);
			}
			out.close();
			in.close();
			return true;
		} catch (IOException e) {
			log.error("", e);
		}
		return false;
	}

	public static boolean byteArrayToFile(byte[] in, String pathname) {
		if (null == in || in.length <= 0) return false;

		InputStream stream = new ByteArrayInputStream(in);
		return InputStreamToFile(stream, pathname);
	}

	public static void writeFile(String path, String name, boolean append, String content) {

		File myFilePath = new File(path + "\\" + name);
		try {

			// Create multiple directories
			boolean success = (new File(path)).mkdirs();
			if (success) {
				System.out.println("Directories: " + path + " created");
			}

			if (!myFilePath.exists()) {
				myFilePath.createNewFile();
			}


			FileWriter resultFile = new FileWriter(myFilePath, append);
			PrintWriter myFile = new PrintWriter(resultFile);
			myFile.println(content);
			resultFile.close();
		} catch (Exception e) {
			System.out.println("新建文件操作出错");
			log.error("error exception", e);
		}


	}

	/**
	 * 将Url保存到本地
	 *
	 * @param imageUrl
	 * @param destinationFile
	 * @throws java.io.IOException
	 */
	public static void saveImage(String imageUrl, String destinationFile) throws IOException {
		URL url = new URL(imageUrl);
		InputStream is = url.openStream();
		OutputStream os = new FileOutputStream(destinationFile);

		byte[] b = new byte[2048];
		int length;

		while ((length = is.read(b)) != -1) {
			os.write(b, 0, length);
		}

		is.close();
		os.close();
	}

	/**
	 * 获取文件后缀
	 *
	 * @param filename
	 * @return
	 */
	public static String getSuffix(String filename) {
		String suffix = "";
		int pos = filename.lastIndexOf('.');
		if (pos > 0 && pos < filename.length() - 1) {
			suffix = filename.substring(pos + 1);
		}
		return suffix;
	}

	/**创建文件夹
	 * @param s
	 * @param overMode 是否覆盖
	 * @return
	 */
	public static File createDir(String s,boolean overMode) {
		File f=new File(s);
		if (overMode) {
			delDirs(f);
		}
		if (!f.exists()) {
			f.mkdirs();
		}
		return f;
	}
	/**覆盖性创建文件夹
	 * @param root
	 * @param filename
	 * @return
	 * @throws java.io.IOException
	 */
	public static File createDir(File root,String filename) throws IOException {
		return createDir(root, filename, true);
	}
	/**创建文件夹
	 * @param root
	 * @param filename
	 * @return
	 * @throws java.io.IOException
	 */
	public static File createDir(File root,String filename,boolean overMode) throws IOException {
		return createDir(new File(root,filename).getAbsolutePath(),overMode);
	}
	/** 覆盖性创建文件
	 * @param
	 * @return
	 * @throws java.io.IOException
	 */
	public static File createFile(File dir ,String fname ) throws IOException {
		return createFile(dir, fname, true);
	}
	/** 创建文件
	 * @param
	 * @return
	 * @throws java.io.IOException
	 */
	public static File createFile(File dir ,String fname,boolean overMode) throws IOException {
		return createFile(new File(dir,fname),overMode);
	}
	/**覆盖性创建文件
	 * @param f
	 * @param
	 * @return
	 * @throws java.io.IOException
	 */
	public static File createFile(File f ) throws IOException {
		return createFile(f,true);
	}
	/**创建文件
	 * @param f
	 * @param overMode 是否覆盖
	 * @return
	 * @throws java.io.IOException
	 */
	public static File createFile(File f,boolean overMode) throws IOException {
		if(overMode) {
			f.delete();
		}
		if (!f.exists()) {
			f.createNewFile();
		}
		return f;
	}
	/**写入内容
	 * @param s
	 * @param f
	 * @param encode
	 * @throws java.io.IOException
	 */
	public static void writeTo(String s,File f,String encode) throws IOException {
		StreamUtils.writeTo(s, new FileOutputStream(f), encode);
	}
	/**
	 * 读取文件的内容，并将文件内容以字符串的形式返回。
	 *
	 * @param fileName
	 * @return
	 * @throws java.io.IOException
	 * @throws java.io.FileNotFoundException
	 * @throws java.io.IOException
	 */
	public static String readFile(String fileName, String encode) throws IOException  {
		File file = new File(fileName);
		return readFile(file, encode);
	}
	public static String readFile( File file, String encode)
			throws FileNotFoundException, IOException {
		if (!file.exists()) {
			log.error("目标文件不存在");
			return "";
		}
		if (!file.isFile()) {
			log.error("目标是一个文件夹");
			return "";
		}
		FileInputStream input = new FileInputStream(file);
		StringBuffer context = StreamUtils.getContext(input, encode);
		return context.toString();
	}

	/**删除文件夹 包括内容
	 * @param f
	 */
	public static void delDirs(File f) {
		if (f.exists()) {
			if (f.isFile()) {
				f.delete();
			}else {
				File sz[]=f.listFiles();
				if (sz.length<1) {
					f.delete();
				}else {
					for (File file : sz) {
						delDirs(file);
					}
					f.delete();
				}
			}
		}
	}
	/**重写内容
	 * @param s
	 * @param f
	 * @param encode
	 * @throws java.io.IOException
	 */
	public static void reWriteTo(String s,File f,String encode) throws IOException {
		writeTo(s, createFile(f,true),encode);
	}


	/** 拷贝文件夹
	 * @param src
	 * @param targetDir
	 * @throws java.io.IOException
	 */
	public static void copyDirectiory(File src, String targetDir) throws IOException {
		// 新建目标目录
		createDir(targetDir, false);
		// 获取源文件夹当前下的文件或目录
		File[] file = src.listFiles();
		for (int i = 0; i < file.length; i++) {
			if (file[i].isFile()) {
				// 源文件
				File sourceFile=file[i];
				// 目标文件
				File targetFile=new File(new File(targetDir).getAbsolutePath()+
						File.separator+file[i].getName());
				copyFile(sourceFile,targetFile);
			}
			if (file[i].isDirectory()) {
				String dir1=src.getAbsolutePath() + "/" + file[i].getName();
				// 准备复制的目标文件夹
				String dir2=targetDir + "/"+ file[i].getName();
				copyDirectiory(new File(dir1), dir2);
			}
		}
	}


	/**拷贝文件
	 * @param sourceFile
	 * @param targetFile
	 * @throws java.io.IOException
	 */
	public static void copyFile(File sourceFile,File targetFile) throws IOException{
		// 新建文件输入流并对它进行缓冲
		FileInputStream input = new FileInputStream(sourceFile);
		FileOutputStream output = new FileOutputStream(targetFile);
		StreamUtils.streamCopy(input, output,null);
	}

	/**读取Properties文件
	 * @return
	 * @throws java.io.IOException
	 */
	public static Properties GetProperties(String filename) {
		InputStream in = null;
		Properties props = new Properties();
		try {
			File initfile = seachFile(filename);
			if(initfile.exists()){
				in = new FileInputStream(initfile);
			}else {
				in=FileUtils.class.getClassLoader().getResourceAsStream(filename);
				if(in==null){

					in = new FileInputStream(initfile);
				}
			}
			props.load(in);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			log.info(filename+"文件不存在");
		} catch (IOException e) {
			e.printStackTrace();
			log.info("属性文件读写时候出错");
		}
		return props;
	}
	/**获取项目中的某个文件目录
	 * @param filename
	 * @return
	 */
	public static File seachFile(String filename) {
		File initfile = new File(filename);
		if (!initfile.exists()) {
			String path = FileUtils.class.getResource("/").getFile().substring(1)+filename;
			initfile = new File(path);
		}
		return initfile;
	}
	/**获取文件名后缀
	 * @param filename
	 * @return
	 */
	public static String getExt(String filename){
		String[] s = filename.split("\\.");
		String ext = "";
		if (s.length>1) {
			ext=s[s.length-1];
		}
		return ext;
	}
	/**检查文件后缀名是否符合
	 * @param name
	 * @param suffix
	 * @return
	 */
	public static boolean checkSuffix(String name,String suffix){
		return null!=name?name.endsWith(suffix):false;

	}
	/**根据后缀结尾过滤出所有的子文件列表
	 * @param dir
	 * @param suffix
	 * @return
	 */
	public static List<File> listAllFiles(File dir,final String suffix){
		final ArrayList<File> li=new ArrayList<File>();
		if (!dir.exists()) {
			return null;
		}else {
			if (dir.isDirectory()) {

				File[] fl = dir.listFiles();
				for (File f : fl) {
					if (f.isFile()) {
						if (checkSuffix(f.getName(), suffix)) {
							li.add(f);
						}
					}else {
						li.addAll(listAllFiles(f, suffix));
					}
				}

			}else {
				if (checkSuffix(dir.getName(), suffix)) {
					li.add(dir);
				}
			}
			return li;
		}

	}
}
