//package com.itmuch.react.security.auth;
//
//import com.itmuch.react.domain.user.entity.User;
//import com.itmuch.react.service.UserService;
//import lombok.extern.slf4j.Slf4j;
//import org.apache.shiro.authc.AuthenticationException;
//import org.apache.shiro.authc.AuthenticationInfo;
//import org.apache.shiro.authc.AuthenticationToken;
//import org.apache.shiro.authc.SimpleAuthenticationInfo;
//import org.apache.shiro.authc.credential.CredentialsMatcher;
//import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
//import org.apache.shiro.authz.AuthorizationInfo;
//import org.apache.shiro.authz.SimpleAuthorizationInfo;
//import org.apache.shiro.realm.AuthorizingRealm;
//import org.apache.shiro.subject.PrincipalCollection;
//import org.apache.shiro.util.ByteSource;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import java.util.Optional;
//
//@Slf4j
//public class MyRealm extends AuthorizingRealm {
//    @Autowired
//    private UserService userService;
//
//    @Override
//    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
//        return new SimpleAuthorizationInfo();
//    }
//
//    @Override
//    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
//        String username = (String) token.getPrincipal();
//
//        Optional<User> userOptional = this.userService.findByUsername(username);
//        return userOptional.map(user -> new SimpleAuthenticationInfo(
//                username,
//                user.getPassword(),
//                ByteSource.Util.bytes("salt"),
//                getName()
//        )).orElse(null);
//    }
//}
