<?php
/**
 * @version        $Id: reg_new.php 1 8:38 2010年7月9日Z tianya $
 * @package        DedeCMS.Member
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           
 */
require_once(dirname(__FILE__)."/config.php");
require_once DEDEINC.'/membermodel.cls.php';
if($cfg_mb_allowreg=='N')
{
    ShowMsg('系统关闭了新用户注册！', 'index.php');
    exit();
}

if(!isset($dopost)) $dopost = '';
$step = empty($step)? 1 : intval(preg_replace("/[^\d]/", '', $step));

if($step == 1)
{
    if($cfg_ml->IsLogin())
    {
        if($cfg_mb_reginfo == 'Y')
        {
            //如果启用注册详细信息
            if($cfg_ml->fields['spacesta'] == 0 || $cfg_ml->fields['spacesta'] == 1)
            {
                 ShowMsg("尚未完成详细资料，请完善...", "index_do.php?fmdo=user&dopost=regnew&step=2", 0, 1000);
                 exit;
            }
        }
        ShowMsg('你已经登陆系统，无需重新注册！', 'index.php');
        exit();
    }
    if($dopost=='regbase')
    {
    	//检测用户名是否存在
    	$row = $dsql->GetOne("SELECT m.mid FROM `#@__member` as m left join `#@__member_model_auth` as a on m.mid=a.mid WHERE  a.openid LIKE '$openid' ");
    	if(is_array($row))
    	{
    		ShowMsg("你已绑定过QQ号{$openid} 已存在，请使用别的！", "-1");
    		exit();
    	}

        $userid = $openid;
        $rs = CheckUserID($userid, '用户名');
        if($rs != 'ok')
        {
            ShowMsg($rs, '-1');
            exit();
        }
   
    
        //检测用户名是否存在
        $row = $dsql->GetOne("SELECT mid FROM `#@__member` WHERE userid LIKE '$userid' ");
        if(is_array($row))
        {
            ShowMsg("你指定的手机号{$userid} 已存在，请使用别的！", "-1");
            exit();
        }
    
        //会员的默认金币
        $dfscores = 0;
        $dfmoney = 0;
        $dfrank = $dsql->GetOne("SELECT money,scores FROM `#@__arcrank` WHERE rank='10' ");
        if(is_array($dfrank))
        {
            $dfmoney = $dfrank['money'];
            $dfscores = $dfrank['scores'];
        }
        $jointime = time();
        $logintime = time();
        $joinip = GetIP();
        $loginip = GetIP();
       
		$mtype = 'qq';
	
        
        $spaceSta = ($cfg_mb_spacesta < 0 ? $cfg_mb_spacesta : 0);
        // todu  处理用户昵称、头像等个人信息
        $inQuery = "INSERT INTO `#@__member` (`openid` ,`accesstoken` ,`mtype`  ,`userid` ,`uname` ,`rank` ,`money` ,`scores` ,
        `matt`, `spacesta` ,`face` ,`jointime` ,`joinip` ,`logintime` ,`loginip` )
       VALUES ('$openid','$accesstoken','$mtype','$userid','$uname','10','$dfmoney','$dfscores',
       '0','$spaceSta','$face','$jointime','$joinip','$logintime','$loginip'); ";
         echo '00';
        if($dsql->ExecuteNoneQuery($inQuery))
        {
            $mid = $dsql->GetLastID();
            //写入默认会员详细资料
                $space='qq';
           		$dsql->ExecuteNoneQuery("INSERT INTO `#@__member_model_auth` (`mid`,`model_type`,`openid`,`accesstoken`,`uname`,`face`) VALUES ('{$mid}','{$mtype}','{$openid}','{$accesstoken}','{$uname}','{$face}');");
                
    echo $mtype;
            //写入默认统计数据
            $membertjquery = "INSERT INTO `#@__member_tj` (`mid`,`article`,`album`,`archives`,`homecount`,`pagecount`,`feedback`,`friend`,`stow`)
                   VALUES ('$mid','0','0','0','0','0','0','0','0'); ";
            $dsql->ExecuteNoneQuery($membertjquery);
    
            //写入默认空间配置数据
            $spacequery = "INSERT INTO `#@__member_space`(`mid` ,`pagesize` ,`matt` ,`spacename` ,`spacelogo` ,`spacestyle`, `sign` ,`spacenews`)
                    VALUES('{$mid}','10','0','{$uname}的空间','','$space','',''); ";
            $dsql->ExecuteNoneQuery($spacequery);
    
            //写入其它默认数据
            $dsql->ExecuteNoneQuery("INSERT INTO `#@__member_flink`(mid,title,url) VALUES('$mid','极客视界',''); ");
            
            $membermodel = new membermodel($mtype);
            $modid=$membermodel->modid;
            $modid = empty($modid)? 0 : intval(preg_replace("/[^\d]/",'', $modid));
            $modelform = $dsql->getOne("SELECT * FROM #@__member_model WHERE id='$modid' ");
            
            if(!is_array($modelform))
            {
                showmsg('模型表单不存在', '-1');
                exit();
            }else{
                $dsql->ExecuteNoneQuery("INSERT INTO `{$membermodel->table}` (`mid`) VALUES ('{$mid}');");
            }
  
            
            //----------------------------------------------
            //模拟登录
            //---------------------------
            $cfg_ml = new MemberLogin(7*3600);
            $rs = $cfg_ml->CheckUser($userid, $userpwd);

            
            
            if($cfg_mb_reginfo == 'Y' && $spaceSta >=0)
            { 
                ShowMsg("完成基本信息的注册","index_do.php?fmdo=user&dopost=regnew&step=2",0,1000);
                exit();
            } else {
              	$cfg_ml = new MemberLogin(7*3600);
    			$rs = $cfg_ml->CheckAuthUser($openid, $accesstoken);
    			$row=$dsql->GetOne("SELECT  * FROM `#@__member` WHERE mid='".$cfg_ml->M_ID."'");
    			
                require_once(DEDEMEMBER."/templets/edit_auth_baseinfo.htm");
                exit;
            } 
        } else {
            ShowMsg("注册失败，请检查资料是否有误或与管理员联系！", "-1");
            exit();
        }
    }
}else{
    if(!$cfg_ml->IsLogin())
    {
        ShowMsg("尚未完成基本信息的注册,请返回重新填写！", "index_do.php?fmdo=user&dopost=regnew");
        exit;
    } else {
        if($cfg_ml->fields['spacesta'] == 2)
        {
             ShowMsg('你已经登陆系统，无需重新注册！', 'index.php');
             exit;
        }
    }
    $membermodel = new membermodel($cfg_ml->M_MbType);
    $postform = $membermodel->getForm(true);
    if($dopost == 'reginfo')
    {
        //这里完成详细内容填写
        $dede_fields = empty($dede_fields) ? '' : trim($dede_fields);
        $dede_fieldshash = empty($dede_fieldshash) ? '' : trim($dede_fieldshash);
        $modid = empty($modid)? 0 : intval(preg_replace("/[^\d]/",'', $modid));
        
        if(!empty($dede_fields))
        {
            if($dede_fieldshash != md5($dede_fields.$cfg_cookie_encode))
            {
                showMsg('数据校验不对，程序返回', '-1');
                exit();
            }
        }
        $modelform = $dsql->GetOne("SELECT * FROM #@__member_model WHERE id='$modid' ");
        if(!is_array($modelform))
        {
            showmsg('模型表单不存在', '-1');
            exit();
        }
        $inadd_f = '';
        if(!empty($dede_fields))
        {
            $fieldarr = explode(';', $dede_fields);
            if(is_array($fieldarr))
            {
                foreach($fieldarr as $field)
                {
                    if($field == '') continue;
                    $fieldinfo = explode(',', $field);
                    if($fieldinfo[1] == 'textdata')
                    {
                        ${$fieldinfo[0]} = FilterSearch(stripslashes(${$fieldinfo[0]}));
                        ${$fieldinfo[0]} = addslashes(${$fieldinfo[0]});
                    }
                    else
                    {
                        if(empty(${$fieldinfo[0]})) ${$fieldinfo[0]} = '';
                        ${$fieldinfo[0]} = GetFieldValue(${$fieldinfo[0]}, $fieldinfo[1],0,'add','','diy', $fieldinfo[0]);
                    }
                    if($fieldinfo[0]=="birthday") ${$fieldinfo[0]}=GetDateMk(${$fieldinfo[0]});
                    $inadd_f .= ','.$fieldinfo[0]." ='".${$fieldinfo[0]}."' ";
                }
            }

        }
		
  
        $query = "UPDATE `{$membermodel->table}` SET `mid`='{$cfg_ml->M_ID}' $inadd_f WHERE `mid`='{$cfg_ml->M_ID}'; ";
        if($dsql->executenonequery($query))
        {
            $dsql->ExecuteNoneQuery("UPDATE `#@__member` SET `spacesta`='2' WHERE `mid`='{$cfg_ml->M_ID}'");
            // 清除缓存
            $cfg_ml->DelCache($cfg_ml->M_ID);
            require_once(DEDEMEMBER."/templets/reg-new3.htm");
            exit;
        }
    }
    require_once(DEDEMEMBER."/templets/reg-new2.htm");
}

