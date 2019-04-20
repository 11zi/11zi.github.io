/*
Convert text to json(MindLet).
Copyright © 2018 , 沈维杰. All rights reserved.(GPL License)
*/

var inst = new mdui.Drawer('#drawer');

// method

document.getElementById('toggle').addEventListener('click', function () {
  inst.toggle();
});

// 右键行为
var mindlet_rightClick = function () {
  window.event.returnValue = false;
  var map = document.getElementById("map_all")
  if (map)
    map.classList.remove("mdui-hidden")
  var single = document.getElementById("single")
  if (single)
    single.classList.add("mdui-hidden")
}

var mindlet_json;

// 渲染节点树
var mindlet_render = function () {
  var map = document.getElementById("map_all")
  var input = document.getElementById("input")

  mindlet_json = MindLet.textToJson(input.value)
  var html_update = ""
  for (var i = 1; i < mindlet_json.length - 1; i++) {
    var h = '<h2 onclick="mindlet_single_render(this)">', h_ = "</h2>", p_ = "<p>", _p = "</p>"
    if (mindlet_json[i].description)
      html_update += (h + mindlet_json[i].name + h_ + p_ + mindlet_json[i].description + _p)
    else
      html_update += (h + mindlet_json[i].name + h_)
  }
  map.innerHTML = html_update
};

// 渲染单节点
var mindlet_single_render = function (node) {
  // 透明化之前的节点
  var transparent = document.getElementById("map_all")
  transparent.classList.add('mdui-hidden')

  var map = document.getElementById("single") // 最后要添加的
  map.classList.remove('mdui-hidden')

  var _div = '</div>', back_div = '<div id="back">', next_div = '<div id="next">', link_div = '<div id="link">', h_ = '<h1 onclick="mindlet_single_render(this)">', hh_ = '<h2 onclick="mindlet_single_render(this)">', _h = '</h1>', __h = '</h2>'
  var p_ = '<p>', _p = '</p>'
  var div_lookable = ""

  var self = node.innerHTML;
  // console.log(mindlet_json);
  var p = mindlet_json[mindlet_json.length - 1][self]; // 节点位置

  // 构建前向,以及描述 √
  var back = [], description_back = [];
  for (var i = 1; i < mindlet_json.length - 1; i++) {
    if (mindlet_json[i].next)
      for (var j = 0; j < mindlet_json[i].next.length; j++) {
        if (mindlet_json[i].next[j][0] == self) {
          back[back.length] = mindlet_json[i].name;
          description_back[description_back.length] = mindlet_json[i].next[j][1] ? mindlet_json[i].next[j][1] : false;
        }
      }
  }
  // console.log(back)

  // 构建后继,以及描述 √
  var next = [], description_next = [];
  for (var i = 0; i < mindlet_json[p].next.length; i++) {
    if (mindlet_json[p].next[i][0]) {
      next[next.length] = mindlet_json[p].next[i][0];
      description_next[description_next.length] = mindlet_json[p].next[i][1] ? mindlet_json[p].next[i][1] : false;
    }
  }
  // console.log(next)

  // 构建双向,以及描述 √
  var link = {};
  for (bk in back) {
    for (nx in next) {
      if (back[bk] == next[nx]) {
        link[back[bk]] = back[bk]; // link[sth]
      }
    }
  }
  // console.log(link)

  div_lookable += '<div class="mdui-row">'
  // 前向节点HTML √
  div_lookable += back_div;
  div_lookable += '<div class="mdui-invisible">0</div>'
  for (index in back) {
    if (!link[back[index]]) {
      div_lookable += hh_ + back[index] + __h;
      if (description_back[index]) {
        div_lookable += p_ + description_back[index] + _p;
      }
    }
  }
  div_lookable += _div;
  // console.log(description_back)

  // 双向节点HTML √
  div_lookable += link_div;
  for (index in link) {
    div_lookable += hh_ + link[index] + __h;
    // 前向描述
    for (var bk in back) {
      if (back[bk] == link[index]) {
        div_lookable += p_ + description_back[bk] + _p;
        break;
      }
    }
    // 后继描述
    for (var nx in next) {
      if (next[nx] == link[index]) {
        div_lookable += p_ + description_next[nx] + _p;
        break
      }
    }
  }
  div_lookable += _div + _div; // backdiv & mdui-row

  // 还有节点本身 √
  div_lookable += '<div class="mdui-row"><div id="self">' + h_ + self + _h + _div + _div; // mdui-row

  div_lookable += '<div class="mdui-row">'
  // 构建描述 √
  var descript = mindlet_json[p].description;
  // TODO \n转义为<br>
  if (descript) {
    div_lookable += '<div id="des">' + p_ + descript + _p + _div;
  }

  // 后继节点HTML √
  div_lookable += next_div;
  for (index in next) {
    if (!link[next[index]]) {
      div_lookable += hh_ + next[index] + __h;
      if (description_next[index]) {
        div_lookable += p_ + description_next[index] + _p;
      }
    }
  }
  div_lookable += _div + _div; // mdui-row
  map.innerHTML = div_lookable;

  // 用class来排版导图
  // 前向及描述 mdui-row-xs-4 双向mdui-row-xs-4 mdui-col-offset-md-6
  // 节点 mdui-row-xs-4 mdui-col-offset-md-4
  // 描述 mdui-row-xs-4 后继 mdui-row-xs-4 mdui-col-offset-md-6

  document.getElementById('back').classList.add('mdui-col-xs-4')
  document.getElementById('link').classList.add('mdui-col-xs-4', 'mdui-col-offset-xs-2')
  document.getElementById('self').classList.add('mdui-col-xs-4', 'mdui-col-offset-xs-2')
  document.getElementById('des').classList.add('mdui-col-xs-4')
  document.getElementById('next').classList.add('mdui-col-xs-4', 'mdui-col-offset-xs-2')
}