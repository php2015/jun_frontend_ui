<#include "include/head.ftl">
<#include "include/copyright.ftl">

package ${NamespaceServiceImpl};

import ${NamespaceProject}.domain.BaseDomain;
import ${NamespaceProject}.dao.IBaseDAO;
import ${NamespaceDao}.I${Po}DAO;
import ${NamespaceDomain}.${Po};
import ${NamespaceService}.I${Po}Service;
import ${NamespaceProject}.service.AbstractPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

 /**
 * 《${tableLabel}》 业务逻辑服务类
 * @author ${copyright.author}
 *
 */
@Service("${Po}ServiceImpl")
public class ${Po}ServiceImpl extends AbstractPageService<IBaseDAO<${Po}>, ${Po}> implements I${Po}Service<IBaseDAO<${Po}>,${Po}>{
    @Autowired
    private I${Po}DAO ${po}DAO;

    @Override
    public IBaseDAO<${Po}> getDao() {
        return ${po}DAO;
    }

}