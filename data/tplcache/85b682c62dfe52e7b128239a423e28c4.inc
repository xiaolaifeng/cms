<section>
				<div class="content-card-wrapper">
					<div class="content-card">
						<!-- Article Title -->
						<div class="article-title">
							<a class="app-title" href="[field:arcurl /]" target="_blank" data="6958a4a2cc2eabcf9071d055e658deea">
								<h1>
									[field:title /]								</h1>
							</a>
							<div class="pub-time-and-version" style="padding-top: 10px;">
								<span class="pub-time">[field:pubdate function="MyDate('Y-m-d',@me)"/]</span>
							</div>
						</div>
						<!-- Article Img -->
						<a class="article-img" href="/article/shownews/id/6958a4a2cc2eabcf9071d055e658deea" target="_blank">
						[field:array runphp='yes']@me = (empty(@me['litpic']) ? "" : "<img   style='display: block;' alt='title' src='{@me['litpic']}'  data-original='{@me['litpic']}'/>"); [/field:array]
						
						</a>
					</div>
					<!-- Quote Area -->
					<div class="quote-area">
						<div class="quote-words">
							<div class="quote-icon"></div>
							<a class="quote-text" href="/article/shownews/id/6958a4a2cc2eabcf9071d055e658deea" target="_blank">
							{field:description runphp='yes'} if(@me<>'' )@me = '
							'.@me.'
							'; {/field:description}
							
							大家还记得童话故事《绿野仙踪》里那位善良的小菇凉多萝茜（Dorothy）吗？她只要碰三下鞋子就可以回家了。现在你也可以啦！...</a>
						</div>
						<p>
							<a href="/index/member/personalization/tagetuser/312"><span class="user-title"></span>
							<span class="user-name" style="float:right"> [field:writer/]</span></a>
							<span class="newsimagenice">
								<i></i><span>81</span>
							</span>
						</p>
					</div>
				 </div>
			</section>