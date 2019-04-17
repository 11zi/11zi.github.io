---
layout: post
title:  "HTML入门科普"
author: yaoz
---

# **HTML**

## 表单的输入控件

* 文本框, 用于输入文本  
`\<input type="text">`
* 口令框, 用于输入口令  
`\<input type="password">`
* 单选框, 用于选择一项  
`\<input type="radio">`
* 复选框, 用于选择多项  
`\<input type="checkbox">`
* 下拉框, 用于选择一项  
`\<select>  `
* 隐藏文本, 用户不可见，但表单提交时会把隐藏文本发送到服务器  
`\<input type="hidden">`
* 上传按钮
`\<input type="submit">`

## URL 编码

* URL 只能使用 ASCII 字符集来通过因特网进行发送。  
* 由于 URL 常常会包含 ASCII 集合之外的字符,URL 必须转换为有效的 ASCII 格式。  
* URL 编码使用 "%" 其后跟随两位的十六进制数来替换非 ASCII 字符。  
* URL 不能包含空格。URL 编码通常使用 + 来替换空格。

## XHTML

### 文档结构

* XHTML DOCTYPE 是强制性的
* \<html> 中的 XML namespace 属性是强制性的
* \<html>、\<head>、\<title> 以及 \<body> 也是强制性的

### 元素语法

* XHTML 元素必须正确嵌套
* XHTML 元素必须始终关闭
* XHTML 元素必须小写
* XHTML 文档必须有一个根元素

### 属性语法

* XHTML 属性必须使用小写
* XHTML 属性值必须用引号包围
* XHTML 属性最小化也是禁止的
