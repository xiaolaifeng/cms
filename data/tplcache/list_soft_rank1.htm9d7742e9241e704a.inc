<?php
$z[0]=Array("global","",236,264);
$z[0][4]['name']="cfg_soft_lang";
$z[1]=Array("field","",277,296);
$z[1][4]['name']="title";
$z[2]=Array("global","",297,323);
$z[2][4]['name']="cfg_webname";
$z[3]=Array("field","",364,393);
$z[3][4]['name']="keywords";
$z[4]=Array("field","",433,491);
$z[4][4]['name']="description";
$z[4][4]['function']="html2text(@me)";
$z[5]=Array("global","",509,541);
$z[5][4]['name']="cfg_templets_skin";
$z[6]=Array("include","",1431,1466);
$z[6][4]['filename']="head.htm";
$z[7]=Array("channel","\r\n					<li><a href='[field:typeurl/]'>[field:typename/]</a></li>",1599,1781);
$z[7][4]['type']="son";
$z[7][4]['currentstyle']="<li><a href='~typelink~' class='thisclass'>~typename~</a></li>";
$z[8]=Array("channel","\r\n				<a href='[field:typelink /]'>[field:typename/]</a> ([field:ID runphp='yes'] @me = GetTotalArc(@me);[/field:ID])\r\n			\r\n			",1854,2031);
$z[8][4]['type']="top";
$z[8][4]['typeid']="";
$z[9]=Array("list","\r\n				<li>\r\n      				[field:array runphp='yes']@me = (empty(@me['litpic']) ? \"\" : \"<a href='{@me['arcurl']}' class='preview'><img src='{@me['litpic']}'/></a>\"); [/field:array]\r\n					<a href=\"[field:arcurl/]\" class=\"title\">[field:title/]</a>\r\n					<span class=\"info\">\r\n						<small>推荐级别：</small>[field:softrank function='GetRankStar(@me)'/]\r\n						<small>下载次数：</small>[field:click/]\r\n					</span>\r\n					<p class=\"intro\">\r\n						[field:description/]\r\n					</p>\r\n				</li>\r\n	",2040,2570);
$z[9][4]['pagesize']="10";
$z[10]=Array("pagelist","",2688,2759);
$z[10][4]['listitem']="info,index,end,pre,next,pageno";
$z[10][4]['listsize']="5";
$z[11]=Array("include","",2831,2868);
$z[11][4]['filename']="footer.htm";

?>