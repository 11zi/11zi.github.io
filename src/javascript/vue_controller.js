Vue.component('article-list',{ // 文章列表组件, 嗯
  template:`
  <div class="mdui-col-xs-11 mdui-typo">
    <blockquote>
      <article>
        <small class="mdui-float-right">
          <i class="mdui-icon material-icons"></i>{{ article_date }}
        </small>
        <h1>
          <a href="javascript:void(0);" v-on:click="getArticle({{ issueId }})">{{ articles_title }}</a>
        </h1>
        <labels v-for="_label in label"></labels>
      </article>
    </blockquote>
  </div>
  `
})
Vue.component('labels',{ // 简单的标签组件
  template:`
  <div class="mdui-chip mdui-m-r-1" style="background-color:#{{ label_color }}">
    <span class="mdui-chip-title">{{ label_name }}</span>
  </div>
  `
})
Vue.component('comment',{ // 评论组件, 每一条评论都会取用
  template:`
  <div class="mdui-row mdui-ripple">
    <label class="mdui-list-item">
      <div class="mdui-list-item-avatar">
        <img src="{{ comment_avartar_url }}">
      </div>
      <div class="mdui-list-item-content">
        {{ comment_user_name }}
      </div>
    </label>
    <pre class="mdui-m-l-2 mdui-m-r-2 mdui-m-t-1 mdui-m-b-1">
      {{ comment_content }}
    </pre>
  </div>
  `
})
Vue.component('article-content',{ // 文章内容组件, 在阅读时取用
  template:`
  <div class="mdui-col-xs-10 mdui-col-offset-xs-1 mdui-typo">
    <h1>{{ article_title }}</h1>
    {{ article_content }}
  </div>
  `
})
Vue.component('response-data',{
  template:''
})

listArticles();
console.log(getVueJson())
if(false)
var vueMachine = new Vue(getVueJson())
