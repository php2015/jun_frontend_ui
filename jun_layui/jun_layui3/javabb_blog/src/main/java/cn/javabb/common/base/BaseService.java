package cn.javabb.common.base;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import cn.javabb.common.util.BUtil;
import cn.javabb.common.util.SpringUtil;
import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.entity.Example.Criteria;

public class BaseService<T extends BaseEntity> {
	@Autowired
	protected SqlSessionTemplate sqlSessionTemplate;
	private static final String SQLID = "sqlid";
	@Autowired
	private Mapper<T> mapper;

	/***********************
	 * sqlid+map xml中会获取到所有Map里面的参数
	 ************************/
	/**
	 * 查询列表，分页的时候就带分页参数 分页参数 page,size，没有为不分页
	 * 
	 * @param map
	 *            必带参数 sqlid
	 * @return
	 */
	public List<T> queryList(Map<String, Object> map) {
		if (!BUtil.isNull(map.get("page")) && !BUtil.isNull(map.get("size"))) {
			PageHelper.startPage(Integer.parseInt(map.get("page") + ""), Integer.parseInt(map.get("size") + ""));
		}
		List<T> queryList = sqlSessionTemplate.selectList((String) map.get(SQLID), map);
		return queryList;
	}

	/**
	 * Description: 分页查询数据
	 * 
	 * @author QINB
	 * @param map
	 * @return
	 */
	public Page<?> queryListPage(JSONObject map) {
		Page<?> p = null;
		if (!BUtil.isNull(map.get("page")) && !BUtil.isNull(map.get("size"))) {
			p = PageHelper.startPage(Integer.parseInt(map.get("page") + ""), Integer.parseInt(map.get("size") + ""));
		} else {
			p = PageHelper.startPage(1, 10);
		}
		sqlSessionTemplate.selectList((String) map.get(SQLID), map);
		return p;
	}

	/**
	 * 
	 * Description: 不分页查询
	 * 
	 * @author QINB
	 * @param map
	 * @return
	 */
	public List<T> queryListNoPage(Map<String, Object> map) {
		List<T> queryList = sqlSessionTemplate.selectList((String) map.get(SQLID), map);
		return queryList;
	}

	/**
	 * 查询单条记录,多条记录会报错，如果不知道多少条记录，用上面的queryList
	 * 
	 * @param map
	 *            必带参数 sqlid
	 * @return
	 */
	public T queryOne(Map<String, Object> map) {
		return sqlSessionTemplate.selectOne((String) map.get(SQLID), map);
	}

	/**
	 * @param sqlid
	 * @param map
	 * @return List<Map<?, ?>>
	 */
	public List<Map<?, ?>> queryListMap(Map<String, Object> map) {
		return sqlSessionTemplate.selectList((String) map.get(SQLID), map);
	}

	/*********************** 通用Mapper ****************************/
	/**
	 * 根据ID查询数据
	 * 
	 * @param id
	 * @return
	 */
	public T queryById(String id) {
		return this.mapper.selectByPrimaryKey(id);
	}
	/**
     * 根据ID查询数据
     * 
     * @param id
     * @return
     */
    public T queryById(Integer id) {
        return this.mapper.selectByPrimaryKey(id);
    }
	/**
	 * 查询所有数据
	 * 
	 * @return
	 */
	public List<T> queryAll() {
	    
		return this.mapper.select(null);
	}
	/**
     * 查询所有数据
     * 
     * @return
     */
    public List<T> queryListByExample(Example example) {
        return this.mapper.selectByExample(example);
    }
	/**
	 * 查询一条数据
	 * 
	 * @param record
	 * @return
	 */
	public T queryOne(T record) {
		// mapper = getMapperBean((Class<T>) record.getClass());
		// mapper = (Mapper<T>)SpringUtil.getBean("userMapper");
		return (T) mapper.selectOne(record);
	}

	/**
	 * 根据条件查询列表
	 * 
	 * @param record
	 * @return
	 */
	public List<T> queryListByWhere(T record) {
		// mapper = getMapperBean((Class<T>) record.getClass());
	    Example example = new Example(record.getClass());
	    example.orderBy("updateDate").desc();
	    return mapper.selectByExample(example);
		//return (List<T>) mapper.select(record);
	}

	public List<T> queryListByIds(Class<T> clazz, String property, List<String> values) {
		Example example = new Example(clazz);
		example.createCriteria().andIn(property, values);
		return (List<T>) mapper.selectByExample(example);
	}

	/**
	 * 分页查询数据列表
	 * 
	 * @param page
	 * @param rows
	 * @param record
	 * @return
	 */
	public List<T> queryPageListByWhere(String page, String size, T record) {
		// mapper = getMapperBean((Class<T>) record.getClass());
		if (BUtil.isNull(page)) {
			page = "1";
		}
		if (BUtil.isNull(size)) {
		    size = "10";
		}
		PageHelper.startPage(Integer.valueOf(page), Integer.valueOf(size));
		List<T> list = mapper.select(record);
		return new PageInfo<T>(list).getList();
	}

	/**
	 * 分页查询数据列表
	 * 
	 * @param page
	 * @param rows
	 * @param record
	 * @return
	 */
	public Page<T> queryPageByWhere(String page, String rows, T record) {
		// mapper = getMapperBean((Class<T>) record.getClass());
		if (BUtil.isNull(page)) {
			page = "1";
		}
		if (BUtil.isNull(rows)) {
			rows = "10";
		}
		Page<T> p = PageHelper.startPage(Integer.valueOf(page), Integer.valueOf(rows));
		Example example = new Example(record.getClass());
        example.orderBy("updateDate").desc();
		mapper.selectByExample(example);
		return p;
	}

	/**
	 * 新增
	 * 
	 * @param record
	 * @return
	 */
	public Integer insert(T record) {
		// mapper = getMapperBean((Class<T>) record.getClass());
		Date date = new Date();
		record.setCreateDate(date);
		record.setUpdateDate(date);
		return mapper.insert(record);
	}

	/**
	 * 有选择的保存，选择不为null的字段作为插入字段
	 * 
	 * @param record
	 * @return
	 */
	public Integer insertSelective(T record) {
		// mapper = getMapperBean((Class<T>) record.getClass());
		Date date = new Date();
		record.setCreateDate(date);
		record.setUpdateDate(date);
		return mapper.insertSelective(record);
	}

	/**
	 * 更新
	 * 
	 * @param record
	 * @return
	 */
	public Integer update(T record) {
		// mapper = getMapperBean((Class<T>) record.getClass());
		record.setUpdateDate(new Date()); // 改变更新时间
		return mapper.updateByPrimaryKey(record);
	}

	/**
	 * 保存,有选择性的更新不为null的字段
	 * 
	 * @param record
	 * @return
	 */
	public Integer updateSelective(T record) {
		// mapper = getMapperBean((Class<T>) record.getClass());
		record.setUpdateDate(new Date()); // 改变更新时间
		return mapper.updateByPrimaryKeySelective(record);
	}
	public Integer updateSelectiveNoOther(T record) {
        return mapper.updateByPrimaryKeySelective(record);
    }
	/**
	 * 根据主键删除
	 * 
	 * @param id
	 * @return
	 */
	public Integer deleteById(String id) {
		return this.mapper.deleteByPrimaryKey(id);
	}

	/**
	 * 批量删除
	 * 
	 * @param clazz
	 * @param property
	 * @param values
	 * @return
	 */
	public Integer deleteByIds(Class<T> clazz, String property, List<String> values) {
		Example example = new Example(clazz);
		example.createCriteria().andIn(property, values);
		return this.mapper.deleteByExample(example);
	}

	/**
	 * 根据Bean条件删除
	 * 
	 * @param record
	 * @return
	 */
	public Integer deleteByWhere(T record) {
		// mapper = getMapperBean((Class<T>) record.getClass());
		return mapper.delete(record);
	}

	/**
	 * 查询总数 Description:
	 * 
	 * @author QINB
	 * @param record
	 * @return
	 */
	public Integer queryCountByWhere(T record) {
		// mapper = getMapperBean((Class<T>) record.getClass());
		return mapper.selectCount(record);
	}

	public Integer queryCountByExample(Example example) {
		return mapper.selectCountByExample(example);
	}
	/**
	 * 查询重复
	 * Description: 
	 *  
	 * @author QINB
	 * @param clazz 实体类
	 * @param notProperty 排除的属性
	 * @param notPropertyValue 排除的属性的值
	 * @param propertyMap 查询重复的属性和值，以键值对应。
	 * @return 重复了就返回true，没有重复就返回false
	 */
	public boolean queryRepeat(Class<T> clazz,String notProperty,Object notPropertyValue,Map<String,Object> propertyMap){
	    Example example = new Example(clazz);
	    Criteria c = example.createCriteria().andNotEqualTo(notProperty, notPropertyValue);
	    for(Map.Entry<String, Object> entry : propertyMap.entrySet()){
	        c.andEqualTo(entry.getKey(),entry.getValue());
	      }
	    return this.mapper.selectCountByExample(example)>0?true:false;
	}
	/**
	 * 获取bean
	 * 
	 * @param c
	 * @return
	 */
	public Mapper<T> getMapperBean(Class<T> c) {
		return SpringUtil.getMapperBean(c);
	}

}
