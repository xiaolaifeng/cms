<?php
require_once("../../qqLogin/Connect2.1/API/qqConnectAPI.php");

require_once("config.php");
$qc = new QC();
$arr = $qc->get_user_info();
$openid=$qc->get_openid();
$token=$qc->qq_callback();
	require_once(dirname(__FILE__)."/../../member/reg_qq.php");
?>