package com.jeasy.security;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.commons.lang3.StringUtils;

import com.jeasy.util.DataUtils;

import lombok.extern.slf4j.Slf4j;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/10/5 21:45
 */
@Slf4j
public final class SHAUtils {

	private SHAUtils() {
	}

	public static String sha1(String decript) {
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-1");
			digest.update(decript.getBytes());
			return DataUtils.byteArr2HexStr(digest.digest());
		} catch (NoSuchAlgorithmException e) {
			log.error("error exception", e);
		}
		return StringUtils.EMPTY;
	}

	public static String sha(String decript) {
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA");
			digest.update(decript.getBytes());
			return DataUtils.byteArr2HexStr(digest.digest());
		} catch (NoSuchAlgorithmException e) {
			log.error("error exception", e);
		}
		return StringUtils.EMPTY;
	}
}
