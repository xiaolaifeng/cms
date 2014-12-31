<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=<?php echo $cfg_soft_lang; ?>" />
<title>收藏夹 - 会员中心 - <?php echo $cfg_webname; ?></title>
<link href="templets/style/base.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="templets/js/j.js"></script>
<script type="text/javascript" src="templets/js/load.js"></script>
<script type="text/javascript" src="templets/js/leftmenu.js"></script>
</head>
<body>
<div id="main">
  <?php include(DEDEMEMBER."/templets/head.htm"); ?>
  <div id="content" class="w960 clearfix">
    <?php include(DEDEMEMBER."/templets/menu.php"); ?>
    <div id="mcpmain">
      <div id="appTab">
        <ul>
          <li class="thisTab"><a href="mystow.php">我的收藏</a></li>
          <li><a href="mystow.php?rank=top">收藏排行</a></li>
        </ul>
        <div class="tabOther"> </div>
      </div>
       <ul class="tabSub">
       <?php
         foreach($rows as $row)
         {
        ?>
        <li <?php if($type==$row['stowname']) echo 'class="thisTab"';?> ><a href="mystow.php?type=<?php echo $row['stowname'];?>"><span><?php echo $row['indexname'];?></span></a></li>
        <?php }?>
      </ul>
      <div id="mainCp">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" class="listStyle2">
          <thead>
          </thead>
          <tbody>
          <?php
$atts = array();
$atts['tagname'] = 'datalist';
$blockValue = $this->refObj->GetArcList($atts,$this->refObj,$fields); 
if(is_array($blockValue)){
foreach( $blockValue as $key=>$fields )
{
?>
          <tr>
            <td colspan="5" class="tabTitle"><?php if($fields["stowname"]!='sys') {?>
              <a href='<?php echo $fields['indexurl']; ?>=<?php echo $fields['aid']; ?>' target='_blank'><?php echo $fields['title']; ?></a>
              <?php }else{ ?>
              <a href='archives_do.php?dopost=viewArchives&aid=<?php echo $fields['aid']; ?>' target='_blank'><?php echo $fields['title']; ?></a>
              <?php }?></td>
            <td width="25%" align="center" class="doPost"><span class="itemDigg"> 
            <a class="text_button" href="../plus/recommend.php?type=<?php echo $fields['type']; ?>&aid=<?php echo $fields['aid']; ?>" target="_blank">[推荐]</a> 
            </span> <span class="itemManage">
             <a href='archives_do.php?dopost=delStow&type=<?php echo $fields['type']; ?>&aid=<?php echo $fields['aid']; ?>'>[删除]</a> 
             </span></td>
          </tr>
          <tr>
            <td colspan="6" class="tabTitle tbBtm">收藏时间:<?php echo MyDate('m-d H:i', $fields['addtime']); ?></td>
          </tr>
          <?php
}
}?>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="6"><div class="pageList"> <?php
$atts = array();
$atts['tagname'] = 'pagelist';
$atts['listsize'] = '5';
 echo $this->refObj->GetPageList($atts,$this->refObj,$fields); 
?>
</div></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <!--主操作区域 -->
    </div>
  </div>
<?php include(DEDEMEMBER."/templets/foot.htm"); ?>
</div>
</body>
</html>