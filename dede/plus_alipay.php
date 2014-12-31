<?php
/**
 * 淘宝快捷登录接口
 *
 * @version        $Id: plus_alipay.php 5 13:23 2011-6-30 niap $
 * @package        DedeCMS.Administrator
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           
 */

require_once(dirname(__FILE__)."/config.php");
$configfile = DEDEDATA.'/config.cache.inc.php';
function ReWriteConfig()
{
	global $dsql,$configfile;
	if(!is_writeable($configfile))
	{
		echo "配置文件'{$configfile}'不能写入";
		exit();
	}
	$fp = fopen($configfile,'w');
	flock($fp,3);
	fwrite($fp,"<"."?php\r\n");
	$dsql->SetQuery("SELECT `varname`,`type`,`value`,`groupid` FROM `#@__sysconfig` ORDER BY aid ASC ");
	$dsql->Execute();
	while($row = $dsql->GetArray())
	{
		if($row['type']=='number')
		{
			if($row['value']=='') $row['value'] = 0;
			fwrite($fp,"\${$row['varname']} = ".$row['value'].";\r\n");
		}
		else
		{
			fwrite($fp,"\${$row['varname']} = '".str_replace("'",'',$row['value'])."';\r\n");
		}
	}
	fwrite($fp,"?".">");
	fclose($fp);
}
if(empty($do))
{
	include DEDEADMIN.'/templets/plus_alipay.htm';
}elseif($do == "save"){
	if($cfg_mb_open!='Y'){
		ShowMsg('会员中心没有开启不能这样登录!','sys_info.php');
		exit();
	}else{
		$dsql->ExecuteNoneQuery("UPDATE `dede_sysconfig`  set `value`='{$alipay_open}' WHERE `varname` = 'cfg_alipay_open'");
		$dsql->ExecuteNoneQuery("UPDATE `dede_sysconfig`  set `value`='{$alipay_key}' WHERE `varname` = 'cfg_alipay_key'");
		$dsql->ExecuteNoneQuery("UPDATE `dede_sysconfig`  set `value`='{$alipay_partner}' WHERE `varname` = 'cfg_alipay_partner'");
		ReWriteConfig();
        ShowMsg('保存数据成功!','plus_alipay.php');
	}
}

