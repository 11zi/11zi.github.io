<link rel="shortcut icon" href="{{ site.baseurl }}/img/favicon.ico">

{% for post in site.posts %}
折腾
- [{{ post.name }}]({{ post.url }})
{% endfor %}