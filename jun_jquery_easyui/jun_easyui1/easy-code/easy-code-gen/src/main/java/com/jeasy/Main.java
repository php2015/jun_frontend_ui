package com.jeasy;

import java.io.File;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.common.collect.Maps;
import com.jeasy.conf.Config;
import com.jeasy.db.DBInfo;
import com.jeasy.db.TableInfo;
import com.jeasy.util.StringExUtils;
import com.jeasy.util.TemplateUtils;

import lombok.extern.slf4j.Slf4j;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/10/20 15:44
 */
@Slf4j
public class Main {

	public static void main(String [] args) throws ParseException {

		Config conf = new Config();
		DBInfo dbInfo = DBInfo.getInstance(conf);
		String targetJavaPath = conf.getTargetPath() + "/src/main/java" + File.separator + StringExUtils.replace(conf.getBasePackage(), ".", File.separator);
		String targetResourcesPath = conf.getTargetPath() + "/src/main/resources";

//		genCodeForMvc(conf, dbInfo, targetJavaPath, targetResourcesPath);
//		genCodeForRose(conf, dbInfo, targetJavaPath, targetResourcesPath);
		genCodeForJfinal(conf, dbInfo, targetJavaPath, targetResourcesPath);
	}

	private static void genCodeForMvc(Config conf, DBInfo dbInfo, String targetJavaPath, String targetResourcesPath) {
		for (TableInfo table : dbInfo.getTables()) {
			Map<String, Object> model = Maps.newHashMap();
			model.put("table", table);
			model.put("conf", conf);

			// Model
			String targetPath = targetJavaPath + File.separator + table.getCamelName() + File.separator + "model";
			String targetName = table.getClassName() + ".java";
			TemplateUtils.executeFreemarker(conf.getTemplatePath(), "Model.ftl", "UTF-8", model, targetPath, targetName);
			log.info("Generate Model : " + table.getName() + " ==> " + table.getClassName() + " success");
			System.out.println("Generate Model : " + table.getName() + " ==> " + table.getClassName() + " success");

			// DAO
			targetPath = targetJavaPath + File.separator + table.getCamelName() + File.separator + "dao";
			targetName = table.getClassName() + "DAO.java";
			TemplateUtils.executeFreemarker(conf.getTemplatePath(), "Dao.ftl", "UTF-8", model, targetPath, targetName);
			log.info("Generate DAO : " + table.getName() + " ==> " + table.getClassName() + "DAO success");
			System.out.println("Generate DAO : " + table.getName() + " ==> " + table.getClassName() + "DAO success");

			// Mapper
			targetPath = targetResourcesPath + "/sqlMapper";
			targetName = table.getClassName() + "Mapper.xml";
			TemplateUtils.executeFreemarker(conf.getTemplatePath(), "Mapper.ftl", "UTF-8", model, targetPath, targetName);
			log.info("Generate Mapper : " + table.getName() + " ==> " + table.getClassName() + "Mapper success");
			System.out.println("Generate Mapper : " + table.getName() + " ==> " + table.getClassName() + "Mapper success");

			// Service
			targetPath = targetJavaPath + File.separator + table.getCamelName() + File.separator + "service";
			targetName = table.getClassName() + "Service.java";
			TemplateUtils.executeFreemarker(conf.getTemplatePath(), "Service.ftl", "UTF-8", model, targetPath, targetName);
			log.info("Generate Service : " + table.getName() + " ==> " + table.getClassName() + "Service success");
			System.out.println("Generate Service : " + table.getName() + " ==> " + table.getClassName() + "Service success");

			// ServiceImpl
			targetPath = targetJavaPath + File.separator + table.getCamelName() + File.separator + "service" + File.separator + "impl";
			targetName = table.getClassName() + "ServiceImpl.java";
			TemplateUtils.executeFreemarker(conf.getTemplatePath(), "ServiceImpl.ftl", "UTF-8", model, targetPath, targetName);
			log.info("Generate ServiceImpl : " + table.getName() + " ==> " + table.getClassName() + "ServiceImpl success");
			System.out.println("Generate ServiceImpl : " + table.getName() + " ==> " + table.getClassName() + "ServiceImpl success");

			// Controller
			targetPath = targetJavaPath + File.separator + table.getCamelName() + File.separator + "controller";
			targetName = table.getClassName() + "Controller.java";
			TemplateUtils.executeFreemarker(conf.getTemplatePath(), "Controller.ftl", "UTF-8", model, targetPath, targetName);
			log.info("Generate Controller : " + table.getName() + " ==> " + table.getClassName() + "Controller success");
			System.out.println("Generate Controller : " + table.getName() + " ==> " + table.getClassName() + "Controller success");
		}
	}

	private static void genCodeForRose(Config conf, DBInfo dbInfo, String targetJavaPath, String targetResourcesPath) {
		for (TableInfo table : dbInfo.getTables()) {
			Map<String, Object> model = Maps.newHashMap();
			model.put("table", table);
			model.put("conf", conf);

			// Model
			String targetPath = targetJavaPath + File.separator + table.getCamelName() + File.separator + "model";
			String targetName = table.getClassName() + ".java";
			TemplateUtils.executeFreemarker(conf.getTemplatePath(), "Model.ftl", "UTF-8", model, targetPath, targetName);
			log.info("Generate Model : " + table.getName() + " ==> " + table.getClassName() + " success");
			System.out.println("Generate Model : " + table.getName() + " ==> " + table.getClassName() + " success");

			// DAO
			targetPath = targetJavaPath + File.separator + table.getCamelName() + File.separator + "dao";
			targetName = table.getClassName() + "DAO.java";
			TemplateUtils.executeFreemarker(conf.getTemplatePath(), "Dao.ftl", "UTF-8", model, targetPath, targetName);
			log.info("Generate DAO : " + table.getName() + " ==> " + table.getClassName() + "DAO success");
			System.out.println("Generate DAO : " + table.getName() + " ==> " + table.getClassName() + "DAO success");

			// Service
			targetPath = targetJavaPath + File.separator + table.getCamelName() + File.separator + "service";
			targetName = table.getClassName() + "Service.java";
			TemplateUtils.executeFreemarker(conf.getTemplatePath(), "Service.ftl", "UTF-8", model, targetPath, targetName);
			log.info("Generate Service : " + table.getName() + " ==> " + table.getClassName() + "Service success");
			System.out.println("Generate Service : " + table.getName() + " ==> " + table.getClassName() + "Service success");

			// ServiceImpl
			targetPath = targetJavaPath + File.separator + table.getCamelName() + File.separator + "service" + File.separator + "impl";
			targetName = table.getClassName() + "ServiceImpl.java";
			TemplateUtils.executeFreemarker(conf.getTemplatePath(), "ServiceImpl.ftl", "UTF-8", model, targetPath, targetName);
			log.info("Generate ServiceImpl : " + table.getName() + " ==> " + table.getClassName() + "ServiceImpl success");
			System.out.println("Generate ServiceImpl : " + table.getName() + " ==> " + table.getClassName() + "ServiceImpl success");

			// Controller
			targetPath = targetJavaPath + File.separator + table.getCamelName() + File.separator + "controllers";
			targetName = table.getClassName() + "Controller.java";
			TemplateUtils.executeFreemarker(conf.getTemplatePath(), "Controller.ftl", "UTF-8", model, targetPath, targetName);
			log.info("Generate Controller : " + table.getName() + " ==> " + table.getClassName() + "Controller success");
			System.out.println("Generate Controller : " + table.getName() + " ==> " + table.getClassName() + "Controller success");
		}
	}

	private static void genCodeForJfinal(Config conf, DBInfo dbInfo, String targetJavaPath, String targetResourcesPath) {
		List<String> routeList = new ArrayList<>();
		List<String> routePackageList = new ArrayList<>();

		List<String> modelList = new ArrayList<>();
		List<String> modelPackageList = new ArrayList<>();

		for (TableInfo table : dbInfo.getTables()) {
			Map<String, Object> model = Maps.newHashMap();
			model.put("table", table);
			model.put("conf", conf);

			// Model
			String targetPath = targetJavaPath + File.separator + table.getCamelName() + File.separator + "model";
			String targetName = table.getClassName() + ".java";
			TemplateUtils.executeFreemarker(conf.getTemplatePath(), "Model.ftl", "UTF-8", model, targetPath, targetName);
			log.info("Generate Model : " + table.getName() + " ==> " + table.getClassName() + " success");
			System.out.println("Generate Model : " + table.getName() + " ==> " + table.getClassName() + " success");

			// DAO
			targetPath = targetJavaPath + File.separator + table.getCamelName() + File.separator + "dao";
			targetName = table.getClassName() + "DAO.java";
			TemplateUtils.executeFreemarker(conf.getTemplatePath(), "Dao.ftl", "UTF-8", model, targetPath, targetName);
			log.info("Generate DAO : " + table.getName() + " ==> " + table.getClassName() + "DAO success");
			System.out.println("Generate DAO : " + table.getName() + " ==> " + table.getClassName() + "DAO success");

			// Service
			targetPath = targetJavaPath + File.separator + table.getCamelName() + File.separator + "service";
			targetName = table.getClassName() + "Service.java";
			TemplateUtils.executeFreemarker(conf.getTemplatePath(), "Service.ftl", "UTF-8", model, targetPath, targetName);
			log.info("Generate Service : " + table.getName() + " ==> " + table.getClassName() + "Service success");
			System.out.println("Generate Service : " + table.getName() + " ==> " + table.getClassName() + "Service success");

			// ServiceImpl
			targetPath = targetJavaPath + File.separator + table.getCamelName() + File.separator + "service" + File.separator + "impl";
			targetName = table.getClassName() + "ServiceImpl.java";
			TemplateUtils.executeFreemarker(conf.getTemplatePath(), "ServiceImpl.ftl", "UTF-8", model, targetPath, targetName);
			log.info("Generate ServiceImpl : " + table.getName() + " ==> " + table.getClassName() + "ServiceImpl success");
			System.out.println("Generate ServiceImpl : " + table.getName() + " ==> " + table.getClassName() + "ServiceImpl success");

			// Controller
			targetPath = targetJavaPath + File.separator + table.getCamelName() + File.separator + "controller";
			targetName = table.getClassName() + "Controller.java";
			TemplateUtils.executeFreemarker(conf.getTemplatePath(), "Controller.ftl", "UTF-8", model, targetPath, targetName);
			log.info("Generate Controller : " + table.getName() + " ==> " + table.getClassName() + "Controller success");
			System.out.println("Generate Controller : " + table.getName() + " ==> " + table.getClassName() + "Controller success");

			// Route
			targetPath = targetJavaPath + File.separator + table.getCamelName() + File.separator + "route";
			targetName = table.getClassName() + "Routes.java";
			TemplateUtils.executeFreemarker(conf.getTemplatePath(), "Routes.ftl", "UTF-8", model, targetPath, targetName);
			log.info("Generate Route : " + table.getName() + " ==> " + table.getClassName() + "Routes success");
			System.out.println("Generate Route : " + table.getName() + " ==> " + table.getClassName() + "Route success");

			routeList.add(table.getClassName() + "Routes");
			routePackageList.add(conf.getBasePackage() + "." + table.getCamelName() + ".route." + table.getClassName() + "Routes");

			modelList.add("\"" + table.getName() + "\", " + table.getClassName());
			modelPackageList.add(conf.getBasePackage() + "." + table.getCamelName() + ".model." + table.getClassName());
		}

		// Config
		Map<String, Object> content = new HashMap<>();
		content.put("routeList", routeList);
		content.put("routePackageList", routePackageList);

		content.put("modelList", modelList);
		content.put("modelPackageList", modelPackageList);

		String targetPath = conf.getTargetPath() + "/src/main/java" + File.separator + "com/jeasy/";
		String targetName = "Config.java";
		TemplateUtils.executeFreemarker(conf.getTemplatePath(), "Config.ftl", "UTF-8", content, targetPath, targetName);
		log.info("Generate Config success");
		System.out.println("Generate Config success");
	}
}