package com.virjar.ssmcodegen.plugin;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.virjar.ssmcodegen.annotation.PluginDependency;
import com.virjar.ssmcodegen.config.Context;
import com.virjar.ssmcodegen.exception.ValidationError;
import com.virjar.ssmcodegen.internal.ObjectFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentMap;

public class PluginRegistry {
    private Map<Class, Map<String, Object>> attributes = Maps.newHashMap();
    private List<Class<? extends Plugin>> pluginViews = Lists.newArrayList();
    private List<Plugin> plugins = Lists.newArrayList();
    private boolean hasCreateAllPlugin = false;
    private boolean hasInited = false;
    private static final int maxPluginDependencyDeep = 20;
    private static final Logger logger = LoggerFactory.getLogger(PluginRegistry.class);
    private Context context;

    private PluginRegistry(Context context) {
        this.context = context;
    }

    private static final ConcurrentMap<Context, PluginRegistry> instances = Maps.newConcurrentMap();

    public static PluginRegistry getInstance(Context context) {
        synchronized (context.getClass()) {
            PluginRegistry pluginRegistry = instances.get(context);
            if (pluginRegistry == null) {
                pluginRegistry = new PluginRegistry(context);
                instances.put(context, pluginRegistry);
            }
            return pluginRegistry;
        }
    }

    public void addPlugin(Class<? extends Plugin> pluginClazz) {
        if (pluginViews.contains(pluginClazz)) {
            throw new ValidationError("plugin:" + pluginClazz + " has already registered");
        }
        for (Plugin plugin : plugins) {
            if (pluginClazz.equals(plugin.getClass())) {
                throw new ValidationError("plugin:" + pluginClazz + " has already registered,");
            }
        }
        pluginViews.add(pluginClazz);
    }

    public void addPlugin(Plugin plugin) {
        /*
         * 允许这种情况发生 if(plugins.contains(plugin)){ throw new ValidationError("plugin:" + plugin +
         * " has already registered,for clazz:"+plugin.getClass()); }
         */
        for (Class<? extends Plugin> pluginClazz : pluginViews) {
            if (pluginClazz.equals(plugin.getClass())) {
                throw new ValidationError("plugin:" + pluginClazz + " has already registered,");
            }
        }
        plugins.add(plugin);
    }

    public boolean hasPluginRegistered(Class<? extends Plugin> clazz) {
        if (pluginViews.contains(clazz)) {
            return true;
        }
        for (Plugin plugin : plugins) {
            if (clazz.equals(plugin.getClass())) {
                return true;
            }
        }
        return false;
    }

    public boolean hasPluginRegistered(Plugin plugin) {
        return plugins.contains(plugin);
    }

    private void createPlugins() {
        if (hasCreateAllPlugin) {
            return;
        }
        for (Class<? extends Plugin> clazz : pluginViews) {
            Plugin internalObject = ObjectFactory.createInternalObject(clazz);
            internalObject.setContext(context);
            plugins.add(internalObject);
        }
        hasCreateAllPlugin = true;
    }

    public void initAttritute() {
        if (!hasCreateAllPlugin) {
            createPlugins();
        }
        if (hasInited) {
            return;
        }
        Map<Class, Boolean> hasInitedPlugins = Maps.newHashMap();
        for (Plugin plugin : plugins) {
            if (!hasInitedPlugins.containsKey(plugin.getClass())) {
                initPluginInternal(plugin, hasInitedPlugins, 0);
            }
        }
        hasInited = true;
    }

    private void removeByClazz(Class clazz) {
        Iterator<Plugin> iterator = plugins.iterator();
        while (iterator.hasNext()) {
            Plugin next = iterator.next();
            if (next.getClass().equals(clazz)) {
                iterator.remove();
            }
        }
        if (pluginViews.contains(clazz)) {
            pluginViews.remove(clazz);
        }
    }

    public List<Plugin> findAllByClazz(Class<? extends Plugin> clazz){
        List<Plugin> ret = Lists.newArrayList();
        for(Plugin plugin:plugins){
            if(plugin.getClass().equals(clazz)){
                ret.add(plugin);
            }
        }
        return ret;
    }

    private Plugin findOnePluginByClazz(Class<? extends Plugin> clazz) {
        for (Plugin plugin : plugins) {
            if (plugin.getClass().equals(clazz)) {
                return plugin;
            }
        }
        return null;
    }

    private void initPluginInternal(Plugin plugin, Map<Class, Boolean> hasInitedPlugins, int deep) {
        if (deep > maxPluginDependencyDeep) {
            throw new ValidationError("plugin " + plugin.getClass() + "dependency retch max deep:"
                    + maxPluginDependencyDeep + ". This maybe recursion dependency");
        }
        Class<? extends Plugin> aClass = plugin.getClass();
        // 初始化依赖插件
        PluginDependency pluginDependency = aClass.getAnnotation(PluginDependency.class);
        Class[] dependencyClasses = null;
        if (pluginDependency != null) {
            dependencyClasses = pluginDependency.value();
            for (Class clazz : dependencyClasses) {
                if (hasInitedPlugins.containsKey(clazz)) {
                    if (hasInitedPlugins.get(clazz)) {
                        continue;
                    } else {
                        // 依赖插件验证失败,本插件不生效
                        logger.warn("plugin " + plugin.getClass() + " validation failed, because of failed plugin :"
                                + clazz);
                        removeByClazz(plugin.getClass());
                        return;
                    }
                }
                Plugin dependencyPlugin = findOnePluginByClazz(clazz);
                initPluginInternal(dependencyPlugin, hasInitedPlugins, deep++);
            }
        }

        // 初始化自己
        Map<Class, Map<String, Object>> dependencyAttribute = Maps.newHashMap();
        if (dependencyClasses != null) {
            for (Class clazz : dependencyClasses) {
                dependencyAttribute.put(clazz, Collections.unmodifiableMap(attributes.get(clazz)));
            }
        }
        Map<String, Object> stringObjectMap = plugin.pluginSetAttribute(dependencyAttribute);
        if (plugin.pluginValidate()) {
            attributes.put(plugin.getClass(), stringObjectMap);
            hasInitedPlugins.put(plugin.getClass(), true);
        } else {
            hasInitedPlugins.put(plugin.getClass(), false);
            removeByClazz(plugin.getClass());
            logger.warn("plugin " + plugin.getClass() + " validation failed");
        }
    }

    public Map<Class, Map<String, Object>> getAttributesByType(Class<? extends Plugin> clazz) {
        if (!hasInited) {
            initAttritute();
        }
        if (!pluginViews.contains(clazz)) {
            throw new IllegalStateException("class " + clazz + " did not register");
        }
        Map<Class, Map<String, Object>> answer = Maps.newHashMap();
        PluginDependency pluginDependency = clazz.getAnnotation(PluginDependency.class);
        Class[] dependencyClasses = null;
        if (pluginDependency != null) {
            dependencyClasses = pluginDependency.value();
            for (Class dependncyClazz : dependencyClasses) {
                answer.put(dependncyClazz, attributes.get(dependncyClazz));
            }
        }
        answer.put(clazz, attributes.get(clazz));
        return answer;
    }

    public List<Plugin> getPlugins() {
        return Collections.unmodifiableList(plugins);
    }
}
