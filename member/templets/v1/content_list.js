function FeedDel() {
	if (confirm("你确定删除该动态信息?"))
		return true;
	else
		return false;
}
// 我的动态
$(function() {
	$
			.ajax( {
				type : "GET",
				url : "feed.php?type=myarticle",
				dataType : "json",
				success : function(data) {
					$('#FeedText').empty();
					var html = '';
					$
							.each(
									data,
									function(commentIndex, comment) {
										html += '<div class="feeds_title ico'
												+ comment['type']
												+ '"><span><a href="index.php?uid='
												+ comment['uname']
												+ '&action=feeddel&fid='
												+ comment['fid']
												+ '" onclick="return FeedDel()" class="act">删除</a><a href="/member/index.php?uid='
												+ comment['uname'] + '">'
												+ comment['uname'] + '</a>'
												+ comment['title'] + ' <em>'
												+ comment['dtime']
												+ '</em></span><p>'
												+ comment['note']
												+ '</p></div>';
									})
					$('#FeedText').html(html);
				}
			});
})
