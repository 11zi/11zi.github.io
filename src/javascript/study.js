(function () {
  axios.get('https://api.github.com/repos/11zi/11zi.github.io/labels').then(function (response) {
    var labels = response.data
    var labelsElement = document.getElementById('labels')
    for (var i = labels.length - 1; i >= 0; i--) {
      var append = '<div class="mdui-chip mdui-m-r-1" style="background-color:#' + labels[i].color + '"><span class="mdui-chip-title">' + labels[i].name + '</span></div>'
      labelsElement.innerHTML += append
    }
  })
})();
(function () {
  axios.get('https://api.github.com/repos/11zi/11zi.github.io/issues').then(function (response) {
    var articles = response.data
    for (var i = 0; i < articles.length - 1; i++) {
      var articleElement = document.getElementById('articles')
      var append = '<div class="mdui-col-xs-11 mdui-typo"><blockquote><article>'
      append += '<small class="mdui-float-right"><i class="mdui-icon material-icons">&#xe8df;</i>' + (articles[i].updated_at).slice(0, 10) + '</small>'
      append += '<h1>' + articles[i].title + "</h1>"
      for (var j = articles[i].labels.length - 1; j >= 0; j--) {
        append += '<div class="mdui-chip mdui-m-r-1" style="background-color:#' + articles[i].labels[j].color + '"><span class="mdui-chip-title">' + articles[i].labels[j].name + '</span></div>'
      }
      append += '</article></blockquote></div>'
      articleElement.innerHTML += append
    }
  })
})();