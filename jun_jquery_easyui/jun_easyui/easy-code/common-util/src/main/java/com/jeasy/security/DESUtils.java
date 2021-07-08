package com.jeasy.security;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import com.jeasy.util.DataUtils;

import lombok.extern.slf4j.Slf4j;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
@Slf4j
public final class DESUtils {

	private static final String DES = "TripleDES";

	/**
	 * 加密
	 * @param src
	 * @param key
	 * @return
	 * @throws Exception
	 */
	public static byte[] encrypt(byte[] src, String key) throws Exception {
		Cipher cipher = Cipher.getInstance(DES);
		SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), DES);
		cipher.init(Cipher.ENCRYPT_MODE, secretKey);//设置密钥和加密形式
		return cipher.doFinal(src);
	}

	/**
	 * 解密
	 * @param src
	 * @param key
	 * @return
	 * @throws Exception
	 */
	public static byte[] decrypt(byte[] src, String key)  throws Exception  {
		Cipher cipher = Cipher.getInstance(DES);
		SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), DES);//设置加密Key
		cipher.init(Cipher.DECRYPT_MODE, secretKey);//设置密钥和解密形式
		return cipher.doFinal(src);
	}

	/**
	 * 解密
	 *
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public final static String decrypt(String data, String password) {
		try {
			return new String(decrypt(DataUtils.hexStr2ByteArr(data), password));
		} catch (Exception e) {
		}
		return null;
	}

	/**
	 * 加密
	 *
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public final static String encrypt(String data, String password) {
		try {
			return DataUtils.byteArr2HexStr(encrypt(data.getBytes(), password));
		} catch (Exception e) {
		}
		return null;
	}


	public static void main(String[] args) {
		String ID = "61111111111116111111111111";
		String KEYSTR="-7-*d@#5EdxBvrTRe-#5CtUs";

		String idEncrypt = encrypt(ID, KEYSTR);
		System.out.println(idEncrypt);
		String idDecrypt = decrypt(idEncrypt, KEYSTR);
		System.out.println(idDecrypt);
	}
}
