package com.itmuch.react.controller;

import com.itmuch.react.core.convert.AjaxResult;
import com.itmuch.react.core.mapper.BeanMapper;
import com.itmuch.react.domain.user.dto.UserLoginDTO;
import com.itmuch.react.domain.user.dto.UserRegisterDTO;
import com.itmuch.react.domain.user.entity.User;
import com.itmuch.react.exception.ShiroRelatedException;
import com.itmuch.react.service.UserService;
import com.itmuch.react.util.JWTUtil;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.util.Optional;

@RestController
public class RegisterLoginController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Mono<AjaxResult> register(@Valid @RequestBody UserRegisterDTO registerDTO) {
        User user = BeanMapper.map(registerDTO, User.class);
        this.userService.register(user);
        return Mono.just(new AjaxResult<>().success(null));
    }

    @PostMapping("/login")
    public Mono<AjaxResult<String>> preLogin(@RequestBody UserLoginDTO user) {
        Optional<User> userOptional = this.userService.findByUsername(user.getUsername());

        return userOptional.map(t -> {
            if (user.getPassword().equals(t.getPassword())) {
                // 生成token
                return Mono.just(
                        new AjaxResult<String>().success(JWTUtil.createToken(user.getUsername()))
                );
            }
            throw new ShiroRelatedException("密码不正确");
        }).orElseThrow(() -> new ShiroRelatedException("该用户不存在"));
    }
}
