package ${conf.basePackage}.${table.camelName}.route;

import ${conf.basePackage}.${table.camelName}.controller.BlogController;
import com.jfinal.config.Routes;

/**
 * ${table.comment}
 * @author ${conf.author}
 * @version ${conf.version}
 * @since ${conf.createDate}
 */
public class ${table.className}Routes extends Routes {

    @Override
    public void config() {
        add("/${table.camelName}", ${table.className}Controller.class);
    }
}