<?php
/**
 * @version        $Id: edit_baseinfo.php 1 8:38 2010年7月9日Z tianya $
 * @package        DedeCMS.Member
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           
 */
require_once(dirname(__FILE__)."/config.php");
CheckRank(0,0);
$menutype = 'config';
if(!isset($dopost)) $dopost = '';

$pwd2=(empty($pwd2))? "" : $pwd2;
$row=$dsql->GetOne("SELECT  * FROM `#@__member` WHERE mid='".$cfg_ml->M_ID."'");
if($dopost=='mod1')
{
	
 	$addupquery = '';

        //修改Email
        if($email != $row['email'])
        {
            if(!CheckEmail($email))
            {
                ShowMsg('Email格式不正确！','-1');
                exit();
            }
            else
            {
                $addupquery .= ",email='$email'";
            }
        }

//个人签名
        if($signature != $row['signature']){
 			if(strlen($signature)>=250)
                {
                     ShowMsg('签名长度不超过250','-1');
                      exit();    
                }
	       $addupquery .=",signature='$signature'";
		}
	  //修改uname
    if($uname != $row['uname'])
    {
        $rs = CheckUserID($uname,'昵称',FALSE);
        if($rs!='ok')
        {
            ShowMsg($rs,'-1');
            exit();
        }
        $addupquery .= ",uname='$uname'";
    }
    
    //性别
    if( !in_array($sex, array('男','女','保密')) )
    {
        ShowMsg('请选择正常的性别！','-1');
        exit();    
    }
    
    $query1 = "UPDATE `#@__member` SET pwd='$pwd',sex='$sex'{$addupquery}  where mid='".$cfg_ml->M_ID."' ";
    $dsql->ExecuteNoneQuery($query1);
    
    
    $row=$dsql->GetOne("SELECT  * FROM `#@__member` WHERE mid='".$cfg_ml->M_ID."'");
    
}else if($dopost=='mod3')
{
	echo 'mod password';
	if(!is_array($row) || $row['pwd'] != md5($oldpwd))
    {
        ShowMsg('你输入的旧密码错误或没填写，不允许修改资料！','-1');
        exit();
    }
    if($userpwd != $userpwdok)
    {
        ShowMsg('你两次输入的新密码不一致！','-1');
        exit();
    }
    if($userpwd=='')
    {
        $pwd = $row['pwd'];
    }
    else
    {
        $pwd = md5($userpwd);
        $pwd2 = substr(md5($userpwd),5,20);
    }
     //如果是管理员，修改其后台密码
    if($cfg_ml->fields['matt']==10 && $pwd2!="")
    {
        $query2 = "UPDATE `#@__admin` SET pwd='$pwd2' where id='".$cfg_ml->M_ID."' ";
        $dsql->ExecuteNoneQuery($query2);
    }
    // 清除会员缓存
    $cfg_ml->DelCache($cfg_ml->M_ID);
}else if($dopost=='mod_extend1')
{

	//个人签名
    if($signature != $row['signature']){
 		if(strlen($signature)>=250)
                {
                     ShowMsg('签名长度不超过250','-1');
                      exit();    
                }
       $addupquery .=",signature='$signature'";
	}
	  //修改uname
    if($uname != $row['uname'])
    {
        $rs = CheckUserID($uname,'昵称',FALSE);
        if($rs!='ok')
        {
            ShowMsg($rs,'-1');
            exit();
        }
        $addupquery .= ",uname='$uname'";
    }
    
    //性别
    if( !in_array($sex, array('男','女','保密')) )
    {
        ShowMsg('请选择正常的性别！','-1');
        exit();    
    }
    
    $query1 = "UPDATE `#@__member` SET sex='$sex'{$addupquery}  where mid='".$cfg_ml->M_ID."' ";
    $dsql->ExecuteNoneQuery($query1);
    
    
    $row=$dsql->GetOne("SELECT  * FROM `#@__member` WHERE mid='".$cfg_ml->M_ID."'");

}else if($dopost=='save')
{
    $svali = GetCkVdValue();

    if(strtolower($vdcode) != $svali || $svali=='')
    {
        ReSETVdValue();
        ShowMsg('验证码错误！','-1');
        exit();
    }
    
   

  

   
    ShowMsg('成功更新你的基本资料！','edit_baseinfo.php',0,5000);
    exit();
}
include(DEDEMEMBER."/templets/edit_auth_baseinfo.htm");