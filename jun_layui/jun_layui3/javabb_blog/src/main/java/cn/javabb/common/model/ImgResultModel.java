package cn.javabb.common.model;

import java.util.List;

import lombok.Data;

/**
 * 
 * <Description> 
 * wangEditor上传图片返回Model 
 * @author QINB
 * @CreateDate 2018年7月15日 上午10:24:47
 * @since V1.0
 * @see cn.javabb.common.model
 */
@Data
public class ImgResultModel {

    private Integer errno; //错误代码
    
    private List<String> data;
}
