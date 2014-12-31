<?php
require_once(dirname(__FILE__)."/config.php");
 
$dopost=$_GET['bind'];
if(!isset($dopost)) $dopost = 'bind';
if($dopost=='bind'){
	
	
	
	$uname=$nick;
	$accesstoken=$openid;
	$mid=$cfg_ml->M_ID;
	//增加绑定的qq，从100开始。 若有解绑的步骤，从200开始
	//检测用户名是否存在
	$row = $dsql->GetOne("SELECT m.mid FROM `#@__member` as m left join `#@__member_model_auth` as a on m.mid=a.mid WHERE  a.openid LIKE '$openid' ");
	if(is_array($row))
	{
		$cfg_ml = new MemberLogin(7*3600);
    	$rs = $cfg_ml->CheckAuthUser($openid, $accesstoken);
    	if($rs==1)
    	{
    		//已绑定，自动登录
    		$uid='';
    		require_once(DEDEMEMBER."/index.php");
	    	exit();
	    }else{
		    require_once(DEDEMEMBER."/templets/reg-xiaomi.htm");
	    }
//		exit();
	}else{
	
		//写入默认会员详细资料
		$dopost='regbase';
	   require_once(DEDEMEMBER."/reg_xiaomi.php");
		
	}
	         
        
}else if($dopost=='ubind'){
 	$processOpenid=  	$_GET['processOpenid'];
	$sql="delete from `#@__member_model_auth` where openid='{$processOpenid}' ";
	$rs = $db->ExecuteNoneQuery($sql);
}
include(DEDEMEMBER."/templets/edit_auth_baseinfo.htm");