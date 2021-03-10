package com.example.refactordemo.guard;

import lombok.Data;

import java.util.List;

public interface VideoRepository {
    /**
     * 根据课程id，返回视频列表信息
     *
     * @param suiteId 这套视频合集的id
     * @return 视频列表
     */
    List<Videos> selectByClassId(Integer suiteId);

    /**
     * 根据课程id，返回试看视频信息
     *
     * @param suiteId 这套视频合集的id
     * @return 试看视频列表
     */
    List<Videos> selectTryByClassId(Integer suiteId);
}

@Data
class Videos {
    /**
     * 是否试看视频
     */
    private boolean isTry;
    private String title;
    private long url;
}