package com.jeasy.index.controllers;

import net.paoding.rose.web.annotation.Path;
import net.paoding.rose.web.annotation.rest.Get;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Path("")
public class IndexController {

    @Get
    public String index() {
        return "index";
    }
}
