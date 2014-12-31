<?php
require_once (dirname(__FILE__)."/../../include/common.inc.php");
$installhash = '../data/module/'.$hash;
$installsql= "DROP TABLE IF EXISTS `#@__member_qzonelogin`;";
if(empty($step)) $step = 'uninstall';
if($step == 'uninstall'){
	if(!empty($installsql)){
		$mysql_version = $dsql->GetVersion(TRUE);
		$setupsql = preg_replace("#ENGINE=MyISAM#i", 'TYPE=MyISAM', $installsql);
		$sql41tmp = 'ENGINE=MyISAM DEFAULT CHARSET='.$cfg_db_language;			
        if($mysql_version >= 4.1)
        {
            $setupsql = preg_replace("#TYPE=MyISAM#i", $sql41tmp, $setupsql);
        }
        if($cfg_cmspath=='/') $cfg_cmspath = '';
        $rooturl = $cfg_basehost.$cfg_cmspath;      
        $setupsql = preg_replace("#_ROOTURL_#i", $rooturl, $setupsql);
        $setupsql = preg_replace("#[\r\n]{1,}#", "\n", $setupsql);
        $sqls = @split(";[ \t]{0,}\n", $setupsql);
        foreach($sqls as $sql)
        {
            if(trim($sql)!='') $dsql->ExecuteNoneQuery($sql);
        }
	}
	$verLockFile = DEDEDATA.'/admin/ver.txt';
    $fp = fopen($verLockFile,'r');
    $upTime = trim(fread($fp,64));
    fclose($fp);
	$cfg_version = explode('_',$cfg_version);
	$cfg_version = $cfg_version[0];
	$_statApi = 'http://bbs.xuewl.com/pluginserver.php';
	$_statInfo = array();
	$_statInfo['pluginName'] = 'DedeQzoneLogin';
	$_statInfo['pluginVersion'] = '1.0';
	$_statInfo['Program'] = $cfg_soft_enname;
	$_statInfo['bbsVersion'] = $cfg_version;
	$_statInfo['bbsRelease'] = $upTime;
	$_statInfo['timestamp'] = time();
	$_statInfo['webUrl'] = $cfg_basehost;
	$_statInfo['AdminEMail'] = $cfg_adminemail;
	$_statInfo['action'] = 'uninstall';
	$_statInfo['charset'] = $cfg_soft_lang;
	$_statInfo = base64_encode(serialize($_statInfo));
	$_md5Check = md5($_statInfo);
	$_StatUrl = $_statApi.'?action=do&info='.$_statInfo.'&md5check='.$_md5Check;
	echo "<script src=\"".$_StatUrl."\" type=\"text/javascript\"></script>";
	ReWriteConfigAuto();
	$rflwft = "<script language='javascript' type='text/javascript'>\r\n";
	$rflwft .= "if(window.navigator.userAgent.indexOf('MSIE')>=1) top.document.frames.menu.location = 'index_menu_module.php';\r\n";
	$rflwft .= "else top.document.getElementById('menu').src = 'index_menu_module.php';\r\n";
	$rflwft .= "</script>";
	echo $rflwft;
	UpDateCatCache();
	ShowMsg('插件卸载成功，感谢您的支持！','module_main.php');
	exit();
}
?>