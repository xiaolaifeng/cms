<?php
$z[0]=Array("arclist","\r\n		<section>\r\n			<div class=\"content-card-wrapper\">\r\n				<div class=\"content-card\">\r\n					<!-- Article Title -->\r\n					<div class=\"article-title\">\r\n						<h1>\r\n							<a class=\"app-title\" data=\"2465\" href=\"[field:arcurl/]\" target=\"_blank\">[field:title/] </a></h1>\r\n						<div class=\"pub-time-and-version\" style=\"padding-top: 10px;\">\r\n							<span class=\"pub-time\">[field:pubdate function=\"GetDateMk(@me)\"/]</span></div>\r\n					</div>\r\n					<!-- Article Img -->[field:array runphp=&#39;yes&#39;]@me = (empty(@me[&#39;litpic&#39;]) ? \"\" : \"<a class=\"article-img\" href=\"{@me[\" target=\"_blank\"><img src=\"{@me[\" /></a>\"); [/field:array]</div>\r\n				<!-- Quote Area -->\r\n				<div class=\"quote-area\">\r\n					<div class=\"quote-words\">\r\n						<a class=\"quote-text\" href=\"[field:arcurl/]\" target=\"_blank\">[field:description runphp=&#39;yes&#39;] if(@me&lt;&gt;&#39;&#39; )@me = &#39; </a>\r\n						<div class=\"intro\">\r\n							<a class=\"quote-text\" href=\"[field:arcurl/]\" target=\"_blank\">&#39;.@me.&#39;</a></div>\r\n						<a class=\"quote-text\" href=\"[field:arcurl/]\" target=\"_blank\">&#39;; [/field:description] </a></div>\r\n					<p>\r\n						<a href=\"/index/member/personalization/tagetuser/285\"><span class=\"user-name\" style=\"float:right\">[field:writer/]</span></a> <span class=\"newsimagenice\"> <span>[field:goodpost/]</span> </span></p>\r\n				</div>\r\n			</div>\r\n		</section>\r\n		",65,1551);
$z[0][4]['typeid']="&#39;2&#39;";
$z[0][4]['flag']="&#39;c&#39;";
$z[0][4]['orderby']="pubdate";
$z[0][4]['tagid']="&#39;index&#39;";
$z[0][4]['pagesize']="&#39;10&#39;";
$z[1]=Array("arcpagelist","",1615,1656);
$z[1][4]['tagid']="&#39;index&#39;";
$z[2]=Array("pagelist","",1657,1735);
$z[2][4]['listitem']="info,index,end,pre,next,pageno,option";
$z[2][4]['listsize']="5";
$z[3]=Array("global","",2026,2054);
$z[3][4]['name']="cfg_memberurl";
$z[4]=Array("php"," if(preg_match(\"#2#\", \$safe_gdopen)) { echo &#39;\r\n						<li class=\"w0 \">\r\n							<div class=\"logininpt\">\r\n								<input class=\"txt ztag\" name=\"vdcode\" placeholder=\"验证码\" style=\"\" tabindex=\"1\" type=\"text\" /></div>\r\n						</li>\r\n						<li class=\"w0 \">\r\n							<div class=\"logininpt\">\r\n								<img align=\"absmiddle\" alt=\"看不清？点击更换\" id=\"vdimgck\" onclick=\"this.src=this.src+\\'?\\'\" src=\"'.\$cfg_cmspath.'/include/vdimgck.php\" style=\"cursor:pointer;margin-left:0px;text-transform:uppercase;\" /></div>\r\n						</li>\r\n						&#39;; } ",2690,3256);
$z[5]=Array("global","",4154,4182);
$z[5][4]['name']="cfg_memberurl";

?>