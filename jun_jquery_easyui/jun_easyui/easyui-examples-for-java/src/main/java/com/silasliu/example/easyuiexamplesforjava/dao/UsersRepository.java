package com.silasliu.example.easyuiexamplesforjava.dao;

import com.silasliu.example.easyuiexamplesforjava.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author -==> mi
 * @since -==> 2019/7/9 11:54
 */
public interface UsersRepository extends JpaRepository<Users,Long> {


}
