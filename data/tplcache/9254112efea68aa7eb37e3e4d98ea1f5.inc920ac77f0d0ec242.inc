<?php
$z[0]=Array("array","@me = (empty(@me['litpic']) ? \"\" : \"<a href='{@me['arcurl']}' class='article-img'  target='_blank'><img style='width:750px;height:400px;' src='{@me['litpic']}'/></a>\"); ",132,341);
$z[0][4]['runphp']="yes";
$z[1]=Array("arcurl","",425,440);
$z[2]=Array("title","",446,531);
$z[2][4]['function']="( strlen(\"@me\")>60 ? cn_substr(\"@me\",60).\"...\" : \"@me\" )";
$z[3]=Array("pubdate","",567,609);
$z[3][4]['function']="GetDateMk(@me)";
$z[4]=Array("description","\r\n				if(@me<>'' )@me = ' <div class=\"intro\">'.@me.'</div> ';\r\n		",693,810);
$z[4][4]['runphp']="yes";
$z[5]=Array("goodpost","",978,995);
$z[6]=Array("click","",1098,1112);
$z[7]=Array("mid","",1229,1279);
$z[7][4]['function']="GetMemberInfos('userid',@me)";
$z[8]=Array("writer","",1296,1311);

?>