---
layout: post
title:  "css能做什么"
author: yaoz
---

# 背景
## 不平铺
```
background-repeat: no-repeat/repeat-x/repeat-y;
```
## 位置
```
background-position:水平 垂直;
```
## 背景固定
```
background-attachment:fixed;
```
# 文字
## 缩进
```
text-indent: 5em;
```
## 排列
```
text-align: right/left/center;
```
# 表格
## 边界
```
border-collapse: collapse/separate;
border: 1px solid black;
border-spacing: 20px;
```
## 布局
```
table-layout: automatic/fixed;
```
# 文本
## 格式
```
line-height: 20px;
```

# 框模型
## 内容对齐
```
justify-content: flex-start/flex-end/center/space-between/space-around

```

# **单位

巨坑的单位 | 说明
---|---
pt | 磅 (1 pt=1/72 Inch)(**IOS开发**)
pc | 12 点活字 (1 pc = 12 点)(*大约6pt，1/6寸*)
px | 像素<br/>**css中的px与设备的物理像素并非绝对的一比一关系。**
rem | html的fontsize
em | 当前的字体尺寸。
ex | 一个 ex 是一个字体的 x-height。 (x-height 通常是字体尺寸的一半。)
vh | 高度/100(px)
vw | 宽度/100(px)
vm | 高度和宽度最小的值/100(px)

> 样图单位px  
> 安卓单位dpi  
> IOS单位pt  
> 小程序单位rpx
> 
> 请用**样图**为素材做一个能适配**安卓**和**IOS**的**微信小程序**