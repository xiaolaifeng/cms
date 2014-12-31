<?php
header('Content-Type: text/html; charset=UTF-8');
define('APIKEY',C('DOUBAN_APP_KEY'));
define('Secret',C('DOUBAN_SECRET'));
define( "CALLBACK_URL" , C('DOUBAN_CALLBACK') );//回调地址