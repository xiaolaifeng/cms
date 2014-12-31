{dede:list  pagesize='30' col='1' titlelen='60' orderby='pubdate' orderway='desc' 
 channel='1' }<div class="row">
      <div class="col-xs-12">
        <div class="dashboard-card-img">
		 
          <!-- Article Img -->
		 [field:array runphp='yes']@me = (empty(@me['litpic']) ? "" : "<a href='{@me['arcurl']}' class='article-img'  target='_blank'><img src='{@me['litpic']}'/></a>"); [/field:array]
		 
        </div>
        <div class="view-card-header">
           <a  href="[field:arcurl/]" ><p>[field:title  function=' ( strlen("@me")>60 ? cn_substr("@me",60)."..." : "@me" ) '/]</p></a>
          <p class="date">[field:pubdate function="GetDateMk(@me)"/]</p>
        </div>
        <div class="view-card-text">
          <p>
         [field:description runphp='yes']
				if(@me<>'' )@me = ' <div class="intro">'.@me.'</div> ';
		[/field:description]
          
          </p>
        </div>
        <div class="view-card-status">
          <div class="pr-sm pull-left">
            <i class="fa fa-heart-o"></i>[field:goodpost/]
          </div>
          <div class="pr-sm pull-left">
            <i class="fa fa-comments"></i>[field:click/]
          </div>
          
          <div class="pull-right">
            <span><a href="/member/index.php?uid=[field:mid function=GetMemberInfos('userid',@me)/]&action=article">[field:writer/]</a></span>
            <span>极客</span>
          </div>
        </div>
      </div>
    </div>{/dede:list}