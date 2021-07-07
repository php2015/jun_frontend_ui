$().ready(function() {
　　　var method = '1';
	layui.use('form', function(){
		var form = layui.form;
		form.render();
		form.on("radio(method)", function (data) {
			init_form_data();
			method = this.value;
	        if (this.value == '1') {
	        	$("#total_money_item").hide();
	        	$("#gjj_money_item").hide();
	            $("#gjj_rate_item").hide();
	        	$("#gjj_years_item").hide();
	        	$("#sy_money_item").show();
	        	$("#sy_rate_m_item").show();
	        	$("#sy_lpr_item").show();
	        	$("#sy_base_p_item").show();
	        	$("#sy_rate_item").show();
	        	$("#sy_years_item").show();
	        	$(".method-3").hide();
	        	$(".method-0").show();
	        	$(".attach-notice-1").show();
	        	$(".attach-notice-4").hide();
	        }
	        else if (this.value == '2') {
	        	$("#total_money_item").hide();
	        	$("#gjj_money_item").show();
	        	$("#gjj_rate_item").show();
	        	$("#gjj_years_item").show();
	        	$("#sy_money_item").hide();
	        	$("#sy_rate_m_item").hide();
	        	$("#sy_lpr_item").hide();
	        	$("#sy_base_p_item").hide();
	        	$("#sy_rate_item").hide();
	        	$("#sy_years_item").hide();
	        	$(".method-3").hide();
	        	$(".method-0").show();
	        	$(".attach-notice-1").show();
	        	$(".attach-notice-4").hide();
	        }
	        else if (this.value == '3' || this.value == '4') {
	        	$("#total_money_item").show();
	        	$("#gjj_money_item").show();
	        	$("#gjj_rate_item").show();
	        	$("#gjj_years_item").show();
	        	$("#sy_money_item").show();
	        	$("#sy_rate_m_item").show();
	        	$("#sy_lpr_item").show();
	        	$("#sy_base_p_item").show();
	        	$("#sy_rate_item").show();
	        	$("#sy_years_item").show();
	        	$(".method-3").show();
	        	$(".method-0").hide();
	        	if (this.value == '4'){
	        		$(".attach-notice-4").show();
	        	}else{
	        		$(".attach-notice-4").hide();
	        	}
	        	$(".attach-notice-1").hide();
	        }
	    });
	});
	$("#about-tips").mouseover(function(){
		layer.tips("等额本息<br>每月还款金额不变，其中还款的本金逐月递增，利息逐月递减。<br><br>等额本金<br>每月还款金额不同，首月还款最多，之后每月递减。其中每月还款的本金不变，利息逐月减少。", "#about-tips", {
			  tips: [1, '#797c86'],
			  time: 0
		});
	});
	$("#about-tips").mouseout(function(){
		layer.close(layer.index);
	});
	//控制输入格式
	$("input").keydown(function (e) {
		var code = parseInt(e.keyCode);
		if (code >= 96 && code <= 105 || code >= 48 && code <= 57 || code == 8 || code == 9 || code == 110) {
			return true;
		} else {
			return false;
		}
	});
	$("input").bind("input propertychange", function () {
		if (isNaN(parseFloat($(this).val())) || parseFloat($(this).val()) <= 0){
			$(this).val("");
		}
	});
	function init_form_data(){
		$("#total_money").val("");
		$("#gjj_money").val("");
		$("#gjj_rate").val("3.250.htm"/*tpa=http://tools.iters.cn/js/3.250*/);
		$("#gjj_years").val("30");
		$("#sy_money").val("");
		$("#sy_lpr").val("4.65.htm"/*tpa=http://tools.iters.cn/js/4.65*/);
		$("#sy_base_p").val("0");
		$("#sy_lpr2").val("4.65.htm"/*tpa=http://tools.iters.cn/js/4.65*/);
		$("#sy_base_p2").val("0");
		$("#sy_rate").val("4.65.htm"/*tpa=http://tools.iters.cn/js/4.65*/);
		$("#sy_years").val("30");
		$(".month1").html("0");
		$(".month2").html("0");
		$(".month_sub").html("0");
		$(".years").html("0");
		$(".moneys").html("0");
		$(".gjj_years").html("0");
		$(".gjj_moneys").html("0");
		$(".sy_years").html("0");
		$(".sy_moneys").html("0");
		$(".rate_money1").html("0");
		$(".rate_money2").html("0");
		$(".back_money1").html("0");
		$(".back_money2").html("0");
		layui.form.render();
	};
	$("#total_money").on("input",function(e){
	    if(method != 3 && method != 4) return;
	    var m1 = e.delegateTarget.value;m1 = m1 == '' ? 0 : parseFloat(m1);
	    var m2 = $("#gjj_money").val();m2 = m2 == '' ? 0 : parseFloat(m2);
	    if(m2 > m1){
	    	$("#gjj_money").val(m1);
	    	$("#sy_money").val(0);
	    }else{
	    	$("#sy_money").val(m1-m2);
	    }
	});
	$("#gjj_money").on("input",function(e){
	    if(method != 3 && method != 4) return;
		var m2 = e.delegateTarget.value;m2 = m2 == '' ? 0 : parseFloat(m2);
	    var m1 = $("#total_money").val();m1 = m1 == '' ? 0 : parseFloat(m1);
	    if(m2 > m1){
	    	$("#total_money").val(m2);
	    	$("#sy_money").val(0);
	    }else{
	    	$("#sy_money").val(m1-m2);
	    }
	});
	$("#sy_money").on("input",function(e){
	    if(method != 3 && method != 4) return;
		var m3 = e.delegateTarget.value;m3 = m3 == '' ? 0 : parseFloat(m3);
	    var m1 = $("#total_money").val();m1 = m1 == '' ? 0 : parseFloat(m1);
	    if(m3 > m1){
	    	$("#total_money").val(m3);
	    	$("#gjj_money").val(0);
	    }else{
	    	$("#gjj_money").val(m1-m3);
	    }
	});
	$("#sy_lpr").on("input",function(e){
		var m = e.delegateTarget.value;m = m == '' ? 0 : parseFloat(m);
	    var p = $("#sy_base_p").val();p = p == '' ? 0 : parseFloat(p);
	    $("#sy_lpr2").val(m);
    	$("#sy_rate").val((m+p/100).toFixed(3));
	});
	$("#sy_base_p").on("input",function(e){
		var p = e.delegateTarget.value;p = p == '' ? 0 : parseFloat(p);
	    var m = $("#sy_lpr").val();m = m == '' ? 0 : parseFloat(m);
	    $("#sy_base_p2").val(p);
    	$("#sy_rate").val((m+p/100).toFixed(3));
	});
	$("#sy_rate").on("input",function(e){
		var r = e.delegateTarget.value;r = r == '' ? 0 : parseFloat(r);
		var p = $("#sy_base_p").val();p = p == '' ? 0 : parseFloat(p);
	    var m = $("#sy_lpr").val();m = m == '' ? 0 : parseFloat(m);
	    if(r < m){
	    	$("#sy_rate").val((m+p/100).toFixed(3));
	    }else{
	    	var t = (r*1000 - m *1000)/10;
	    	$("#sy_base_p").val(t);
	    	$("#sy_base_p2").val(t);
	    }
	});
	$('.do-action').bind("click", function() {
		var gjj_money = $("#gjj_money").val();
		var gjj_rate = $("#gjj_rate").val();
		var gjj_years = $("#gjj_years").val();
		var sy_money = $("#sy_money").val();
		var sy_rate = $("#sy_rate").val();
		var sy_years = $("#sy_years").val();
		
		if(method == 1){
			$(".years").html(sy_years);
			$(".moneys").html(sy_money);
			var debx_month_money = func_debx_month_money(sy_money, sy_years, sy_rate);
			$(".month1").html(debx_month_money);
			var debj_month_money = func_debj_month_money(sy_money, sy_years, sy_rate);
			$(".month2").html(debj_month_money);
			var debj_month_sub = func_debj_month_sub(sy_money, sy_years, sy_rate);
			$(".month_sub").html(debj_month_sub);
			var debx_rate_money = func_debx_rate_money(sy_money, sy_years, debx_month_money);
			$(".rate_money1").html(debx_rate_money);
			var debj_rate_money = func_debj_rate_money(sy_money, sy_years, sy_rate);
			$(".rate_money2").html(debj_rate_money);
			$(".back_money1").html((sy_money*1000 + debx_rate_money*1000)/1000);
			$(".back_money2").html((sy_money*1000 + debj_rate_money*1000)/1000);
			
			var debj_month_price = func_debj_month_price(sy_money, sy_years);
			for (var i=1;i<=sy_years*12;i++)
			{ 
				var debx_month_price = func_debx_month_price(sy_money, sy_years, sy_rate, i);
				var debx_month_rate = func_debx_month_rate(sy_money, sy_years, sy_rate, i);
				var debj_month_rate = func_debj_month_rate(sy_money, sy_years, sy_rate, i);
				console.log("第"+i+"期,【等额本息】应还本金:"+debx_month_price+";应还利息:"+debx_month_rate+";【等额本金】应还本金:"+debj_month_price+";应还利息:"+debj_month_rate);
			}
		}else if(method == 2){
			$(".years").html(gjj_years);
			$(".moneys").html(gjj_money);
			var debx_month_money = func_debx_month_money(gjj_money, gjj_years, gjj_rate);
			$(".month1").html(debx_month_money);
			var debj_month_money = func_debj_month_money(gjj_money, gjj_years, gjj_rate);
			$(".month2").html(debj_month_money);
			var debj_month_sub = func_debj_month_sub(gjj_money, gjj_years, gjj_rate);
			$(".month_sub").html(debj_month_sub);
			var debx_rate_money = func_debx_rate_money(gjj_money, gjj_years, debx_month_money);
			$(".rate_money1").html(debx_rate_money);
			var debj_rate_money = func_debj_rate_money(gjj_money, gjj_years, gjj_rate);
			$(".rate_money2").html(debj_rate_money);
			$(".back_money1").html((gjj_money*1000 + debx_rate_money*1000)/1000);
			$(".back_money2").html((gjj_money*1000 + debj_rate_money*1000)/1000);
			
			var debj_month_price = func_debj_month_price(gjj_money, gjj_years);
			for (var i=1;i<=gjj_years*12;i++)
			{ 
				var debx_month_price = func_debx_month_price(gjj_money, gjj_years, gjj_rate, i);
				var debx_month_rate = func_debx_month_rate(gjj_money, gjj_years, gjj_rate, i);
				var debj_month_rate = func_debj_month_rate(gjj_money, gjj_years, gjj_rate, i);
				console.log("第"+i+"期,【等额本息】应还本金:"+debx_month_price+";应还利息:"+debx_month_rate+";【等额本金】应还本金:"+debj_month_price+";应还利息:"+debj_month_rate);
			}
		}else if(method == 3 || method == 4){
			$(".sy_years").html(sy_years);
			$(".sy_moneys").html(sy_money);
			$(".gjj_years").html(gjj_years);
			$(".gjj_moneys").html(gjj_money);
			var debx_month_money1 = func_debx_month_money(sy_money, sy_years, sy_rate);
			var debx_month_money2 = func_debx_month_money(gjj_money, gjj_years, gjj_rate);
			var debx_month_money3 = func_debx_month_money(gjj_money, gjj_years, sy_rate);
			if(method == 3){
				$(".month1").html((debx_month_money1*1000 + debx_month_money2*1000)/1000);
			}else if(method == 4){
				$(".month1").html((debx_month_money1*1000 + debx_month_money3*1000)/1000);
			}
			var debj_month_money1 = func_debj_month_money(sy_money, sy_years, sy_rate);
			var debj_month_money2 = func_debj_month_money(gjj_money, gjj_years, gjj_rate);
			var debj_month_money3 = func_debj_month_money(gjj_money, gjj_years, sy_rate);
			if(method == 3){
				$(".month2").html((debj_month_money1*1000 + debj_month_money2*1000)/1000);
			}else if(method == 4){
				$(".month2").html((debj_month_money1*1000 + debj_month_money3*1000)/1000);
			}
			var debx_rate_money1 = func_debx_rate_money(sy_money, sy_years, debx_month_money1);
			var debx_rate_money2 = func_debx_rate_money(gjj_money, gjj_years, debx_month_money2);
			var debx_rate_money3 = func_debx_rate_money(gjj_money, gjj_years, debx_month_money3);
			var debj_rate_money1 = func_debj_rate_money(sy_money, sy_years, sy_rate);
			var debj_rate_money2 = func_debj_rate_money(gjj_money, gjj_years, gjj_rate);
			var debj_rate_money3 = func_debj_rate_money(gjj_money, gjj_years, sy_rate);
			if(method == 3){
				$(".rate_money1").html((debx_rate_money1*1000 + debx_rate_money2*1000)/1000);
				$(".rate_money2").html((debj_rate_money1*1000 + debj_rate_money2*1000)/1000);
				$(".back_money1").html((sy_money*1000+gjj_money*1000+debx_rate_money1*1000 + debx_rate_money2*1000)/1000);
				$(".back_money2").html((sy_money*1000+gjj_money*1000+debj_rate_money1*1000 + debj_rate_money2*1000)/1000);
			}else if(method == 4){
				$(".rate_money1").html((debx_rate_money1*1000 + debx_rate_money3*1000)/1000);
				$(".rate_money2").html((debj_rate_money1*1000 + debj_rate_money3*1000)/1000);
				$(".back_money1").html((sy_money*1000+gjj_money*1000+debx_rate_money1*1000 + debx_rate_money3*1000)/1000);
				$(".back_money2").html((sy_money*1000+gjj_money*1000+debj_rate_money1*1000 + debj_rate_money3*1000)/1000);
			}
			var debj_month_sub1 = func_debj_month_sub(sy_money, sy_years, sy_rate);
			var debj_month_sub2 = func_debj_month_sub(gjj_money, gjj_years, gjj_rate);
			$(".month_sub").html((debj_month_sub1*1000 + debj_month_sub2*1000)/1000);
			if(method == 4){
				var debx_month_rate, gzs_rate;
				console.log("等额本金");
				console.log("商贷首期月供:", debj_month_money1);
				console.log("公积金首期月供:", debj_month_money2);
				console.log("");
				console.log("等额本息");
				console.log("商贷月供:", debx_month_money1);
				console.log("公积金月供:", debx_month_money2);
				console.log("公转商月供:", debx_month_money3);
				for (var i=1;i<=gjj_years*12;i++)
				{ 
					debx_month_price1 = parseFloat(func_debx_month_price(sy_money, sy_years, sy_rate, i));
					debx_month_rate1 = parseFloat(func_debx_month_rate(sy_money, sy_years, sy_rate, i));
					debx_month_price2 = parseFloat(func_debx_month_price(gjj_money, gjj_years, sy_rate, i));
					debx_month_rate2 = parseFloat(func_debx_month_rate(gjj_money, gjj_years, sy_rate, i));
					gzs_rate = func_gzs_rate(debx_month_rate2, gjj_rate, sy_rate);
					t_price = parseFloat(debx_month_price1+debx_month_price2).toFixed(2);
					t_rate = parseFloat(debx_month_rate1+debx_month_rate2-gzs_rate).toFixed(2);
					console.log("第"+i+"期,【本金】商贷:"+debx_month_price1+";公积金:"+debx_month_price2+";合计:"+t_price+"【利息】商贷:"+debx_month_rate1+";公积金:"+debx_month_rate2+";公转商贴息:"+gzs_rate+";合计:"+t_rate);
				}
			}
		}
    });
	
});
//等额本息月供
function func_debx_month_money(money, year, rate){
	var t1 = Math.pow(rate/1200 + 1, year*12);
	var t2 = (money*10000*(rate/1200)*t1)/(t1-1);
	return t2.toFixed(2);
}
//等额本息利息总额
function func_debx_rate_money(money, year, month_money){
	var t1 = year*12*month_money-money*10000;
	return (t1/10000).toFixed(2);
}
//等额本息每月应还利息
function func_debx_month_rate(money, year, rate, order){
	var t1 = Math.pow(rate/1200 + 1, year*12);
	var t2 = Math.pow(rate/1200 + 1, order-1);
	var t3 = (money*10000*(rate/1200)*(t1-t2))/(t1-1);
	return t3.toFixed(2);
}
//等额本息每月应还本金
function func_debx_month_price(money, year, rate, order){
	var t1 = Math.pow(rate/1200 + 1, year*12);
	var t2 = Math.pow(rate/1200 + 1, order-1);
	var t3 = (money*10000*(rate/1200)*t2)/(t1-1);
	return t3.toFixed(2);
}
//等额本金月供
function func_debj_month_money(money, year, rate){
	var t1 = money*10000/(year*12) + (money*10000*rate/1200);
	return t1.toFixed(2);
}
//等额本金每月应还本金
function func_debj_month_price(money, year){
	var t3 = money*10000/(year*12);
	return t3.toFixed(2);
}
//等额本金每月应还利息
function func_debj_month_rate(money, year, rate, order){
	var t1 = func_debj_month_price(money, year);
	var t2 = money*10000-(order-1)*t1;
	var t3 = t2*(rate/1200);
	return t3.toFixed(2);
}
//等额本金每月递减额
function func_debj_month_sub(money, year, rate){
	var t1 = money*10000/((year*12)) * rate/1200;
	return t1.toFixed(2);
}
//等额本金利息总额
function func_debj_rate_money(money, year, rate){
	var t1 = money*10000/(year*12) + money*10000*rate/1200;
	var t2 = money*10000/(year*12)*(1+rate/1200);
	var t3 = (t1+t2)*year*12/2-money*10000;
	return (t3/10000).toFixed(2);
}
//公转商贴息金额
//贴息金额=实还贷款利息×(1—公积金贷款利率÷商业性贷款利率)
function func_gzs_rate(money, gjj_rate, sy_rate){
	var t = money * (1-gjj_rate/sy_rate)
	return t.toFixed(2);
}
