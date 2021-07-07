package com.jeasy.doc.annotation;

/**
 * @author taomk
 * @version 1.0
 * @since 15-6-7 上午6:50
 */
public enum AuthorEnum {

	TAO_MING_KAI("陶明凯"),

	ZHAI_CHANG_QING("翟长青"),

	CHENG_BO("程波"),

	ZHANG_KAI("张凯"),

	ZHANG_YONG_HONG("张永红"),

	BI_GUO_YONG("毕国勇"),

	WANG_JING_KUN("王靖坤");

	private String authorName;

	private AuthorEnum(String authorName) {
		this.authorName = authorName;
	}

	public String authorName() {
		return this.authorName;
	}
}
