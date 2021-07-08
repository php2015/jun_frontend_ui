package com.jeasy.doc.model;

import java.util.List;

import lombok.Data;
import lombok.NonNull;

/**
 * @author taomk
 * @version 1.0
 * @since 15-8-24 上午10:44
 */
@Data
public class MenuTree {

	@NonNull
	private long id;

	@NonNull
	private String text;

	private String state;

	private List<MenuTree> children;
}
