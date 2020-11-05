<link rel="shortcut icon" href="{{ site.baseurl }}/assets/favicon.ico">

{% for post in site.posts %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}  