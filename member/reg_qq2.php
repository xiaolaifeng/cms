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
        //检验qq号是否绑定过
//         $rs = CheckQQOpenid($openid, 'qq号');
//         if($rs != 'ok')
//         {
//             ShowMsg($rs, '-1');
//             exit();
//         }
        $userid = trim($uname.genRandomNum(6));
        echo 'userid='.$userid;
        $pwd = trim($userpwd);
        $pwdc = trim($userpwdok);
        $rs = CheckUserID($userid, '用户名');
        if($rs != 'ok')
        {
            ShowMsg($rs, '-1');
            exit();
        }
        if($pwdc != $pwd)
        {
            ShowMsg('你两次输入的密码不一致！', '-1');
            exit();
        }
        
        if(!CheckEmail($email))
        {
            ShowMsg('Email格式不正确！', '-1');
            exit();
        }
        
        #api{{
        if(defined('UC_API') && @include_once DEDEROOT.'/uc_client/client.php')
        {
            $uid = uc_user_register($userid, $pwd, $email);
            if($uid <= 0)
            {
                if($uid == -1)
                {
                    ShowMsg("用户名不合法！","-1");
                    exit();
                }
                elseif($uid == -2)
                {
                    ShowMsg("包含要允许注册的词语！","-1");
                    exit();
                }
                elseif($uid == -3)
                {
                    ShowMsg("你指定的用户名 {$userid} 已存在，请使用别的用户名！","-1");
                    exit();
                }
                elseif($uid == -5)
                {
                    ShowMsg("你使用的Email 不允许注册！","-1");
                    exit();
                }
                elseif($uid == -6)
                {
                    ShowMsg("你使用的Email已经被另一帐号注册，请使其它帐号","-1");
                    exit();
                }
                else
                {
                    ShowMsg("注删失改！","-1");
                    exit();
                }
            }
            else
            {
                $ucsynlogin = uc_user_synlogin($uid);
            }
        }
        #/aip}}
        
        if($cfg_md_mailtest=='Y')
        {
            $row = $dsql->GetOne("SELECT mid FROM `#@__member` WHERE email LIKE '$email' ");
            if(is_array($row))
            {
                ShowMsg('你使用的Email已经被另一帐号注册，请使其它帐号！', '-1');
                exit();
            }
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
        $pwd = md5($userpwd);
		$mtype = RemoveXSS(HtmlReplace($mtype,1));
		$safeanswer = HtmlReplace($safeanswer);
		$safequestion = HtmlReplace($safequestion); 
        
        $spaceSta = ($cfg_mb_spacesta < 0 ? $cfg_mb_spacesta : 0);
        // todu  处理用户昵称、头像等个人信息
        $inQuery = "INSERT INTO `#@__member` (`openid` ,`accesstoken` ,`mtype` ,`mobile` ,`userid` ,`pwd` ,`uname` ,`sex` ,`rank` ,`money` ,`email` ,`scores` ,
        `matt`, `spacesta` ,`face`,`safequestion`,`safeanswer` ,`jointime` ,`joinip` ,`logintime` ,`loginip` )
       VALUES ('$openid','$accesstoken','$mtype','$mobile','$userid','$pwd','$uname','$sex','10','$dfmoney','$email','$dfscores',
       '0','$spaceSta','$face','$safequestion','$safeanswer','$jointime','$joinip','$logintime','$loginip'); ";
        
        if($dsql->ExecuteNoneQuery($inQuery))
        {
            $mid = $dsql->GetLastID();
    
            //写入默认会员详细资料
            if($mtype=='个人'){
                $space='person';
            }else if($mtype=='qq'){
                $space='qq';
                $dsql->ExecuteNoneQuery("INSERT INTO `#@__member_model_auth` (`mid`,`model_type`,`openid`,`accesstoken`,`uname`,`face`) VALUES ('{$mid}','{$mtype}','{$openid}','{$accesstoken}')','{$uname}'),'{$face}');");
                
            }else{
                $space='person';
            }
    
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

            
            //邮件验证
            if($cfg_mb_spacesta==-10)
            {
                $userhash = md5($cfg_cookie_encode.'--'.$mid.'--'.$email);
                $url = $cfg_basehost.(empty($cfg_cmspath) ? '/' : $cfg_cmspath)."/member/index_do.php?fmdo=checkMail&mid={$mid}&userhash={$userhash}&do=1";
                $url = preg_replace("#http:\/\/#i", '', $url);
                $url = 'http://'.preg_replace("#\/\/#", '/', $url);
                $mailtitle = "{$cfg_webname}--会员邮件验证通知";
                $mailbody = '';
                $mailbody .= "尊敬的用户[{$uname}]，您好：\r\n";
                $mailbody .= "欢迎注册成为[{$cfg_webname}]的会员。\r\n";
                $mailbody .= "要通过注册，还必须进行最后一步操作，请点击或复制下面链接到地址栏访问这地址：\r\n\r\n";
                $mailbody .= "{$url}\r\n\r\n";
                $mailbody .= "Power by  极客视界！\r\n";
          
                $headers = "From: ".$cfg_adminemail."\r\nReply-To: ".$cfg_adminemail;
                if($cfg_sendmail_bysmtp == 'Y' && !empty($cfg_smtp_server))
                {        
                    $mailtype = 'TXT';
                    require_once(DEDEINC.'/mail.class.php');
                    $smtp = new smtp($cfg_smtp_server,$cfg_smtp_port,true,$cfg_smtp_usermail,$cfg_smtp_password);
                    $smtp->debug = false;
                    $smtp->sendmail($email,$cfg_webname,$cfg_smtp_usermail, $mailtitle, $mailbody, $mailtype);
                }
                else
                {
                    @mail($email, $mailtitle, $mailbody, $headers);
                }
            }//End 邮件验证
            
            if($cfg_mb_reginfo == 'Y' && $spaceSta >=0)
            {
                ShowMsg("完成基本信息的注册，接下来完善详细资料...","index_do.php?fmdo=user&dopost=regnew&step=2",0,1000);
                exit();
            } else {
                require_once(DEDEMEMBER."/templets/reg-new3.htm");
                exit;
            } 
        } else {
            ShowMsg("注册失败，请检查资料是否有误或与管理员联系！", "-1");
            exit();
        }
    }
    //todu  联合登陆待处理
    //检测用户名是否存在
    	$cfg_ml = new MemberLogin(7*3600);
    	$rs = $cfg_ml->CheckAuthUser($openid, $token);
    	if($rs==1)
    	{
    		//已绑定，自动登录
    		require_once(DEDEMEMBER."/templets/reg-new3.htm");
	    	exit();
	    }else{
		    require_once(DEDEMEMBER."/templets/reg-qq.htm");
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

