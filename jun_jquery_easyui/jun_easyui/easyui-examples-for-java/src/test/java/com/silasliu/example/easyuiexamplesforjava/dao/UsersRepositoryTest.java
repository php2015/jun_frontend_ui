package com.silasliu.example.easyuiexamplesforjava.dao;

import com.silasliu.example.easyuiexamplesforjava.EasyuiExamplesForJavaApplication;
import com.silasliu.example.easyuiexamplesforjava.entity.Users;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UsersRepositoryTest {

    @Autowired
    UsersRepository usersRepository;
@Test
public void test(){
    System.out.println(
            usersRepository.findAll().size()
    );
    System.out.println("haha");
}
@Test
@Before
public void insert(){
    Users users=new Users();
    users.setEamil("adfa@ad.com");
    users.setFirstName("a");
    users.setLastName("b");
    users.setPhone("142392234");
    users=usersRepository.save(users);
    System.out.println("saved -> "+users);

}
}