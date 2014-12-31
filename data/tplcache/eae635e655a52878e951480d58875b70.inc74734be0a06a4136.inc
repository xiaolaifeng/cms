<?php
$z[0]=Array("array","@me = (empty(@me['litpic']) ? \"\" : \"<a href='{@me['arcurl']}' class='article-img'  target='_blank'><img src='{@me['litpic']}'/></a>\"); ",132,307);
$z[0][4]['runphp']="yes";
$z[1]=Array("arcurl","",391,406);
$z[2]=Array("title","",412,497);
$z[2][4]['function']="( strlen(\"@me\")>60 ? cn_substr(\"@me\",60).\"...\" : \"@me\" )";
$z[3]=Array("pubdate","",533,575);
$z[3][4]['function']="GetDateMk(@me)";
$z[4]=Array("description","\r\n				if(@me<>'' )@me = ' <div class=\"intro\">'.@me.'</div> ';\r\n		",659,776);
$z[4][4]['runphp']="yes";
$z[5]=Array("goodpost","",944,961);
$z[6]=Array("click","",1064,1078);
$z[7]=Array("mid","",1195,1245);
$z[7][4]['function']="GetMemberInfos('userid',@me)";
$z[8]=Array("writer","",1262,1277);

?>