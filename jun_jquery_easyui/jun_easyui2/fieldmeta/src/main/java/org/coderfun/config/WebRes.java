package org.coderfun.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class WebRes {
	@Value("${win.web.res}")
	private  String winWebRes;
	
	@Value("${linux.web.res}")
	private  String linuxWebRes;
	
	public  String getAbsolutePath(){
		if(System.getProperty("os.name").toLowerCase().indexOf("windows") != -1){
			return winWebRes;
		}else{
			return linuxWebRes;
		}
	}
}
