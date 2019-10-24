console.time(); // 咋瓦鲁多!

var vue_component = JSON.parse(`{
  "el":"#vue-controller",
  "data":{
    "name":"YaoZ",
    "articleList":[{
      "issueId":"怒",
      "articles_title":"怒",
      "article_date":"怒",
      "label":[]
    }],
    "labelList":[{
      "label_color":"怒",
      "label_name":"怒"
    }],
    "commentList":[{
      "comment_avartar_url":"怒",
      "comment_user_name":"怒",
      "comment_content":"怒"
    }],
    "articleContent":{
      "article_title":"怒",
      "article_content":"怒"
    }
  },
  "method":{

  }
}`)

function getVueJson(){
  return function(){
    return vue_component
  }()
} // 用闭包把封装的变量暴露给vue_controller.js
// 目前没有暴露出去,所以vue无法渲染
// 原先的实现方式也已删除,因此没有任何东西渲染出来

(function () { // 标签列表
  axios.get('https://api.github.com/repos/11zi/11zi.github.io/labels').then(function (response) {
    var labels = response.data
    var labelElement = document.getElementById('labels')
    for (var i = labels.length - 1; i >= 0; i--) {
      var append = '<div class="mdui-chip mdui-m-r-1" style="background-color:#' + labels[i].color + '"><span class="mdui-chip-title">' + labels[i].name + '</span></div>'
      labelElement.innerHTML += append
    }
  })
})();
(function () { // 评论列表
  axios.get('https://api.github.com/repos/11zi/11zi.github.io/issues/1/comments').then(function (response) {
    var comments = response.data
    var commentElement = document.getElementById('comments')
    for (var i = comments.length - 1; i >= 0; i--) {
      var append = '<div class="mdui-row mdui-ripple"><label class="mdui-list-item"><div class="mdui-list-item-avatar">'
      append += '<img src="' + comments[i].user.avatar_url + '" /></div>'
      append += '<div class="mdui-list-item-content">' + comments[i].user.login + '</div>'
      append += '</label><pre class="mdui-m-l-2 mdui-m-r-2 mdui-m-t-1 mdui-m-b-1">' + comments[i].body + '</pre></div>'
      commentElement.innerHTML += append
    }
  })
}());
function listArticles() { // 展示文章列表
  axios.get('https://api.github.com/repos/11zi/11zi.github.io/issues').then(function (response) {
    var articles = response.data
    var articleElement = document.getElementById('articles')
    var htmlList = ''
    for (var i = 0; i < articles.length - 1; i++) {
      var append = '<div class="mdui-col-xs-11 mdui-typo"><blockquote><article>'
      append += '<small class="mdui-float-right"><i class="mdui-icon material-icons">&#xe8df;</i>' + (articles[i].updated_at).slice(0, 10) + '</small>'
      append += '<h1><a href="javascript:void(0);" onclick="getArticle(' + (articles.length - i) + ')">' + articles[i].title + "</a></h1>"
      for (var j = articles[i].labels.length - 1; j >= 0; j--) {
        append += '<div class="mdui-chip mdui-m-r-1" style="color:white;background-color:#' + articles[i].labels[j].color + '"><span class="mdui-chip-title">' + articles[i].labels[j].name + '</span></div>'
      }
      append += '</article></blockquote></div>'
      htmlList += append
    }
    articleElement.innerHTML = htmlList
  })
};
function getArticle(issueID) { // 读取文章
  axios.get('https://api.github.com/repos/11zi/11zi.github.io/issues/' + issueID).then(function (response) {
    var converter = new showdown.Converter()
    var article = response.data.body
    var html = '<div class="mdui-col-xs-10 mdui-col-offset-xs-1 mdui-typo"><h1>' + response.data.title + "</h1>"
    html += converter.makeHtml(article)
    html += '</div>'
    var div = document.getElementById('articles')
    div.innerHTML = html
  })
}
// 筛选标签文章(需要用到 graphQL V4的api 目前无法完成)

console.timeEnd();
// 时间开始流动