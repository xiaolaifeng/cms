<?php
require_once(dirname(__FILE__)."/config.php");
$dopost=$_GET['bind'];
if(!isset($dopost)) $dopost = 'bind';
if($dopost=='bind'){
	$qc = new QC();  
	$accesstoken = $qc->qq_callback();//callback主要是验证 code和state,返回token信息，并写入到文件中存储，方便get_openid从文件中度  
	$openid = $qc->get_openid();//根据callback获取到的token信息得到openid,所以callback必须在openid前调用  
	$qc = new QC($accesstoken,$openid);  
	$arr = $qc->get_user_info();  
	
	
	
	$uname=$arr['nickname'];
	$face=$arr['figureurl_2'];
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
    		require_once(DEDEMEMBER."/index.php");
	    	exit();
	    }else{
		    require_once(DEDEMEMBER."/templets/reg-qq.htm");
	    }
//		exit();
	}else{
	
		//写入默认会员详细资料
//		$dsql->ExecuteNoneQuery("INSERT INTO `#@__member_model_auth` (`mid`,`model_type`,`openid`,`accesstoken`,`uname`,`face`) VALUES ('{$mid}','qq','{$openid}','{$accesstoken}','{$uname}','{$face}');");
		$dopost='regbase';
	   require_once(DEDEMEMBER."/reg_qq.php");
		
	// 	$mtype='qq';
	// 	$membermodel = new membermodel($mtype);
	// 	$modid=$membermodel->modid;
	// 	$modid = empty($modid)? 0 : intval(preg_replace("/[^\d]/",'', $modid));
	// 	$modelform = $dsql->getOne("SELECT * FROM #@__member_model WHERE id='$modid' ");
	
	// 	if(!is_array($modelform))
	// 	{
	// 		showmsg('模型表单不存在', '-1');
	// 		exit();
	// 	}else{
	// 		$dsql->ExecuteNoneQuery("INSERT INTO `{$membermodel->table}` (`mid`) VALUES ('{$mid}');");
	// 	}
	}
	         
        
}else if($dopost=='ubind'){
 	$processOpenid=  	$_GET['processOpenid'];
	$sql="delete from `#@__member_model_auth` where openid='{$processOpenid}' ";
	$rs = $db->ExecuteNoneQuery($sql);
}
include(DEDEMEMBER."/templets/edit_auth_baseinfo.htm");