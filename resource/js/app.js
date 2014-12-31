$(document).ready(function() {

	// 初始化应用截图滚动条

    $('#appScreenshotOuter').horizontalScroll();

    //div隐藏与显示

	$('#blacklistLink').click(function () {
		$('#blacklistBox').toggle();
	});

	$('#changePwLink').click(function () {
		$('#changePwBox').toggle();
	});

    //初始化应用评分

    var $input = $('input.rating'), count = Object.keys($input).length;
    if (count > 0) {
        $input.rating();
    };

    //初始化tab 
    
    $('#notificationTab a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});

	$('#searchTab a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});
});