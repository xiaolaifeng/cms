var $body = $('body'),
    $more_pic = $('.more-pic'),
    $more_pic_length = $('.more-pic').length,
    $left_side = $('.left-side'),
    $count_like = $('.count-like'),
    $alert_app_store = $('.alert_app_store'),
    $download_button = $('.download-button'),
    $comment_content  =  $('#comment_content'),
    like_button_is_active = false,
    $article_content = $('#article_content'),
    $count_like_wrapper = $('.count-like-wrapper'),
    $comment_length_tip = $('.comment-length-tip'),
    $rate_normal_block=$('.rate-normal-block');
    if(structured_url_path!=null&&structured_url_path.indexOf('neice')>0){
        var structured_url_path = structured_url_path.replace('/neice','');
    }
$(document).ready(function() {
    // 根据不同平台显示不同的 title
    if(url_search_value.indexOf('platform=3')>0){
        $title = $('title');
        var title_text = $title.text().replace('iPhone','iPad');
        $title.text(title_text);
        var $active_nav_item_href = $('.active-nav-item').attr('href').replace('?platform=1','?platform=3');
        $('.active-nav-item').attr('href',$active_nav_item_href);
    }
    // [ Mobile ] 如果是来自知乎日报直接下载、知乎专栏、在微信上看过文章的、RSS 都要截取摘要内容的长度
    var regx = /utm_source=(weixin|zhihu).*&utm_medium=(weixin|dailydown|zhuanlan)|utm_source=rss/i,
        $front_download=$('#front_download'),
        substring_number=121,
        $short_des=$('.short-des'),
        $bottom_download=$('#bottom_download');

    if( regx.test(url_search_value) &&  !$short_des.hasClass('article-short-des')){
        // 有的时候在截取摘要的时候，会从「直接下载」的 anchor 中直接截断，会导致样式上的 bug
        // 解决方案是：不截取 anchor 的部分。

        var short_des_html = $short_des.html(),
            indexOf_anchor = short_des_html.indexOf('<a class="download-button direct-download"');

        if(indexOf_anchor > 0){
            substring_number = indexOf_anchor;
        }
        if(clientWidth<800){
            $bottom_download.show();
        }

        var short_des_substring = short_des_html.substring(0,substring_number);

        var slided_short_des = short_des_substring + ' ... ' + '<div class="spread-button"><span class="see-more-content">展开完整评测</span><span class="spread-triangle-down"></span></div>';

        $short_des.html(slided_short_des);

        var $see_more_content=$('.see-more-content'),
            $spread_button=$('.spread-button');

        $spread_button.on('click',function(){
            $short_des.html(short_des_html);
            $article_content.add($('.bottom-ad')).show();
            event_tracker('MoreContentDetailPage',source,article_title);
            return false;
        })
    }else{
        $article_content.show();
        if(clientWidth<800){
            $front_download.show();
        }
    }
   

    
    // 由于微信的更新，提示用户可能会无法进行 app store 的下载

    var $alert_text = $('.alert-text'),
        $weixin_download_tip_wrapper = $('.weixin-download-tip-wrapper'),
        $iphone_alert = $('.iphone-alert'),
        $android_alert = $('.android-alert'),
        $android_alert_text= $('.android-alert-text'),
        $alert_app_store = $('.alert-app-store');
    if(is_weixin()){
        $download_button.on('click',function(e) {
            if (platform == "iPhone") {
                $iphone_alert.removeClass('fadein fadeout').addClass('fadein');
            } else if (platform == "Android") {
                $android_alert.removeClass('fadein fadeout').addClass('fadein');
                $android_alert_text.append('<div class="android-weixin-download-alert-title-wrapper"><i class="weixin-alert-info-icon"></i><p class="android-weixin-download-alert-title">小美提示：</p></div><p class="android-weixin-download-alert-des">下载应用，请点击右上角按钮<br>在<b class="android-weixin-download-alert-special">「浏览器中打开」</b>进行下载。</p>');
                e.preventDefault();
            }
            $body.addClass('_view');
        });
        $alert_app_store.bind('touchstart',function(){
            $alert_app_store.removeClass('fadein fadeout').addClass('fadeout');
            $alert_text.removeClass('slideDownAds slideUpAds').addClass('slideUpAds');
            $body.removeClass('_view');
            if(platform == "Android"){
                $android_alert_text.empty();
            }
            return false;
        }); 
        if(!platform == 'iPhone'){
            $weixin_download_tip_wrapper.append('<div class="weixin-download-tip"><b>应用下载贴士：</b>请点击右上角的跳转按钮<br>选择<b>「在浏览器中打开」，进行下载</b></div>');
        }
    }
    // 判断是否是客户端分享到微信的
    var regx_client_shared_to_weixin = /utm_source=(weixin|weixin_quan).*&utm_medium=(iosapp_share_tool|androidapp_share_tool)/i;

    function is_client_shared_to_weixin() {
        if (regx_client_shared_to_weixin.test(url_search_value)) {
            return true;
        } else {
            return false;
        }
    }

    // 除了客户端分享到微信的，如果用户在微信里打开一个分享出去的文章，就提示用户点击右上角进行关注。
    if(!is_client_shared_to_weixin() && is_weixin()){
        var $bottom_weixin_ad = $('.bottom-weixin-ad');
        // 给「关注微信公众账号」一个按钮的样式
        $bottom_weixin_ad.addClass('bottom-weixin-button');
        $bottom_weixin_ad.bind('touchstart',function(){
            show_weixin_ad_animation();
            event_tracker('BottomWeixinButton',source,article_title);
        })
        hide_weixin_ad_animation();
    }
    
    // [Mobile] 当滚动超过喜欢区域的时候，固定喜欢 bar
    // if(clientWidth < 800){
    //     var $mobile_rate_bar=$('.mobile-rate-bar'),
    //         $rate_bar_home_button=$('.rate-bar-home-button');
    //     var rate_bar_top = $mobile_rate_bar.offset().top;
    //     $window.scroll(function() {
    //         var body_top = document.body.scrollTop || document.documentElement.scrollTop;
    //         if(body_top > 44){
    //             $mobile_rate_bar.addClass('fixed');
    //             $content_wrapper.css('padding-top', '44px');
    //             $rate_bar_home_button.show();
    //         }else{
    //             $mobile_rate_bar.removeClass('fixed');
    //             $content_wrapper.css('padding-top', '0px');
    //             $rate_bar_home_button.hide();
    //         }
    //     })
    // }


    // [Global] 详情页图片 LazyLoad
        $('#article_content, .more-pic, .quote-wrapper, #comment_app_area').find('img').lazyload({
            effect: "fadeIn",
            threshold : 600
        });
    
    // 微信里隐藏一些分享的渠道
    if(!is_weixin() && clientWidth<800){
        $('.share_button_weixin,.share_button_pengyouquan,.share_button_guanzhu').hide();
    }

    // [Web] 详情页「高清图片」区域的 Fancybox
    if($("a[rel=more_pic]")){
        $("a[rel=more_pic]").fancybox({
            'nextEffect': 'elastic',
            'nextSpeed': 'slow'
        });
    }
    

    var $spread_triangle_down=$('.spread-triangle-down'),
        $more_pic_text=$('.more-pic-text'),
        $share_card=$('#share_card'),
        $load_more_pic = $('.load-more-pic');
    $('.big-pic-list').find('.hide-big-pic').hide();

    if($('.big-app-img').length<5){
        $load_more_pic.hide();
    }
    
    $load_more_pic.on('click',function(){
        $('.big-pic-list').find('.hide-big-pic').slideDown('fast');
        if(!$more_pic_text.hasClass('active-more-pic-text')){
            $more_pic_text.addClass('active-more-pic-text').text('收起');
            $spread_triangle_down.addClass('active-spread-triangle-down');
            // 当展开的时候，滚动页面。1.更好的交互 2.触发 lazyload
            $('html,body').animate({
              scrollTop: $more_pic.offset().top-20
            }, 350);
            return false;
        }else{
    // 如果是展开的状态则改变文字，增加图片和图片之间的下间距，并缩小整个高清图片区域 
            $more_pic_text.removeClass('active-more-pic-text').text('展开更多截图');
            $spread_triangle_down.removeClass('active-spread-triangle-down');
            $('.big-pic-list').find('.hide-big-pic').slideUp();
            return false;
        }
        return false;
    })

    // 当高清图区域不存在的时候，web 端和手机端分别设不同的间距
    // 判断页面中是否有更多图片。如果没有更多图片则在分享卡片与上面的内容区加上10px间隔
    if($more_pic_length==0 && clientWidth>800){
        $share_card.css('margin-top','10px');
    }else if($more_pic_length==0 && clientWidth<800){
        $share_card.css('margin-top','5px');
    }
    
}); //--------End of document ready--------

// 查询文章的「美一下」数量
function update_detail_like_num(result){
    $count_like.text(result['data']);
    if(result['data']==0){
        $count_like_area.hide();
    }else{
        $count_like_area.show();
    }
}

function get_mobile_rate_like_num(option){
    $.ajax({
        url: structured_url_path+option+'/',
        type: 'GET',
        success: function(result){
            update_detail_like_num(result);
        }
    })
}

/*------ Get Cookie ------*/
function getCookie(c_name){
    if(document.cookie.length>0){
        var c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1){
            c_start=c_start + c_name.length+1;
            var c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) {
                c_end=document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start,c_end));
        } 
        else{
            return false
        }
    }
}

// 下载量统计
function download_event_tracker($this,article_title) {

    if($this.hasClass('google')){
        store="GooglePlay";
    }else if($this.hasClass('apple')){
        store="AppStore";
    }else if($this.attr('href').search('.apk') > 0){
        store="Direct";
    }else if($this.attr('href').search('www.wandoujia.com') > 0){
        store="Wandoujia";
    }else if($this.hasClass('store-down')){
        store="AndroidStore";
    }

    event_info=device+'-'+platform+'-'+store;
    ga('send', 'event', "Download" + "-" + event_info, source, article_title);

}


// 查询用户是否喜欢过，并让按钮显示不同的状态
function update_user_like_status(result){
    
    var up_users=result.data.up_users,
        down_users=result.data.down_users;
    
    function find_users(user_type, user_id) {
        for (var i = 0; i < user_type.length; i++) {
            var id = user_type[i];

            if (id == user_id) {
                return true;
            }
        }
    }
    if(find_users(up_users,user_id)){

        $count_like_wrapper.addClass('active-rate-like');
        // like_button_is_active 是查看「喜欢」和「一般般」按钮的状态。
        // 拿这个状态是为了统计「喜欢」 和  「一般般」 按钮被点的次数
        // GA 事件统计只有在 button 没有被激活的状态下点击的时候才会向 GA 发出请求

        like_button_is_active=true;
    }else if(find_users(down_users,user_id)){
        $rate_normal_block.addClass('active-rate-like');

        // like_button_is_active 是查看「喜欢」和「一般般」按钮的状态。
        // 拿这个状态是为了统计「喜欢」 和  「一般般」 按钮被点的次数
        // GA 事件统计只有在 button 没有被激活的状态下点击的时候才会向 GA 发出请求
        like_button_is_active=true;
    }
}

function get_mobile_rate_status(){
    $.ajax({
        url: structured_url_path+"info"+'/',
        type: 'GET',
        success: update_user_like_status
    })
}

// 喜欢的计数功能
var $header_like_area=$('.like-area-wrapper'),
    $overlay_comment_wrapper=$('.overlay-comment-wrapper'),
    $overlay_comment_form=$('#overlay_comment_form'),
    $overlay_like_count_like=$('.overlay-like-count-like'),
    $comment_app_area=$('#comment_app_area'),
    $rate_like_block=$('.rate-like-block'),
    choice;

// 处理 csrf 问题
$(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
}); //csrf 处理结束

// 「美一下」&「一般般」按钮功能
function rate_click_button(user_id){
    var eventName;
    if(is_touch_device()){
        eventName="touchstart";
    }else{
        eventName="click";
    }

    // 点击「美一下」「一般般」后的动画
    function attitute_animation(val){
        if(val == 'like'){
            $body.append('<div class="like-alert animation fade-in-out"><div class="like-alert-count-wrapper"><i class="like-alert-icon"></i><span class="like-alert-number">+1</span></div><div class="like-alert-text">颁发小红花</div></div>');
        }else{
            $body.append('<div class="like-alert animation fade-in-out"><div class="normal-like-alert-count-wrapper"><i class="normal-like-alert-icon"></i><div class="normal-like-alert-text">一般般</div></div></div>');
        }
    }

    $body.on(eventName,'.rate-button',function(e){
        var $this=$(this);
        var $like_area_wrapper = $this.parent();
        var $count_like = $like_area_wrapper.find('.count-like');
        var $rate_button=$like_area_wrapper.find('[name="rate-button"]')
        var number_of_like_count=$count_like.text();
        var $count_like_val=parseInt($count_like.text());

        // GA 统计
        if(!like_button_is_active){
            if($this.hasClass('count-like-wrapper')){
                name='Like';
            }else{
                name='YiBanBan';
            }
            event_tracker(name,source,article_title);
            like_button_is_active=true;
        }

        // 如果用户登录了，执行如下逻辑
        if(user_id !== 'None'){
            $active_rate_like=$('.active-rate-like');
            var option = ($this.hasClass('count-like-wrapper')) ? 'up' : 'down' ;
            var active_option = ($active_rate_like.hasClass('count-like-wrapper')) ? 'up' : 'down';

                /* 「美一下」&「一般般」有三种情况:
                    Condition1.「美一下」或「一般般」已经被激活的状态下去点另外一个按钮
                    Condition2.没有发表任何态度
                    Condition3.「美一下」 或 「一般般」 已经被激活的状态下再点同样的操作
                */

                // Condition1:「美一下」或「一般般」已经被激活的状态下去点另外一个按钮
                    if($rate_button.hasClass('active-rate-like') && option !== active_option){
                        if(option =='up'){
                            // POST 请求
                            $.post(structured_url_path+option+'/',function(result){
                                // 加上激活的样式
                                $this.addClass('active-rate-like');
                                //  Ajax 请求成功后的前端动画
                                // 如果点的是「喜欢按钮」则增加喜欢的数值并增加动画
                                $count_like.text($count_like_val+1);
                                attitute_animation('like');
                                
                                // 弹上来评论框
                                // $overlay_comment_wrapper.removeClass('slideUp slideDown').addClass('slideUp');

                                // 改变浮出动画中的数量
                                $overlay_like_count_like.text($count_like.text());
                            })
                            // 删除一般般的态度
                            $.ajax({
                                url: structured_url_path+active_option+'/',
                                type: 'DELETE',
                                success: function(result){
                                    // 取消激活的样式
                                    $active_rate_like.removeClass('active-rate-like');
                                }
                            })
                        }else{
                            // POST 请求
                            $.post(structured_url_path+option+'/',function(result){
                                // 加上激活的样式
                                $this.addClass('active-rate-like');
                                // Ajax 请求成功后的前端动画
                                // 减少喜欢的数量并显示「一般般」动画
                                $count_like.text($count_like_val-1);
                                attitute_animation('yibanban');
                                
                                // 弹上来评论框
                                // $overlay_comment_wrapper.removeClass('slideUp slideDown').addClass('slideUp');

                            })
                            $.ajax({
                                url: structured_url_path+active_option+'/',
                                type: 'DELETE',
                                success: function(result){
                                    $active_rate_like.removeClass('active-rate-like');

                                    if(number_of_like_count==0){
                                        $count_like_area.show();
                                    }
                                }
                            })
                        }
                        return false

                }else if(!$rate_button.hasClass('active-rate-like')){
                    // 没有激活按钮的状态下，点任何一个态度按钮都加上激活的按钮样式，并发出 post 请求
                    var option=($this.hasClass('count-like-wrapper')) ? 'up' : 'down' ;
                    $.post(structured_url_path+option+'/',function(result){
                        $this.addClass('active-rate-like');
                        if(option=="up"){
                            // 如果是「喜欢按钮」则改变喜欢的数值
                            $count_like.text($count_like_val+1);
                            attitute_animation('like');
                        }else{
                            attitute_animation('yibanban');
                        }
                        
                        // 弹上来评论框
                        // $overlay_comment_wrapper.removeClass('slideUp slideDown').addClass('slideUp');

                        // 改变浮出动画中的数量
                        $overlay_like_count_like.text($count_like.text());
                        if(number_of_like_count==0){
                            $count_like_area.show();
                        }
                    })
                    return false;

            }else{
                e.preventDefault();
            }
        }else{
            login_alert();
        }
        return false;
    })

}
// var cookie = getCookie('weibojs_70401495');

// function find_value_of_cookie(cookie_id){
//     var splited_cookie=cookie.split('&');
//     for (var i = 0; i < cookie.length; i++) {
//         var Name = splited_cookie[i].split('=');
//         if (Name[0] == cookie_id){
//             return Name[1];
//         }
//     }
// }




    
    // $header_like_area.bind('touchstart',function(){
        
    //         $count_like_val=parseInt($count_like.text());
    //         if(!$header_like_area.hasClass('active-mobile-header-like')){
    //             $count_like.text($count_like_val+1);
    //             $overlay_like_count_like.text($count_like.text());
    //             $header_like_area.addClass('active-mobile-header-like');
    //             $overlay_comment_wrapper.removeClass('slideUp slideDown').addClass('slideUp');
    //         }else{
    //             $count_like.text($count_like_val-1);
    //             $overlay_like_count_like.text($count_like.text());
    //             $header_like_area.removeClass('active-mobile-header-like');
    //         }
        
    //     return false;
    // })
    // $comment_app_area.bind('touchstart',function(){
    //     if(!WB2.checkLogin()){
    //         weibo_login()
    //     // }
    //     return false;
    // })

//取消弹出评论框
    // $('.overlay-comment-cancel').bind('touchstart',function(){
    //     $overlay_comment_wrapper.removeClass('slideUp slideDown').addClass('slideDown');
    //     return false;
    // })


// 提交表单验证功能
function submit_comment_form($form_id,$comment_length_tip,ajax_url){
    
    $form_id.on('submit',function(e){
        $this=$(this);
        var textarea=$form_id.find('textarea');
        var comment_info = textarea.val().replace(/\r?\n/g, '<br />');
        var quote_wrapper = $('.quote-wrapper:last-of-type');

        // 测评论的长度
        if(comment_info.length < 5){
            $comment_length_tip.html('亲，你可以再多说一点的…想想还以说点什么？');
        }else{
            $comment_length_tip.html('');
        }

        if (comment_info.length > 4) {
                $.ajax({
                    url: ajax_url,
                    type: "POST",
                    data: {
                        content: comment_info,
                        type: 'zuimei.daily'
                    },
                    success: function(result_json) {

                        var result = result_json.result;
                        if (result == 1) {
                            var data = result_json.data;
                            var template = $('#appendReplyTpl').html();
                            var html = Mustache.to_html(template, data);

                            /* 两种情况：
                                1.文章下面有评论
                                    有评论的情况贴上 Mustache 的模板
                                2.文章下面没有评论
                                    没有有评论的情况在 Mustache 外面加上白色板的 DOM
                            */
                            
                            if($('.quote-card').length){
                                html = Mustache.to_html(template, data);
                                quote_wrapper.after(html);
                            }else{
                                html = '<section class="quote-card"><div class="content-card" id="user_comments"><form id="edit_commented" method="post">'+Mustache.to_html(template, data)+'</form></div></section>';
                                $comment_app_area.before(html);
                            }

                            $this[0].reset();
                            // 针对提交 web 端评论的效果
                            if($this.attr('id')=='comment_form'){
                                if($quote_card.is(':hidden')){
                                    $quote_card.show();
                                }
                                // 加上滚动的效果,以免在评论框消失的时候出现生硬的效果
                                if(clientWidth>800){
                                    $body.animate({
                                        scrollTop: $('.quote-wrapper:last-of-type').offset().top
                                    }, 350);
                                }
                            }
                        } else {
                            overlay("fail");
                        }
                    }
                });

                return false;

            } else {
                e.preventDefault();
            }
    })
}

/*------ overlay 评论后正文的评论区域隐藏；正文的评论区评论后 overlay 评论不能够打开 ------*/

// function click_this_hide_that(){
//     $('.anonymous_comment_form, #comment_form').on('submit',function(){
//         $overlay_comment_wrapper.hide();
//     })
//     $overlay_comment_form.on('submit',function(){
//         $comment_app_area.hide();
//     })
// }


/*------ 编辑评论 ------*/
$left_side.on("click",".edit-quote",function() {
    var $this=$(this),
            quote_wrapper = $this.closest('.quote-wrapper'),
            quote_words = quote_wrapper.find('.quote-words'),
            comment_id = quote_words.attr('id'),
            quote_text_val = quote_words.find('.quote-text').html(),
            comment_wrapper = quote_wrapper.find('.edit-comment-wrapper'),
            target_text = comment_wrapper.find('textarea');
            quote_words.hide();
            comment_wrapper.show();
            target_text.val(quote_text_val.replace(/<br>/g, '\n'));
    $left_side.on("submit","#edit_commented",function(e) {
        var data = comment_wrapper.find('textarea').val().replace(/\r?\n/g, '<br />'); 
        //可以做成一个清除空格的功能
        if (comment_wrapper.find('textarea').val().length) {
            $.ajax({
                url: "/comment/" + comment_id + "/modify/",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: data,
                success: function(result) {
                    // {# result  r=True c_id=评论id， 否则评论失败 #}
                    if (result['r']) {
                        quote_words.find('.quote-text').html(comment_wrapper.find('textarea').val().replace(/\r?\n/g, '<br />'));
                        comment_wrapper.hide();
                        quote_words.show();
                    } else {
                        overlay("fail");
                    }
                }
            });
            return false;
        } else {
            e.preventDefault();
        }
    });
    $left_side.on("click",".cancel-edit-comment",function() {
        comment_wrapper.hide();
        quote_words.show();
    });
})
/*------ 删除评论 ------*/
$left_side.on("click",".delete-comment",function() {
    var $quote_wrapper_length = $('.quote-wrapper').length,
        quote_wrapper = $(this).closest('.quote-wrapper'),
        quote_words = quote_wrapper.find('.quote-words'),
        comment_id = quote_words.attr('id'),
        true_delete_comment = confirm('你确定要删除这条评论吗？');
    if (true_delete_comment) {
        $.ajax({
            url: "/comment/" + comment_id + "/del/",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function(result) {
                // {# result  r=True c_id=评论id， 否则 删除失败 #}
                if (result['r']) {
                    quote_wrapper.hide();
                    $('#edit_commented hr:nth-of-type(2)').hide();
                    if($quote_wrapper_length == 1){
                        $('.quote-card').hide();
                        $comment_app_area.show();
                        $overlay_comment_wrapper.show();
                    }else{
                        // $comment_form.append('<p class="quote-user-info\"><strong id=\"user_name\" class=\"comment-user-name\">{{ request.user.userName }}</strong><span id=\"career\">{{ request.user.career }}:</span></p><textarea name=\"comment_content\" id=\"comment_content\" cols=\"87\" rows=\"8\"></textarea><span class=\"comment-length-tip\"></span><button class=\"button-submit\" >提交评论</button>');
                        $comment_app_area.show();
                    }
                } else {
                    overlay("fail");
                }
            }
        });
    } else {
        return;
    }
});

/*------ 置顶 ------*/
$left_side.on("click",".add-to-index",function() {
    var $this=$(this),
        quote_wrapper = $this.closest('.quote-wrapper'),
        quote_words = quote_wrapper.find('.quote-words'),
        comment_id = quote_words.attr('id');
    $('.add-to-index').removeClass('added-to-index');
    $.ajax({
        url: "/comment/" + comment_id + "/top/",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            // {# result  r=True c_id=评论id， 否则 置顶失败 #}
            if (result['r']) {
                alert('置顶成功!');
                $this.addClass('added-to-index');
            } else {
                overlay("fail");
            }
        }
    });

});



// 当在评论框中输入内容的时候隐藏 siteheader 区域(因为 Siteheader 区域会挡住评论内容)
$site_header=$('#site_header');
if(clientWidth < 800){
    $comment_content.on('focusin',function(){
        $site_header.hide();
    });
    $window.on('scroll',function(){
        $site_header.show();
    })
}


// [Web] 当鼠标停留在某一个特定的评论上的时候，时间消失，评论编辑条出现
if( clientWidth > 800 ){
    $('.quote-wrapper')
    .on('mouseover',function(){
        $this=$(this);
        $do_edit=$this.find('.do-edit');
        $do_edit.show();
        if($do_edit.length>0){
            $this.find('.comment-time').hide();
        }
    })
    .on('mouseout',function(){
        $this=$(this);
        $this.find('.do-edit').hide();
        $this.find('.comment-time').show();
    })
}
    

// Jiathis building

function attach_jiathis_link(data) {
    var jiathis_tsina_url=detail_build_jiathis_url("tsina","weibo"," @pig_paradise","%23极客视界%23 ","","。"),
        jiathis_tqq_url =detail_build_jiathis_url("tqq","txweibo"," @345665465","%23极客视界%23 ","","。"),
        jiathis_douban_url=detail_build_jiathis_url("douban","douban"," @zhm6422107@126.com","","%23极客视界%23 ",""),
        jiathis_renren_url=detail_build_jiathis_url("renren","renren","","","%23极客视界%23 ",""),
        jiathis_qzone_url =detail_build_jiathis_url("qzone","qzone","","","%23极客视界%23 ","");

        $('.jiathis_button_tsina').attr('href', jiathis_tsina_url);
        $('.jiathis_button_douban').attr('href', jiathis_douban_url);
        $('.jiathis_button_renren').attr('href', jiathis_renren_url);
        $('.jiathis_button_tqq').attr('href', jiathis_tqq_url);
        $('.jiathis_button_qzone').attr('href', jiathis_qzone_url);
}
attach_jiathis_link();

// [Global] textarea自动根据回车变大 
$("textarea").keyup(function(e) {
    while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
        $(this).height($(this).height()+1);
    };
});



// 统计点击顶部广告 banner 下载 App 的数量

mobile_banner_interaction(article_title);


// 统计文章底部「马上去下载」按钮
$('#bottom_download_link').on('click',function(){
    event_tracker('DetailpageDownloadApplink', source , article_title);
})

// [Mobile] 记录用户是否点了「喜欢引导页面」
// (function like_guide_cookie(){
//     if(clientWidth < 800){
//         if(localStorage.clicked_like_area!=="true"){
//             $blackcover.addClass('fadein');
//             $blackcover.on('touchstart',function(){
//                 try{
//                     localStorage.clicked_like_area=true;
//                     event_tracker('LikeGuide','Special-Action-Analytics',article_title);
//                 }catch(error){
                    
//                 }
//                 $blackcover.removeClass('fadein').addClass('fadeout');
//                 return false;
//             })
//         }
//     }
// }())



// if(clientWidth>800){
//     load_sina_weibo('web_login_area_weibo');
//     // 在详情页点 logo 回到顶部，在桌面版点 logo 回到首页
//     $('.logo').attr('href','/');
// }

// [Web] 固定分享 Card
// var share_card= $('#share_card');
// var shareTop= share_card.offset().top;
// $(window).scroll(function() {
//     var bodyTop = document.body.scrollTop;
//     if(bodyTop > shareTop){
//         share_card.addClass('fixed').css('top','43px');
//     }else{
//         share_card.removeClass('fixed').css('top','0');
//     }
// })


// [Web] 当有多个下载地址的时候进行折叠
// var moredownloads = $('#more-download-address');
// var more = $('.more-downloads');
// more.click(function() {

//     if (moredownloads.is(':visible')) {
//         moredownloads.hide();
//         more.removeClass('orange');
//     } else {
//         moredownloads.show();
//         more.addClass('orange');
//     }

// });


// $mobile_like.on('click',function(){
//     $mobile_like_counts_val=parseInt($mobile_like_counts.text());
//     if(!$mobile_like.hasClass('active-mobile-like')){
//         $mobile_like_counts.text($mobile_like_counts_val+1);
//         $mobile_like.addClass('active-mobile-like');
//     }else{
//         $mobile_like_counts.text($mobile_like_counts_val-1);
//         $mobile_like.removeClass('active-mobile-like');
//     }
//     return false;
// })


