<!-- Left side Cards -->
<div class="left-side">
	<article>
		{dede:arclist typeid=&#39;2&#39; flag=&#39;c&#39; orderby=pubdate tagid=&#39;index&#39; pagesize=&#39;10&#39; }
		<section>
			<div class="content-card-wrapper">
				<div class="content-card">
					<!-- Article Title -->
					<div class="article-title">
						<h1>
							<a class="app-title" data="2465" href="[field:arcurl/]" target="_blank">[field:title/] </a></h1>
						<div class="pub-time-and-version" style="padding-top: 10px;">
							<span class="pub-time">[field:pubdate function="GetDateMk(@me)"/]</span></div>
					</div>
					<!-- Article Img -->[field:array runphp=&#39;yes&#39;]@me = (empty(@me[&#39;litpic&#39;]) ? "" : "<a class="article-img" href="{@me[" target="_blank"><img src="{@me[" /></a>"); [/field:array]</div>
				<!-- Quote Area -->
				<div class="quote-area">
					<div class="quote-words">
						<a class="quote-text" href="[field:arcurl/]" target="_blank">[field:description runphp=&#39;yes&#39;] if(@me&lt;&gt;&#39;&#39; )@me = &#39; </a>
						<div class="intro">
							<a class="quote-text" href="[field:arcurl/]" target="_blank">&#39;.@me.&#39;</a></div>
						<a class="quote-text" href="[field:arcurl/]" target="_blank">&#39;; [/field:description] </a></div>
					<p>
						<a href="/index/member/personalization/tagetuser/285"><span class="user-name" style="float:right">[field:writer/]</span></a> <span class="newsimagenice"> <span>[field:goodpost/]</span> </span></p>
				</div>
			</div>
		</section>
		{/dede:arclist} <!-- Footer -->
		<footer>
			<div class="page-direct">
				{dede:arcpagelist tagid=&#39;index&#39;/} {dede:pagelist listitem="info,index,end,pre,next,pageno,option" listsize="5"/} <a class="next-one" href="/index/index/index/p/2">下一页</a></div>
		</footer>
	</article>
</div>
<!-- Right side Card -->
<div class="right-side">
	<!-- login begin -->
	<div class="side-card loginForm">
		<div class="cont f-cb ztag">
			<div class="contl">
				<form action="{dede:global.cfg_memberurl/}/index_do.php" class="ztag" method="POST" name="userlogin">
					<input name="fmdo" type="hidden" value="login" /> <input name="dopost" type="hidden" value="login" /> <input name="keeptime" type="hidden" value="604800" />
					<ul class="w-user w-user-2">
						<li class="w0">
							<div class="logininpt ">
								<input class="txt ztag" name="userid" placeholder="邮箱" style="" tabindex="1" type="text" /></div>
						</li>
						<li class="w0">
							<div class="logininpt ">
								<input autocomplete="off" class="txt ztag" name="pwd" placeholder="密码" tabindex="2" type="password" /></div>
						</li>
						{dede:php} if(preg_match("#2#", $safe_gdopen)) { echo &#39;
						<li class="w0 ">
							<div class="logininpt">
								<input class="txt ztag" name="vdcode" placeholder="验证码" style="" tabindex="1" type="text" /></div>
						</li>
						<li class="w0 ">
							<div class="logininpt">
								<img align="absmiddle" alt="看不清？点击更换" id="vdimgck" onclick="this.src=this.src+\'?\'" src="'.$cfg_cmspath.'/include/vdimgck.php" style="cursor:pointer;margin-left:0px;text-transform:uppercase;" /></div>
						</li>
						&#39;; } {/dede:php}
						<li class="w0 w2">
							<button class="w-btn" tabindex="4" type="submit"><span>登录</span></button></li>
					</ul>
				</form>
			</div>
			<div class="contr">
				<div class="others">
					<span class="septxt">或</span>
					<ul class="w-user w-user-3" id="otherLogin2">
						<li class="w1 sina">
							<a class="w-btn3" href="javascript:void(0)" onclick="login('WEIBO')">新浪微博</a></li>
						<li class="w1 qq">
							<a class="w-btn3 w-btn3-1" href="javascript:void(0)" onclick="login('QQ')">腾讯QQ</a></li>
						<li class="w1 rr">
							<a class="w-btn3 w-btn3-2" href="javascript:void(0)" onclick="login('XIAOMI')">小米用户</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<!-- login end --><!--首页登陆界面--><!-- publishing area -->
	<div class="side-card">
		<div id="new_publish">
			<a class="new-publish-words" href="{dede:global.cfg_memberurl/}/article_add.php">我要分享</a></div>
	</div>
	<!-- 精选 热门等分类入口 -->
	<div class="side-card">
		<ul class="web-tag">
				<li class="web-tag-list active-tag"><a style="padding-right: 220px;" id="allTag"   href="/a/c-article.html" class="web-tag-list-item">精选</a></li>
					<li class="web-tag-list "><a style="padding-right: 220px;" id="hotTag"   href="/a/hot-article.html" class="web-tag-list-item">热门</a></li>
					<li class="web-tag-list "><a style="padding-right: 220px;" id="hotTag"  href="/" class="web-tag-list-item">全部</a></li>
		</ul>
	</div>
	<!-- 精选 热门等分类入口 end --><!-- 文章分类列表   -->
	<div class="side-card">
		<ul class="web-tag">
			<li class="web-tag-list">
				<a class="web-tag-list-item" href="/tags.php?/%E6%99%BA%E8%83%BD%E5%AE%B6%E5%B1%85/">智能家居</a></li>
			<li class="web-tag-list">
				<a class="web-tag-list-item" href="/tags.php?/%E6%99%BA%E8%83%BD%E7%A9%BF%E6%88%B4/">智能穿戴</a></li>
			<li class="web-tag-list">
				<a class="web-tag-list-item" href="/tags.php?/%E6%99%BA%E8%83%BD%E4%BA%A4%E9%80%9A/">智能交通</a></li>
			<li class="web-tag-list">
				<a class="web-tag-list-item" href="/tags.php?/%E6%99%BA%E8%83%BD%E5%AE%89%E9%98%B2/">智能安防</a></li>
			<li class="web-tag-list">
				<a class="web-tag-list-item" href="/tags.php?/%E5%81%A5%E5%BA%B7%E5%8C%BB%E7%96%97/">健康医疗</a></li>
			<li class="web-tag-list">
				<a class="web-tag-list-item" href="/tags.php?/%E5%84%BF%E7%AB%A5%E8%AE%BE%E5%A4%87/">儿童设备</a></li>
			<li class="web-tag-list">
				<a class="web-tag-list-item" href="/tags.php?/%E5%AE%A0%E7%89%A9%E8%AE%BE%E5%A4%87/">宠物设备</a></li>
			<li class="web-tag-list">
				<a class="web-tag-list-item" href="/tags.php?/%E6%B8%B8%E6%88%8F%E5%A8%B1%E4%B9%90/">游戏娱乐</a></li>
			<li class="web-tag-list">
				<a class="web-tag-list-item" href="/tags.php?/%E6%95%88%E7%8E%87%E5%B7%A5%E5%85%B7/">效率工具</a></li>
			<li class="web-tag-list">
				<a class="web-tag-list-item" href="/tags.php?/%E5%A5%87%E8%B6%A3%E8%AE%BE%E5%A4%87/">奇趣设备</a></li>
		</ul>
	</div>
	<!-- 关注我们 -->
	<div class="side-card" style="background-color: rgb(240,240,240);">
		<h5 class="bottom1">
			关注我们</h5>
		<!-- JiaThis Button BEGIN -->
		<div class="jiathis_style_32x32">
			<a class="link_button_tsina external" href="http://weibo.com/geekview" target="_blank">新浪微博</a> <a class="link_button_douban external" href="http://www.douban.com/people/geekview/" target="_blank">豆瓣</a> <a class="link_button_renren external" href="http://zhan.renren.com/geekview/" target="_blank">人人</a> <a class="link_button_tqq external" href="http://t.qq.com/geekview/" target="_blank">腾讯微博</a> <a class="link_button_google external" href="https://plus.google.com/108385600415800739993/" target="_blank">Google+</a></div>
		<!-- JiaThis Button END --></div>
	<!-- 关注我们end --></div>
<!-- /content --><!-- article end  -->