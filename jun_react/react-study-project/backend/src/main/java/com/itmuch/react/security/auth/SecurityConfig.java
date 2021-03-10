//package com.itmuch.react.security.auth;
//
//import com.itmuch.react.security.auth.MyRealm;
//import org.apache.shiro.authc.credential.CredentialsMatcher;
//import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
//import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;
//import org.apache.shiro.realm.Realm;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.DependsOn;
//import org.springframework.data.repository.NoRepositoryBean;
//
//@Configuration
//public class SecurityConfig {
//    @Bean(name = "realm")
//    @DependsOn({"lifecycleBeanPostProcessor"})
//    public Realm realm() {
//        MyRealm realm = new MyRealm();
//        realm.setCredentialsMatcher(credentialsMatcher());
//        return realm;
//    }
//
//    // TODO: 2018/9/2 目前明文存储，待改进
//    @Bean
//    public CredentialsMatcher credentialsMatcher() {
//        return new SimpleCredentialsMatcher();
//    }
//}