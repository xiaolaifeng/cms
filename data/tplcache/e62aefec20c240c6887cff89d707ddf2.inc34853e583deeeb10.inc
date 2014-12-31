<?php
$z[0]=Array("arclist","\r\n        \r\n				<section>\r\n						<div class=\"content-card-wrapper\">\r\n							<div class=\"content-card\">\r\n								<!-- Article Title -->\r\n								<div class=\"article-title\">\r\n									<a data=\"2465\" target=\"_blank\" href=\"[field:arcurl/]\" class=\"app-title\">\r\n										<h1>[field:title/]	</h1>\r\n									</a>\r\n									<div style=\"padding-top: 10px;\" class=\"pub-time-and-version\"> \r\n										<span class=\"pub-time\">[field:pubdate function=\"GetDateMk(@me)\"/]</span>\r\n									</div>\r\n								</div>\r\n								<a target=\"_blank\" href=\"\" class=\"detail-icon\" title=\"进入应用详情页面\"></a>\r\n								<!-- Article Img -->\r\n								 [field:array runphp='yes']@me = (empty(@me['litpic']) ? \"\" : \"<a href='{@me['arcurl']}' class='article-img'  target='_blank'><img src='{@me['litpic']}'/></a>\"); [/field:array]\r\n							</div>\r\n							<!-- Quote Area -->\r\n							<div class=\"quote-area\">\r\n								<div class=\"quote-words\">\r\n									<a target=\"_blank\" href=\"[field:arcurl/]\" class=\"quote-text\">\r\n									   [field:description runphp='yes']\r\n										  if(@me<>'' )@me = ' <div class=\"intro\">'.@me.'</div> ';\r\n										  [/field:description]\r\n									</a>\r\n								</div>\r\n								    <p>\r\n									<a href=\"/index/member/personalization/tagetuser/285\"><span class=\"user-title\"></span>\r\n									<span style=\"float:right\" class=\"user-name\">[field:writer/]</span></a>\r\n									<span class=\"newsimagenice\">\r\n										<i></i><span>[field:goodpost/]</span>\r\n									</span>\r\n								    </p>\r\n							    </div>\r\n						    </div>\r\n			</section>\r\n			",75,1715);
$z[0][4]['typeid']="2";
$z[0][4]['sort']="hot";
$z[0][4]['subday']="90";
$z[0][4]['tagid']="index";
$z[0][4]['pagesize']="10";
$z[1]=Array("arcpagelist","",1791,1824);
$z[1][4]['tagid']="index";
$z[2]=Array("pagelist","",1832,1910);
$z[2][4]['listitem']="info,index,end,pre,next,pageno,option";
$z[2][4]['listsize']="5";
$z[3]=Array("global","",2303,2331);
$z[3][4]['name']="cfg_memberurl";
$z[4]=Array("php","\r\n								        if(preg_match(\"#2#\", \$safe_gdopen))\r\n								        {\r\n								        echo '\r\n								        <li class=\"w0 \">\r\n								        <div class=\"logininpt\"> \r\n								        <input type=\"text\" style=\"\" class=\"txt ztag\" tabindex=\"1\" name=\"vdcode\"  placeholder=\"验证码\">\r\n								        </li>\r\n								        <li class=\"w0 \">\r\n								        <div class=\"logininpt\"> \r\n								         <img id=\"vdimgck\" align=\"absmiddle\" onClick=\"this.src=this.src+\\'?\\'\" style=\"cursor:pointer;margin-left:0px;text-transform:uppercase;\" alt=\"看不清？点击更换\" src=\"'.\$cfg_cmspath.'/include/vdimgck.php\"/></div>\r\n								        </li>\r\n								        ';\r\n								        }\r\n								        ",3038,3760);
$z[5]=Array("global","",4770,4798);
$z[5][4]['name']="cfg_memberurl";

?>