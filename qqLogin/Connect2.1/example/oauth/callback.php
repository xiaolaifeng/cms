<?php
require_once(dirname(__FILE__)."/config.php");
require_once(dirname(__FILE__)."/../qqLogin/Connect2.1/API/qqConnectAPI.php");
$qc = new QC();

$arr = $qc->get_user_info();
$openid=$qc->get_openid();
$token=$qc->qq_callback();
echo '---'.$openid;
echo '---'.$token;
require_once(DEDEMEMBER."/templets/reg-qq.htm");
