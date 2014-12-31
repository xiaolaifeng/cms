<?php
require_once(dirname(__FILE__)."/config.php");
 
	
$c = new SaeTClientV2( WB_AKEY , WB_SKEY , $_SESSION['token']['access_token'] );
$ms  = $c->home_timeline(); // done
$uid_get = $c->get_uid();
$uid = $uid_get['uid'];
$user_message = $c->show_user_by_id( $uid);//根据ID获取用户等基本信息

$nick=$user_message['screen_name'];
$openid=$uid;
$face=$user_message['profile_image_url'];
$gender=$user_message['gender'];
$uname=$nick;
if($gender=='f'){
	$sex='女';
}else{
	$sex='男';
}

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
		    require_once(DEDEMEMBER."/templets/reg-weibo.htm");
	    }
//		exit();
	}else{
	
		//写入默认会员详细资料
		$dopost='regbase';
	   require_once(DEDEMEMBER."/reg_weibo.php");
		
	}
	         
        
}else if($dopost=='ubind'){
 	$processOpenid=  	$_GET['processOpenid'];
	$sql="delete from `#@__member_model_auth` where openid='{$processOpenid}' ";
	$rs = $db->ExecuteNoneQuery($sql);
}
include(DEDEMEMBER."/templets/edit_auth_baseinfo.htm");