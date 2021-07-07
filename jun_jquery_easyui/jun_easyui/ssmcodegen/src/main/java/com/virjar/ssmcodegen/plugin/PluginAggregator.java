package com.virjar.ssmcodegen.plugin;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.virjar.ssmcodegen.annotation.PluginDependency;
import com.virjar.ssmcodegen.config.Context;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

public class PluginAggregator implements InvocationHandler {
    private PluginRegistry pluginRegistry;
    private Map<Method, List<Plugin>> sortedPluginCache = Maps.newHashMap();

    public PluginAggregator(Context context) {
        pluginRegistry = PluginRegistry.getInstance(context);
    }

    private List<Plugin> sort4Method(Method method) {
        List<Plugin> plugins = sortedPluginCache.get(method);
        if (plugins != null) {
            return plugins;
        }
        // 对插件执行顺序进行拓扑排序
        List<PluginSortView> pluginSortViews = buildGraph(pluginRegistry.getPlugins(), method);
        List<Plugin> sortedPlugins = Lists.newArrayList();
        PluginSortView first = findFirst(pluginSortViews);
        while (first != null) {
            sortedPlugins.addAll(pluginRegistry.findAllByClazz(first.getClazz()));
            pluginSortViews.remove(first);
            first.removeNextPlugins();
            first = findFirst(pluginSortViews);
        }
        if (pluginSortViews.size() > 0) {
            // TODO 循环依赖打印
            throw new IllegalStateException("插件出现循环依赖,请检查 method:" + method.getName());
        }
        sortedPluginCache.put(method, sortedPlugins);
        return sortedPlugins;
    }

    private PluginSortView findFirst(List<PluginSortView> pluginSortViews) {
        for (PluginSortView pluginSortView : pluginSortViews) {
            if (pluginSortView.deep.get() == 0) {
                return pluginSortView;
            }
        }
        return null;
    }

    private void buildGraphInternal(Method methodView, Class<? extends Plugin> clazz,
            Map<Class<? extends Plugin>, PluginSortView> addedPlugins, PluginSortView parentView) {
        PluginSortView pluginSortView = addedPlugins.get(clazz);
        if (pluginSortView != null) {
            pluginSortView.addNextPlugins(parentView);
            return;
        }
        pluginSortView = new PluginSortView(clazz);
        pluginSortView.addNextPlugins(parentView);
        addedPlugins.put(clazz, pluginSortView);

        try {
            Method method = clazz.getMethod(methodView.getName(), methodView.getParameterTypes());
            PluginDependency annotation = method.getAnnotation(PluginDependency.class);
            if (annotation == null) {
                return;
            }
            for (Class<? extends Plugin> dependencyClazz : annotation.value()) {
                buildGraphInternal(methodView, dependencyClazz, addedPlugins, pluginSortView);
            }
        } catch (NoSuchMethodException e) {
            // not happen
        }
    }

    private List<PluginSortView> buildGraph(List<Plugin> plugins, Method methodView) {
        Map<Class<? extends Plugin>, PluginSortView> addedPlugins = Maps.newHashMap();
        for (Plugin plugin : plugins) {
            Class<? extends Plugin> key = plugin.getClass();
            if (addedPlugins.containsKey(key)) {
                continue;
            }
            PluginSortView pluginSortView = new PluginSortView(key);
            addedPlugins.put(key, pluginSortView);
            try {
                Method method = key.getMethod(methodView.getName(), methodView.getParameterTypes());
                PluginDependency annotation = method.getAnnotation(PluginDependency.class);
                if (annotation == null) {
                    continue;
                }
                for (Class<? extends Plugin> clazz : annotation.value()) {
                    buildGraphInternal(methodView, clazz, addedPlugins, pluginSortView);
                }
            } catch (NoSuchMethodException e) {
                // not happen
            }
        }
        return Lists.newArrayList(addedPlugins.values());
    }

    private class PluginSortView {

        private AtomicInteger deep;
        private Class<? extends Plugin> clazz;
        private List<PluginSortView> nextPlugins = Lists.newArrayList();

        public PluginSortView(Class<? extends Plugin> clazz) {
            this.clazz = clazz;
            deep = new AtomicInteger(0);
        }

        public void addNextPlugins(PluginSortView pluginSortView) {
            nextPlugins.add(pluginSortView);
            pluginSortView.deep.incrementAndGet();
        }

        public void removeNextPlugins() {
            for (PluginSortView pluginSortView : nextPlugins) {
                pluginSortView.deep.decrementAndGet();
            }
            this.nextPlugins.clear();
        }

        public Class<? extends Plugin> getClazz() {
            return clazz;
        }

    }

    private Object handelBoolean(Method method, Object[] args)
            throws InvocationTargetException, IllegalAccessException {
        List<Plugin> plugins = sort4Method(method);
        for (Plugin plugin : plugins) {
            Boolean ret = (Boolean) method.invoke(plugin, args);
            if (ret != null && !ret) {
                return false;
            }
        }
        return true;
    }

    private Object handelList(Method method, Object[] args) throws InvocationTargetException, IllegalAccessException {
        List<Plugin> plugins = sort4Method(method);
        List<Object> ret = null;
        for (Plugin plugin : plugins) {
            List<Object> rettemp = (List<Object>) method.invoke(plugin, args);
            if (rettemp == null) {
                continue;
            }
            if (ret == null) {
                ret = rettemp;
            } else {
                try {
                    ret.addAll(rettemp);
                } catch (Exception e) {
                    ret = Lists.newArrayList(ret);
                    ret.add(rettemp);
                }
            }
        }
        return ret;
    }

    private Object handelVoid(Method method, Object[] args) throws InvocationTargetException, IllegalAccessException {
        for (Plugin plugin : sort4Method(method)) {
            method.invoke(plugin, args);
        }
        return null;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        Class<?> returnType = method.getReturnType();
        if (returnType.equals(Boolean.class)) {
            return handelBoolean(method, args);
        } else if (returnType.isAssignableFrom(List.class)) {
            return handelList(method, args);
        } else if (returnType.equals(Void.class)) {
            handelVoid(method, args);
        }
        return null;
    }

    public Plugin getAggregatorPlugin() {
        return (Plugin) Proxy.newProxyInstance(Plugin.class.getClassLoader(), new Class[] { Plugin.class }, this);
    }
}
