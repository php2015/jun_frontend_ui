package cn.javabb.sys.service;

import org.springframework.stereotype.Service;

import cn.javabb.common.base.BaseService;
import cn.javabb.sys.entity.SysImage;

@Service
public class SysImageService extends BaseService<SysImage>{

	public SysImage hasImageMd5(String md5){
		SysImage img = new SysImage();
		img.setImageMd5(md5);
		return queryOne(img);
		
	}
}
