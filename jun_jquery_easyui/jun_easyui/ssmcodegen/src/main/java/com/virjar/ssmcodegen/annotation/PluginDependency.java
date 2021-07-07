package com.virjar.ssmcodegen.annotation;

import com.virjar.ssmcodegen.plugin.Plugin;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 用于标示插件依赖
 * Created by virjar on 16/7/30.
 */
@Target({ElementType.TYPE,ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface PluginDependency {
    Class<Plugin>[] value();
}
