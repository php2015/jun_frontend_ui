<#include "include/head.ftl">
<#include "include/copyright.ftl">

package ${NamespaceService};

import ${NamespaceProject}.domain.BaseDomain;
import ${NamespaceProject}.dao.IBaseDAO;
import ${NamespaceProject}.service.IBaseService;
import cn.thinkjoy.common.service.IPageService;

 /**
 * 《${tableLabel}》 业务逻辑服务接口
 * @author ${copyright.author}
 *
 */
public interface I${Po}Service<D extends IBaseDAO<T>, T extends BaseDomain> extends IBaseService<D, T>,IPageService<D, T>{

}