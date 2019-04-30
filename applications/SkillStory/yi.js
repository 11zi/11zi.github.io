/**
 * Copyright © 2019 , 沈维杰. All rights reserved.
 * 
 * 生成一个独一无二的技能.
 */

'use strict';

function generate() { // 从这里开始执行
  console.log('yes yes yes yes yes yes\n YES!') // jo太郎表示这段程序可以执行

  var skill = generate_skill()
  show_on(JSON.stringify(skill, null, 4), 'json')

  var description = generate_description(skill)
  show_on(description, 'description')
}

function generate_skill() {
  var skill_json = { // 仅供参考,具体由构造器决定
    'name': '这是技能的名字',
    'type': ['主动', '被动', '开关'],
    'cool_down': ['冷却', '充能', '不冷却'],
    'target': ['随机', '自身', '友方', '敌对', '实体'],
    'distance': '无限',  // 距离,默认无限
    'immune_level': 0, // 免疫等级,0代表无免疫
    'expend': ['null', '生命', '精力', '状态'],
    'active': {
      'active_time': 0, // 此时可被打断
      'delay_time': 0, // 此时不能被打断
      'base': { // 最基本有效的影响
        'hurt': 0, // 伤害-生命
        'heal': 0, // 治疗-生命
        'flow': 0, // 流失-精力
        'fill': 0, // 充盈-精力
        'mortal': 0 // 消亡-灵魂
      },
      'transform': { // 对目标的影响
        'type': ['movement', 'force', 'blink'],
        'direction': ['null', '目标', 'f', 'b'],
        'magnitude': 0 // 速度/力度/长度
      },
      'state': {
        'mode': ['加深', '替换', '叠加'],
        'id': 0,
        'influence': {
          'base': { // 最基本有效的影响
            'hurt': 0, // 伤害-生命
            'heal': 0, // 治疗-生命
            'flow': 0, // 流失-精力
            'fill': 0, // 充盈-精力
            'mortal': 0, // 消亡-灵魂
            'time_speed': 1,
            'move_speed': 1,
          },
          'mode': ['持续', '周期触发'],
          'time': 4,
          'cyclical_time': 1
        }
      },
      'summon': { // 生成-制作-召唤
        'unit': {
          'type': ['物品', '交互单位', '行动单位'],
          'ability': {
            /**
             * new game_unit(translate_list)
             */
          }
        }
      }
    },
    'after_time': 0 // 此时无法进行复杂动作,比如不能释放其他技能或攻击,但可以移动/使用水魔法
  } // JSON over

  // 随机定制技能
  skill_json.type = random_select(skill_json.type)
  skill_json.cool_down = random_select(skill_json.cool_down)
  if (skill_json.cool_down != '不冷却')
    skill_json.time = parseInt(Math.random() * 30)
  if (skill_json.cool_down == '充能')
    skill_json.charge = parseInt(Math.random() * 3 + 1)
  skill_json.target = random_select(skill_json.target)
  skill_json.distance = (Math.random() > 0.9) ? '无限范围' : random_select(['近距离', '中距离', '远距离'])
  skill_json.immune_level = (Math.random() < 0.5) ? 0 : 1
  skill_json.expend = random_select(skill_json.expend)
  if (skill_json.expend!='null') {
    if (skill_json.expend != '状态')
      skill_json.expend_amount = random_select([parseInt(Math.random() * Math.random() * 60 + 1) + '%', '少量', '大量'])
    else {
      skill_json.expend_amount = '辅助施法'
    }
  }
  // active!
  skill_json.active.active_time = parseInt(Math.random() * 15) / 10
  skill_json.active.delay_time = parseInt(Math.random() * 5) / 10 + skill_json.active.active_time
  skill_json.after_time = parseInt(Math.random() * 15) / 10

  // 基础!动作!状态!召唤!
  var base_generate = function () {
    var count = 0
    var base = {
      'hurt': 0,
      'heal': 0,
      'flow': 0,
      'fill': 0,
      'mortal': 0
    }
    if (Math.random() > 0.2)
      if (Math.random() > 0.2) {
        base.hurt = (Math.random() > 0.6) ? parseInt(Math.random() * 12) + '%' : random_select(['少量', '中等', '巨额'])
      } else {
        base.heal = (Math.random() > 0.6) ? parseInt(Math.random() * 10) + '%' : random_select(['少量', '中等', '巨额'])
      } else
      count++
    if (Math.random() > 0.65)
      if (Math.random() > 0.65) {
        base.flow = (Math.random() > 0.6) ? parseInt(Math.random() * 12) + '%' : random_select(['少量', '中等', '巨额'])
      } else {
        base.fill = (Math.random() > 0.6) ? parseInt(Math.random() * 10) + '%' : random_select(['少量', '中等', '巨额'])

      } else
      count++
    if (Math.random() > 0.9)
      base.mortal = (Math.random() > 0.6) ? parseInt(Math.random() * 8) + '%' : '少量'
    else
      count++
    if (count == 3)
      base.mortal = parseInt(Math.random() * 10) + '%+少量'
    return base
  }
  var transform_generate = function () {
    var transform = {
      'type': ['movement', 'force', 'blink'],
      'direction': ['null', 'XX目标', '前方', '后方'],
      'magnitude': 0
    }
    transform.type = random_select(transform.type)
    transform.direction = random_select(transform.direction)
    transform.magnitude = random_select(['小', '中', '大'])
  }
  var state_generate = function () {
    var state = {
      'mode': ['加深', '附加', '叠加'],
      'id': 0,
      'influence': {
        'base': { // 最基本有效的影响
          'hurt': 0, // 伤害-生命
          'heal': 0, // 治疗-生命
          'flow': 0, // 流失-精力
          'fill': 0, // 充盈-精力
          'mortal': 0, // 消亡-灵魂
          'time_speed': 1,
          'move_speed': 1,
        },
        'mode': ['持续', '周期触发'],
        'time': 4,
        'cyclical_time': 1
      }
    }
    state.mode = random_select(state.mode)
    state.influence.mode = random_select(state.influence.mode)
    state.influence.time = parseInt(Math.random() * 80) / 10
    var trigger_count = state.influence.time / parseInt(Math.random * state.influence.time)
    state.influence.cyclical_time = (state.influence.time / (trigger_count + 2) > 2) ? (parseInt(state.influence.time / (trigger_count + 2)) * 10) : 2
    // state.influence.base{}
    var count = 0
    if (Math.random() > 0.2)
      if (Math.random() > 0.2) {
        state.influence.base.hurt = (Math.random() > 0.6) ? parseInt(Math.random() * 12) + '%' : random_select(['少量', '中等', '巨额'])
      } else {
        state.influence.base.heal = (Math.random() > 0.6) ? parseInt(Math.random() * 10) + '%' : random_select(['少量', '中等', '巨额'])
      } else
      count++
    if (Math.random() > 0.65)
      if (Math.random() > 0.65) {
        state.influence.base.flow = (Math.random() > 0.6) ? parseInt(Math.random() * 12) + '%' : random_select(['少量', '中等', '巨额'])
      } else {
        state.influence.base.fill = (Math.random() > 0.6) ? parseInt(Math.random() * 10) + '%' : random_select(['少量', '中等', '巨额'])

      } else
      count++
    if (Math.random() > 0.9)
      state.influence.base.mortal = (Math.random() > 0.6) ? parseInt(Math.random() * 8) + '%' : '少量'
    else
      count++
    if (count == 0) {
      if (Math.random() > 0.7)
        state.influence.base.time_speed = Math.random() * Math.random() * Math.random() * 0.5 * ((Math.random() > 0.4) ? 1 : -1) * 300
      else
        state.influence.base.move_speed = Math.random() * Math.random() * 0.6 * ((Math.random() > 0.4) ? 1 : -1) * 400
    }
    if (Math.random() > count * 0.3)
      state.influence.base.move_speed = Math.random() * Math.random() * 0.6 * ((Math.random() > 0.4) ? 1 : -1) * 400

    return state
  }
  var summon_generate = function () {
    var summon = { // 生成-制作-召唤
      'type': ['物品', '交互单位', '行动单位'],
      'ability': {
        'id': 'unit:',
        'movement': ['null', 'speed', 'blink'],
        'atk': ['null', 'number', 'once'],
        'base': {
          'life': 1,
          'energy': 0,
          'mortal': 0
        }
      }
    }
    summon.type = random_select(summon.type)
    summon.ability.id += summon.type + toString(parseInt(Math.random() * 1000))
    summon.ability.movement = random_select(summon.ability.movement)
    if (summon.ability.movement != null)
      summon.ability[summon.ability.movement] = random_select(['高', '低'])
    summon.ability.atk = random_select(summon.ability.atk)
    if (summon.ability.atk == 'number') {
      summon.ability.atk = '继承' + parseInt(Math.random() * 80 + 20) + '%'
      summon.ability.base.life = '继承' + parseInt(Math.random() * 80 + 20) + '%'
      summon.ability.base.energy = '继承' + parseInt(Math.random() * 80 + 20) + '%'
      summon.ability.base.mortal = 1
    } else if (summon.ability.atk == 'once') {
      summon.ability.atk = '继承' + parseInt(Math.random() * Math.random() * 200 + 50) + '%'
    }
    return summon
  }
  // 四大函数定义完毕
  // 以下是合理分配这些技能用到的
  var weight_factor = {
    'base': 0.1,
    'transform': 0.2,
    'state': 0.25,
    'summon': 0.45
  }
  // 以下代码不不分先后
  // 初始化,要么生成要么怒
  if (!(have == 'base') || (haven_t == 'base')) {
    if (Math.random() > 0.2)
      skill_json.active.base = base_generate()
    else
      skill_json.active.base = null
  }
  if (!(have == 'transform') || (haven_t == 'transform')) {
    if (Math.random() > 0.4)
      skill_json.active.transform = transform_generate()
    else
      skill_json.active.transform = null
  }
  if (!(have == 'state') || (haven_t == 'state')) {
    if (Math.random() > 0.6)
      skill_json.active.state = state_generate()
    else
      skill_json.active.state = null
  }
  if (!(have == 'summon') || (haven_t == 'summon')) {
    if (Math.random() > 0.8)
      skill_json.active.summon = summon_generate()
    else
      skill_json.active.summon = null
  }
  return skill_json
  // 总有一项能力必须是空的,随机选择一个变成怒
  // 去掉一个最低分
  var haven_t = ''
  for (var i = Math.random(); ;) {
    if (i < 0.1) {
      skill_json.active.base = null
      haven_t = 'base'
      break
    }
    if (i < 0.3) {
      skill_json.active.transform = null
      haven_t = 'transform'
      break
    }
    if (i < 0.55) {
      skill_json.active.state = null
      haven_t = 'state'
      break
    }
    skill_json.active.summon = null
    haven_t = 'summon'
    break
  }

  var weight_value = 0
  for (var v in weight_factor) {
    if (skill_json.active[haven_t] == null) {
      weight_value = weight_factor[v]
      break
    }
  }
  // 总有一项能力必须拥有,在其余三项中选择一项生成
  // 加上一个最高分
  var have = ''
  for (var i = Math.random() * (1 - weight_value); ;) {
    if ((weight_factor['base'] != weight_value) & (i < weight_factor['base'])) {
      // system call generate skill active base
      skill_json.active.base = base_generate()
      have = 'base'
      break
    } if ((weight_factor['transform'] != weight_value) & (i < weight_factor['transform'])) {
      // system call generate skill active transform
      skill_json.active.transform = transform_generate()
      have = 'transform'
      break
    } if ((weight_factor['state'] != weight_value) & (i < weight_factor['state'])) {
      // system call generate skill active state
      skill_json.active.state = state_generate()
      have = 'state'
      break
    }
    if ((weight_factor['summon'] != weight_value) & (i < weight_factor['summon'])) {
      // system call generate skill active summon
      skill_json.active.summon = summon_generate()
      have = 'summon'
    }
    break
  }

  return skill_json
}

function generate_description(skill_json) {
  var description = '技能名称: ' + skill_json.name + '\n施放类型: ' + skill_json.type + '\t目标: ' + skill_json.target + '\n'
  description += '是否免疫: '
  description += (skill_json.immune_level == 0) ? '否\n' : '是\n'
  if (skill_json.cool_down == '冷却')
    description += '冷却时间: ' + skill_json.time + 's\t'
  if (skill_json.cool_down == '充能') {
    description += '充能速度: ' + skill_json.time
    description += '秒(' + skill_json.charge + ')\t'
  }
  if (skill_json.cool_down == '不冷却')
    description += '无冷却\t'
  if (skill_json.expend == 'null') {
    description += '无消耗\n'
  } else if (skill_json.expend == '状态') {
    description += '需要' + skill_json.expend_amount + '\n'
  } else {
    description += '消耗: ' + skill_json.expend_amount + skill_json.expend + '\n'
  }

  description += skill_json.distance + '\n--------------------------------\n'

  description += '你经过' + skill_json.active.active_time + '秒的准备,'
  if (skill_json.active.base != null) {
    if (skill_json.target != null) {
      description += (skill_json.type != '主动') ? ('持续对' + skill_json.distance == '无限范围' ? ('所有') : (skill_json.distance + '范围内')) : ('对')
      description += skill_json.target + '造成'
      description += (skill_json.active.base.hurt == 0) ? ('') : (skill_json.active.base.hurt + '伤害,')
      description += (skill_json.active.base.heal == 0) ? ('') : (skill_json.active.base.heal + '治疗,')
      description += (skill_json.active.base.flow == 0) ? ('') : (skill_json.active.base.flow + '损耗,')
      description += (skill_json.active.base.fill == 0) ? ('') : (skill_json.active.base.fill + '充盈,')
      description += (skill_json.active.base.mortal == 0) ? ('') : (skill_json.active.base.mortal + '本体伤害,')
    }
  }
  description = description.slice(0, description.length - 1) // 去掉','
  description += '\n--------------------------------\n'
  if (skill_json.active.transform != null) {
    if (skill_json.active.transform.type == 'movement') {
      description += '使' + skill_json.target + '朝' + (skill_json.active.transform.direction == 'null') ? '随机方向' : (skill_json.active.transform.direction) + '移动' + skill_json.active.transform.magnitude + '距离'
    }
    if (skill_json.active.transform.type == 'force') {
      description += '使' + skill_json.target + '受到来自' + (skill_json.active.transform.direction == 'null') ? '随机方向' : (skill_json.active.transform.direction) + '的' + (skill_json.active.transform.magnitude) ? ('中等') : ('较' + skill_json.active.transform.magnitude) + '推力'
    }
    if (skill_json.active.transform.type == 'blink') {
      description += '使' + skill_json.target + '向' + (skill_json.active.transform.direction == 'null') ? '随机方向' : (skill_json.active.transform.direction) + '闪现' + skill_json.active.transform.magnitude + '段距离'

    }
  }
  description += '\n'
  if (skill_json.active.state != null) {
    description += '对' + skill_json.target + skill_json.active.state.mode + skill_json.active.state.influence.time + '秒状态,'
    if (skill_json.active.state.mode == '周期触发') {
      description += '期间每' + skill_json.active.state.cyclical_time + '秒受到'
      description += (skill_json.active.state.influence.base.hurt == 0) ? ('') : (skill_json.active.state.influence.base.hurt + '伤害,')
      description += (skill_json.active.state.influence.base.heal == 0) ? ('') : (skill_json.active.state.influence.base.heal + '治疗,')
      description += (skill_json.active.state.influence.base.flow == 0) ? ('') : (skill_json.active.state.influence.base.flow + '损耗,')
      description += (skill_json.active.state.influence.base.fill == 0) ? ('') : (skill_json.active.state.influence.base.fill + '充盈,')
      description += (skill_json.active.state.influence.base.mortal == 0) ? ('') : (skill_json.active.state.influence.base.mortal + '本体伤害,')
      description = description.slice(0, description.length - 1)
      description += '\n'
    } else {
      description += '结束后受到'
      description += (skill_json.active.state.influence.base.hurt == 0) ? ('') : (skill_json.active.state.influence.base.hurt + '伤害,')
      description += (skill_json.active.state.influence.base.heal == 0) ? ('') : (skill_json.active.state.influence.base.heal + '治疗,')
      description += (skill_json.active.state.influence.base.flow == 0) ? ('') : (skill_json.active.state.influence.base.flow + '损耗,')
      description += (skill_json.active.state.influence.base.fill == 0) ? ('') : (skill_json.active.state.influence.base.fill + '充盈,')
      description += (skill_json.active.state.influence.base.mortal == 0) ? ('') : (skill_json.active.state.influence.base.mortal + '本体伤害,')
      description = description.slice(0, description.length - 1)
      description += '\n'

    }
    if (skill_json.active.state.influence.base.time_speed != 1) {
      if (skill_json.active.state.influence.base.time_speed > 0)
        description += '时间流速提升' + parseInt(skill_json.active.state.influence.base.time_speed) + '%'
      else
        description += '时间流速减缓' + parseInt(skill_json.active.state.influence.base.time_speed) + '%'
    }
    if (skill_json.active.state.influence.base.move_speed != 1) {
      if (skill_json.active.state.influence.base.move_speed > 0)
        description += '移动速度提升' + parseInt(skill_json.active.state.influence.base.move_speed) + '%'
      else
        description += '移动速度减缓' + parseInt(skill_json.active.state.influence.base.move_speed) + '%'
    }
  }
  description += '\n--------------------------------\n'
  if (skill_json.active.summon != null) {
    description += '召唤一个很麻烦的' + skill_json.active.summon.type + '\n'
    description += '\n该' + skill_json.active.summon.type + (skill_json.active.summon.ability.movement) ? ('能' + (skill_json.active.summon.ability.movement == 'speed') ? (skill_json.active.summon.ability[skill_json.active.summon.ability] == '低' ? '以缓慢速度移动' : '快速移动') : (skill_json.active.summon.ability[skill_json.active.summon.ability] == '低' ? '近距离闪现' : '远距离传送')) : ('无法移动')

    description += '\n生命' + skill_json.active.summon.ability.base.life
    description += '\n精力' + skill_json.active.summon.ability.base.energy
    description += '\n本体' + skill_json.active.summon.ability.base.mortal
    if (skill_json.active.summon.ability.atk != null) {
      if (skill_json.active.summon.type != '行动单位')
        description += '\n' + skill_json.active.summon.ability.atk + '攻击力\n'
      else
        description += '无法攻击\n'
    } else {
      description += '无法攻击\n'
    }
    // description += '\n该程序都懒得解释,自行领悟'
  }
  description += '--------------------------------\n'
  return description
}

function random_select(random_arr) {
  /**
   * * random_arr
   *   传入一个数组
   * * return
   *   随机返回数组中的一个元素
   */
  var back = parseInt(random_arr.length * Math.random())
  return random_arr[back]
}

function show_on(element, element_id) {
  /**
   * * element
   *   需要显示的元素,字符串
   * * element_id
   *   显示元素的标签id
   */

  (document.getElementById(element_id)).innerHTML = element
}