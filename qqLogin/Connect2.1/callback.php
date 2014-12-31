<?php
require_once(dirname(__FILE__).'/API/qqConnectAPI.php');
echo dirname(__FILE__).'/API/qqConnectAPI.php';
echo dirname(__FILE__).'/config.php';
$qc = new QC();
$arr = $qc->get_user_info();
$openid=$qc->get_openid();
$token=$qc->qq_callback();
// 	require_once(dirname(__FILE__)."/../../member/reg_qq.php");
