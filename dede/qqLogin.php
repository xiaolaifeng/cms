<?php
/*********************************************************************************
 * QQ登陆入口初始化文件
 *-------------------------------------------------------------------------------
 * 版权所有: CopyRight By yiqiu.org
 * 联系我们: yiqiustudio@gmail.com
 *-------------------------------------------------------------------------------
 * Author:亦秋_小新
 * Dtime:2012-5-12 14:31
***********************************************************************************/
require_once(dirname(__file__)."/config.php");
require_once(dirname(__file__)."/qqLogin/app.class.php");
$app = new AppClass;
if(!method_exists($app,$ac)) die("func not exists");
$app->$ac();