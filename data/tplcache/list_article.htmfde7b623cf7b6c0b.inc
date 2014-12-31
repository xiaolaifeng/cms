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
$z[6]=Array("include","",1353,1397);
$z[6][4]['filename']="/v1/cssscript.htm";
$z[7]=Array("include","",1480,1516);
$z[7][4]['filename']="head3.htm";
$z[8]=Array("list","\r\n				<section>\r\n						<div class=\"content-card-wrapper\">\r\n							<div class=\"content-card\">\r\n								<!-- Article Title -->\r\n								<div class=\"article-title\">\r\n									<a data=\"2465\" target=\"_blank\" href=\"[field:arcurl/]\" class=\"app-title\">\r\n										<h1>\r\n											[field:title/]										</h1>\r\n									</a>\r\n									<div style=\"padding-top: 10px;\" class=\"pub-time-and-version\">\r\n										<span class=\"pub-time\">[field:pubdate function=\"MyDate('Y-m-d',@me)\"/]</span>\r\n									</div>\r\n								</div>\r\n								<a target=\"_blank\" href=\"\" class=\"detail-icon\" title=\"进入应用详情页面\"></a>\r\n								<!-- Article Img -->\r\n								 [field:array runphp='yes']@me = (empty(@me['litpic']) ? \"\" : \"<a href='{@me['arcurl']}' class='article-img'  target='_blank'><img src='{@me['litpic']}'/></a>\"); [/field:array]\r\n							</div>\r\n							<!-- Quote Area -->\r\n							<div class=\"quote-area\">\r\n								<div class=\"quote-words\">\r\n									<a target=\"_blank\" href=\"[field:arcurl/]\" class=\"quote-text\">[field:description/]</a>\r\n								</div>\r\n								    <p>\r\n									<a href=\"/member/index.php?uid={dede:field.mid function=\"GetMemberInfos('userid',@me)\"/}&action=article\"><span class=\"user-title\"></span>\r\n									<span style=\"float:right\" class=\"user-name\">[field:writer/].</span></a>\r\n									<span class=\"newsimagenice\">\r\n										<i></i><span>[field:goodpost/]</span>\r\n									</span>\r\n								    </p>\r\n							    </div>\r\n						    </div>\r\n			</section>\r\n				 ",1683,3194);
$z[8][4]['pagesize']="10";
$z[9]=Array("pagelist","",3273,3351);
$z[9][4]['listitem']="info,index,end,pre,next,pageno,option";
$z[9][4]['listsize']="5";
$z[10]=Array("global","",3593,3621);
$z[10][4]['name']="cfg_memberurl";
$z[11]=Array("keywords","\r\n			            <li class=\"web-tag-list\" ><a href='[field:link/]' class=\"web-tag-list-item\">[field:keyword /]</a></li>\r\n			          ",4419,4617);
$z[11][4]['row']="10";
$z[11][4]['getall']="1";
$z[11][4]['sort']="month";
$z[12]=Array("include","",5552,5590);
$z[12][4]['filename']="footer3.htm";

?>