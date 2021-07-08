package cn.javabb.common.util;

import java.util.Map;

import org.springframework.web.servlet.ModelAndView;
/**
 * 返回工具类
 * @author QINB
 * @CreateDate 2018年9月1日 下午4:03:02
 * @since V1.0
 * @see cn.javabb.common.util
 */
public class ResultUtil {

    public static ModelAndView view(String view) {
        return new ModelAndView(view);
    }

    public static ModelAndView view(String view, Map<String, Object> model) {
        return new ModelAndView(view, model);
    }

    public static ModelAndView redirect(String view) {
        return new ModelAndView("redirect:" + view);
    }
    public static ModelAndView forward(String view) {
        return new ModelAndView("forward:" + view);
    }
    /**
     * 下面可以封装responseModel
     */
}
