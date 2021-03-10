import {fetchTemplate} from "./fetch.base.js"


export default function fetchPost(options,outputCancel){
	const {url,data}=options;
	return fetchTemplate({
		url:url,
		method:"POST",
		headers:{"Content-Type":"application/json;charset=utf-8"},
		data:JSON.stringify(data||{})
	},outputCancel||(()=>{}))
}