package com.vo;

import top.appx.easysql.Restrain;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by john on 2015/12/12.
 */
public class QueryPageVO {
    private int page;
    private int pageSize;
    private List<Restrain> restrainList = new ArrayList<Restrain>();

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public List<Restrain> getRestrainList() {
        return restrainList;
    }

    public void setRestrainList(List<Restrain> restrainList) {
        this.restrainList = restrainList;
    }
}
