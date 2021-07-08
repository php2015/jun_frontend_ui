package com.ssm.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssm.common.basedao.BaseDao;
import com.ssm.common.baseservice.BaseService;
import com.ssm.common.mybatis.Page;
import com.ssm.entity.User;
import com.ssm.entity.UserCriteria;
import com.ssm.exception.ExistedException;
import com.ssm.exception.ServiceException;
import com.ssm.mapper.OrganizationMapper;
import com.ssm.mapper.UserMapper;
import com.ssm.service.UserRoleService;
import com.ssm.service.UserService;
import com.ssm.shiro.ShiroDbRealm;
import com.ssm.shiro.ShiroDbRealm.HashPassword;


@Service("userService")
public class UserServiceImpl extends BaseService implements UserService {

	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Autowired
	private ShiroDbRealm shiroRealm;
	
	@Autowired
	private UserRoleService userRoleService;
	
	@Override
	public void delete(Long id) throws ServiceException {
		if (isSupervisor(id)) {
			logger.warn("操作员{}，尝试删除超级管理员用户", SecurityUtils.getSubject()
					.getPrincipal() + "。");
			throw new ServiceException("不能删除超级管理员用户。");
		}
		
		User user = baseDao.getMapper(UserMapper.class).selectByPrimaryKey(id);
		baseDao.getMapper(UserMapper.class).deleteByPrimaryKey(user.getId());
		
		shiroRealm.clearCachedAuthorizationInfo(user.getUsername());

	}

	@Override
	public List<User> find(User user) {
		UserCriteria criteria = new UserCriteria();
		UserCriteria.Criteria cri = criteria.createCriteria();
		
		if(user != null){
			
			if(StringUtils.isNotBlank(user.getUsername())){
				cri.andUsernameEqualTo(user.getUsername());
			}
			
			if(StringUtils.isNotBlank(user.getEmail())){
				cri.andEmailEqualTo(user.getEmail());
			}
			
			if(StringUtils.isNotBlank(user.getRealname())){
				cri.andRealnameEqualTo(user.getRealname());
			}
			
			if(StringUtils.isNotBlank(user.getStatus())){
				cri.andStatusEqualTo(user.getStatus());
			}
			
			if(user.getOrgId() != null){
				cri.andOrgIdEqualTo(user.getOrgId());
			}
			
			if(StringUtils.isNotBlank(user.getPhone())){
				cri.andPhoneEqualTo(user.getPhone());
			}
		}
		
		return baseDao.getMapper(UserMapper.class).selectByExample(criteria);
	}

	@Override
	public Page findByPage(Page page,User user) {
		
		UserCriteria criteria = new UserCriteria();
		UserCriteria.Criteria cri = criteria.createCriteria();
		
		if(user != null){
			
			if(StringUtils.isNotBlank(user.getUsername())){
				cri.andUsernameEqualTo(user.getUsername());
			}
			
			if(StringUtils.isNotBlank(user.getEmail())){
				cri.andEmailEqualTo(user.getEmail());
			}
			
			if(StringUtils.isNotBlank(user.getRealname())){
				cri.andRealnameEqualTo(user.getRealname());
			}
			
			if(StringUtils.isNotBlank(user.getStatus())){
				cri.andStatusEqualTo(user.getStatus());
			}
			
			if(user.getOrgId() != null){
				cri.andOrgIdEqualTo(user.getOrgId());
			}
			
			if(StringUtils.isNotBlank(user.getPhone())){
				cri.andPhoneEqualTo(user.getPhone());
			}
		}
		
		if(page != null && page.getSort() != null && page.getOrder() != null){
			criteria.setOrderByClause(page.getSort() + " " + page.getOrder());
		}
		
		List<User> list = new ArrayList<User>();
		if(page == null){
			list = baseDao.getMapper(UserMapper.class).selectByExample(criteria);
		}
		
		list = baseDao.selectByPage("com.ssm.mapper.UserMapper."+BaseDao.SELECT_BY_EXAMPLE, criteria, page);
		if(list != null && list.size() > 0){
			for(User u:list){
				setUserOrganization(u);
				u.setUserRoles(userRoleService.find(u.getId()));
			}
		}
		page.setCount(baseDao.getMapper(UserMapper.class).countByExample(criteria));
		return page.setRows(list);
	}

	@Override
	public User get(String username) {
		UserCriteria criteria = new UserCriteria();
		UserCriteria.Criteria cri = criteria.createCriteria();
		if(StringUtils.isNotBlank(username)){
			cri.andUsernameEqualTo(username);
		}
		
		List<User> list = baseDao.getMapper(UserMapper.class).selectByExample(criteria);
		if(list != null && list.size() > 0){
			User user = list.get(0);
			setUserOrganization(user);
			return user;
		}
		return null;
	}
	
	public void setUserOrganization(User user){
		if(user != null && user.getOrgId() != null){
			user.setOrganization(baseDao.getMapper(OrganizationMapper.class).selectByPrimaryKey(user.getOrgId()));
		}
	}
	

	
	/**
	 * 按用户名
	 * @param username
	 * @return
	 */
	public User getByUsername(String username) {
		UserCriteria criteria = new UserCriteria();
		UserCriteria.Criteria cri = criteria.createCriteria();
		if(StringUtils.isNotBlank(username)){
			cri.andUsernameEqualTo(username);
		}
		return baseDao.selectOne("com.ssm.mapper.UserMapper."+BaseDao.SELECT_BY_EXAMPLE, criteria);
	}
	
	/**
	 * 按邮箱
	 * @param email
	 * @return
	 */
	public User getByEmail(String email) {
		UserCriteria criteria = new UserCriteria();
		UserCriteria.Criteria cri = criteria.createCriteria();
		if(StringUtils.isNotBlank(email)){
			cri.andEmailEqualTo(email);
		}
		return baseDao.selectOne("com.ssm.mapper.UserMapper."+BaseDao.SELECT_BY_EXAMPLE, criteria);
	}

	@Override
	public User get(Long id) {
		User user = baseDao.getMapper(UserMapper.class).selectByPrimaryKey(id);
		setUserOrganization(user);
		return user;
	}

	@Override
	public void resetPwd(User user, String newPwd) {
		if (newPwd == null) {
			newPwd = "123456";
		}
		HashPassword hashPassword = ShiroDbRealm.encryptPassword(newPwd);
		user.setSalt(hashPassword.salt);
		user.setPassword(hashPassword.password);
		
		baseDao.getMapper(UserMapper.class).updateByPrimaryKeySelective(user);
	}

	@Override
	public void save(User user) throws ExistedException {
		if (getByUsername(user.getUsername()) != null) {
			throw new ExistedException("用户添加失败，登录名：" + user.getUsername() + "已存在。");
		}

		if (getByEmail(user.getEmail()) != null) {
			throw new ExistedException("用户添加失败，登录邮箱：" + user.getEmail() + "已存在。");
		}
		
		//设定安全的密码，使用passwordService提供的salt并经过1024次 sha-1 hash
		if (StringUtils.isNotBlank(user.getPlainPassword()) && shiroRealm != null) {
			HashPassword hashPassword = ShiroDbRealm.encryptPassword(user.getPlainPassword());
			user.setSalt(hashPassword.salt);
			user.setPassword(hashPassword.password);
		}
		
		baseDao.getMapper(UserMapper.class).insertSelective(user);
		shiroRealm.clearCachedAuthorizationInfo(user.getUsername());
	}

	@Override
	public void update(User user) {
		baseDao.getMapper(UserMapper.class).updateByPrimaryKeySelective(user);
		shiroRealm.clearCachedAuthorizationInfo(user.getUsername());
	}

	@Override
	public void updatePwd(User user, String newPwd) throws ServiceException {
		//if (isSupervisor(user.getId())) {
		//	logger.warn("操作员{},尝试修改超级管理员用户", SecurityUtils.getSubject().getPrincipal());
		//	throw new ServiceException("不能修改超级管理员用户");
		//}
		//设定安全的密码，使用passwordService提供的salt并经过1024次 sha-1 hash
		boolean isMatch = ShiroDbRealm.validatePassword(user.getPlainPassword(), user.getPassword(), user.getSalt());
		if (isMatch) {
			HashPassword hashPassword = ShiroDbRealm.encryptPassword(newPwd);
			user.setSalt(hashPassword.salt);
			user.setPassword(hashPassword.password);
			
			baseDao.getMapper(UserMapper.class).updateByPrimaryKeySelective(user);
			shiroRealm.clearCachedAuthorizationInfo(user.getUsername());
			
			return; 
		}
		
		throw new ServiceException("用户密码错误！");

	}

	/**
	 * 判断是否超级管理员.
	 */
	private boolean isSupervisor(Long id) {
		return id == 1;
	}
	
}
