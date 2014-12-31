<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><link rel=”alternate” type=”application/rss+xml” title=”<?php echo $fields['title']; ?>” href=”<?php echo $GLOBALS['cfg_cmsurl']; ?>/rss.php“/> 

<link href="<?php echo $GLOBALS['cfg_templets_skin']; ?>/v1/Home/image/favicon.ico" type="image/x-icon" rel="icon" />
<link href="<?php echo $GLOBALS['cfg_templets_skin']; ?>/v1/Home/css/panel.css" rel="stylesheet" media="screen" type="text/css" />
<link href="<?php echo $GLOBALS['cfg_templets_skin']; ?>/v1/Home/css/normalize.css" rel="stylesheet" media="screen" type="text/css" />
<link href="<?php echo $GLOBALS['cfg_templets_skin']; ?>/v1/Home/css/base.css" rel="stylesheet" media="screen" type="text/css" />
<link href="<?php echo $GLOBALS['cfg_templets_skin']; ?>/v1/Home/css/responsive.css" rel="stylesheet" media="screen" type="text/css" />
<link href="<?php echo $GLOBALS['cfg_templets_skin']; ?>/v1/Home/css/listPage.css" rel="stylesheet" media="screen" type="text/css" />
<link href="<?php echo $GLOBALS['cfg_templets_skin']; ?>/v1/Home/css/login.css" rel="stylesheet" media="screen" type="text/css" />
<link href="<?php echo $GLOBALS['cfg_templets_skin']; ?>/v1/css/pubnews.css" rel="stylesheet" media="screen" type="text/css" />
<link href="<?php echo $GLOBALS['cfg_templets_skin']; ?>/v1/Home/css/toobar.css?2014" rel="stylesheet" media="screen" type="text/css" />

<script src="<?php echo $GLOBALS['cfg_templets_skin']; ?>/v1/Home/js/jquery.min.js" language="javascript" type="text/javascript"></script>
<script src="<?php echo $GLOBALS['cfg_templets_skin']; ?>/v1/Home/js/jquery.lazyload.min.js" language="javascript" type="text/javascript"></script>
<script src="<?php echo $GLOBALS['cfg_templets_skin']; ?>/v1/Home/js/androidApp.js" language="javascript" type="text/javascript"></script>
<script src="<?php echo $GLOBALS['cfg_templets_skin']; ?>/v1/Home/js/global.js" language="javascript" type="text/javascript"></script>
<script src="<?php echo $GLOBALS['cfg_templets_skin']; ?>/v1/Home/js/placeholders.min.js" language="javascript" type="text/javascript"></script>
<script src="<?php echo $GLOBALS['cfg_templets_skin']; ?>/v1/Home/js/ga.js" language="javascript" type="text/javascript"></script>
<script src="<?php echo $GLOBALS['cfg_templets_skin']; ?>/v1/Home/js/main-2.js" language="javascript" type="text/javascript"></script>
<script src="<?php echo $GLOBALS['cfg_templets_skin']; ?>/v1/Home/js/nr-100.js" language="javascript" type="text/javascript"></script>
<script src="<?php echo $GLOBALS['cfg_templets_skin']; ?>/v1/Home/js/topics-x.js" language="javascript" type="text/javascript"></script>
<script src="<?php echo $GLOBALS['cfg_templets_skin']; ?>/v1/Home/js/jquery.toolbar.min.js" language="javascript" type="text/javascript"></script>
<script src="<?php echo $GLOBALS['cfg_templets_skin']; ?>/v1/Home/js/jquery.easing.1.3.js" language="javascript" type="text/javascript"></script>

<script src="<?php echo $GLOBALS['cfg_cmsurl']; ?>/include/dedeajax2.js" language="javascript" type="text/javascript" ></script>

<script type="text/javascript">
function CheckLogin(){
  var taget_obj = document.getElementById('_userlogin');
  myajax = new DedeAjax(taget_obj,false,false,'','','');
  myajax.SendGet2("<?php echo $GLOBALS['cfg_cmsurl']; ?>/member/ajax_loginsta.php");
  $('.login-user-name').click( function()  {
	    $('.manage-list ').toggle();
	});
  $('.loginForm').hide(0);
  DedeXHTTP = null;
}
</script>