package com.jacarrichan.demo.common.dubbo.filter;

import lombok.extern.slf4j.Slf4j;

import com.alibaba.dubbo.rpc.Filter;
import com.alibaba.dubbo.rpc.Invocation;
import com.alibaba.dubbo.rpc.Invoker;
import com.alibaba.dubbo.rpc.Result;
import com.alibaba.dubbo.rpc.RpcContext;
import com.alibaba.dubbo.rpc.RpcException;

@Slf4j
public class ExampleDubboFilter implements Filter {

	@Override
	public Result invoke(Invoker<?> invoker, Invocation invocation)
			throws RpcException {
		RpcContext context = RpcContext.getContext();
		boolean isConsumer = context.isConsumerSide();
		if (isConsumer) {
			log.info("当前是Consumer，可以从{}中取出数据，放进{}", "Threadlocal",
					invocation.getAttachments());
		} else {
			log.info(
					"当前是Provider，可以从{}中取出数据，放进{}" + invocation.getAttachments(),
					"Threadlocal");
		}
		return invoker.invoke(invocation);
	}
}
