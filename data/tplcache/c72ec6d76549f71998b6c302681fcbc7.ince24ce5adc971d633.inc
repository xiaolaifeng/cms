<?php
$z[0]=Array("specnote","\r\n                <section>\r\n				<div class=\"content-card-wrapper\">\r\n					<div class=\"content-card\">\r\n						<!-- Article Title -->\r\n						<div class=\"article-title\">\r\n							<a class=\"app-title\" href=\"[field:arcurl /]\" target=\"_blank\" data=\"6958a4a2cc2eabcf9071d055e658deea\">\r\n								<h1>\r\n									[field:title /]								</h1>\r\n							</a>\r\n							<div class=\"pub-time-and-version\" style=\"padding-top: 10px;\">\r\n								<span class=\"pub-time\">[field:pubdate function=\"MyDate('Y-m-d',@me)\"/]</span>\r\n							</div>\r\n						</div>\r\n						<!-- Article Img -->\r\n						<a class=\"article-img\" href=\"[field:arcurl /]\" target=\"_blank\">\r\n						[field:array runphp='yes']@me = (empty(@me['litpic']) ? \"\" : \"<img   style='display: block;' alt='title' src='{@me['litpic']}'  data-original='{@me['litpic']}'/>\"); [/field:array]\r\n						\r\n						</a>\r\n					</div>\r\n					<!-- Quote Area -->\r\n					<div class=\"quote-area\">\r\n						<div class=\"quote-words\">\r\n							<div class=\"quote-icon\"></div>\r\n							<a class=\"quote-text\" href=\"[field:arcurl /]\" target=\"_blank\">\r\n							[field:description/]\r\n							\r\n						</div>\r\n						<p>\r\n							<a href=\"/member/index.php?uid=[field:mid function=\"GetMemberInfos('userid',@me)\"/]&action=article\"\"><span class=\"user-title\"></span>\r\n							<span class=\"user-name\" style=\"float:right\"> [field:writer/]</span></a>\r\n							<span class=\"newsimagenice\">\r\n								<i></i><span>[field:goodpost/]</span>\r\n							</span>\r\n						</p>\r\n					</div>\r\n				 </div>\r\n			</section>\r\n                ",0,1746);
$z[0][4]['imgheight']="90";
$z[0][4]['imgwidth']="120";
$z[0][4]['infolen']="160";
$z[0][4]['titlelen']="60";
$z[0][4]['col']="1";
$z[0][4]['idlist']="8,2";
$z[0][4]['name']="默认节点";
$z[0][4]['noteid']="default";
$z[0][4]['isauto']="0";
$z[0][4]['rownum']="10";
$z[0][4]['keywords']="";
$z[0][4]['typeid']="0";

?>