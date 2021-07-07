package com.jeasy.demo.blog.service.impl;

import org.springframework.stereotype.Service;

import com.jeasy.base.service.impl.BaseServiceImpl;
import com.jeasy.demo.blog.dao.BlogDAO;
import com.jeasy.demo.blog.model.Blog;
import com.jeasy.demo.blog.service.BlogService;

import lombok.extern.slf4j.Slf4j;

/**
 * 
 * @author taomk
 * @version 1.0
 * @since 2016/01/05 17:13
 */
@Slf4j
@Service
public class BlogServiceImpl extends BaseServiceImpl<BlogDAO, Blog> implements BlogService {

}