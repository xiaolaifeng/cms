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
						<a class="article-img" href="[field:arcurl /]" target="_blank">
						[field:array runphp='yes']@me = (empty(@me['litpic']) ? "" : "<img   style='display: block;' alt='title' src='{@me['litpic']}'  data-original='{@me['litpic']}'/>"); [/field:array]
						
						</a>
					</div>
					<!-- Quote Area -->
					<div class="quote-area">
						<div class="quote-words">
							<div class="quote-icon"></div>
							<a class="quote-text" href="[field:arcurl /]" target="_blank">
							[field:description/]
							
						</div>
						<p>
							<a href="/member/index.php?uid=[field:mid function="GetMemberInfos('userid',@me)"/]&action=article""><span class="user-title"></span>
							<span class="user-name" style="float:right"> [field:writer/]</span></a>
							<span class="newsimagenice">
								<i></i><span>[field:goodpost/]</span>
							</span>
						</p>
					</div>
				 </div>
			</section>