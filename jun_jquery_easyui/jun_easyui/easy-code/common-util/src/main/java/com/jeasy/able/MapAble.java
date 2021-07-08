package com.jeasy.able;

import java.util.Map;

import com.jeasy.collection.MapExUtils;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/10/10 13:50
 */
public abstract class MapAble {

	public Map<String, String> toMap(){
		return MapExUtils.toStrMap(this);
	}
}
