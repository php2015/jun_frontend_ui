import {fetchTemplate} from "./fetch.base.js"

function formatSearchParmas(data){
	const searchParmas=Object.keys(data);
	if(searchParmas.length>0){
		return String("?").concat(searchParmas.map((keyname,index)=>{
			return `${keyname}=${data[keyname]}`
		}).join("&"))
	}else{
		return String("")
	}
}

export default function fetchGet(options,outputCancel){
	if(typeof options==="object"){
		const {url,data}=options;
		return fetchTemplate({
			url:url+formatSearchParmas(data||{}),
			method:"GET",
		},outputCancel||(()=>{}))		
	}
	if(typeof options==="string"){
		const url=options;
		return fetchTemplate({
			url:url,
			method:"GET",
		},outputCancel||(()=>{}))			
	}
}