package com.chensi.common;

import java.io.File;

import org.junit.Test;

/**
 * 初始化数据的一些类
 * @author chensi
 * @version 2016-8-10 下午6:53:35
 */
public class Init {

	/**
	 * 生成icon库的标签
	 */
	@Test
	public void initIcons() {
		String path = "D:/workspaces/admin-hui/WebRoot/static/H-ui.admin_v3.0/lib/zTree/v3/css/zTreeStyle/img/diy";
		File file = new File(path);
		for (File f : file.listFiles()) {
			String s = "<div class='radio-box'><input type='radio' name='icon'><img val='" + f.getName() + "' src='<%=iconPath%>" + f.getName() + "'></div>";
			System.out.println(s);
		}
	}
}
