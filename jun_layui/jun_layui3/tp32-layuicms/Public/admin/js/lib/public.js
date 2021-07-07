/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/  
function formatTime(number,format) {  
  
  var formateArr  = ['Y','m','d','H','i','s'];  
  var returnArr   = [];  
  
  var date = new Date(number * 1000);  
  returnArr.push(date.getFullYear());  
  returnArr.push(formatNumber(date.getMonth() + 1));  
  returnArr.push(formatNumber(date.getDate()));  
  
  returnArr.push(formatNumber(date.getHours()));  
  returnArr.push(formatNumber(date.getMinutes()));  
  returnArr.push(formatNumber(date.getSeconds()));  
  
  for (var i in returnArr)  
  {  
    format = format.replace(formateArr[i], returnArr[i]);  
  }  
  return format;  
} 

//数据转化  
function formatNumber(n) {  
  n = n.toString()  
  return n[1] ? n : '0' + n  
}
// 使用方法
// var sjc = 1488481383;//时间戳
// console.log(time.formatTime(sjc,'Y-m-d H:i:s'));//转换为日期：2017-03-03 03:03:03   


/**
 * 长度限制-不能超过多少
 * val：要限制的值
 * num：阈值
 */
function ltLength(val,num) 
{
  if(val.length > num){
		return false;
  } else {
    return true;
  }
}

/**
 * 长度限制-在区间内
 * val:要限制的值
 * num1:最小长度
 * num2:最大长度
 */
function rangeLength(val,num1,num2)
{
  if (val.length >= num1 && val.length <= num2) {
    return true;
  } else {
    return false;
  }
}

/**
 * 只能是汉字
 * val:要判断的值
 */
function isChinese(val) 
{
  var reg = /^[\u0391-\uFFE5]+$/;
  if (val != "" && !reg.test(val)) {
    return false;
  } else {
    return true;
  }
}

/**
 * 只能是英文字母
 * val:要判断的值
 */
function isZm(val) 
{
  var zmReg = /^[a-zA-Z]*$/;
  if (val != "" && !zmReg.test(val)) {
    return false;
  } else {
    return true;
  }
}

/**
 * 只能是英文字母和数字
 * val:要判断的值
 */
function isZmNum(val)
{
  var zmnumReg = /^[0-9a-zA-Z]*$/;
  if (val != "" && !zmnumReg.test(val)) {
    return false;
  } else {
    return true;
  }
}

/**
 * 合法的邮箱
 * val:要判断的值
 */
function isEmail(val)
{
  var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if (!myreg.test(val)) {
    return false;
  } else {
    return true;
  }
}

/**
 * 合法的手机号
 * val:要判断的值
 */
function isMovePhone(val)
{
  if (val.length == 0) {
    return false;
  }

  if (val.length != 11) {
    return false;
  }

  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  if (!myreg.test(val)) {
    return false;
  }

  return true;
}
