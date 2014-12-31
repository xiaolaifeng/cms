var article_title = 'IndexPage',
    $site_header = $('#site_header'),
    $mobile_search_button = $('#mobile_search_button'),
    $mobile_sub_nav_list= $('.mobile-sub-nav-list');
    if(structured_url_path.indexOf('neice')>0){
        var structured_url_path = structured_url_path.replace('/neice','');
    }
$(document).ready(function() {
    var $body = $('body'),
        $slider=$('.slider'),
        $app_title=$('.app-title'),
        lazyload_content_cards = $('.content-card:gt(1)');

    // [Global] List 页面的 LazyLoad
    var no_lazy_image = $('.content-card:lt(2)').find('img');

    for(var i=0;i<no_lazy_image.length;i++){
        no_lazy_image[i].src=no_lazy_image[i].getAttribute('data-original');
    }
    lazyload_content_cards.find('img').lazyload({
        effect: "fadeIn",
        threshold : 600
    });
    // 根据不同平台显示不同的 title
    if(url_search_value.indexOf('platform=3')>0){
        $title = $('title');
        var title_text = $title.text().replace('iPhone','iPad').replace('【极客视界】','【iPad】');
        $title.text(title_text);
    }
  

//    // [Global] 控制首页评论的长度
//    var maxwidth = 75;
//    $('.quote-text').each(function() {
        // var text_content = $(this).text();
//        if (text_content.length > maxwidth) {
//            $(this).text(text_content.substring(0, maxwidth));
//            $(this).html($(this).html() + '...');
//        }
//    });

    // [Web] 点喜欢
    // if(clientWidth>800){
    //     $('.web-like-rate').on('click',function(){
    //         var web_like_counts=parseInt($('.web-like-counts').text());
    //         if(!$(this).hasClass('active-like-icon')){
    //             $(this).addClass('active-like-icon');
    //         }else{
    //             $(this).removeClass('active-like-icon');
    //         }
    //         return false;
    //     })
    // }

    // [Mobile] 侧边栏动画
    var $view_block = $('.viewblock'),
        $menu_button = $('.menu-button');
    $menu_button.bind('touchstart', function() {
        $slider.removeClass('slideIn slideOut').addClass('slideIn');
        $('.viewblock').prepend('<div class="blackcover animation fadein"></div>');
        $body.addClass('_view');//when menu slidein overflow all the others.
        // Google Analatics
        ga('send', 'event', 'SlideButton-'+device+'-'+platform, source , 'ListPage');

        // 点击蒙版关闭侧边栏
        $('.blackcover').bind('touchstart', function() {
            $slider.removeClass('slideIn slideOut').addClass('slideOut');
            $(this).removeClass('fadein fadeout').addClass('fadeout');
            $body.removeClass('_view');
            return false;
        })
        return false;
    })

    // 没有评论的 .content-card 的 border-radius 要用 2px
    $('.no-comment-bottom').parent().find('.content-card').css('border-radius','2px');


    // 喜欢的计数
    var article_id=[];
    $app_title.each(function(i){
        article_id.push($app_title[i].getAttribute('data'));
    })
    var count_total_number;
    $count_like=$('.count-like'),
    $pub_time_and_version=$('.pub-time-and-version');
    function updata_list_like_num(result){
        for(var i=0;i<result['data'].length;i++){
            var count_total_number=result['data'][i][article_id[i]];
            if(count_total_number==0){
                // $('a[data='+article_id[i]+']').parelnt().find('.count-like-area').hide();
                $count_like_area[i].style.display='none';
                if(clientWidth>800){
                    $pub_time_and_version[i].className+=' special-web-pub-time-and-version';
                    // $app_title[i].style.paddingTop='10px';
                }
            }else{
                    $count_like_area[i].style.display='block';
            }

            $count_like[i].innerHTML=count_total_number;
        }
    }

/*    function get_mobile_rate_like_num(option,ids,ajax_url){
            var regex=/apps/;
            if(regex.test(current_url)){
                var ajax_url=structured_url_path+option+'/?ids='+article_id;
            }else if(current_url.indexOf('/search/')>0){
                var ajax_url=location.protocol+'//'+location.host+'/apps/'+option+'/?ids='+article_id;
            }else{
                var ajax_url=structured_url_path+'apps/'+option+'/?ids='+article_id;
            }
            $.get(ajax_url,function(result){
                updata_list_like_num(result);
            });
    }
    get_mobile_rate_like_num("up");*/

}); //End of document.ready


/*//Jiathis Building;
function attach_jiathis_link(data) {
    var jiathis_tsina_url=list_build_jiathis_url("tsina","weibo","@极客视界官方微博","%23极客视界%23 ","","。"),
        jiathis_tqq_url =list_build_jiathis_url("tqq","txweibo","@geekview","%23极客视界%23 ","","。"),
        jiathis_douban_url=list_build_jiathis_url("douban","douban","@geekview","","%23极客视界%23 ",""),
        jiathis_renren_url=list_build_jiathis_url("renren","renren","","","%23极客视界%23 ",""),
        jiathis_qzone_url =list_build_jiathis_url("qzone","qzone","","","%23极客视界%23 ","");

    $('.jiathis_button_tsina').attr('href', jiathis_tsina_url);
    $('.jiathis_button_douban').attr('href', jiathis_douban_url);
    $('.jiathis_button_renren').attr('href', jiathis_renren_url);
    $('.jiathis_button_tqq').attr('href', jiathis_tqq_url);
    $('.jiathis_button_qzone').attr('href', jiathis_qzone_url);
}

attach_jiathis_link();
*/
// 新浪微博
// function weibo_login(){
//     if(is_weixin() || is_chrome){
//         window.location.href=location.protocol+'//'+location.host+'/weibo/login';
//     }
// }

//  点击 Banner 后 GA 统计

mobile_banner_interaction(article_title);
var search_status = true;

$('#mobile_search_button_wrapper').bind('touchend',function(){
    if(document.cookie.search('close-ad=1') == -1){
        $('.mobile-search').css('top','124px');
    }else{
        $('.mobile-search').css('top','44px');
    }
    $mobile_search.removeClass('slide-down-search slide-up-search').addClass(search_status ? 'slide-down-search' : 'slide-up-search');
    if(search_status){
        $site_header.addClass('no-shadow');
        $mobile_search_button.removeClass('counter-rotate-search-icon').addClass('rotate-search-icon');
    }else{
        $site_header.removeClass('no-shadow');
        $mobile_search_button.removeClass('rotate-search-icon').addClass('counter-rotate-search-icon');
    }
    search_status = !search_status;
    return false;
})

if(clientWidth < 800){
    $('.mobile-nav-list-item').bind('touchstart',function(e){
        $this = $(this);
        $mobile_nav_list = $this.parent();
        $mobile_nav_list.addClass('active');

        if($mobile_nav_list.hasClass('daily')){
            $('.discovery').find('.mobile-sub-nav-list').removeClass('slide-down-menu');
        }else{
            $('.daily').find('.mobile-sub-nav-list').removeClass('slide-down-menu');
        }

        $mobile_sub_nav_list = $mobile_nav_list.find('.mobile-sub-nav-list');

        if($mobile_sub_nav_list.hasClass('slide-down-menu')){
            $mobile_sub_nav_list.removeClass('slide-down-menu');
            return false;
        }else{
            $mobile_sub_nav_list.addClass('slide-down-menu');
            return false;
        }
        return false;
    })
    window.onscroll = function() {
        $mobile_sub_nav_list.removeClass('slide-down-menu');
    }
}