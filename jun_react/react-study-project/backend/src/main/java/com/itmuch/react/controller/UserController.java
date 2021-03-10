package com.itmuch.react.controller;

import com.itmuch.react.core.convert.AjaxResult;
import com.itmuch.react.core.mapper.BeanMapper;
import com.itmuch.react.domain.user.dto.UserLoginDTO;
import com.itmuch.react.domain.user.dto.UserRegisterDTO;
import com.itmuch.react.domain.user.entity.User;
import com.itmuch.react.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/users/{id}")
    public Mono<AjaxResult> findById(@PathVariable Integer id) {
        Optional<User> user = this.userService.findById(id);
        return Mono.just(
                new AjaxResult<Optional<User>>().success(user)
        );
    }
}
