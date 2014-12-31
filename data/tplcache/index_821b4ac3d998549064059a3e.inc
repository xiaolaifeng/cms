<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=<?php echo $cfg_soft_lang; ?>" />
<title>文档管理 - 会员中心 - <?php echo $cfg_webname; ?></title>
<?php include(DEDEMEMBER."/templets/v2/css.htm"); ?>
<script type="text/javascript">
  function viewArc(aid){
	  window.open("<?php echo $GLOBALS['cfg_phpurl']; ?>/view.php?aid="+aid);
  }
  function editArc(aid,channelid){
	  location = "archives_do.php?dopost=edit&channelid="+channelid+"&aid="+aid;
  }
  function delArc(aid){
	  if(window.confirm('你确定要删除这篇文档吗?')) location="archives_do.php?aid="+aid+"&dopost=delArc";
  }
</script>
</head>
<body >
<?php include(DEDEMEMBER."/templets/v2/head.htm"); ?>
<!-- 内容 -->
  <div class="container page-content">
    <!-- 个人信息 -->
    <div class="row first-row">
      <div class="col-xs-12 size-fix">
        <div class="row app-card">
          <div class="col-xs-12">
            <div class="row pt pb bb">
              <div class="col-md-1 col-sm-2 col-xs-3 app-icon">
                <img width="68" height="68" class="img-thumbnail img-circle" src="<?php 
				$facepic = !empty($cfg_ml->M_Face)? $cfg_ml->M_Face : $cfg_memberurl.'/templets/images/dfboy.png';
				echo $facepic;
				?>"
                  alt="" />
              </div>
              <div class="col-md-11 col-sm-10 col-xs-9 app-content">
                <div class="row">
                  <div class="app-title pull-left">
                    <h4><?php echo $cfg_ml->M_UserName; ?></h4>
                  </div>
                  <div class="pull-right app-card-btn">
                    <a class="btn btn-info hidden-xs hidden-sm" href="/member/edit_auth_baseinfo.php">
                      <li class="fa fa-gear"></li>
                      		个人设置
                    </a>
                    <a class="hidden-md hidden-lg">
                      <li class="fa fa-gear"></li>
                    </a>
                  </div>
                </div>
                <div class="row">
            		      极客
                </div>
                <div class="row dashboard-social-btn">
                  <div class="qq-sm pull-left mr-sm">
                    <a href="#" class="text-center">
                      <i class="fa fa-qq"></i>
                    </a>
                  </div>
                  <div class="weibo-sm pull-left mr-sm">
                    <a href="#" class="text-center">
                      <i class="fa fa-weibo"></i>
                    </a>
                  </div>
                  <div class="xiaomi-sm pull-left mr-sm">
                    <a href="#" class="text-center">
                      <i class="fa icon-xiaomi"></i>
                    </a>
                  </div>
                  <div class="douban-sm pull-left mr-sm">
                    <a href="#" class="text-center">
                      <i class="fa icon-douban"></i>
                    </a>
                  </div> 
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12">
            <div class="row">
              <div class="col-xs-12 ">
                <ul class="dashboard-tabs">
                  <li><a href="#" class="text-info">2 智见</a></li>
                  <li><a href="#" class="text-info">15 喜欢</a></li>
                  <li><a href="#" class="text-info">0 收藏应用</a></li>
                  <li><a href="#" class="text-error">0 下载应用</a></li>
                  <li><a href="#" class="text-info">0 提交应用</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 个人信息END -->
    <!-- 卡片区域 -->
    <div class="row">
      <div class="col-md-4 col-sm-6 col-xs-12 size-fix">
        <div class="row dashboard-card-add">
            <div class="text-center dashboard-add">
              <a href="#" onclick="javascript:self.location='<?php  echo  $cfg_memberurl.'/article_add.php';?>'">
                <div class="dashboard-add-btn">
                  <i class="fa fa-plus"></i>
                </div>
                <div class="dashboard-add-text pt-sm">
                  发布智见
                </div>
              </a>
            </div>
        </div>
      </div>
       
	   
			 <?php
			 
			  foreach ($articles as $article){
   
 			?>
			<div class="col-md-4 col-sm-6 col-xs-12 size-fix">
				<div class="row dashboard-card-normal">
				  <a href="<?php echo $cfg_phpurl; ?>/view.php?aid=<?php echo $article['id'];  ?>" class="dashboard-card-img">
					<img src="<?php echo $article['litpic']; ?>" alt="">
				  </a>
				  <div class="dashboard-card-header">
						<?php echo $article['title']; ?>
				  </div>
				  <div class="dashboard-card-detail">
					<center>
					  <button onclick="editArc(<?php echo $article['id']?>,<?php echo $article['channel']?>);" class="btn btn-default dashboard-card-btn" type="button"><i class="fa fa-edit"></i>编辑</button>
					  <button onclick="delArc(<?php echo $article['id']?>);" class="btn btn-default dashboard-card-btn" type="button"><i class="fa fa-trash-o"></i>删除</button>
					</center>
				  </div> 
				</div>
			  </div>
						
						
				<?php 
			} ?>	
					 
		<!--分页 -->
		<div class="page-direct"></div> 
		
		
    </div>
    <!-- 卡片区域END -->
  </div>
  <!-- 内容END -->
<?php include(DEDEMEMBER."/templets/v2/js.htm");  include(DEDEMEMBER."/templets/v2/footer.htm"); ?>

</body>
</html>