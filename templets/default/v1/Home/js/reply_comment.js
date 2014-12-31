/************

评论的回复 

************/    

// 重新定义 Mustache 的标签，避免冲突
Mustache.tags = ['[[', ']]'];  

// 针对一条回复进行「美一下」操作
$('#edit_commented').on('click','.digg-button',function(){
    $this = $(this);
    var comment_id = $this.attr('rel');
    diggComment(comment_id, $this);
})

function diggComment(id, $this) {
    $.ajax({
        type: "POST",
        url: "/comment/"+id+"/digg/",
        success: function(result){
            var data = result.data ;
            var result = result.result ;
            if (result == 0) {
                if (data.code == 4000) {
                    login_alert();
                } else {
                    overlay('fail');
                }
            } else {
                // 在判断是否含有 active 标签后，更新美一下的数量
                if(!$this.hasClass('active')){
                    $this.addClass('active');
                }else{
                    $this.removeClass('active');
                }
                $("#digg_count_" + id).text(data.up_times);
            }
        }
    });
}

// 点击外层的「回复」
$('#edit_commented').on('click','.reply-button',function(){
    var $this = $(this);
    var comment_id = $this.attr('rel');
    var $quote_reply = $("#quote_reply_" + comment_id);
    var comment_form_html = "<textarea class='reply-quote-input' placeholder='输入回复…'></textarea><span class='comment-reply-length-tip'></span><a class='button-small-submit reply-quote-button' onclick='postReply("+comment_id+",0);'>提交回复</a>";
    toggle_comments($quote_reply, $this, comment_form_html, comment_id);
    return false;
});

// 隐藏和展示评论
/*
    quote_reply_wrapper 代表下拉出现的整个回复区域
    this_selector 代表被触发的回复按钮
    html 代表回复区域的 dom 结构
    id 代表此条回复的唯一标识
*/

function toggle_comments(quote_reply_wrapper, this_selector, html, id){
    /*
        针对外层的回复按钮有三种状态
            1. 未被激活状态
                a.被触发后加上激活的标签 active
                b.如果子回复的数量【不为零】，则去请求所有的子回复{doReply(id)}
            2. 激活状态
                a.被触发后加上睡眠的标签 sleep
                b.把子回复收起来
            3. 睡眠状态
                a.被触发后加上激活的标签 active
                b.展开子回复。这时候不需要再去请求了
    */

    if(this_selector.hasClass('active')){
        // 2. 激活状态
        quote_reply_wrapper.slideUp();
        this_selector.addClass('sleep').removeClass('active');
    }else if(this_selector.hasClass('sleep')){
        // 3. 睡眠状态
        quote_reply_wrapper.slideDown();
        this_selector.addClass('active').removeClass('sleep');
    }else{
        // 1. 未被激活状态
        if(quote_reply_wrapper.hasClass('quote-reply-wrapper')){
            // 查看子回复的数量
            var reply_count = this_selector.find('.reply_count');
            // 子回复数量【不为零】的情况下去请求所有子回复
            if(reply_count!==0){
                doReply(id, quote_reply_wrapper);
            }else{
            // 子回复数量【为零】的情况下则贴上写好的 html（html 会带上评论的 id）
                quote_reply_wrapper.html(html).slideDown(); 
            }
        }else{
            quote_reply_wrapper.html(html).slideDown();
        }
        // 加上 active 标签
        this_selector.addClass('active');
    }
    return false;
}

// 点击外面的「回复」后进行的 ajax 请求
function doReply(id, quote_reply_wrapper) {
    $.ajax({
        type: "GET",
        url: "/api/comment/"+id+"/get_replys/?page=1",
        success: function(result) {
            var data = result.data;
            var template = $("#replyTpl").html();
            html = Mustache.to_html(template, data);
            // 请求成功后在回复区域加上 html 并加上下拉的动画
            quote_reply_wrapper.html(html).slideDown();
            return false;
        }
    });
}


// 回复「子回复」
$('#edit_commented').on('click', '.reply-replied', function(){
    $this = $(this);
    var reply_id = $this.attr('rel');
    var comment_id = $this.attr("data");
    // 获取被回复者的名字，用于在 placeholder 中展示
    var replied_user_name = $this.parent().find('.reply-user-name').text();
    doReplyReplied(comment_id, reply_id, replied_user_name);
});

function doReplyReplied(comment_id, reply_id, replied_user_name) {
    $replyform = $(".quote-reply-wrapper #reply_" + reply_id + " .sub-reply-form");
    var html = "<textarea class='reply-quote-input' placeholder='@"+replied_user_name+"：'></textarea><span class='comment-reply-length-tip'></span><a class='button-small-submit reply-replied-quote-button' onclick='postReply("+comment_id+","+ reply_id+");'>提交回复</a>";

    /* 以防和 toggle_comments 冲突，先做判断：
        如果回复的按钮是「激活」的状态
            a.收起输入框
            b.从 active 改成 sleep
    */
    if($this.hasClass('active')){
        $replyform.slideUp();
        $this.addClass('sleep').removeClass('active');
        return false;
    }

    /* 检查是否已经有展开的「子回复」输入框。
        如果有：
            a. 把输入框隐藏
            b. 把输入框对应的回复按钮，从 active 改成 sleep
    */
    if($('.reply-replied.active').length>0){
        $('.sub-reply-form').slideUp();
        $('.reply-replied.active').removeClass('active').addClass('sleep');
    }
    toggle_comments($replyform ,$this,html);
}


// 提交「回复」
$('#edit_commented').on('click', '.reply-quote-button', function(){
    var comment_id = $(this).attr('rel');
    postReply(comment_id, 0);
})

function postReply(comment_id, reply_id) {
    var content=' ';
    if(reply_id != 0){
        content = $("#reply_" + reply_id + " .reply-quote-input").val();
        if(content.length<5){
            $('.sub-reply-form .comment-reply-length-tip').html('亲，你可以再多说一点的…想想还以说点什么？');
        }else{
            postReplyAjax(comment_id,reply_id,content);
        }
        return false;
    }else{
        content = $("#content_" + comment_id).val();
        if(content.length<5){
            $('.quote-reply-form .comment-reply-length-tip').html('亲，你可以再多说一点的…想想还以说点什么？');
        }else{
            postReplyAjax(comment_id,reply_id,content);
        }
    }
    
}

function postReplyAjax(comment_id,reply_id,content){
    $.ajax({
        type: "POST",
        url: "/comment/"+comment_id+"/reply/",
        data: {
            type: "zuimei.daily",
            reply_id: reply_id,
            content: content
        },
        success: function(result) {
            var data = result.data ;
            var result = result.result ;
            if (result == 0) {
                if (data.code == 4000) {
                    login_alert();
                }
            } else {
                // 修改回复的总数量
                $("#reply_count_" + comment_id).text(data.comment.reply_times);

                var $quote_reply = $("#quote_reply_" + comment_id);
                doReply(comment_id, $quote_reply);
                // 评论成功后页面滚动到评论成功后的位置
                if(reply_id==0){
                    $('html,body').animate({
                      scrollTop: $quote_reply.offset().top+$quote_reply.height()-100
                    }, 350);
                }
            }
        }
    });
}