<?php
define("QQDEBUG", false);
if (defined("QQDEBUG") && QQDEBUG){
    @ini_set("error_reporting", E_ALL);
    @ini_set("display_errors", TRUE);
}
define("COOKIE_DOMAIN", false);//二级域名同步
if (defined("COOKIE_DOMAIN") && COOKIE_DOMAIN)
{
    if (defined("MAIN_DOMAIN"))
        @ini_set("session.cookie_domain", MAIN_DOMAIN);
}
@session_start(); 
require(dirname(__FILE__).'/../../include/common.inc.php');
require_once(DEDEDATA.'/qzonelogin_config.php');
require_once(DEDEINC.'/memberlogin.class.php');
$cfg_ml = new MemberLogin();
require_once(DEDEINC.'/helpers/qzonelogin.helper.php');
if($gourl <> ''){
	$gourl = base64_encode($gourl);
}
$_SESSION['appid'] = '101140476';
$_SESSION['appkey'] = 'bbd7ed1983fca047c8d5eb3dcb06c989';
$_SESSION["callback"] = "http://www.geekview.cn/dedecms/plus/qzonelogin/callback.php?type={$type}&webcall=".$gourl;
?>
