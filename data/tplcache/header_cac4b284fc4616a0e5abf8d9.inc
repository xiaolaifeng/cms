<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=<?php echo $cfg_soft_lang; ?>" />
<title><?php echo $GLOBALS['_vars']['spacename'];  echo $GLOBALS['_vars']['curtitle']; ?></title>
<meta name="author" content="<?php echo $GLOBALS['_vars']['uname']; ?>"/>
<meta name="description"
	content="<?php echo html2text($fields['description']); ?>" />
<?php include $this->CompilerInclude("css.htm");
 ?>
</head>
<body >

<!-- 导航 -->
<div class="navbar navbar-fixed-top bg-white" role="navigation">

  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed"
        data-toggle="collapse" data-target="#navbar" aria-expanded="false"
        aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span> <span
          class="icon-bar"></span> <span class="icon-bar"></span> <span
          class="icon-bar"></span>
      </button>
      <a class="navbar-brand"><img
        src="/resource/img/logo/logo_large.png" alt="" /></a>
    </div>
    <div id="navbar" class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li><a href='/'  class="nav-item">首页</a></li>
        <li><a class="nav-item" href="/a/zhijian/">智见</a></li>
        <li><a class="nav-item" href="/a/spec/">专题</a></li>
        <li><a class="nav-item" rel="dropmenu1" href="/app/">极客玩</a></li>
        <li class="dropdown active"><a href="##" data-toggle="dropdown"
          class="dropdown-toggle">极客玩<span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="##">应用</a></li>
            <li><a href="##">游戏</a></li>
            <li class="dropdown-submenu"><a tabindex="-1"
              href="javascript:;">专题</a>
              <ul class="dropdown-menu">
                <li><a tabindex="-1" href="javascript:;">社交</a></li>
                <li><a tabindex="-1" href="javascript:;">通讯</a></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
     <div id="_userlogin"></div>
			 <form action="##" class="navbar-form navbar-right" rol="search">
	        <div class="form-group">
	          <input type="text" class="form-control" placeholder="请输入关键词" />
	        </div>
	      </form>
    </div>
  </div>
</div>
<!-- 导航END -->