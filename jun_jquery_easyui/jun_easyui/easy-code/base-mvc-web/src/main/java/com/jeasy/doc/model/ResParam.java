package com.jeasy.doc.model;

import java.util.List;

import lombok.Data;
import lombok.NonNull;

/**
 * @author taomk
 * @version 1.0
 * @since 15-8-27 上午10:15
 */
@Data
public class ResParam {

	@NonNull
	private Long id;

	@NonNull
	private String name;

	@NonNull
	private String value;

	@NonNull
	private String desc;

	@NonNull
	private String type;

	private List<ResParam> children;
}
