package mybatis_gen;

import java.io.File;

import java.util.ArrayList;
import java.util.List;

import org.mybatis.generator.api.MyBatisGenerator;
import org.mybatis.generator.config.Configuration;
import org.mybatis.generator.config.xml.ConfigurationParser;
import org.mybatis.generator.exception.InvalidConfigurationException;
import org.mybatis.generator.internal.DefaultShellCallback;


public class JavaGen {

	/**
	 * 生成mybatis代码
	 * @param args
	 * @throws InvalidConfigurationException 
	 */
	public static void main(String[] args) throws Exception {
		   List<String> warnings = new ArrayList<String>();
		   boolean overwrite = true;
		   File configFile = new File("D://workspace//myeclipse10//study//test//gen//mybatis_gen//genConfig.xml");
		   ConfigurationParser cp = new ConfigurationParser(warnings);
		   Configuration config = cp.parseConfiguration(configFile);
		   DefaultShellCallback callback = new DefaultShellCallback(overwrite);
		   MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
		   myBatisGenerator.generate(null);
           
		
		// 运行命令行
		// Process process= Runtime.getRuntime().exec("java -jar D:/workspace/myeclipse10/study/jblog/gen/mybatis_gen/mybatis-generator-core-1.3.0.jar -configfile D:/workspace/myeclipse10/study/jblog/gen/mybatis_gen/genConfig.xml -overwrite");
		 
	}

}
