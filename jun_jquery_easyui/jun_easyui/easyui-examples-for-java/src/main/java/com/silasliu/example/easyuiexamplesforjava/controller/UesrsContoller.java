package com.silasliu.example.easyuiexamplesforjava.controller;

import com.silasliu.example.easyuiexamplesforjava.dao.UsersRepository;
import com.silasliu.example.easyuiexamplesforjava.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * @author -==> mi
 * @since -==> 2019/7/9 11:56
 */
@Controller
@RequestMapping("users")
public class UesrsContoller {
    @Autowired
    UsersRepository usersRepository;
    @RequestMapping("list")
    public String index(){
        List<Users> list=usersRepository.findAll();
        System.out.println(list.size());
        return "";
    }
}
