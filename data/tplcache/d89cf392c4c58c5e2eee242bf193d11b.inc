<field:filetype islist="1" itemname="文件类型" type="text" isnull="true" default="" rename="" />	
<field:language islist="1" itemname="语言" type="text" isnull="true" default="" rename="" />	
<field:softtype islist="1" itemname="软件类型" type="text" isnull="true" default="" rename="" />	
<field:accredit islist="1" itemname="授权方式" type="text" isnull="true" default="" rename="" />	
<field:os islist="1" itemname="操作系统" type="text" isnull="true" default="" rename="" />	
<field:softrank  islist="1" itemname="软件等级" type="int" isnull="true" default="3" rename="" function="GetRankStar(@me)" notsend="1"/>	
<field:officialUrl  itemname="官方网址" type="text" isnull="true" default="" rename="" />	
<field:officialDemo itemname="演示网址" type="text" isnull="true" default="" rename="" />	
<field:softsize  itemname="软件大小" type="text" isnull="true" default="" rename="" />	
<field:softlinks  itemname="软件地址" type="softlinks" isnull="true" default="" rename="" />	
<field:introduce  itemname="详细介绍" type="htmltext" isnull="trnue" default="" rename="" />	
<field:daccess islist="1" itemname="下载级别" type="int" isnull="true" default="0" rename="" function="" notsend="1"/>	
<field:needmoney islist="1" itemname="需要金币" type="int" isnull="true" default="0" rename="" function="" notsend="1" />
<field:icon itemname="图标" autofield="1" notsend="0" type="img" isnull="true" islist="0" default=""  maxlength="250" page="">
</field:icon>

<field:size itemname="大小" autofield="1" notsend="0" type="text" isnull="true" islist="0" default=""  maxlength="250" page="">
</field:size>

<field:auth itemname="权限要求" autofield="1" notsend="0" type="text" isnull="true" islist="0" default=""  maxlength="250" page="">
</field:auth>

<field:developer itemname="开发者" autofield="1" notsend="0" type="text" isnull="true" islist="0" default=""  maxlength="250" page="">
</field:developer>

<field:monitor itemname="安全监测" autofield="1" notsend="0" type="text" isnull="true" islist="0" default=""  maxlength="250" page="">
</field:monitor>

<field:title_img itemname="app截图" autofield="1" notsend="0" type="htmltext" isnull="true" islist="0" default=""  maxlength="250" page="">
</field:title_img>


<field:app itemname="app简介" autofield="1" notsend="0" type="multitext" isnull="true" islist="0" default=""  maxlength="250" page="">
</field:app>




<field:update_content itemname="更新内容" autofield="1" notsend="0" type="text" isnull="true" islist="0" default=""  maxlength="1000" page="">
</field:update_content>

<field:show_status itemname="上架状态" autofield="1" notsend="0" type="select" isnull="true" islist="0" default="已上架,已下架"  maxlength="250" page="">
</field:show_status>

<field:device_label itemname="设备标签" autofield="1" notsend="0" type="text" isnull="true" islist="0" default="Phone & Pad"  maxlength="250" page="">
</field:device_label>
