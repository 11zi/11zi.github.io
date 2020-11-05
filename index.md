<link rel="shortcut icon" href="{{ site.baseurl }}/img/favicon.ico">
<style>header{ border-right: 2px solid #267CB9; }</style>
{% for post in site.posts %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}