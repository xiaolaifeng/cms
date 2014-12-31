var $body = $('body'),
    $blackcover=$('.blackcover'),
    $content_wrapper = $('#content_wrapper'),
    $window = $(window),
    $user_account_info = $('.user-account-info'),
    $manage_list = $('.manage-list'),
    $wrapper = $('#wrapper'),
    $weibo_login_button = $('#weibo_login'),
    tag2 = $body.find('.tag-container .tag2'),
    triangle = $body.find('.tag-container .triangle-down'),
    $count_like_area = $('.count-like-area'),
    $nav_iphone = $('#nav_iphone'),
    $nav_android = $('#nav_android'),
    $nav_ipad = $('#nav_ipad'),
    tag_area = $('.tag-area'),
    $back_to_top = $('.back-to-top'),
    $hot_list = $('.hot'),
    $activity_flag = $('.activity-flag'),
    $app_ad = $('.app-ad'),
    $first_platform_selection = $('#first_platform_selection'),
    $second_platform_selection = $('#second_platform_selection'),
    $third_platform_selection = $('#third_platform_selection'),
    current_url = document.URL,
    structured_url_host = location.protocol + '//' + location.host,
    structured_url_path = location.protocol + '//' + location.host + location.pathname,
    source = "direct",
    url_search_value = window.location.search,
    clientWidth = document.documentElement.clientWidth || document.body.clientWidth,
    device,
    platform,
    store,
    event_info,
    article_title,
    page;
    var weekInMs = 1000 * 60 * 60 * 24 * 7;
    var expireDate = new Date ( new Date ().getTime () + weekInMs );

if (url_search_value.length > 0) {
    source = url_search_value;
}

// [Global] 在这里定义jiathis_config;
var uid = 1827042,
    google_analytics_link = encodeURIComponent("&utm_campaign=referral&utm_medium=share_tool"),
    jiathis_link_head = "http://www.jiathis.com/send/";

// 判断 chrome 浏览器
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;


// 判断微信浏览器

function is_weixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

// 判断是否是微信的粉丝
var regx_weixin = /utm_source=weixin.*&utm_medium=weixin/i;

function is_weixin_follower() {
    if (regx_weixin.test(url_search_value)) {
        return true;
    } else {
        return false;
    }
}

// 判断是否是知乎日报的粉丝
var regx_zhihu = /utm_source=zhihu.*&utm_medium=dailydown/i;

function is_zhihu_follower() {
    if (regx_zhihu.test(url_search_value)) {
        return true;
    } else {
        return false;
    }
}

// 检测设备系统

function detect_mobile_platform() {

    if (navigator.userAgent.match(/iPhone/i)) {
        return 'iPhone';
    } else if (navigator.userAgent.match(/iPod/i)) {
        return 'iPod';
    } else if (navigator.userAgent.match(/iPad/i)) {
        return 'iPad';
    } else if (navigator.userAgent.match(/Android/i)) {
        return 'Android';
    } else if (navigator.userAgent.match(/webOS/i)) {
        return 'webOS';
    } else if (navigator.userAgent.match(/Windows Phone/i)) {
        return 'WindowsPhone';
    } else {
        return 'Others';
    }

}
platform = detect_mobile_platform();


// 检测设备是否支持 touch

function is_touch_device() {
    return 'ontouchstart' in window // works on most browsers
    || 'onmsgesturechange' in window; // works on ie10
};

// 判断是否是手机

function mobilecheck() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    }
}


// 事件统计的一些变量整合

if (mobilecheck()) {
    device = "Mobile";
} else {
    device = "Web";
}




$(document).ready(function() {

    if(clientWidth >800){
        // 为 Web 版的导航条做判断
        if (url_search_value.indexOf('platform=1') > 0 || url_search_value.indexOf('platform') < 0) {
            $first_platform_selection.addClass('active');
        }else if (url_search_value.indexOf('platform=2') > 0) {
            $second_platform_selection.addClass('active');
        }else if (url_search_value.indexOf('platform=3') > 0) {
            $third_platform_selection.addClass('active');
        }
        // 如果是个人信息页面，平台信息则不标亮
        if(current_url.indexOf('personal_info') > 0){
            $first_platform_selection.removeClass('active');
        }
        // 如果是社区，则先不显示 ipad 平台
        if(current_url.indexOf('community/app') > 0){
            $third_platform_selection.hide();
        }
    }else{
        if(current_url.indexOf('community/app') > 0){
            $('.discovery-title').addClass('active');
        }else{
            $('.daily-title').addClass('active');
        }

        // 手机端标量下拉列表
        if (url_search_value.indexOf('platform=1') > 0 || url_search_value.indexOf('platform') < 0) {
            $('.mobile-nav-list-item.active').parent().find('.iphone').addClass('active');
        }else if (url_search_value.indexOf('platform=2') > 0) {
            $('.mobile-nav-list-item.active').parent().find('.android').addClass('active');
        }else if (url_search_value.indexOf('platform=3') > 0) {
            $('.mobile-nav-list-item.active').parent().find('.ipad').addClass('active');
        }
    }

   
    if(clientWidth>800){
         // 如果是社区，则先不显示 ipad 平台
        if(current_url.indexOf('community/app') > 0){
            $third_platform_selection.hide();
        }
 //todu 整理js
//        // 统计用户点击网站右上角个人信息相关的 action
//        $('#user_center').on('click',function(){
//            event_tracker('UserManageUsercenter', source , article_title);
//        });
//        $('#user_edit').on('click',function(){
//            event_tracker('UserManageEdit', source , article_title);
//        });
//        $('#logout').on('click',function(){
//            event_tracker('UserManageLogout', source , article_title);
//        });
    }
    

    // For Android App
    if (window.Android && Android.loadNativeJs) {
        // Android.loadNativeJs();
        loadNativeJs();
    }


    // [Web] 当滚动的时候固定 Tag 区域, 显示和隐藏「回到顶部」按钮
    if (clientWidth > 800 && $('.tag-area').length>0) {
        // var tag_area = $('.tag-area');
        // var tagTop = tag_area.offset().top;
        window.onscroll = function() {
            var bodyTop = document.body.scrollTop || document.documentElement.scrollTop; //document.documentElement.scrollTop是因为 IE,Firefox 下 bodyTop 一直为0

            // if (tag_area) {
            //     var tag_height = tag_area.height();
            //     tag2.hide('fast');
            //     triangle.removeClass('triangle-position');
            //     if (bodyTop > tagTop) {
            //         tag_area.addClass('fixed header-shadow');
            //         $content_wrapper.css('top', tag_height);
            //         $activity_flag.addClass('fixed-flag');
            //     } else {
            //         tag_area.removeClass('fixed header-shadow');
            //         $content_wrapper.css('top', '0px');
            //         $activity_flag.removeClass('fixed-flag');
            //     }
            // }
        };

        // [Web][分享工具栏]点微信分享，显示提示动画
        $follow_zuimei_weixin_img.attr('src', 'http://static.zuimeia.com/product/img/zuimei_qr_poster.jpg');
        $('.add-zuimei-card').addClass('active-web-zuimei-qr');
        // [分享工具栏]点微信分享，显示提示动画[出现]
        $('.share_button_weixin,.share_button_pengyouquan,.share_button_guanzhu').on('click', function() {
            $follow_zuimei_weixin.removeClass('fadein fadeout').addClass('fadein');
            $('.add-zuimei-card').removeClass('slideDownAds slideUpAds').addClass('slideDownAds');
            $body.addClass('_view_for_web');
        });
        // [分享工具栏]点微信分享，显示提示动画[消失]
        $follow_zuimei_weixin.on('click', function() {
            $follow_zuimei_weixin.removeClass('fadein fadeout').addClass('fadeout');
            $('.add-zuimei-card').removeClass('slideDownAds slideUpAds').addClass('slideUpAds');
            $body.removeClass('_view_for_web');
        });
    } // End of window.width>800





    // [Web] 右上角用户信息区域的下拉菜单
    if ($('.login-user-name').length > 0) {
        $user_account_info.addClass('active');
    }

    if ($user_account_info.hasClass('active')) {
        $user_account_info.not($manage_list).on('click', function(e) {
            if ($manage_list.hasClass('active-manage-list')) {
                $manage_list.removeClass('active-manage-list').slideUp();
            } else {
                $manage_list.addClass('active-manage-list').slideDown();
            }
            return false;
        });

        $body.not($manage_list).on('click', function() {
            if ($manage_list.hasClass('active-manage-list')) {
                $manage_list.removeClass('active-manage-list').slideUp();
            }
        });
    }


}); //End of document ready


// [Mobile] 如果是手机端则在同一个浏览器标签下打开
if (clientWidth < 800) {
    $body.find('a[target="_blank"]').attr('target', '_self');
}


// [Global] 匿名评论后的提示

function overlay(result) {
    if (result == "success") {
        $wrapper.append('<div class="overlay"><button class="overlay-close" data-action="overlay-close">x</button><div class="animation scale-fade overlay-dialog overlay-dialog-alert"><h3 class="overlay-title">Nice!</h3><div class="overlay-content">您的评论已经成功发送给小美!</div><div class="overlay-actions"><button class="button-overlay" data-action="overlay-close">确定</button></div></div></div>');
    } else if (result == "fail") {
    }
    $body.addClass('block-view');
    $("[data-action|='overlay-close']").click(function() {
        $('.overlay').remove();
        $body.removeClass('block-view');
    });
}

// [Global] 限制数字数量

function count_words(which_input, num_start, num_end, which_tip_area) {
    which_input.keyup(function() {
        var num = which_input.val().length;
        if (num > num_start && num < num_end) {
            which_tip_area.html("已输入" + num + "个字");
            which_tip_area.css('color', '#c7c7c7');
        } else if (num > num_end - 1) {
            which_tip_area.css('color', '#FF634A');
            which_tip_area.html("超出规定字数");
        } else {
            which_tip_area.html("");
        }
    });
}



// [Global] Jiathis Building


var jiathis_share_title = $('#web-article-header').find('h1').text(),
    jiathis_share_abstract = $('#web-article-header').find('.short-des').text().replace(/(Google\sPlay.*)$/, ""),
    jiathis_share_image = $('.hidden-cover').attr('src');

function detail_build_jiathis_url(web_id_name, utm_source_name, at_official_name, pre_title, pre_summary, period) {
    var total = jiathis_share_title.length + jiathis_share_abstract.length,
        jiathis_back_url,
        download_tip = "",
        overflow_words = total - 100;
    if (overflow_words > 0) {
        jiathis_share_abstract = jiathis_share_abstract.substring(0, 100) + "...";
    }

    var jiathis_webid = "?webid=" + web_id_name,
        google_analytics_info = "?utm_source=" + utm_source_name + google_analytics_link,
        jiathis_title = "&title=" + pre_title + jiathis_share_title + period,
        jiathi_pic = "&pic=" + jiathis_share_image,
        jiathis_back_url = structured_url_path + google_analytics_info;
    var jiathis_summary = "&summary=" + pre_summary + jiathis_share_abstract + at_official_name;


    jiathis_url_building = jiathis_link_head + jiathis_webid +"&url=" + jiathis_back_url + jiathis_title + jiathis_summary + jiathi_pic + "&uid=" + uid;

    return jiathis_url_building;
}

// 最美微信的分享提示动画功能
var $share_button_weixin = $('.share_button_weixin'),
    $follow_zuimei_weixin = $('.follow-zuimei-weixin'),
    $follow_zuimei_weixin_img = $('.follow-zuimei-weixin-img');
function show_weixin_ad_animation(){
    $follow_zuimei_weixin.removeClass('fadein fadeout').addClass('fadein');
    $('.add-zuimei-card').removeClass('slideDownAds slideUpAds').addClass('slideDownAds');
    $body.addClass('_view');
}
function hide_weixin_ad_animation(){
    $follow_zuimei_weixin.bind('touchstart', function() {
        $follow_zuimei_weixin.removeClass('fadein fadeout').addClass('fadeout');
        $('.add-zuimei-card').removeClass('slideDownAds slideUpAds').addClass('slideUpAds');
        $body.removeClass('_view');
        return false
    });
}
if (is_weixin()) {
    // 最美微信的分享提示动画[出现]
    $('.share_button_weixin,.share_button_pengyouquan,.share_button_guanzhu').on('click', function() {
        show_weixin_ad_animation;
    });
    // 最美微信的分享提示动画[消失]
    hide_weixin_ad_animation();
}


// [Global] 检测邮箱的正则

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// [Global] 检测表单内容

function check_on_blur(which_input, which_tip_area, tip_words) {
    which_input.on("blur", function() {
        if (which_input.val() == '') {
            which_tip_area.html(tip_words);
        } else {
            which_tip_area.html('');
        }
    });
}



// [Global] 如果搜索表单中的内容为空，则不能够提交

function check_form_value(form) {
    form.on('submit', function(e) {
        if ($(this).find('input[name="keyword"]').val() == '') {
            e.preventDefault();
        }
    })
}

// [GA 事件统计]

function event_tracker(name, source, article_title) {
    event_info = name + '-' + device + '-' + platform;
    ga('send', 'event', event_info, source, article_title);
}


function mobile_banner_interaction(article_title){

    if(clientWidth<800){
        if(document.cookie.search('close-ad=1') == -1){
            // 设置 cookie 为一周
            var weekInMs = 1000 * 60 * 60 * 24 * 7;
            var expireDate = new Date ( new Date ().getTime () + weekInMs );

            var weixin_prepend_link = 'http://mp.weixin.qq.com/mp/redirect?url=';

            $app_ad.show();
            $('#site_header').css('top','80px');
            $('#content_wrapper').css('margin-top','122px');
            $('.close-ad').on('touchend',function(){
                event_tracker('CloseNewTopBanner', source , article_title);
                $app_ad.hide();
                $('#site_header').css('top','0');
                $('#content_wrapper').css('margin-top','44px');
                document.cookie = 'close-ad=1; expires='+expireDate+'; path=/';
                return false;
            });
            $('.app-ad-view,.app-ad-name').on('click',function(){
                event_tracker('NewTopBanner', source , article_title);
                document.cookie = 'close-ad=1; expires='+expireDate+'; path=/';
            });


            // 如果是安卓用户则修改链接
            if(platform == 'Android'){
                $('.app-ad-view').attr('href','http://zuimeia.com/apps.html');
            }

            // 如果是微信，则增加前缀
            if(is_weixin()){
                var weixin_prepend_link = 'http://mp.weixin.qq.com/mp/redirect?url=';

                $('.app-ad-name,.app-ad-view').each(function(){
                    var pre_structure_link = $(this).attr('href');
                    $(this).attr('href',weixin_prepend_link + pre_structure_link);
                });
            }
        }
        
    }

}

var $new_publish_tip = $('.new-publish-tip');
    $new_publish = $('#new_publish');



// 我来推荐按钮
$new_publish.on('click',function(){
    event_tracker('Newpublish',source,article_title);
    $this = $(this);
    if(!$this.hasClass('active')){
        $this.addClass('active');
        $new_publish_tip.fadeIn('fast');
    }else{
        $this.removeClass('active');
        $new_publish_tip.fadeOut('fast');
    }
    return false;
});

$('#new-publish-real').on('click',function(){
    event_tracker('NewpublishReal',source,article_title);
});

// 点击其他区域隐藏下拉菜单
$body.not($('#new-publish-real')).on('click',function(){
    if($new_publish.hasClass('active')){
        $new_publish.removeClass('active');
        $new_publish_tip.fadeOut('fast');
    }
});

