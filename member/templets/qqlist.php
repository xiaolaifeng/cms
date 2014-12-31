<?php

$db->SetQuery("SELECT * FROM  `#@__member_model_auth` as a   WHERE model_type='qq' and  a.mid = $cfg_ml->M_ID ");
$db->Execute();
while($arr = $db->GetArray())
{
	
	echo '<a href="http://t.qq.com" class="login-social__qq external" target="_blank"><i class="icon-social-qq"></i>QQ</a> <span id="QQ_nickname">'.$arr['uname'].'</span>';
	echo '<span class="accountspan"> <a onclick="qq_bind.php?$dopost=unbind&mid=$cfg_ml->M_ID" style="float:right">解除绑定</a>  </span>'; 
}


