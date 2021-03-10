package com.itmuch.react.service;

import com.itmuch.react.domain.user.entity.User;
import com.itmuch.react.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void register(User user) {
        Optional<User> optionalUser = this.userRepository.findOneByUsername(user.getUsername());
        if (optionalUser.isPresent()) {
            throw new IllegalArgumentException("该用户已存在");
        }
        this.userRepository.save(user);
    }

    public Optional<User> findById(Integer id) {
        return this.userRepository.findById(id);
    }

    public Optional<User> findByUsername(String username) {
        return this.userRepository.findOneByUsername(username);
    }
}
