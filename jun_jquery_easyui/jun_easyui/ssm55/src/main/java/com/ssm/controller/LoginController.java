package com.ssm.controller;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.session.UnknownSessionException;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ssm.common.SecurityConstants;
import com.ssm.shiro.CaptchaUsernamePasswordToken;
import com.ssm.shiro.IncorrectCaptchaException;
import com.ssm.viewModel.Json;

@Controller
@RequestMapping("/login")
public class LoginController {

	private static final Logger LOG = LoggerFactory.getLogger(LoginController.class); 
	
	private static final String LOGIN_PAGE = "login";
	private static final String LOGIN_DIALOG = "management/index/loginDialog";
	
	
	@RequestMapping(method = RequestMethod.GET)
	public String login() {
		return LOGIN_PAGE;
	}
	
	@RequestMapping(value="/load") 
	@ResponseBody
	public Json load(String username,String password,String captcha_key,Boolean rememberMe) throws Exception {	
		Subject subject=SecurityUtils.getSubject();
		CaptchaUsernamePasswordToken token=new CaptchaUsernamePasswordToken();
        token.setUsername(username);
        token.setPassword(password.toCharArray());
        token.setCaptcha(captcha_key);
        token.setRememberMe(rememberMe);
        Json json=new Json();
        json.setTitle("登录提示");
        try{
            subject.login(token);
            System.out.println("sessionTimeout===>"+subject.getSession().getTimeout());
            json.setStatus(true);	
        }
        catch (UnknownSessionException use) {
            subject = new Subject.Builder().buildSubject();
            subject.login(token);
            LOG.error(SecurityConstants.UNKNOWN_SESSION_EXCEPTION);
            json.setMessage(SecurityConstants.UNKNOWN_SESSION_EXCEPTION);
        }
        catch(UnknownAccountException ex){
			LOG.error(SecurityConstants.UNKNOWN_ACCOUNT_EXCEPTION);
			json.setMessage(SecurityConstants.UNKNOWN_ACCOUNT_EXCEPTION);
		}
        catch (IncorrectCredentialsException ice) {
            json.setMessage(SecurityConstants.INCORRECT_CREDENTIALS_EXCEPTION);
        } 
        catch (LockedAccountException lae) {
            json.setMessage(SecurityConstants.LOCKED_ACCOUNT_EXCEPTION);
        }
        catch (DisabledAccountException dae) {
            json.setMessage(SecurityConstants.DISABLED_ACCOUNT_EXCEPTION);
        }
        catch (IncorrectCaptchaException e) {
        	 json.setMessage(SecurityConstants.INCORRECT_CAPTCHA_EXCEPTION);
		}
        catch (AuthenticationException ae) {
            json.setMessage(SecurityConstants.AUTHENTICATION_EXCEPTION);
        } 
        catch(Exception e){
            json.setMessage(SecurityConstants.UNKNOWN_EXCEPTION);
        }
		return json;
	}
	
}
