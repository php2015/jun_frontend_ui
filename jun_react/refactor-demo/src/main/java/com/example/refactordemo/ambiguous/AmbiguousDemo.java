package com.example.refactordemo.ambiguous;

import com.example.refactordemo.domain.UserDTO;
import lombok.Data;

public class AmbiguousDemo {
    /**
     * 查询用户信息
     * - 传入create标记
     * - 如果create=false，则是纯查询接口
     * - 如果create=true，则当不存在该用户时，插入用户
     * <p>
     * -----
     * 重构方案：改写成2个接口：
     * - 接口1：纯查询接口；
     * - 接口2：查询不存在就插入的接口
     * 由调用方自主选择使用哪个接口
     *
     * @param params params
     * @return 用户信息
     */
    public UserDTO queryUserBad(QueryParams params) {
        Boolean create = params.getCreate();
        UserDTO user = this.queryByParams(params);

        // 不存在且需创建
        if (create && user == null) {
            return this.insertUserByParams(params);
        }
        // 直接返回
        return user;
    }

    private UserDTO queryByParams(QueryParams params) {
        return new UserDTO();
    }

    private UserDTO insertUserByParams(QueryParams params) {
        // 插入用户信息
        return new UserDTO();
    }
}

@Data
class QueryParams {
    private String username;
    private String workNo;
    private String mobile;
    /**
     * 是否创建用户，如果传入true，查不到此人就创建
     */
    private Boolean create;
}