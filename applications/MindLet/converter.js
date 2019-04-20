/*
Convert text to json(MindLet).
Copyright © 2018 , 沈维杰. All rights reserved.(GPL License)
*/
'use strict';
var MindLet = {};
MindLet.textToJson = function (text) {
  /*
  返回JSON结构
    [
      [ // 第一个元素保存排序后的拓扑
        {
          "name": "name",
          "next": [
            {
              "name": "another",
              "next": []
            }
          ]
        }
      ],{ // 从第二个之后保存节点信息
        "name2": "name",
        "description": "description",
        "back": ["name"],
        "next": [
          ["name","description"],
          ["another",""]
        ]
      },{
        "name": "another",
        "description": "",
        "back": ["name"],
        "next": []
      },{ // 最后一项保存所有节点的位置
        "name":1,
        "another":2
      }
    ]
  样本文本如下
  # name2
  description
  [name]description
  [another]
  # another
  
  */

  if (text == null || text == undefined || text == '')
    return -1;
  var line_arr = text.split("\n");
  var length_of_line = line_arr.length;
  var state = -1;
  /*
    0  节点
    1+ 描述
  */
  var json = [];
  json[0] = [];
  var node = 0;
  var descript = "";

  var that = this;
  for (var i = 0; i < length_of_line; i++) { //扫描每一行
    var str = line_arr[i];
    // 节点名
    // 匹配`^#\s+.*` 以'# '开头的行,读取为节点(state 0)
    if (str.match("^#\\s+.*")) {
      state = 0;
      var temp = str.replace(/^#\s+/i, "")
      node += 1;
      // DONE 读入json
      json[node] = {}
      json[node].name = temp;
      json[node].next = [];
      continue;
    }
    // 联结名
    // 匹配`^[.*]` 然后匹配`^\s*`之后的东西 以'['开头,中间有']','[]'里读取为联结(state 1)
    if (str.match("^\\[.*\\]")) {
      state += 1;
      var connect_name = str.match("^\\[.*\\]")[0];
      connect_name = connect_name.slice(1, connect_name.length - 1);
      descript = str.replace(/^\[.*\]/, "");
      // DONE 读入json
      if (!json[node].next)
        json[node].next = [];
      json[node].next[- 1 + state] = [];
      json[node].next[- 1 + state][0] = connect_name;
      json[node].next[- 1 + state][1] = descript;
      continue;
    }
    // 整行文本
    // 都没匹配到,读取描述,并检索读取状态(节点/联结)
    if (state) { // 读取到next[]
      if (descript && str) {
        descript += "\n" + str;
      }
      json[node].next[state - 1][1] = descript;
    } else { // 读取到节点.description
      if (json[node].description) { // 描述非空
        json[node].description += "\n" + str;
      } else if(str){ // 描述为空,有字符
        json[node].description = str
      }
    }
    // 战斗结束
  }
  var length_of_json = json.length; // 记录了当前json的长度,是索引的位置,是常量
  json[length_of_json] = {};
  for (var i = 1; i < length_of_json; i++) { // 在最后一项添加索引
    json[length_of_json][json[i].name] = i;
  }
  return json
  // 完善json信息结构("back"字段)
  for (var i = 1; i < length_of_json; i++) {
    if (!json[i].next)
    var num_next = json[i].next.length - 1;
    var the_back = json[i].name; // the_next.back=the_back
    for (var j = 0; j < num_next; j++) {
      console.log(json)
      var the_next = json[i].next[j][0];
      var p1 = json[length_of_json][the_next]; // ["name2"] || [name2]
      console.log(the_back + "->" + the_next)
      console.log(p1)
      console.log(json[length_of_json])
      json[p1].back[json[p1].back.length] = the_back;
    }
  }
  // 回合结束阶段,将手牌排序并放入抽排队顶部
  var back_list = {};
  var temp_list = {};
  /*
    [ // 第一个元素保存排序后的拓扑
      {
        "name": "name",
        "next": [
          {
            "name": "another",
            "next": []
          }
        ]
      },{}
    ]
  */
  for (var i = 1; i < node; i++) {
    if (!back_list[json[i].name]) // back_list里是否已遍历过这个节点
      continue;
    /*
      从obj[1]开始,不断检索(obj[n].(obj[1].name)).back
      {obj[1].name:true}并检测是否环路,环路则跳过此项,继续检测前向节点
      最后得到JSON
    */
    // 遍历back节点[a,b,c,e,...] *递归都是可以用循环实现的!!
    for (var j = 0; j < json[i].back.length; j++) {
      var p2 = i;
      while (json[p2].back) { // 反正也只有一个根,随便找一个
        if (!temp_list[json[p2].name]) // temp_list是否已遍历(环路)
          temp_list[json[p2].name] = true;
        p2 = json[length_of_json][json[p2].back]
      } // 终于,有一个没有back的节点出现了,它的索引是p2

      continue;

      back_list[json[p2].name] = true;
      json[0].name = json[p2].name;
      // 丢进json[0]

      // temp1,json[0],json[p2].next
      var temp1 = {};
      temp1.name = json[p2].name;
      var temp2 = {}; // 将添加到temp1.next的变量
      while (json[p2].next) { // 子节点全都丢进去, 修改p2以改变递归节点
        temp2.name = json[p2].next[0];
        var temp_p2 = p2; // 临时递归到子节点
        var k = 0;
        while (json[temp_p2].next[k]) { // 递归next, 修改k循环整个next
          var temp3 = [];
          temp3[temp3.length] = {};
          temp_p2 = json[length_of_json][json[temp_p2].next.name]; // 重置成next的索引
          temp2.name[temp2.name.length] = json[k].name;
          temp2.next = [];
          back_list[json[k].name] = true;
        }
      }
    }
  } // 不用递归还强行用循环控制对有向有环图作拓扑排序的下场
  // 开发者回合,表示渲染还是另写一个文件吧
  return json;
}

var test1 = `# name2
description
[name2]description
[another]
# another`;
var test2 = `# 节点名称(名称只有一行)
第二行是节点描述
直接回车, 或者多空一行都可以

[另一个节点]联结到另一个节点的说明

# 另一个节点
同名节点只会同时存在一个,请不要写同名节点...
[节点名称]没有描述可以不写
请尽量用树形结构表示, 因为环路可能使图像变乱`
console.log(MindLet.textToJson(test2))