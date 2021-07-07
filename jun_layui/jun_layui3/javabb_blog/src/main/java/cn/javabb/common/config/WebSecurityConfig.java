package cn.javabb.common.config;

/**
 * spring security配置
 * @author javabb
 *
 */
/*@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)//开启security注解
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{

	*//**
	 * 	请求授权
	 *//*
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().cors().disable().headers().disable()
				.authorizeRequests()//开始请求数据配置
				//
                .antMatchers("/","/blog/**","/aboutMe","/static/**").permitAll()
                //其他地址的访问均需验证权限
                .anyRequest().authenticated()
                .and()
                .formLogin()  //定制登陆操作
                //指定登录页是"/login"
                .loginPage("/login") //定制登陆页面的访问地址
                .defaultSuccessUrl("/admin")//登录成功后默认跳转到的页面
                .failureUrl("/login?error") //登陆失败的地址
                .permitAll()
                .and()
                .logout()
                .logoutSuccessUrl("/login")//退出登录后的默认url是"/home"
                .permitAll();
	}

	*//**
	 * 用户认证
	 *//*
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
			.inMemoryAuthentication()
			.withUser("javabb")
			.password("mima123456")
			.roles("ADMIN");
	}
}*/
