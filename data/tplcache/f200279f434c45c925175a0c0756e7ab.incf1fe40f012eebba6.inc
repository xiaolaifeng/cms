<?php
$z[0]=Array("arcurl","",203,218);
$z[1]=Array("title","",254,339);
$z[1][4]['function']="( strlen(\"@me\")>40 ? cn_substr(\"@me\",40).\"...\" : \"@me\" )";
$z[2]=Array("pubdate","",468,510);
$z[2][4]['function']="GetDateMk(@me)";
$z[3]=Array("array","@me = (empty(@me['litpic']) ? \"\" : \"<a href='{@me['arcurl']}' class='article-img'  target='_blank'><img src='{@me['litpic']}'/></a>\"); ",685,860);
$z[3][4]['runphp']="yes";
$z[4]=Array("arcurl","",1007,1022);
$z[5]=Array("description","\r\n										  if(@me<>'' )@me = ' <div class=\"intro\">'.@me.'</div> ';\r\n										  ",1057,1192);
$z[5][4]['runphp']="yes";
$z[6]=Array("writer","",1392,1407);
$z[7]=Array("goodpost","",1482,1499);

?>