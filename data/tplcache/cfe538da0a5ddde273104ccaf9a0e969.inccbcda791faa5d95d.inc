<?php
$z[0]=Array("array","@me = (empty(@me['litpic']) ? \"\" : \"<a href='{@me['arcurl']}' class='article-img'  target='_blank'><img style='width:750px;height:400px;' src='{@me['litpic']}'/></a>\"); ",132,341);
$z[0][4]['runphp']="yes";
$z[1]=Array("title","",417,502);
$z[1][4]['function']="( strlen(\"@me\")>60 ? cn_substr(\"@me\",60).\"...\" : \"@me\" )";
$z[2]=Array("pubdate","",534,576);
$z[2][4]['function']="GetDateMk(@me)";
$z[3]=Array("description","\r\n				if(@me<>'' )@me = ' <div class=\"intro\">'.@me.'</div> ';\r\n		",660,777);
$z[3][4]['runphp']="yes";
$z[4]=Array("goodpost","",945,962);
$z[5]=Array("mid","",1183,1233);
$z[5][4]['function']="GetMemberInfos('userid',@me)";
$z[6]=Array("writer","",1250,1265);

?>