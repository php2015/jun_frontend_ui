package cn.com.smart.web.service;

import java.util.List;
import java.util.Map;

import cn.com.smart.bean.SmartResponse;
import cn.com.smart.filter.bean.FilterParam;
import cn.com.smart.web.bean.AutoComplete;
import cn.com.smart.web.plugins.ZTreeData;

public interface IOPService {

	/**
	 * 查询数据
	 * @param resId
	 * @return
	 */
	public SmartResponse<Object> getDatas(String resId);
	
	/**
	 * 查询数据
	 * @param resId
	 * @param params
	 * @return
	 */
	public SmartResponse<Object> getDatas(String resId,Map<String,Object> params);
	
	/**
	 * 查询数据
	 * @param resId
	 * @param params
	 * @return
	 */
	public SmartResponse<Object> getDatas(String resId,FilterParam params);
	
	/**
	 * 查询数据(分页)
	 * @param resId
	 * @param start
	 * @param rows
	 * @return
	 */
	public SmartResponse<Object> getDatas(String resId,int start,int rows);
	
	/**
	 * 查询数据(分页)
	 * @param resId
	 * @param params
	 * @param start
	 * @param rows
	 * @return
	 */
	public SmartResponse<Object> getDatas(String resId,Map<String,Object> params,int start,int rows);
	
	
	/**
	 * 查询数据(分页)
	 * @param resId
	 * @param params
	 * @param start
	 * @param rows
	 * @return
	 */
	public SmartResponse<Object> getDatas(String resId,FilterParam params,int start,int rows);
	
	/**
	 * 查询数据(分页)
	 * @param resId
	 * @param params
	 * @param filterParam
	 * @param start
	 * @param rows
	 * @return
	 */
	public SmartResponse<Object> getDatas(String resId,Map<String,Object> params,FilterParam filterParam,int start,int rows);
	
	
	/**
	 * 查询数据，返回树形数据结构
	 * @param resId 资源ID
	 * @param params 参数
	 * @return 返回SmartResponse对象；如果getResult()为“1”表示获取数据成功；否则失败；
	 * 如果成功；通过调用getDatas()获取数据列表
	 */
	public SmartResponse<Object> getTreeDatas(String resId,Map<String,Object> params);
	
	/**
	 * 查询数据,返回树形数据结构
	 * @param resId 资源ID
	 * @return 返回SmartResponse对象；如果getResult()为“1”表示获取数据成功；否则失败；
	 * 如果成功；通过调用getDatas()获取数据列表
	 */
	public SmartResponse<Object> getTreeDatas(String resId);
	
	/**
	 * 查询数据，返回ZTree树形数据结构
	 * @param resId 资源ID
	 * @param params 参数
	 * @return 返回SmartResponse对象；如果getResult()为“1”表示获取数据成功；否则失败；
	 * 如果成功；通过调用getDatas()获取数据列表
	 */
	public SmartResponse<ZTreeData> getZTreeDatas(String resId,Map<String,Object> params);
	
	/**
	 * 查询数据,返回ZTree树形数据结构
	 * @param resId 资源ID
	 * @return 返回SmartResponse对象；如果getResult()为“1”表示获取数据成功；否则失败；
	 * 如果成功；通过调用getDatas()获取数据列表
	 */
	public SmartResponse<ZTreeData> getZTreeDatas(String resId);
	
	/**
	 * 自动完成
	 * @param resId 资源ID
	 * @param params 参数
	 * @return 返回SmartResponse对象；如果getResult()为“1”表示获取数据成功；否则失败；
	 * 如果成功；通过调用getDatas()获取数据列表
	 */
	public SmartResponse<AutoComplete> getAutoCompleteDatas(String resId,Map<String,Object> params);
	
	/**
	 * 执行update,delete等的sql
	 * @param resId 资源ID
	 * @param params 参数
	 * @return 返回SmartResponse对象；如果getResult()为“1”表示执行成功；否则失败；
	 */
	public SmartResponse<String> execute(String resId,Map<String,Object> params);

	/**
	 * 根据资源ID及提供的参数，获取指定 <code>clazz</code> 类列表的数据
	 * @param resId 资源ID
	 * @param params 参数
	 * @param clazz 需要转换类型的类
	 * @return 返回SmartResponse对象；如果getResult()为“1”表示获取数据成功；否则失败；
	 * 如果成功；通过调用getDatas()获取数据列表
	 */
	public <E> SmartResponse<E> getDatas(String resId, Map<String, Object> params, Class<?> clazz);
	
	/**
	 * 统计
	 * @param resId 资源ID
	 * @param params 参数
	 * @return 返回SmartResponse对象；如果getResult()为“1”表示执行成功；否则失败；
	 */
	public SmartResponse<Long> count(String resId,Map<String,Object> params);

	/**
	 * 获取数据通过SQL语句
	 * @param sql SQL语句
	 * @param param SQL语句参数
	 * @return 返回SmartResponse对象；如果getResult()为“1”表示执行成功；否则失败；
	 */
	public SmartResponse<Object> getDatasBySql(String sql, Map<String, Object> param);

	/**
	 * 执行SQL语句
	 * @param sql SQL语句（删除或更新或插入语句）
	 * @param param SQL语句参数
	 * @return 返回SmartResponse对象；如果getResult()为“1”表示执行成功；否则失败；
	 */
	public SmartResponse<String> executeBySql(String sql, Map<String, Object> param);

	/**
	 * 执行SQL语句
	 * @param sql SQL语句（删除或更新或插入语句）
	 * @param params SQL语句参数列表
	 * @return 返回SmartResponse对象；如果getResult()为“1”表示执行成功；否则失败；
	 */
	public SmartResponse<String> executeBySql(String sql, List<Map<String, Object>> params);
}
