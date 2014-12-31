<?php
$z[0]=Array("channelartlist","\r\n          <div class=\"dropdown pull-left app-category\">\r\n            <button data-toggle=\"dropdown\" id=\"dropdownMenu1\" type=\"button\" class=\"btn btn-default dropdown-toggle\" href=\"{dede:field.typeurl/}\">\r\n            {dede:field name='typename'/} <span class=\"caret\"></span>\r\n            </button>\r\n            <ul aria-labelledby=\"dropdownMenu1\" role=\"menu\" class=\"dropdown-menu\">\r\n             {dede:sql sql='Select * from dede_arctype where reid =~id~'}  \r\n              <li role=\"presentation\"><a href=\"[field:typeurl/]\" tabindex=\"-1\" role=\"menuitem\" class=\"type[field:id/]\">[field:typename /]</a></li>\r\n               {/dede:sql}   \r\n            </ul>\r\n          </div>\r\n		",276,1088);
$z[0][4]['typeid']="1";
$z[0][4]['currentstyle']="<li><a href='~typelink~' class='thisclass'>~typename~</a></li>";

?>