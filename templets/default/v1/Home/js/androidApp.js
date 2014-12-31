var enhanceSidebar = function() {
  var sideBarButton = $('.menu-button');
  var viewblockNode = $(".viewblock");
  var sliderNode = $(".slider");
  var bodyNode = $("body");
  if (sideBarButton) {
    viewblockNode.find("form").remove();
    viewblockNode.find(".slider-zuimei-qr").remove();
    viewblockNode.find(".slider-bottom-menu").remove();
    viewblockNode.find(".blackover").remove();
    $("#tag1").html($("#tag1").html() + $("#tag2").html());
    $("#tag2").remove();
    $("#more").parent().remove();
    var categories = $("#tag1").find("li");
    for (var i = 0, l = categories.length; i < l; i++) {
      var category = categories.eq(i);
      if (category.children("a").html() == "限免") {
        category.remove();
        break;
      }
    }
    bodyNode.addClass("android-app");
  }
};


var addBetaText = function() {
  var logo = document.querySelector(".logo");
  if (logo) {
    logo.innerHTML = "beta";
    logo.className += " logo-beta";
  }
}

var showSearchButton = function() {
  var searchContainer = document.createElement('div');
  searchContainer.className = "android-app-mobile-search";
  var searchForm = '<form action="/search/" class="mobile-search" method="get" _lpchecked="1"><input autocomplete="off" class="mobile-search-input" name="keyword" placeholder="搜索最美应用" type="text" value=""><input name="platform" type="hidden" value="2"><input class="search-icon" type="submit"></form>';
  searchContainer.innerHTML = searchForm;
  var header = document.getElementById("site_header");
  var contentWrapper = document.getElementById("content_wrapper");
  header.parentNode.insertBefore(searchContainer, contentWrapper);
}

var showStoreDownloadButton = function(downloadGroup, downloadButtons, appTitleNode) {
  var appTitle = appTitleNode.childNodes[0].nodeValue.trim();
  if (downloadButtons[0].href.indexOf("play.google.com")) {
    var storeDownloadButton = downloadButtons[0];
    storeDownloadButton.innerHTML = '<i class="google-play"></i><span class=\"platform-name\">通过应用商店下载</span>';
    storeDownloadButton.href = 'market://' + storeDownloadButton.href.match(/(details\?id=.*)$/)[0];
    storeDownloadButton.className = 'download-button store-down';
    storeDownloadButton.name = 'Mobile-Android-Store';
    storeDownloadButton.target = '_blank';
  }
};

var useThumbnail = function(originalSrc) {
  var newSrc = originalSrc;
  if (originalSrc.indexOf("http://static.zuimeia.com") >= 0) {
    if (originalSrc.match(/(\.jpg|\.jpeg|\.png)$/ig)) {
      newSrc = newSrc.replace(/(\.jpg|\.jpeg|\.png)$/ig, "_thumbnail4iphone$1");
    }
  } else if (originalSrc.indexOf("http://qstatic.zuimeia.com") >= 0) {
    if (originalSrc.match(/(\.jpg|\.jpeg|\.png)$/ig)) {
      newSrc = newSrc.replace(/(\.jpg|\.jpeg|\.png)$/ig, "$1?imageMogr/v2/auto-orient/thumbnail/300x533/format/jpg");
    }
  }
  return newSrc;
}

var replaceImageToLowfi = function() {
  var articleContent = document.getElementById("article_content");
  if (articleContent) {
    var imgNodes = articleContent.getElementsByTagName("img");
    for (var i = 0, l = imgNodes.length; i < l; i++) {
      var imgNode = imgNodes[i];
      var dataOriginal = imgNode.getAttribute("data-original");
      var src = imgNode.getAttribute("src");
      if (dataOriginal) {
        if (src.indexOf("img-loading") > 0) {
          imgNode.setAttribute("data-original", useThumbnail(dataOriginal));
        } else {
          imgNode.setAttribute("src", useThumbnail(src));
        }
      }
    }
  }
}

function loadNativeJs() {
  if (location.href) {
    var currentUrl = location.href;
    if (currentUrl.indexOf('/apps') > 0 || currentUrl.indexOf('/search') > 0) {
      // index and category page
      enhanceSidebar();
      addBetaText();
      showSearchButton();
    };
    if (currentUrl.indexOf('/app/') > 0) {
      // app detail page
      var downloadGroup = document.querySelector('.mobile-download-button');
      if (downloadGroup) {
        var downloadButtons = downloadGroup.getElementsByTagName('a');
        var appTitleNode = document.querySelector('.app-title h1');
        showStoreDownloadButton(downloadGroup, downloadButtons, appTitleNode);
      };
      replaceImageToLowfi();
    };
  };
}
