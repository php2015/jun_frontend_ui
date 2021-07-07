package com.jeasy.test;

import com.google.common.collect.Lists;
import com.jeasy.demo.blog.model.Blog;
import com.jeasy.demo.blog.service.BlogService;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.c3p0.C3p0Plugin;
import lombok.extern.slf4j.Slf4j;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

/**
 * @author TaoBangren
 * @version 1.0
 * @since 16/1/5 下午3:01
 */
@Slf4j
public class BlogServiceJUnitTest {

    @Before
    public void setUp() {
        PropKit.use("a_little_config.txt");
        C3p0Plugin c3p0Plugin = new C3p0Plugin(PropKit.get("jdbcUrl").trim(), PropKit.get("user").trim(), PropKit.get("password").trim());
        ActiveRecordPlugin arp = new ActiveRecordPlugin(c3p0Plugin);
        arp.addMapping("blog", Blog.class);

        c3p0Plugin.start();
        arp.start();
    }

    @Test
    public void testFind() {
        BlogService.me.find(new Blog());
        log.info("================> Test blogService.find success");
    }

    @Test
    public void testGetById() {
        BlogService.me.getById(2L);
        log.info("================> Test blogService.getById success");
    }

    @Test
    public void testFindByIds() {
        BlogService.me.findByIds(Lists.newArrayList(2L, 3L, 4L));
        log.info("================> Test blogService.getById success");
    }

    @Test
    public void testPage() {
        BlogService.me.page(new Blog(), 1, 2);
        log.info("================> Test blogService.page success");
    }

    @Test
    public void testCount() {
        BlogService.me.count(new Blog());
        log.info("================> Test blogService.count success");
    }

    @Test
    public void testGetFirst() {
        BlogService.me.getFirst(new Blog());
        log.info("================> Test blogService.getFirst success");
    }

    @Test
    public void testSave() {
        Blog blog = new Blog();
        blog.setTitle("Test 11");
        blog.setContent("Test 11");
        blog.setCreateAt(11L);
        blog.setCreateBy(11L);
        blog.setCreateName("Test 11");
        blog.setUpdateAt(11L);
        blog.setUpdateBy(11L);
        blog.setUpdateName("Test 11");
        blog.setIsDel(0);

        BlogService.me.save(blog);
        log.info("================> Test blogService.save success");
    }

    @Test
    public void testSaveBatch() {
        List<Blog> blogList = Lists.newArrayList();
        for (int i = 0; i < 20; i++) {
            Blog blog = new Blog();
            blog.setTitle("Test 10" + i);
            blog.setContent("Test 10" + i);
            blog.setCreateAt(10L + i);
            blog.setCreateBy(10L + i);
            blog.setCreateName("Test 10" + i);
            blog.setUpdateAt(10L + i);
            blog.setUpdateBy(10L + i);
            blog.setUpdateName("Test 10" + i);
            blog.setIsDel(0);

            blogList.add(blog);
        }

        BlogService.me.saveBatch(blogList);
        log.info("================> Test blogService.saveBatch success");
    }

    @Test
    public void testSaveSelective() {
        Blog blog = new Blog();
        blog.setTitle("Test 30");
        blog.setContent("Test 30");
        blog.setCreateAt(30L);
        blog.setCreateBy(30L);
        blog.setCreateName("Test 30");

        BlogService.me.saveSelective(blog);
        log.info("================> Test blogService.saveSelective success");
    }

    @Test
    public void testModify() {
        Blog blog = new Blog();
        blog.setId(3L);
        blog.setTitle("Test 10");
        blog.setContent("Test 10");
        blog.setCreateAt(10L);
        blog.setCreateBy(10L);
        blog.setCreateName("Test 10");
        blog.setUpdateAt(10L);
        blog.setUpdateBy(10L);
        blog.setUpdateName("Test 10");
        blog.setIsDel(0);

        BlogService.me.modify(blog);
        log.info("================> Test blogService.modify success");
    }

    @Test
    public void testModifySelective() {
        Blog blog = new Blog();
        blog.setId(4L);
        blog.setTitle("Test 10");
        blog.setContent("Test 10");
        blog.setCreateAt(10L);
        blog.setCreateBy(10L);
        blog.setCreateName("Test 10");

        BlogService.me.modifySelective(blog);
        log.info("================> Test blogService.modifySelective success");
    }

    @Test
    public void testRemove() {
        BlogService.me.remove(5L);
        log.info("================> Test blogService.remove success");
    }

    @Test
    public void testRemoveBatch() {
        BlogService.me.removeBatch(Lists.newArrayList(6L, 7L, 8L));
        log.info("================> Test blogService.removeBatch success");
    }

    @Test
    public void testRemoveByParams() {
        BlogService.me.removeByParams(new Blog());
        log.info("================> Test blogService.removeByParams success");
    }
}
