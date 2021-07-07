package com.chensi.generator;

import java.io.File;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 
 * <p>
 * 生成各个bean的service以及action
 * </p>
 * <p>
 * 支持任意级目录扫描,使用时注意配置各个路径
 * </p>
 * 
 * @author Chensi
 * @version V1.0, 2017年8月3日
 * @since 2017年8月3日
 */
public class GenServiceAndController {
	private static final String BEAN_URL = "com.chensi.model";// model基础目录
	private static final String ACTION_URL = "com.chensi.controller";// action基础目录
	private static final String SERVICE_URL = "com.chensi.service";// service基础目录
	// 用于被继承对象的包名
	private static final String BASE_ACTION_URL = "com.chensi.controller";// 被继承action的基础目录
	private static final String BASE_SERVICE_URL = "com.chensi.service";// 被继承service的基础目录
	private static final String IMPL_SERVICE_URL = "com.chensi.service.impl";// 被继承serviceImpl的基础目录

	// 用于被继承对象的类名
	private static final String BASE_ACTION_NAME = "BaseAction";// BaseAction.java
	private static final String BASE_SERVICE_NAME = "ICommonService";
	private static final String IMPL_SERVICE_NAME = "CommonServiceImpl";
	// 公共部分
	private static final String FILTER_NAME = "Fr\\w+\\.java";// 扫描的文件名,正则方式
	private static final boolean PRINT_INFO_FLAG = true;// 打印信息开关
	private static final boolean PRINT_ERROR_FLAG = true;// 打印错误开关
	private static final boolean FORCE_FLAG = false;// 强制生成开关,若为true,即使文件已存在也重新生成
	private static final String RT_1 = "\r\n";// 换行
	private static final String RT_2 = RT_1 + RT_1;// 换两行
	private static final String BLANK_4 = " ";// ≈TAB
	private static final String BLANK_8 = BLANK_4 + BLANK_4;

	private static final String DATE_STRING = new SimpleDateFormat("yyyy年MM月dd日").format(new Date());

	// 注释部分
	private static final String ANNOTATION_AUTHOR_PARAMTER = "@author ";
	private static final String ANNOTATION_AUTHOR_NAME = "Ray";
	private static final String ANNOTATION_AUTHOR = ANNOTATION_AUTHOR_PARAMTER + ANNOTATION_AUTHOR_NAME;
	private static final String ANNOTATION_DATE = "@date ";
	private static final String ANNOTATION = "/**" + RT_1 + " * " + ANNOTATION_AUTHOR + RT_1 + " * " + ANNOTATION_DATE + DATE_STRING + RT_1 + " */" + RT_1;

	public static void main(String[] args) {
		String fileName = System.getProperty("user.dir") + "/src/" + BEAN_URL.replace(".", "/");
		File file = new File(fileName);
		beanScan(file, "", true);
	}

	/**
	 * 
	 * <p>
	 * bean文件扫描
	 * </p>
	 * <p>
	 * 扫描指定目录下的所有java文件,生成对应的service和action,与bean同目录结构
	 * </p>
	 * 
	 * @param file
	 *            需要扫描的文件
	 * @param parentPack
	 *            上级包名:若无传递"",若有使用.开头,如".log"
	 */
	public static void beanScan(File file, String parentPack, boolean isFirst) {
		if (file.exists()) {
			if (file.isDirectory()) {
				File[] fs = file.listFiles();
				for (int i = 0; i < fs.length; i++) {
					File f = fs[i];
					String parent = "";
					if (!isFirst) {
						parent = parentPack + "." + file.getName();
					}
					beanScan(f, parent, false);
				}
			} else if (file.isFile() && file.getName().matches(FILTER_NAME)) {
				try {
					createByBean(file, parentPack);// 创建相关类
				} catch (Exception e) {
					printError(file.getAbsolutePath(), e);
				}
			}
		}
	}

	/**
	 * 
	 * <p>
	 * 创建对应的对象
	 * </p>
	 * <p>
	 * 创建serviceI,serviceImpl,Action
	 * </p>
	 * 
	 * @param f
	 *            被创建的对象
	 * @param parentPack
	 *            上级包名:若无传递"",若有使用.开头,如".log"
	 * @throws Exception
	 */
	public static void createByBean(File f, String parentPack) throws Exception {
		Class c = Class.forName(BEAN_URL + parentPack + "." + f.getName().substring(0, f.getName().indexOf(".")));
		createBeanService(c, parentPack);
		createBeanServiceImpl(c, parentPack);
		createBeanAction(c, parentPack);

	}

	/**
	 * 创建bean的Action类
	 * 
	 * @param c
	 *            需要生成的modelBean
	 * @param parentPack
	 *            上级包名:若无传递"",若有使用.开头,如".log"
	 * @throws Exception
	 */
	public static void createBeanAction(Class c, String parentPack) throws Exception {
		String cName = c.getSimpleName();
		String fileName = System.getProperty("user.dir") + "/src/" + ACTION_URL.replace(".", "/") + parentPack.replace(".", "/") + "/" + cName + "Action.java";
		File f = new File(fileName);
		if (!f.isFile() || FORCE_FLAG) {
			File pf = f.getParentFile();
			if (!pf.isDirectory()) {
				pf.mkdirs();
			}
			StringBuffer sb = new StringBuffer();
			sb.append("package " + ACTION_URL + parentPack + ";" + RT_2);
			sb.append("import " + c.getName() + ";" + RT_1);// 导入实体类
			sb.append("import org.apache.struts2.convention.annotation.Action;" + RT_1);
			sb.append("import org.apache.struts2.convention.annotation.Namespace;" + RT_1);
			sb.append("import org.springframework.beans.factory.annotation.Autowired;" + RT_1);
			sb.append("import " + SERVICE_URL + parentPack + "." + cName + "ServiceI;" + RT_1);// 导入接口
			sb.append("import " + BASE_ACTION_URL + "." + BASE_ACTION_NAME + ";");// 导入BaseAction
			sb.append(RT_2 + ANNOTATION);// 注释
			sb.append(RT_1 + "@Namespace(\"/" + pf.getName() + "\")");
			sb.append(RT_1 + "@Action" + RT_1);
			sb.append("public class " + cName + "Action ");
			sb.append("extends " + BASE_ACTION_NAME + "<" + cName + "> ");
			sb.append("{" + RT_2);
			sb.append(BLANK_4 + "/**");
			sb.append(RT_1 + BLANK_4 + " * 注入业务逻辑，使当前action调用service.xxx的时候，直接是调用基础业务逻辑");
			sb.append(RT_1 + BLANK_4 + " * ");
			sb.append(RT_1 + BLANK_4 + " * 如果想调用自己特有的服务方法时，请使用((TServiceI) service).methodName()这种形式强转类型调用");
			sb.append(RT_1 + BLANK_4 + " * ");
			sb.append(RT_1 + BLANK_4 + " * @param service");
			sb.append(RT_1 + BLANK_4 + " */");
			sb.append(RT_1 + BLANK_4 + "@Autowired");
			sb.append(RT_1 + BLANK_4 + "public void setService(" + cName + "ServiceI service) {");
			sb.append(RT_1 + BLANK_8 + "this.service = service;");
			sb.append(RT_1 + BLANK_4 + "}");
			sb.append(RT_2 + "}");
			FileWriter fw = new FileWriter(f, false);
			fw.write(sb.toString());
			fw.flush();
			fw.close();
			printLog(fileName);
		}
	}

	/**
	 * 创建bean的service
	 * 
	 * @param c
	 *            需要生成的modelBean
	 * @param parentPack
	 *            上级包名:若无传递"",若有使用.开头,如".log"
	 * @throws Exception
	 */
	public static void createBeanService(Class c, String parentPack) throws Exception {
		String cName = c.getSimpleName();
		String fileName = System.getProperty("user.dir") + "/src/" + SERVICE_URL.replace(".", "/") + parentPack.replace(".", "/") + "/" + cName
				+ "ServiceI.java";
		File f = new File(fileName);
		if (!f.isFile() || FORCE_FLAG) {
			File pf = f.getParentFile();
			if (!pf.isDirectory()) {
				pf.mkdirs();
			}
			StringBuffer sb = new StringBuffer();
			sb.append("package " + SERVICE_URL + parentPack + ";" + RT_2);
			sb.append("import " + c.getName() + ";" + RT_1);// 导入实体类
			sb.append("import " + BASE_SERVICE_URL + "." + BASE_SERVICE_NAME + ";");// 导入接口
			sb.append(RT_2 + ANNOTATION);
			sb.append("public interface " + cName + "ServiceI ");
			sb.append("extends " + BASE_SERVICE_NAME + "<" + cName + "> ");
			sb.append("{" + RT_2 + "}");
			FileWriter fw = new FileWriter(f, false);
			fw.write(sb.toString());
			fw.flush();
			fw.close();
			printLog(fileName);
		}
	}

	/**
	 * 创建bean的service的实现类
	 * 
	 * @param c
	 *            需要生成的modelBean
	 * @param parentPack
	 *            上级包名:若无传递"",若有使用.开头,如".log"
	 * @throws Exception
	 */
	public static void createBeanServiceImpl(Class c, String parentPack) throws Exception {
		String cName = c.getSimpleName();
		String fileName = System.getProperty("user.dir") + "/src/" + SERVICE_URL.replace(".", "/") + parentPack.replace(".", "/") + "/impl/" + cName
				+ "ServiceImpl.java";
		File f = new File(fileName);
		if (!f.isFile() || FORCE_FLAG) {
			File pf = f.getParentFile();
			if (!pf.isDirectory()) {
				pf.mkdirs();
			}
			StringBuffer sb = new StringBuffer();
			sb.append("package " + SERVICE_URL + parentPack + ".impl;" + RT_2);
			sb.append("import org.springframework.stereotype.Service;" + RT_1);
			sb.append("import " + c.getName() + ";" + RT_1);// 导入实体类
			sb.append("import " + IMPL_SERVICE_URL + "." + IMPL_SERVICE_NAME + ";" + RT_1);// 导入父impl
			sb.append("import " + SERVICE_URL + parentPack + "." + cName + "ServiceI;");// 导入接口
			sb.append(RT_2 + ANNOTATION);
			sb.append(RT_1 + "@Service" + RT_1);
			sb.append("public class " + cName + "ServiceImpl ");
			sb.append("extends " + IMPL_SERVICE_NAME + "<" + cName + "> ");
			sb.append("implements " + cName + "ServiceI");
			sb.append("{" + RT_2 + "}");
			FileWriter fw = new FileWriter(f, false);
			fw.write(sb.toString());
			fw.flush();
			fw.close();
			printLog(fileName);
		}

	}

	public static void printLog(String info) {
		if (PRINT_INFO_FLAG) {
			System.out.println("generate file：" + info + " success！");
		}
	}

	public static void printError(String info, Exception e) {
		if (PRINT_ERROR_FLAG) {
			System.err.println("generate file：" + info + " error！Exception:" + e.getMessage());
			e.printStackTrace();
		}
	}
}
