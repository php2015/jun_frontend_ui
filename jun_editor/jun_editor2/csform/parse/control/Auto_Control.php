<?php
/**
 * 讯点表单智能设计器
 *     宏控件解析器
 * @author tony 2012-08-30
 * @copyright www.sunairs.com
 */
require_once('Control.php');
class Sunairs_Auto_Control extends Sunairs_Control{
	
	public function parseControl($html,$opType='w',$formData){
		$autos = $html->find('input[element_type="xd_auto"]');
		
		if(!empty($autos)){
			foreach($autos as $e){
				if($opType === 'w'){
					$name = $e->name;
					$index = explode('_',$name);
					$datafld = $e->datafld;
					$controlValue = isset($formData[$name]) ? $formData[$name] : '';
					$htmlText = '';
					switch($datafld){
						case 'SYS_DATE':
							$SYS_DATE = date('Y-m-d');
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_DATE.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_DATE" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_DATE).'\'">';
							break;
						case 'SYS_DATE_CN':
							$SYS_DATE = date('Y年n月j日');
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_DATE.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_DATE_CN" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_DATE).'\'">';
							break;
						case 'SYS_DATE_CN_SHORT3':
							$SYS_DATE = date('Y年');
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_DATE.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_DATE_CN_SHORT3" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_DATE).'\'">';
							break;
						case 'SYS_DATE_CN_SHORT4':
							$SYS_DATE = date('Y');
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_DATE.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_DATE_CN_SHORT4" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_DATE).'\'">';
							break;
						case 'SYS_DATE_CN_SHORT1':
							$SYS_DATE = date('Y年n月');
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_DATE.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_DATE_CN_SHORT1" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_DATE).'\'">';
							break;
						case 'SYS_DATE_CN_SHORT2':
							$SYS_DATE = date('n月j日');
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_DATE.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_DATE_CN_SHORT2" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_DATE).'\'">';
							break;
						case 'SYS_TIME':
							$SYS_TIME = date('H:i:s');
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_TIME.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_TIME" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_TIME).'\'">';
							break;
						case 'SYS_DATETIME':
							$SYS_DATETIME = date('Y-m-d H:i:s');
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_DATETIME.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_DATETIME" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_DATETIME).'\'">';
							break;
						case 'SYS_WEEK':
							$SYS_WEEK = $this->getWeek(date('N'));
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_WEEK.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_WEEK" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_WEEK).'\'">';
							break;
						case 'SYS_USERID':
							$SYS_USERID = $LOGIN_USER_ID;
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_USERID.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_USERID" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_USERID).'\'">';
							break;
						case 'SYS_USERNAME':
							$SYS_USERNAME = '未实现';
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_USERNAME.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_USERNAME" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_USERNAME).'\'">';
							break;
						case 'SYS_DEPTNAME':
							$SYS_DEPTNAME = '未实现';
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_DEPTNAME.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_DEPTNAME" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_DEPTNAME).'\'">';
							break;
						case 'SYS_DEPTNAME_SHORT':
							$SYS_DEPTNAME_SHORT = '未实现';
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_DEPTNAME_SHORT.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_DEPTNAME_SHORT" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_DEPTNAME_SHORT).'\'">';
							break;
						case 'SYS_USERPRIV':
							$SYS_USERPRIV = '未实现';
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_USERPRIV.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_USERPRIV" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_USERPRIV).'\'">';
							break;
						case 'SYS_USERPRIVOTHER':
							$SYS_USERPRIVOTHER = '未实现';
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_USERPRIVOTHER.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_USERPRIVOTHER" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_USERPRIVOTHER).'\'">';
							break;
						case 'SYS_USERNAME_DATE':
							$SYS_USERNAME_DATE = '未实现';
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_USERNAME_DATE.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_USERNAME_DATE" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_USERNAME_DATE).'\'">';
							break;
						case 'SYS_USERNAME_DATETIME':
							$SYS_USERNAME_DATETIME = '未实现';
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_USERNAME_DATETIME.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_USERNAME_DATETIME" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_USERNAME_DATETIME).'\'">';
							break;
						case 'SYS_FORMNAME':
							$SYS_FORMNAME = '未实现';
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_FORMNAME.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_FORMNAME" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_FORMNAME).'\'">';
							break;
						case 'SYS_RUNNAME':
							$SYS_RUNNAME = '未实现';
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_RUNNAME.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_RUNNAME" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_RUNNAME).'\'">';
							break;
						case 'SYS_RUNDATE':
							$SYS_RUNDATE = '未实现';
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_RUNDATE.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_RUNDATE" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_RUNDATE).'\'">';
							break;
						case 'SYS_RUNDATETIME':
							$SYS_RUNDATETIME = '未实现';
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_RUNDATETIME.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_RUNDATETIME" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_RUNDATETIME).'\'">';
							break;
						case 'SYS_RUNID':
							$SYS_RUNID = '未实现';
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_RUNID.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_RUNID" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_RUNID).'\'">';
							break;
						case 'SYS_AUTONUM':
							$SYS_AUTONUM = '未实现';
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_AUTONUM.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_AUTONUM" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_AUTONUM).'\'">';
							break;
						case 'SYS_IP':
							$SYS_IP =  $_SERVER["REMOTE_ADDR"];
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_IP.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_IP" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_IP).'\'">';
							break;
						case 'SYS_MANAGER1':
							$SYS_MANAGER1 = '未实现';
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_MANAGER1.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_MANAGER1" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_MANAGER1).'\'">';
							break;
						case 'SYS_MANAGER2':
							$SYS_MANAGER2 = '未实现';
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_MANAGER2.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_MANAGER2" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_MANAGER2).'\'">';
							break;
						case 'SYS_MANAGER3':
							$SYS_MANAGER3 = '未实现';
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_MANAGER3.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_MANAGER3" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_MANAGER3).'\'">';
							break;
						case 'SYS_SQL':
							$SYS_SQL = '未实现';
							$htmlText = '<input onclick="xd_form_auto_btn(\'auto_btn_'.$index[1].'\')" value="'.$SYS_SQL.'" datasrc="" class="AUTO" title="'.$e->title.'" datafld="SYS_SQL" name="'.$name.'" type="text">
										<input type="button" id="auto_btn_'.$index[1].'" style="display:none;" title="重新获取系统当前值" value="刷新" border="0" onclick="document.form1.'.$name.'.value=\''.($controlValue ? $controlValue : $SYS_SQL).'\'">';
							break;
						case 'SYS_LIST_DEPT':
							$htmlText = $this->getAutoDept(true);
							break;
						case 'SYS_LIST_USER':
							$htmlText = $this->getAutoUser(true);
							break;
						case 'SYS_LIST_PRIV':
							$htmlText = $this->getAutoPriv(true);
							break;
						case 'SYS_LIST_SQL':
							$htmlText = $this->getAutoSql(true);
							break;
						default :
							;
					}
					
					$e->outertext = $htmlText;
				} else {
					$name = $e->name;
					$outertext = isset($formData[$name]) ? $formData[$name] : '';
					$e->outertext = $outertext;
				}
			}
		}
		
		return $html;
	}
	
	/**
	 * 获取星期的中文格式
	 */
	public function getWeekCn($week=1){
		$weekCn = '';
		switch($week){
			case 1:
				$weekCn = '星期一';
				break;
			case 2:
				$weekCn = '星期二';
				break;
			case 3:
				$weekCn = '星期三';
				break;
			case 4:
				$weekCn = '星期四';
				break;
			case 5:
				$weekCn = '星期五';
				break;
			case 6:
				$weekCn = '星期六';
				break;
			case 7:
				$weekCn = '星期日';
				break;
			default :
				;
		}
		
		return $weekCn;
	}
	
	//获取部门信息
	public function getAutoDept($listFlag = false){
		$deptInfo = '';
		
		if($listFlag === false){
			$deptInfo = '';
		} else {
			$deptInfo = '<select></select>';
		}
		
		return $deptInfo;
	}
	
	//获取用户信息
	public function getAutoUser($listFlag = false){
		$userInfo = '';
		
		if($listFlag === false){
			$userInfo = '';
		} else {
			$userInfo = '<select></select>';
		}
		
		return $userInfo;
	}
	
	//获取角色信息
	public function getAutoPriv($listFlag = false){
		$privInfo = '';
		
		if($listFlag === false){
			$privInfo = '';
		} else {
			$privInfo = '<select></select>';
		}
		
		return $privInfo;
	}
	
	//获取sql执行结果
	public function getAutoSql($listFlag = false){
		$sqlInfo = '';
		
		if($listFlag === false){
			$sqlInfo = '';
		} else {
			$sqlInfo = '<select></select>';
		}
		
		return $sqlInfo;
	}
}

?>