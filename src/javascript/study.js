(function () {
  axios.get('https://api.github.com/repos/11zi/11zi.github.io/labels').then(function (response) {
    var labels = response.data
    var labelElement = document.getElementById('labels')
    for (var i = labels.length - 1; i >= 0; i--) {
      var append = '<div class="mdui-chip mdui-m-r-1" style="background-color:#' + labels[i].color + '"><span class="mdui-chip-title">' + labels[i].name + '</span></div>'
      labelElement.innerHTML += append
    }
  })
})();// 标签列表
(function () {
  axios.get('https://api.github.com/repos/11zi/11zi.github.io/issues').then(function (response) {
    var articles = response.data
    var articleElement = document.getElementById('articles')
    for (var i = 0; i < articles.length - 1; i++) {
      var append = '<div class="mdui-col-xs-11 mdui-typo"><blockquote><article>'
      append += '<small class="mdui-float-right"><i class="mdui-icon material-icons">&#xe8df;</i>' + (articles[i].updated_at).slice(0, 10) + '</small>'
      append += '<h1><a href="javascript:void(0);" onclick="getArticle('+(i)+')">' + articles[i].title + "</a></h1>"
      for (var j = articles[i].labels.length - 1; j >= 0; j--) {
        append += '<div class="mdui-chip mdui-m-r-1" style="color:white;background-color:#' + articles[i].labels[j].color + '"><span class="mdui-chip-title">' + articles[i].labels[j].name + '</span></div>'
      }
      append += '</article></blockquote></div>'
      articleElement.innerHTML += append
    }
  })
})();// 文章列表
(function () {
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
}());// 评论列表
function getArticle(issueID) {
  axios.get('https://api.github.com/repos/11zi/11zi.github.io/issues/'+issueID).then(function (response) {
    console.log("Okay no pb.")
    var converter = new showdown.Converter()
    var article = response.data.body
    var html = converter.makeHtml(article)
    var div = document.getElementById('articles')
    div.innerHTML=html
  })
}// 读取文章(需要用到graphQL)
// 筛选标签文章(需要用到graphQL)
