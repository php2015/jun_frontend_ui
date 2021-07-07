package com.jeasy.env;

import java.util.*;

import org.apache.commons.lang.StringUtils;

/**
 * ServerMapping的实现
 */
public class ServerMappingImpl implements ServerMapping {

    private final Map<Pair<Env, String>, List<String>> configuredVirtualHosts = new HashMap<Pair<Env, String>, List<String>>();

    private final Set<String> knownVirtualHosts = new HashSet<String>();

    protected void addConfig(Env env, String virtualHost, String realHost) {
        Pair<Env, String> key = new Pair<Env, String>(env, virtualHost);
        List<String> values = configuredVirtualHosts.get(key);
        if (values == null) {
            values = new ArrayList<String>();
        }
        values.add(realHost);
        configuredVirtualHosts.put(key, values);
        knownVirtualHosts.add(virtualHost);
    }

    @Override
    public boolean equals(Object o) {
        if (o instanceof ServerMappingImpl) {
            ServerMappingImpl smi = (ServerMappingImpl) o;
            return configuredVirtualHosts.equals(smi.configuredVirtualHosts) && knownVirtualHosts.equals(smi.knownVirtualHosts);
        }
        else {
            return false;
        }
    }


    @Override
    public List<String> getUrls(String url) {
        for (String virtualHost : knownVirtualHosts) {
            if (StringUtils.contains(url, virtualHost)) {
                List<String> result;
                result = getSystemPropertyUrls(url, virtualHost);
                if (result != null) {
                    return result;
                }
                result = getConfiguredUrls(url, virtualHost, Env.CURRENT);
                if (result != null) {
                    return result;
                }
                throw new IllegalArgumentException("The configuration for virtual host [" + virtualHost + "] is not found");
            }
        }
        return Arrays.asList(url);
    }

    private List<String> getSystemPropertyUrls(String url, String virtualHost) {
        String realHost = System.getProperty(virtualHost);
        if (StringUtils.isBlank(realHost)) {
            return null;
        }
        String mappedUrl = StringUtils.replace(url, virtualHost, realHost);
        return Arrays.asList(mappedUrl);
    }

    private List<String> getConfiguredUrls(String url, String virtualHost, Env env) {
        List<String> realHosts = getConfiguredHost(virtualHost, env);
        if (realHosts == null) {
            return null;
        }
        List<String> mappedUrls = new ArrayList<String>();
        for (String realHost : realHosts) {
            mappedUrls.add(StringUtils.replace(url, virtualHost, realHost));
        }
        return mappedUrls;
    }

    private List<String> getConfiguredHost(String virtualHost, Env env) {
        List<String> realHosts = configuredVirtualHosts.get(new Pair<Env, String>(env, virtualHost));
        if (realHosts == null && env != null) {
            realHosts = configuredVirtualHosts.get(new Pair<Env, String>(env.getRoot(), virtualHost));
        }
        return realHosts;
    }


}
