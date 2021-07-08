package cn.javabb.common.aspect;

import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import cn.javabb.common.annotation.Log;
import cn.javabb.common.util.HttpContextUtils;
import cn.javabb.common.util.IPUtils;
import cn.javabb.common.util.JSONUtils;
import cn.javabb.common.util.ShiroUtils;
import cn.javabb.sys.entity.SysLog;
import cn.javabb.sys.entity.User;
import cn.javabb.sys.service.LogService;

@Aspect
@Component
public class LogAspect {
	@Autowired
	private LogService logService;

	@Pointcut("@annotation(cn.javabb.common.annotation.Log)")
	public void logPointCut() {
	}

	@Around("logPointCut()")
	public Object around(ProceedingJoinPoint point) throws Throwable {
		long beginTime = System.currentTimeMillis();
		// 执行方法
		Object result = point.proceed();
		// 执行时长(毫秒)
		long time = System.currentTimeMillis() - beginTime;
		// 保存日志
		saveLog(point, time);
		return result;
	}

	private void saveLog(ProceedingJoinPoint joinPoint, long time) {
		MethodSignature signature = (MethodSignature) joinPoint.getSignature();
		Method method = signature.getMethod();
		SysLog sysLog = new SysLog();
		Log syslog = method.getAnnotation(Log.class);
		if (syslog != null) {
			// 注解上的描述
			sysLog.setOperation(syslog.value());
		}
		// 请求的方法名
		String className = joinPoint.getTarget().getClass().getName();
		String methodName = signature.getName();
		sysLog.setMethod(className + "." + methodName + "()");
		// 请求的参数
		Object[] args = joinPoint.getArgs();
		try {
			String params = JSONUtils.beanToJson(args[0]).substring(0, 4999);
			sysLog.setParams(params);
		} catch (Exception e) {
		    
		}
		// 获取request
		HttpServletRequest request = HttpContextUtils.getHttpServletRequest();
		// 设置IP地址
		sysLog.setIp(IPUtils.getIpAddr(request));
		// 用户名
		//User currUser = new User();
		User currUser = ShiroUtils.getUser();
		if (null == currUser) {
			sysLog.setUserName("unkown"); //
		} else {
			sysLog.setUserName(currUser.getUserName());  //
		}
		sysLog.setUseTime((int) time);
		// 保存系统日志
		logService.insert(sysLog);
	}
}
