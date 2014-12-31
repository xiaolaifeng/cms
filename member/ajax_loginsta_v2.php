<?php
/**
 * @version        $Id: ajax_loginsta.php 1 8:38 2010年7月9日Z tianya $
 * @package        DedeCMS.Member
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           
 */
require_once(dirname(__FILE__)."/config.php");
AjaxHead();
if($myurl == '') exit('');

$uid  = $cfg_ml->M_LoginID;

!$cfg_ml->fields['face'] && $face = ($cfg_ml->fields['sex'] == '女')? 'dfgirl' : 'dfboy';
$facepic = empty($face)? $cfg_ml->fields['face'] : $GLOBALS['cfg_memberurl'].'/templets/images/'.$face.'.png';
?>

	<div style="position:relative">
		<a class="navbar-right login-user-profile login-user-name" >
			<img width="35" height="35" src="<?php echo $facepic;?>" alt="<?php echo $cfg_ml->M_UserName; ?>">
		</a>
		<div class="manage-list " style="display: none;">
			<span class="triangle-up"></span>
			<ul>
				<li><a href="<?php echo $cfg_memberurl;?>/content_list.php?channelid=1" id="user_edit" class="manage-list-item"> 
					 <span class="user-manage-list-text">个人中心 <font size="2px" color="red"><sup></sup></font></span>
				</a></li>
				<li><a href="<?php echo $cfg_memberurl;?>/pm.php" id="user_edit" class="manage-list-item"> 
					 <span class="user-manage-list-text">最新消息 <font size="2px" color="red"><sup></sup></font></span>
				</a></li>
<!-- 
 				<li><a href="<?php echo $cfg_memberurl; ?>/index.php" id="user_center" class="manage-list-item"> 
					<span class="user-manage-list-text">个人中心</span>
				</a></li>
 -->
				<li><a href="<?php echo $cfg_memberurl; ?>/edit_auth_baseinfo.php" id="user_edit" class="manage-list-item"> 
					<span class="user-manage-list-text">个人设置</span>
				</a></li>
				<li><a href="<?php echo $cfg_memberurl; ?>/index_do.php?fmdo=login&dopost=exit" id="logout" class="manage-list-item">  
				<span class="user-manage-list-text">退出登录</span>
				</a></li>
			</ul>
		</div>
	</div>
<!-- 
    <div class="uclink">
        <a href="<?php echo $cfg_memberurl; ?>/index.php">会员中心</a> | 
        <a href="<?php echo $cfg_memberurl; ?>/edit_fullinfo.php">资料</a> | 
        <a href="<?php echo $myurl;?>">空间</a> | 
        <a href="<?php echo $cfg_memberurl; ?>/index_do.php?fmdo=login&dopost=exit">退出登录</a> 
    </div>
 -->
