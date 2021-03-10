package com.example.refactordemo.guard;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VideoService {
    private VideoRepository videoRepository;

    /**
     * 场景：某个视频网站的某个视频，只对VIP开放
     * - 非VIP用户无权访问这套视频
     * - VIP可试看这套视频中的部分
     * - VIP购买后，可查看这套视频
     *
     * @param suiteId 这套视频合集的id
     * @return 用户允许访问的视频
     */
    public List<Videos> showDetailsBad(Integer suiteId) {
        // 判断登录用户是否是VIP
        boolean isVip = true;
        // 查询用户是否已购买过这套视频
        boolean payed = true;
        if (isVip) {
            if (payed) {
                return videoRepository.selectByClassId(suiteId);
            } else {
                return videoRepository.selectTryByClassId(suiteId);
            }
        } else {
            return new ArrayList<>();
        }
    }

    public List<Videos> showDetailsGood(Integer suiteId) {
        // 判断登录用户是否是VIP
        boolean isVip = true;
        // 查询用户是否已购买过这套视频
        boolean payed = true;

        if (!isVip) {
            return new ArrayList<>();
        }
        if (!payed) {
            return videoRepository.selectTryByClassId(suiteId);
        }
        return videoRepository.selectByClassId(suiteId);
    }
}

