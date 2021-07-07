package com.jeasy.base.controller;

import com.jeasy.base.service.BaseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

/**
 * Abstract BaseController
 * @param <T>
 *     ServiceImpl
 * @param <E>
 *     Model
 *
 * @author taomk
 * @version 1.0
 * @since 2015/05/13 17:34
 */
@Slf4j
public class BaseController<T extends BaseService<E>, E> extends ControllerSupport {

    @Autowired
    protected T service;

    protected void list(Map<String, Object> params) {
        List<E> items = service.find(params);
        responseList(ModelResult.CODE_200, ModelResult.SUCCESS, items);
    }

    protected void page(Map<String, Object> params, Integer pageSize, Integer pageNo) {
        int totalCount = service.count(params);
        int offset = (pageNo - 1) * pageSize;
        List<E> items = service.page(params, offset, pageSize);
        responsePage(ModelResult.CODE_200, ModelResult.SUCCESS, totalCount, items, pageSize, pageNo);
    }

    protected void save(E entity) {
        Long result = service.save(entity);
        responseMessage(result == 1 ? ModelResult.CODE_200 : ModelResult.CODE_500, result == 1 ? ModelResult.SUCCESS : ModelResult.FAIL);
    }

    protected void detail(Long id) {
        E entity = service.getById(id);
        responseEntity(ModelResult.CODE_200, ModelResult.SUCCESS, entity);
    }

    protected void update(E entity) {
        int result = service.modify(entity);
        responseMessage(result == 1 ? ModelResult.CODE_200 : ModelResult.CODE_500, result == 1 ? ModelResult.SUCCESS : ModelResult.FAIL);
    }

    protected void delete(Long id) {
        int result = service.remove(id);
        responseMessage(result == 1 ? ModelResult.CODE_200 : ModelResult.CODE_500, result == 1 ? ModelResult.SUCCESS : ModelResult.FAIL);
    }
}
