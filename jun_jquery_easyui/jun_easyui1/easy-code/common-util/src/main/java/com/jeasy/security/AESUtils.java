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
public final class AESUtils {

	private static final String AES = "AES";

	/**
	 * 加密
	 * @param src
	 * @param key
	 * @return
	 * @throws Exception
	 */
	public static byte[] encrypt(byte[] src, String key) throws Exception {
		Cipher cipher = Cipher.getInstance(AES);
		SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), AES);
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
		Cipher cipher = Cipher.getInstance(AES);
		SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), AES);//设置加密Key
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
			e.printStackTrace();
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
			e.printStackTrace();
		}
		return null;
	}

	public static void main(String[] args) {
		String ID = "61111111111116111111111111";

		String idEncrypt = encrypt(ID, "1233453453453453");
		System.out.println(idEncrypt);
		String idDecrypt = decrypt(idEncrypt, "1233453453453453");
		System.out.println(idDecrypt);
	}
}