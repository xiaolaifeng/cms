<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=<?php echo $cfg_soft_lang; ?>" />
<title>发表<?php echo $cInfos['typename']; ?> - 会员中心 - <?php echo $cfg_webname; ?></title>


<?php include(DEDEMEMBER."/templets/v2/css.htm"); ?>

</head>
<body >
<?php include(DEDEMEMBER."/templets/v2/head.htm"); ?>

<!-- 内容 -->
<div class="container page-content">
<div class="col-md-12">
  <ul class="nav nav-tabs" id="tab-01">
    <li class="active"><a href="#message">私信</a></li>
    <li><a href="#news">动态</a></li>
    <li><a href="#comments">评论</a></li>
  </ul>
  <div class="tools"> <a href="javascript:;" class="collapse"></a> <a href="#grid-config" data-toggle="modal" class="config"></a> <a href="javascript:;" class="reload"></a> <a href="javascript:;" class="remove"></a> </div>
  <div class="tab-content">
    <div class="tab-pane active" id="message">
      <div class="row column-seperation">
        <div class="col-md-12 noti-msg-box">
         
          <?php
$atts = array();
$atts['tagname'] = 'datalist';
$blockValue = $this->refObj->GetArcList($atts,$this->refObj,$fields); 
if(is_array($blockValue)){
foreach( $blockValue as $key=>$fields )
{
?>
          <div class="row noti-msg-item mb-lg">
            <div class="user-icon">
              <img width="40" height="40" class="img-thumbnail img-circle" src="/resource/img/icon/icon.png"
              alt="" />
            </div>
            <div  class="user-msg mb">
              <div>
                <a><span class="dark-text">Vincent</span></a>
                <span class="text-error"><?php     echo MyDate('y-m-d',$fields['sendtime']);  ?></span>
                <span class="dark-text">对你说</span>
              </div>
              <div>
             <?php
           if($fields['hasview']==0) echo "<a href='pm.php?dopost=read&id={$fields['id']}'>{$fields['subject']}</a>";
           else echo "<a href='pm.php?dopost=read&id={$fields['id']}'>{$fields['subject']}</a>";
           ?>
              </div>
            </div>
            <div class="user-btn">
              <a class="btn btn-info pull-right">
                <li class="fa fa-ban"></li>
                拒收
              </a>
            </div>
          </div>
            <?php
}
}?>
          
        </div>
        
      </div>
    </div>
    <div class="tab-pane" id="news">
      <div class="row">
        <div class="col-md-12 noti-msg-box">
           <div class="row noti-msg-item mb-lg">
            <div class="user-icon">
              <img width="40" height="40" class="img-thumbnail img-circle" src="resource/img/icon/icon.png"
              alt="" />
            </div>
            <div  class="user-msg mb">
              <div>
                <a><span class="dark-text">Vincent</span></a>
                <span class="text-error">2000-01-01</span>
                <span class="dark-text">喜欢你的智见</span>
                <a><span class="dark-text">智见</span></a>
              </div>
            </div>
          </div>
           <div class="row noti-msg-item mb-lg">
            
            <div  class="user-msg mb">
              <div>
                <span class="dark-text">你与</span>
                <span class="text-error">2000-01-01</span>
                <span class="dark-text">分享的智见</span>
                <a><span class="dark-text">智见</span></a>
                <span class="dark-text">通过了审核</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tab-pane" id="comments">
      <div class="row">
        <div class="col-md-12 noti-msg-box">
          <div class="row noti-msg-item mb-lg">
          <div class="user-icon">
              <img width="40" height="40" class="img-thumbnail img-circle" src="resource/img/icon/icon.png"
              alt="" />
            </div>
            <div  class="user-msg mb">
              <div>
                <a><span class="dark-text">Vincent</span></a>
                <span class="text-error">2000-01-01</span>
                <span class="dark-text">评论了你的智见</span>
                <a><span class="dark-text">智见</span></a>
              </div>
            </div>
            <div class="user-btn">
              <a class="btn btn-info pull-right">
                <li class="fa fa-ellipsis-h"></li>
                点击查看详情
              </a>
            </div>
          </div>
          <div class="row noti-msg-item mb-lg">
          <div class="user-icon">
              <img width="40" height="40" class="img-thumbnail img-circle" src="resource/img/icon/icon.png"
              alt="" />
            </div>
            <div  class="user-msg mb">
              <div>
                <a><span class="dark-text">Vincent</span></a>
                <span class="text-error">2000-01-01</span>
                <span class="dark-text">回复了你的评论</span>
                <a><span class="dark-text">评论</span></a>
              </div>
              <div>
                很好
              </div>
            </div>
            <div class="user-btn">
              <a class="btn btn-info pull-right">
                <li class="fa fa-ellipsis-h"></li>
                点击查看详情
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<!-- 内容END -->

<?php include(DEDEMEMBER."/templets/v2/js.htm"); ?>
<script type="text/javascript" src="templets/js/j.js"></script>
<script type="text/javascript" src="templets/js/inputAutoClear.js"></script>
<script type="text/javascript" src="templets/js/load.js"></script>
<script type="text/javascript" src="templets/js/leftmenu.js"></script>
<script type="text/javascript" src="templets/js/checkSubmit.js"></script>
<script type="text/javascript">
//获得选中文件的文件名
function GetCheckfolderItem()
{
	var allSel='';
	if(document.form1.deleteid.value) return document.form1.deleteid.value;
	for(i=0;i<document.form1.deleteid.length;i++)
	{
		if(document.form1.deleteid[i].checked)
		{
			if(allSel=='')
			allSel=document.form1.deleteid[i].value;
			else
			allSel=allSel+","+document.form1.deleteid[i].value;
		}
	}
	return allSel;
}
	
	function DoSubmit(myfolder)
	{
		var selid = GetCheckfolderItem();
		if(selid=='') {
			alert("你没选中任何信息！");
			return false;
		}
		if(window.confirm("你确定要删除这些消息么？"))
		{
			location = "pm.php?dopost=del&ids="+selid+"&folder="+myfolder;
		}
	}
</script>
<?php include(DEDEMEMBER."/templets/v2/footer.htm"); ?>
</div>
</body>
</html>