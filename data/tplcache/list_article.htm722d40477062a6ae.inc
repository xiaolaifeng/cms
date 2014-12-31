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
$z[6]=Array("include","",1491,1526);
$z[6][4]['filename']="head.htm";
$z[7]=Array("list","\r\n				<section>\r\n						<div class=\"content-card-wrapper\">\r\n							<div class=\"content-card\">\r\n								<!-- Article Title -->\r\n								<div class=\"article-title\">\r\n									<a data=\"2465\" target=\"_blank\" href=\"[field:arcurl/]\" class=\"app-title\">\r\n										<h1>\r\n											[field:title/] -- Nimble										</h1>\r\n									</a>\r\n									<div style=\"padding-top: 10px;\" class=\"pub-time-and-version\">\r\n										<span class=\"pub-time\">[field:pubdate function=\"GetDateTimeMK(@me)\"/]</span>\r\n									</div>\r\n								</div>\r\n								<a target=\"_blank\" href=\"\" class=\"detail-icon\" title=\"进入应用详情页面\"></a>\r\n								<!-- Article Img -->\r\n								 [field:array runphp='yes']@me = (empty(@me['litpic']) ? \"\" : \"<a href='{@me['arcurl']}' class='article-img'  target='_blank'><img src='{@me['litpic']}'/></a>\"); [/field:array]\r\n							</div>\r\n							<!-- Quote Area -->\r\n							<div class=\"quote-area\">\r\n								<div class=\"quote-words\">\r\n									<a target=\"_blank\" href=\"/article/shownews/id/2465\" class=\"quote-text\">智能时代，人们对智能产品的要求也越来越高，对生活有更简便化的追求。以往有触摸的智能产品，有一键控制的智能产品，但如今有了Nimble，你只需微举手指就可以实...</a>\r\n								</div>\r\n								    <p>\r\n									<a href=\"/index/member/personalization/tagetuser/285\"><span class=\"user-title\"></span>\r\n									<span style=\"float:right\" class=\"user-name\">Mint.</span></a>\r\n									<span class=\"newsimagenice\">\r\n										<i></i><span>0</span>\r\n									</span>\r\n								    </p>\r\n							    </div>\r\n						    </div>\r\n			</section>\r\n				 ",1693,3350);
$z[7][4]['pagesize']="10";
$z[8]=Array("pagelist","",3430,3508);
$z[8][4]['listitem']="info,index,end,pre,next,pageno,option";
$z[8][4]['listsize']="5";
$z[9]=Array("channel","\r\n				    <li class='web-tag-list' ><a href='[field:typeurl/]' class='web-tag-list-item'>[field:typename/]</a></li>\r\n				      ",4716,4993);
$z[9][4]['type']="son";
$z[9][4]['currentstyle']="<li class='web-tag-list' ><a href='~typelink~' class='web-tag-list-item'>~typename~</a></li>";
$z[10]=Array("include","",7659,7696);
$z[10][4]['filename']="footer.htm";

?>