<section>
						<div class="content-card-wrapper">
							<div class="content-card">
								<!-- Article Title -->
								<div class="article-title">
									<a data="2465" target="_blank" href="[field:arcurl/]" class="app-title">
										<h1>[field:title/]	</h1>
									</a>
									<div style="padding-top: 10px;" class="pub-time-and-version"> 
										<span class="pub-time">[field:pubdate function="GetDateMk(@me)"/]</span>
									</div>
								</div>
								<a target="_blank" href="" class="detail-icon" title="进入应用详情页面"></a>
								<!-- Article Img -->
								 [field:array runphp='yes']@me = (empty(@me['litpic']) ? "" : "<a href='{@me['arcurl']}' class='article-img'  target='_blank'><img src='{@me['litpic']}'/></a>"); [/field:array]
							</div>
							<!-- Quote Area -->
							<div class="quote-area">
								<div class="quote-words">
									<a target="_blank" href="[field:arcurl/]" class="quote-text">
									  {field.description runphp='yes'}
								  if(@me<>'' )@me = '
								  <div class="intro">'.@me.'</div>
								  ';
								  {/field.description}
									</a>
								</div>
								    <p>
									<a href="/index/member/personalization/tagetuser/285"><span class="user-title"></span>
									<span style="float:right" class="user-name">Mint.</span></a>
									<span class="newsimagenice">
										<i></i><span>0</span>
									</span>
								    </p>
							    </div>
						    </div>
			</section>