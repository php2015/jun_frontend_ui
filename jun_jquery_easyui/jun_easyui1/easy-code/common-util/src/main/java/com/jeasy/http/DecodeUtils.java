package com.jeasy.http;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
public final class DecodeUtils {

	private DecodeUtils() {
	}

    public static String decodeURLComponent(String raw) {
        try {
            return URLDecoder.decode(raw, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            return raw;
        }
    }
}
