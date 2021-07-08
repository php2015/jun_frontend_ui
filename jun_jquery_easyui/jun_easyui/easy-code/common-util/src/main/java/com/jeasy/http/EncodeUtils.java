package com.jeasy.http;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
public final class EncodeUtils {

	private EncodeUtils() {
	}

	public static String encodeURLComponent(String raw) {
		try {
			return URLEncoder.encode(raw, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			return raw;
		}
	}
}
