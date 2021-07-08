package com.jeasy.redis;


import redis.clients.jedis.JedisPubSub;

/**
 * @author taomk
 * @version 1.0
 * @since 2014/9/22 14:33
 */
public abstract class RedisPubSubListener extends JedisPubSub {

    // 取得订阅的消息后的处理
    public abstract void onMessage(String channel, String message);

    // 初始化订阅时候的处理
    public void onSubscribe(String channel, int subscribedChannels) {

    }

    // 取消订阅时候的处理
    public void onUnsubscribe(String channel, int subscribedChannels) {

    }

    // 初始化按表达式的方式订阅时候的处理
    public void onPSubscribe(String pattern, int subscribedChannels) {

    }

    // 取消按表达式的方式订阅时候的处理
    public void onPUnsubscribe(String pattern, int subscribedChannels) {

    }

    // 取得按表达式的方式订阅的消息后的处理
    public void onPMessage(String pattern, String channel, String message) {

    }

}
