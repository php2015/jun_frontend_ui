const hostname="http://localhost:5000/";

export function polyfillHostName(hostname){
	//去掉hostname部分最后的斜线
	return hostname.replace(/\/$/ig,"")
}

export function polyfillUrl(url){
	//去掉url部分前后的斜线
	return url.replace(/^\//ig,"").replace(/\/$/ig,"");
}

export function fetchTemplate(options,outputCancel){
	const {url,method,data,...otherOptions}=options;
	const formatURL=`${polyfillHostName(hostname)}/${polyfillUrl(url)}`;
	const primaryPromise=fetch(formatURL,{
		//主体promise
		body:data||null,
		method:method,
		...otherOptions
	});

	const controlPromise=new Promise((resolve,reject)=>{
		//用于控制的promise
		outputCancel(()=>{
			reject({type:"CANCEL",tip:"本次网络请求被忽略"})
		})
	});
	
	return Promise.race([
		//使用Promise.race竞赛
		primaryPromise,
		controlPromise
	]).then((response)=>{
		return response.json()
	}).then((result)=>{
		return result
	}).catch((error)=>{
		throw error
	})
}

