<?php
/**
 * �Ա���ݵ�¼�ӿ�
 *
 * @version        $Id: plus_alipay.php 5 13:23 2011-6-30 niap,���� $
 * @package        DedeCMS.Administrator
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           
 */
require_once(dirname(__FILE__)."/../include/common.inc.php");
if($cfg_mb_open!='Y'){
	ShowMsg('��Ա����û�п������������¼!','-1');
	exit();
}
if ($cfg_alipay_open!='Y')
{
	ShowMsg('�ر�֧����ͬ����¼����!','-1');
	exit();
}

define('DEDEPLUS', DEDEROOT.'/plus');
require_once(DEDEPLUS."/alipay/lib/alipay_service.class.php");
require_once(DEDEPLUS."/alipay/lib/alipay_notify.class.php");
$anti_phishing_key  = '';
$exter_invoke_ip = '';
$aliapy_config['partner'] = $cfg_alipay_partner;
$aliapy_config['key'] = $cfg_alipay_key;
if (!preg_match('#http#i', $cfg_cmsurl)) $cfg_cmsurl = $cfg_basehost;

$aliapy_config['return_url'] = $cfg_cmsurl.'/plus/alipay.php';
$aliapy_config['input_charset'] = $cfg_soft_lang;
$aliapy_config['sign_type']    = 'MD5';
$aliapy_config['transport']    = 'http';
//����Ҫ����Ĳ�������
$parameter = array(
				"service"			=> "alipay.auth.authorize",
				"target_service"	=> 'user.auth.quick.login',

				"partner"			=> trim($aliapy_config['partner']),
				"_input_charset"	=> trim(strtolower($aliapy_config['input_charset'])),
		        "return_url"		=> trim($aliapy_config['return_url']),

		        "anti_phishing_key"	=> $anti_phishing_key,
				"exter_invoke_ip"	=> $exter_invoke_ip
	);
$is_success = isset($is_success)? $is_success : '';
if($is_success == 'T'){
	$alipayNotify = new AlipayNotify($aliapy_config);
	$verify_result = $alipayNotify->verifyReturn();
	if($verify_result) {
		$memberurl = $cfg_cmsurl.'/member/';
		require(DEDEINC.'/memberlogin.class.php');
		$kptime = 86400;
		$ml = new MemberLogin($kptime);
		if($ml->IsLogin()){
			header("Location:{$memberurl}index.php");
		}else if(CheckUserID($real_name) === 'ok'){
        	include(DEDEROOT.'/member/templets/alipaylogin.htm');
		}else{
			$row = $dsql->GetOne("SELECT `mid`, `pwd` FROM #@__member WHERE `userid`='{$real_name}'");
			$ml->PutLoginInfo($row['mid'],$kptime);
			header("Location:{$memberurl}index.php");
		}
	}else{
		ShowMsg('֧������֤ʧ��', '../index.php');
        exit;
	}

}else{
	$alipayService = new AlipayService($aliapy_config);
	$html_text = $alipayService->alipay_auth_authorize($parameter);
	echo $html_text;
}
?>
