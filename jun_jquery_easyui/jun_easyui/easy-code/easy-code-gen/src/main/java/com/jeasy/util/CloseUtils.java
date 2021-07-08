package com.jeasy.util;

import java.io.Closeable;
import java.io.IOException;

import lombok.extern.slf4j.Slf4j;

/**
 * 资源关闭辅助类
 *
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
@Slf4j
public final class CloseUtils {

	private CloseUtils() {
	}

	public static void closeResource(Closeable closeable) {
		try {

			if (closeable != null) {
				closeable.close();
				closeable = null;
			}
		} catch (IOException e) {
			log.error("IOException thrown while closing Closeable.", e);
		}
	}

	public static void closeResources(Closeable... clos)  {
		for (Closeable closeable : clos) {
			closeResource(closeable);
		}
	}
}
