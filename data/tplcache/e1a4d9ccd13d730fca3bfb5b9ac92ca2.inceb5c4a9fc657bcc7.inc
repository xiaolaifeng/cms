<?php
$z[0]=Array("list","<div class=\"row\">\r\n      <div class=\"col-xs-12\">\r\n        <div class=\"dashboard-card-img\">\r\n		 \r\n          <!-- Article Img -->\r\n		 [field:array runphp='yes']@me = (empty(@me['litpic']) ? \"\" : \"<a href='{@me['arcurl']}' class='article-img'  target='_blank'><img src='{@me['litpic']}'/></a>\"); [/field:array]\r\n		 \r\n        </div>\r\n        <div class=\"view-card-header\">\r\n          <p>[field:title  function=' ( strlen(\"@me\")>60 ? cn_substr(\"@me\",60).\"...\" : \"@me\" ) '/]</p>\r\n          <p class=\"date\">[field:pubdate function=\"GetDateMk(@me)\"/]</p>\r\n        </div>\r\n        <div class=\"view-card-text\">\r\n          <p>\r\n         [field:description runphp='yes']\r\n				if(@me<>'' )@me = ' <div class=\"intro\">'.@me.'</div> ';\r\n		[/field:description]\r\n          \r\n          </p>\r\n        </div>\r\n        <div class=\"view-card-status\">\r\n          <div class=\"pr-sm pull-left\">\r\n            <i class=\"fa fa-heart-o\"></i>[field:goodpost/]\r\n          </div>\r\n          <div class=\"pr-sm pull-left\">\r\n            <i class=\"fa fa-comments\"></i>5\r\n          </div>\r\n          \r\n          <div class=\"pull-right\">\r\n            <span><a href=\"/member/index.php?uid=[field:mid function=GetMemberInfos('userid',@me)/]&action=article\">[field:writer/]</a></span>\r\n            <span>极客</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>",0,1445);
$z[0][4]['pagesize']="30";
$z[0][4]['col']="1";
$z[0][4]['titlelen']="60";
$z[0][4]['orderby']="pubdate";
$z[0][4]['orderway']="desc";
$z[0][4]['channel']="1";

?>