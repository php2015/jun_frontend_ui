package com.jacarrichan.demo.test.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Example {

	// String str = new String("good");

	String str = "good";

	char[] ch = { 'a', 'b', 'c' };
	List<String> list = new ArrayList<>(10);
	Map map = new HashMap<>();

	public static void main(String[] args) {

		Example ex = new Example();
		ex.list.add("fdsfdsa");
		System.out.println(ex.str.hashCode());
		System.out.println(ex.ch.hashCode());
		System.out.println(ex.list.hashCode());
		System.out.println("--------------");
		ex.change(ex.str, ex.ch, ex.list);
		System.out.println(ex.str.hashCode());
		System.out.println(ex.ch.hashCode());
		System.out.println(ex.list.hashCode());

	}

	public void change(String str, char[] ch, List<String> list2) {
		str = "smas ok";
		ch[0] = 'a';
		list2 = new ArrayList<>(12);
		list2.add("fdsfdsa0");
	}

}
