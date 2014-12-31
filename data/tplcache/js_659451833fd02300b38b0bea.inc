<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?>

<script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
<script src="/resource/plugins/boostrapv3/js/bootstrap.min.js"></script>
<script src="/resource/js/scroller.js"></script>
<script src="/resource/js/star-rating.js"></script>
<script src="/resource/js/app.js"></script>




<script language="javascript" type="text/javascript" src="<?php echo $GLOBALS['cfg_cmsurl']; ?>/include/dedeajax2.js"></script>

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