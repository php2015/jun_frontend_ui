package com.jeasy.index.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/")
public class IndexController {

    @RequestMapping(value = "")
    public String index() {
        return "index";
    }
}
