$().ready(function() {
	var myDate = new Date();
    var tYear = myDate.getFullYear();
    var tMonth = myDate.getMonth();
    var m = tMonth + 1;
    var layer,form;
	layui.use('form', function(){
		layer = layui.layer;
		form = layui.form;
		$("#now_month").val(m);
		$("#m_now_month").val(m);
		var now_sub = $("#now_sub").val();
		if(now_sub != '') $("#total_sub").val(now_sub*m);
		var m_content = '';
		for(i=1;i<=m;i++){
			m_content += "<tr>";
			m_content += "<td>"+i+"月份</td>";
			m_content += '<td><input type="text" class="layui-input m_now_income_val m_now_income_'+i+'" value=""></td>';
			m_content += '<td><input type="text" class="layui-input m_now_wxyj_val m_now_wxyj_'+i+'" value=""></td>';
			m_content += '<td><input type="text" class="layui-input m_now_attach_val m_now_attach_'+i+'" value=""></td>';
			m_content += '<td><input type="text" class="layui-input m_now_tax_'+i+'" value="" disabled></td>';
			m_content += '<td><input type="text" class="layui-input m_now_wages_'+i+'" value="" disabled></td>';
			m_content += '<td><input type="text" class="layui-input m_now_tax_all_'+i+'" value="" disabled></td>';
			m_content += "</tr>";
		}
		$(".m_batch_set").after(m_content);
		form.render();
		form.on("select(month)", function (data) {
			m = data.value;
			var now_income = $("#now_income").val();
			if(now_income != '') $("#total_income").val(now_income*m);
			var now_wxyj = $("#now_wxyj").val();
			if(now_wxyj != '') $("#total_wxyj").val(now_wxyj*m);
			var now_attach = $("#now_attach").val();
			if(now_attach != '') $("#total_attach").val(now_attach*m);
			var now_sub = $("#now_sub").val();
			if(now_sub != '') $("#total_sub").val(now_sub*m);
			form.render('select');
		});
		form.on("select(m_month)", function (data) {
			m = data.value;
			var m_now_income = $(".m_now_income").val();
			var m_now_wxyj = $(".m_now_wxyj").val();
			var m_now_attach = $(".m_now_attach").val();
			$(".m_batch_set").siblings().remove();
			var m_content = '';
			for(i=1;i<=m;i++){
				m_content += "<tr>";
				m_content += "<td>"+i+"月份</td>";
				m_content += '<td><input type="text" class="layui-input m_now_income_val m_now_income_'+i+'" value="'+m_now_income+'"></td>';
				m_content += '<td><input type="text" class="layui-input m_now_wxyj_val m_now_wxyj_'+i+'" value="'+m_now_wxyj+'"></td>';
				m_content += '<td><input type="text" class="layui-input m_now_attach_val m_now_attach_'+i+'" value="'+m_now_attach+'"></td>';
				m_content += '<td><input type="text" class="layui-input m_now_tax_'+i+'" value="" disabled></td>';
				m_content += '<td><input type="text" class="layui-input m_now_wages_'+i+'" value="" disabled></td>';
				m_content += '<td><input type="text" class="layui-input m_now_tax_all_'+i+'" value="" disabled></td>';
				m_content += "</tr>";
			}
			$(".m_batch_set").after(m_content);
			form.render('select');
		});
	});
	//控制输入格式
	$("input").keydown(function (e) {
		var code = parseInt(e.keyCode);
		if (code >= 96 && code <= 105 || code >= 48 && code <= 57 || code == 8 || code == 110) {
			return true;
		} else {
			return false;
		}
	});
	$("input").bind("input propertychange", function () {
		if (isNaN(parseFloat($(this).val())) || parseFloat($(this).val()) < 0){
			$(this).val("");
		}
	});
	function reset_data(){
		$("#now_month").val("1");
		$("#now_income").val("");
		$("#total_income").val("");
		$("#now_wxyj").val("");
		$("#total_wxyj").val("");
		$("#now_attach").val("");
		$("#total_attach").val("");
		$("#now_sub").val("5000");
		$("#total_sub").val("5000");
		$("#now_money").val("");
		$("#total_money").val("");
		$("#rate").val("");
		$("#total_tax").val("");
		$("#quick_num").val("");
		$("#now_tax").val("");
		$("#now_wages").val("");
		form.render();
	};
	$(".do-reset").bind("click", function() {
		reset_data();
	});
	$("#now_income").on("input",function(e){
	    var m1 = e.delegateTarget.value;m1 = m1 == '' ? 0 : parseFloat(m1);
	    $("#total_income").val(m1*m);
	});
	$("#now_wxyj").on("input",function(e){
	    var m1 = e.delegateTarget.value;m1 = m1 == '' ? 0 : parseFloat(m1);
	    $("#total_wxyj").val(m1*m);
	});
	$("#now_attach").on("input",function(e){
	    var m1 = e.delegateTarget.value;m1 = m1 == '' ? 0 : parseFloat(m1);
	    $("#total_attach").val(m1*m);
	});
	$('.do-action').bind("click", function() {
		var total_income = $("#total_income").val();total_income = total_income == '' ? 0 : parseFloat(total_income);
		var total_wxyj = $("#total_wxyj").val();total_wxyj = total_wxyj == '' ? 0 : parseFloat(total_wxyj);
		var total_attach = $("#total_attach").val();total_attach = total_attach == '' ? 0 : parseFloat(total_attach);
		var total_sub = $("#total_sub").val();total_sub = total_sub == '' ? 0 : parseFloat(total_sub);
		var t = total_income-total_wxyj-total_attach-total_sub;
		t = t >= 0 ? t : 0; t = t.toFixed(2);
		$("#now_money").val(t);
		var total_money = func_cal_total_money(t, 1);
		var total_money_finish = func_cal_total_tax(m);
		$("#total_tax").val(total_money_finish);
		var t2 = (total_money - total_money_finish).toFixed(2);
		$("#now_tax").val(t2);
		var now_income = $("#now_income").val();
		now_income = now_income == '' ? 0 : parseFloat(now_income);
		var now_wxyj = $("#now_wxyj").val();
		now_wxyj = now_wxyj == '' ? 0 : parseFloat(now_wxyj);
		var t3 = (now_income-now_wxyj-t2).toFixed(2);
		$("#now_wages").val(t3);
    });
	$("#total_tax").on("input",function(e){
	    var m1 = e.delegateTarget.value;m1 = m1 == '' ? 0 : parseFloat(m1);
	    var total_money = $("#total_money").val();
	    var t2 = (total_money - m1).toFixed(2);
		$("#now_tax").val(t2);
		var now_income = $("#now_income").val();
		now_income = now_income == '' ? 0 : parseFloat(now_income);
		var now_wxyj = $("#now_wxyj").val();
		now_wxyj = now_wxyj == '' ? 0 : parseFloat(now_wxyj);
		var t3 = (now_income-now_wxyj-t2).toFixed(2);
		$("#now_wages").val(t3);
	});
	
	$('.do-action2').bind("click", function() {
		var reward_income = $("#reward_income").val();
		if(reward_income == '' || reward_income < 0){
			$("#reward-tip").html("年终奖金不能为空且不能小于0").show();
			return;
		}
		$("#reward-tip").hide();
		reward_income = parseFloat(reward_income).toFixed(2);
		$("#reward_money").val(reward_income);
		var t1 = (reward_income/12).toFixed(2);
		$("#reward_month").val(t1);
		var reward_tax = func_cal_reward_tax(reward_income);
		var t2 = (reward_income-reward_tax).toFixed(2);
		$("#reward_wages").val(t2);
    });
	function reset_data2(){
		$("#reward_income").val("");
		$("#reward_money").val("");
		$("#reward_month").val("");
		$("#reward_rate").val("");
		$("#reward_quick_num").val("");
		$("#reward_tax").val("");
		$("#reward_wages").val("");
		form.render();
	};
	$(".do-reset2").bind("click", function() {
		reset_data2();
	});
	
	$('.do-action3').bind("click", function() {
//		var base_income = $("#base_income").val();
//		if(base_income == '' || base_income < 0){
//			$("#base-tip").html("基本工资不能为空且不能小于0").show();
//			return;
//		}
		var sb_base = $("#sb_base").val();
		if(sb_base == '' || sb_base < 0){
			$("#sb-tip").html("基本工资不能为空且不能小于0").show();
			return;
		}
		var gjj_base = $("#gjj_base").val();
		if(gjj_base == '' || gjj_base < 0){
//			$("#gjj-tip").html("基本工资不能为空且不能小于0").show();
//			return;
			gjj_base = 0
		}
		$("#base-tip").hide();
		$("#sb-tip").hide();
		$("#gjj-tip").hide();
		
		var person_yanglao = $("#person_yanglao").val();
		person_yanglao = person_yanglao == '' ? 0 : parseFloat((sb_base*(person_yanglao/100)).toFixed(2));
		$(".person_yanglao").html(person_yanglao+'元').show();
		var person_yiliao = $("#person_yiliao").val();
		person_yiliao = person_yiliao == '' ? 0 : parseFloat((sb_base*(person_yiliao/100)).toFixed(2));
		$(".person_yiliao").html(person_yiliao+'元').show();
		var person_shiye = $("#person_shiye").val();
		person_shiye = person_shiye == '' ? 0 : parseFloat((sb_base*(person_shiye/100)).toFixed(2));
		$(".person_shiye").html(person_shiye+'元').show();
		var t1 = parseFloat((person_yanglao+person_yiliao+person_shiye).toFixed(2));
		$(".person_total_wx").html(t1+'元').show();
		
		var company_yanglao = $("#company_yanglao").val();
		company_yanglao = company_yanglao == '' ? 0 : parseFloat((sb_base*(company_yanglao/100)).toFixed(2));
		$(".company_yanglao").html(company_yanglao+'元').show();
		var company_yiliao = $("#company_yiliao").val();
		company_yiliao = company_yiliao == '' ? 0 : parseFloat((sb_base*(company_yiliao/100)).toFixed(2));
		$(".company_yiliao").html(company_yiliao+'元').show();
		var company_shiye = $("#company_shiye").val();
		company_shiye = company_shiye == '' ? 0 : parseFloat((sb_base*(company_shiye/100)).toFixed(2));
		$(".company_shiye").html(company_shiye+'元').show();
		var company_gongshang = $("#company_gongshang").val();
		company_gongshang = company_gongshang == '' ? 0 : parseFloat((sb_base*(company_gongshang/100)).toFixed(2));
		$(".company_gongshang").html(company_gongshang+'元').show();
		var company_shengyu = $("#company_shengyu").val();
		company_shengyu = company_shengyu == '' ? 0 : parseFloat((sb_base*(company_shengyu/100)).toFixed(2));
		$(".company_shengyu").html(company_shengyu+'元').show();
		var t2 = parseFloat((company_yanglao+company_yiliao+company_shiye+company_gongshang+company_shengyu).toFixed(2));
		$(".company_total_wx").html(t2+'元').show();
		
		var person_gjj = $("#person_gjj").val();
		person_gjj = person_gjj == '' ? 0 : parseFloat((gjj_base*(person_gjj/100)).toFixed(2));
		$(".person_gjj").html(person_gjj+'元').show();
		var company_gjj = $("#company_gjj").val();
		company_gjj = company_gjj == '' ? 0 : parseFloat((gjj_base*(company_gjj/100)).toFixed(2));
		$(".company_gjj").html(company_gjj+'元').show();
		
		var t3 = parseFloat(t1+person_gjj).toFixed(2);
		$(".person_total").html(t3+'元').show();
		var t4 = parseFloat(t2+company_gjj).toFixed(2);
		$(".company_total").html(t4+'元').show();
    });
	function reset_data3(){
		$("#base_income").val("");
		$("#sb_base").val("");
		$("#gjj_base").val("");
		$(".money_item").html("").hide();
		form.render();
	};
	$(".do-reset3").bind("click", function() {
		reset_data3();
	});
	$(".switch-all").bind("click", function() {
		$(".switch-all-show").show();
		$(".switch-month-show").hide();
	});
	$(".switch-month").bind("click", function() {
		$(".switch-all-show").hide();
		$(".switch-month-show").show();
	});
	$(".m_now_income").on("input",function(e){
	    var m = e.delegateTarget.value;m = m == '' ? 0 : parseFloat(m);
	    $(".m_now_income_val").val(m);
	});
	$(".m_now_wxyj").on("input",function(e){
	    var m = e.delegateTarget.value;m = m == '' ? 0 : parseFloat(m);
	    $(".m_now_wxyj_val").val(m);
	});
	$(".m_now_attach").on("input",function(e){
	    var m = e.delegateTarget.value;m = m == '' ? 0 : parseFloat(m);
	    $(".m_now_attach_val").val(m);
	});
	$(".do-reset1-2").bind("click", function() {
		$(".switch-month-show input").val('');
		$(".m_total_show").remove();
		form.render();
	});
	$('.do-action1-2').bind("click", function() {
		var m_now_month = $("#m_now_month").val();
		var m_total_income=0,m_total_wxyj=0,m_total_attach=0,m_total_sub=0,m_total_wages=0,m_total_tax=0;
		for(i=1;i<=m_now_month;i++){
			var t1 = $(".m_now_income_"+i).val();t1 = t1 == '' ? 0 : parseFloat(t1);
			var t2 = $(".m_now_wxyj_"+i).val();t2 = t2 == '' ? 0 : parseFloat(t2);
			var t3 = $(".m_now_attach_"+i).val();t3 = t3 == '' ? 0 : parseFloat(t3);
			m_total_income+=t1;
			m_total_wxyj+=t2;
			m_total_attach+=t3;
			m_total_sub+=t2+t3;
			var m_total_money = func_cal_total_money(m_total_income-m_total_sub, 0);
			$(".m_now_tax_"+i).val(m_total_money);
			var t4 = parseFloat(t1-m_total_money).toFixed(2);
			$(".m_now_wages_"+i).val(t4);
			m_total_wages = parseFloat(m_total_wages+t4).toFixed(2);
			m_total_tax = parseFloat(m_total_tax+m_total_money).toFixed(2);
			$(".m_now_tax_all_"+i).val(m_total_tax);
		}
		var m_content = '';
		m_content += "<tr class='m_total_show'>";
		m_content += "<td>合计</td>";
		m_content += '<td><input type="text" class="layui-input" value="'+m_total_income+'" disabled></td>';
		m_content += '<td><input type="text" class="layui-input" value="'+m_total_wxyj+'" disabled></td>';
		m_content += '<td><input type="text" class="layui-input" value="'+m_total_attach+'" disabled></td>';
		m_content += '<td><input type="text" class="layui-input" value="'+m_total_tax+'" disabled></td>';
		m_content += '<td><input type="text" class="layui-input" value="'+m_total_wages+'" disabled></td>';
		m_content += '<td></td>';
		m_content += "</tr>";
		$(".m_batch_set").parent().append(m_content);
		form.render();
	});
});
//计算累计应纳税额
function func_cal_total_money(now_money, set){
	var rate,quick_num,total_money;
	if(now_money <= 36000){
		rate = 0.03;
		quick_num = 0;
		now_money = now_money < 0 ? 0 : now_money;
	}else if(now_money > 36000 && now_money <= 144000){
		rate = 0.1;
		quick_num = 2520;
	}else if(now_money > 144000 && now_money <= 300000){
		rate = 0.2;
		quick_num = 16920;
	}else if(now_money > 300000 && now_money <= 420000){
		rate = 0.25;
		quick_num = 31920;
	}else if(now_money > 420000 && now_money <= 660000){
		rate = 0.3;
		quick_num = 52920;
	}else if(now_money > 660000 && now_money <= 960000){
		rate = 0.35;
		quick_num = 85920;
	}else if(now_money > 960000){
		rate = 0.45;
		quick_num = 181920;
	}
	total_money = parseFloat(now_money*rate-quick_num);
	total_money = total_money.toFixed(2);
	if(set == 1){
		$("#rate").val(rate*100);
		$("#quick_num").val(quick_num);
		$("#total_money").val(total_money);
	}
	return total_money;
}
//计算累计已缴
function func_cal_total_tax(m){
	m = m - 1;
	if(m <= 0) return 0;
	var now_income = $("#now_income").val();
	var total_income = now_income == '' ? 0 : now_income*m;
	var now_wxyj = $("#now_wxyj").val();
	var total_wxyj = now_wxyj == '' ? 0 : now_wxyj*m;
	var now_attach = $("#now_attach").val();
	var total_attach = now_attach == '' ? 0 : now_attach*m;
	var now_sub = $("#now_sub").val();
	var total_sub = now_sub == '' ? 0 : now_sub*m;
	var t = total_income-total_wxyj-total_attach-total_sub;
	t = t >= 0 ? t : 0; t = t.toFixed(2);
	return func_cal_total_money(t, 0);
}
//计算年终奖应纳税额
function func_cal_reward_tax(reward_income){
	var now_money = (reward_income/12).toFixed(2);
	var rate,quick_num,reward_tax;
	if(now_money <= 3000){
		rate = 0.03;
		quick_num = 0;
	}else if(now_money > 3000 && now_money <= 12000){
		rate = 0.1;
		quick_num = 210;
	}else if(now_money > 12000 && now_money <= 25000){
		rate = 0.2;
		quick_num = 1410;
	}else if(now_money > 25000 && now_money <= 35000){
		rate = 0.25;
		quick_num = 2660;
	}else if(now_money > 35000 && now_money <= 55000){
		rate = 0.3;
		quick_num = 4410;
	}else if(now_money > 55000 && now_money <= 80000){
		rate = 0.35;
		quick_num = 7160;
	}else if(now_money > 80000){
		rate = 0.45;
		quick_num = 15160;
	}
	reward_tax = parseFloat(reward_income*rate-quick_num);
	reward_tax = reward_tax.toFixed(2);
	$("#reward_rate").val(rate*100);
	$("#reward_quick_num").val(quick_num);
	$("#reward_tax").val(reward_tax);
	return reward_tax;
}
