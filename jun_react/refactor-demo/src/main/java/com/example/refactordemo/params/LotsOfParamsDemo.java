package com.example.refactordemo.params;

import com.example.refactordemo.domain.UserDTO;

public class LotsOfParamsDemo {
    /**
     * 存储用户
     * // TIPS：为什么这里要用包装类，而不是基本类型？？
     *
     * @param name     姓名
     * @param age      年龄
     * @param sex      性别
     * @param idCardNo 身份证号
     */
    public static void saveUserBad(String name, Short age, Boolean sex, String idCardNo) {
        // 参数校验(如果有需要的话)
        UserDTO userDTO = UserDTO.builder()
            .name(name)
            .age(age)
            .sex(sex)
            .idCardNo(idCardNo)
            .build();
        // 存储userDTO
    }

    public void saveUserGood(UserDTO userDTO) {
        // 参数校验(如果有需要的话)
        // 参数校验可参考：http://www.itmuch.com/work/arrayindexoutofboundsexception/
        // 存储userDTO
    }
}

