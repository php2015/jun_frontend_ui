package com.webuploader.util;

import java.util.UUID;

public class Guid {
	public static String newGuid() {
		return String.valueOf(UUID.randomUUID());
	}
}
