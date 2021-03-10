package com.example.refactordemo.practise;

import lombok.extern.slf4j.Slf4j;

import java.io.File;

@Slf4j
public class PractiseDemo {
    /**
     * 1. 写死的变量，待抽取/方法待抽取
     * 4.1. 参数过多，修改方法签名[调整参数顺序]
     * 4.2. 修改方法签名，抽取入参对象
     * 5. 没有面向接口编程
     * 6. 重命名方法
     * 7. TOTO 与 FIXME
     *
     * @param a a
     * @param b b
     * @param c c
     * @param d d
     * @return 操作结果
     */
    public boolean practise1(int a, int b, int c, int d) {
        boolean result = this.doSomeBusiness("/opt");
        // 打印日志
        log.info("a:{},b:{},c:{},d:{}", a, b, c, d);
        // 记录操作日志到数据库
        // ...

        return result;
    }

    private boolean doSomeBusiness(String path) {
        // 3. 内联
        boolean mkdirs = new File(path)
            .mkdirs();
        return mkdirs;
    }
}

class TestDemo {
    private PractiseDemo practiseDemo;

    /**
     * 2. 移动方法
     */
    public void test() {
        boolean b = practiseDemo.practise1(1, 2, 3, 4);
    }
}
