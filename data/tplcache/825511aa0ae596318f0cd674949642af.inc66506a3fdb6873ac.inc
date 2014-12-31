<?php
$z[0]=Array("field","",51,79);
$z[0][4]['name']="typeurl";
$z[1]=Array("field","",91,107);
$z[1][4]['name']="id";
$z[2]=Array("field","",109,138);
$z[2][4]['name']="typename";
$z[3]=Array("field","",191,207);
$z[3][4]['name']="id";
$z[4]=Array("sql","  \r\n		               {dede:if field.id>10 }---------\r\n						{/dede:if}\r\n			                 <li><a href=\"../plus/list.php?tid=[field:id/]\" class=\"type[field:id/]\">[field:typename /]</a></li>\r\n			                ",233,515);
$z[4][4]['sql']="Select * from dede_arctype where reid =~id~";

?>