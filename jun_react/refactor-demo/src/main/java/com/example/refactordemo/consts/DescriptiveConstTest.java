package com.example.refactordemo.consts;

public class DescriptiveConstTest {
    private static final int IOS_VERSION_7_10 = 7;

    /**
     * 场景：
     * 根据操作系统的版本，做不同适配
     *
     * @param osVersion 操作系统版本
     */
    void constBad(int osVersion) {
        if (osVersion > 7) {
            // do sth.
        } else {
            // do sth.
        }
    }

    void constGood(int osVersion) {
        if (osVersion > IOS_VERSION_7_10) {
            // do sth.
        } else {
            // do sth.
        }
    }
}
