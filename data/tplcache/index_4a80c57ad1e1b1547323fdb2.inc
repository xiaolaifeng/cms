<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
 include $this->CompilerInclude("header.htm");
 ?>
<div class="container page-content">
    <!-- 个人信息 -->
    <div class="row first-row">
      <div class="col-xs-12 size-fix">
        <div class="row app-card">
          <div class="col-xs-12">
            <div class="row pt pb bb">
              <div class="col-md-1 col-sm-2 col-xs-3 app-icon">
                <img width="68" height="68" class="img-thumbnail img-circle" src="/resource/img/icon/icon.png"
                  alt="" />
              </div>
              <div class="col-md-11 col-sm-10 col-xs-9 app-content">
                <div class="row">
                  <div class="app-title pull-left">
                    <h4><?php echo $GLOBALS['_vars']['spacename']; ?></h4>
                  </div>
                  <div class="pull-right app-card-btn">
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
          <!-- 暂未统计个人文章数
          <div class="col-xs-12">
            <div class="row">
              <div class="col-xs-12 ">
                <ul class="dashboard-tabs">
                  <li><a href="#" class="text-info">2 智见</a></li>
                </ul>
              </div>
            </div>
          </div>
           -->
        </div>

      </div>
    </div>
    <!-- 个人信息END -->
    <!-- 卡片区域 -->
    <div class="row">
      <?php
$atts = array();
$atts['tagname'] = 'spacenewart';
$atts['row'] = '10';
$atts['titlelen'] = '60';
$blockValue = MakePublicTag($atts,$this->refObj,$fields); 
if(is_array($blockValue) && count($blockValue) > 0){
foreach( $blockValue as $key=>$fields )
{

	if($fields['channel']==1) {
			$fields['arcurl'] = "index.php?uid={$_vars['userid_e']}&action=viewarchives&aid={$fields['id']}";
	}
?>
   <div class="col-md-4 col-sm-6 col-xs-12 size-fix">
        <div class="row dashboard-card-normal">
          <div class="dashboard-card-img" >
          <a href="<?php echo $cfg_phpurl; ?>/view.php?aid=<?php echo $fields['id']; ?>">
            <img src="<?php echo $fields['litpic']; ?>" style="height:380px;" alt="">
          </a>
          </div>
          <div class="dashboard-card-header">
         <?php echo $fields['title']; ?>
          </div>
          <div class="dashboard-card-status">
            <div class="pr-sm pull-left">
              <i class="fa fa-heart-o"></i><?php echo $fields['goodpost']; ?>
            </div>
            <div class="pr-sm pull-left">
              <i class="fa fa-comments"></i><?php echo $fields['scores']; ?>
            </div>
            <div class="pr-sm pull-left">
              <i class="fa fa-eye"></i><?php echo $fields['click']; ?>
            </div>
            <div class="pull-right">
             <?php echo MyDate('Y-m-d',$fields['pubdate']); ?>
            </div>
          </div> 
        </div>
      </div>
 <?php
}
}
?>
    </div>
    <!-- 卡片区域END -->
  </div>
  <!-- 内容END -->


<?php include $this->CompilerInclude("./../../../templets/default/footer.htm");
 ?>

</body>
</html>