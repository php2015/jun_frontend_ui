package com.jeasy.util;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.collections.list.SetUniqueList;

import lombok.extern.slf4j.Slf4j;

/**
 * 提供一些Url的工具类
 * @author taomk
 */
@Slf4j
public class UrlUtils {

    @SuppressWarnings("unchecked")
    public static String getHostsIfUnique(List<String> urls) {
        List<String> host = SetUniqueList.decorate(new ArrayList<String>());
        for (String u : urls) {
            try {
                URL url = new URL(u);
                host.add(url.getHost());
            }
            catch (MalformedURLException e) {
                return null;
            }
        }
        if (host.size() == 1) {
            return host.get(0);
        }
        else {
            return null;
        }
    }

    public static String getHostsIfUnique(String url) {
        return getHostsIfUnique(Arrays.asList(url));
    }
}
