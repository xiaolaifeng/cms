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
$z[6]=Array("include","",1488,1523);
$z[6][4]['filename']="head.htm";
$z[7]=Array("channelartlist","\r\n		               \r\n		                  <li class=\"tenint\">\r\n		                  	<a href=\"{dede:field.typeurl/}\" class=\" on{dede:field.id/}\">{dede:field name='typename'/}</a>\r\n		                    <ul class='autod' id=\"dis{dede:field.id/}\">\r\n			                   {dede:sql sql='Select * from dede_arctype where reid =~id~'}  \r\n			                 <li><a href=\"[field:typeurl/]\" class=\"type[field:id/]\">[field:typename /]</a></li>\r\n			                {/dede:sql}    \r\n			                </ul>	\r\n		                  </li>\r\n		                \r\n		                ",1656,2352);
$z[7][4]['typeid']="1";
$z[7][4]['currentstyle']="<li><a href='~typelink~' class='thisclass'>~typename~</a></li>";
$z[8]=Array("list","\r\n				<li>\r\n      				[field:array runphp='yes']@me = (empty(@me['litpic']) ? \"\" : \"<a href='{@me['arcurl']}' class='preview'><img src='{@me['litpic']}'/></a>\"); [/field:array]\r\n					<a href=\"[field:arcurl/]\" class=\"title\">[field:title/]</a>\r\n					<span class=\"info\">\r\n						<small>推荐级别：</small>[field:softrank function='GetRankStar(@me)'/]\r\n						<small>下载次数：</small>[field:click/]\r\n						<a href=\"{dede:field name='softlinks'/}\">下载</a>\r\n					</span>\r\n					<p class=\"intro\">\r\n						<small>app简介：</small><span>[field:app_desc/]</span>\r\n					</p>\r\n				</li>\r\n	",2435,3062);
$z[8][4]['pagesize']="10";
$z[9]=Array("pagelist","",3180,3251);
$z[9][4]['listitem']="info,index,end,pre,next,pageno";
$z[9][4]['listsize']="5";
$z[10]=Array("include","",3323,3360);
$z[10][4]['filename']="footer.htm";

?>