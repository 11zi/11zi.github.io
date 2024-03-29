---
layout: post
date: 2021-11-12 16:20:43
title:  "ShaderLab-基础"
author: yaoz
excerpt: 东西很杂，整理中。
tag: ShaderLab Code
---

# 数学

## 向量

a·b  
点乘/点积/内积：在另一个向量上的投影  
`a·b=|a||b|cosθ`  
a×b  
叉积/外积/叉乘：两向量的法向量，对左/右手坐标系，可用左/右手定则判断方向  
`|a×b|=|a|·|b|·sinθ`  

## 矩阵

方块矩阵：行列数相同，如果除对角元素外的元素都是0，就叫做对角矩阵  
单位矩阵：单位矩阵是对角元素全部为1的对角矩阵  
转置矩阵：略  
逆矩阵：`MM^-1=I`  
正交矩阵:`MM^T=I`，即`M^T=M^-1`  
  
一些重要性质  
  
另外，一次变换在矩阵中的计算过程：  
1.  转换为其次坐标
2.  计算顺序：缩放-旋转zxy-位移  
    `Pnew = Mtranslation * Mrotation * Mscale * Pold`

# shader基础

着色器渲染流程（参考unityshader）  
1.  模型空间->世界空间  
    归一化的设备坐标NDC,Normalized device coordinate
2.  裁剪  
    根据相机位置，旋转，fov等设置，计算出观察空间  
    通过一次齐次除法将屏幕外的顶点/面移除  
3.  屏幕映射  
    将观察空间中所有图元映射到屏幕上  
4.  三角形遍历  

---

shader的结构:  
```
Shader "名字/名字/名字"{
    Properties{}
    Tags{}
    RenderSetup{}
    SubShader{
        Pass{
            CGPROGRAM

            #pragma surface surf Lambert
            #pragma vertex vert1
            #pragma fragment frag1
            float4 vert1(){}
            float4 frag1(){}

            ENDCG
            }
    }
}
```

---

- 表面着色器
- 顶点/片元着色器
- ASE(amplify shader editor)：节点材质编辑器
- unity使用右手坐标系
- 语义(semantics)：shaderlab中定义的常量  
  例：  
    `float4 vert(float4 v:POSITION):SV_POSITION`
- 在unity中，同时使用抗锯齿与纹理渲染会导致主纹理以外的纹理垂直翻转  
  需要手动翻转
- unity常用的语义常量
  
  |语义|描述|
  |---|---| 
  |POSITION|模型空间中的顶点位置，通常是float4|
  |NORMAL|顶点法线，float3|
  |TANGENT|顶点切线，float4|
  |TEXCOORDn|顶点纹理坐标，n表示第n组纹理坐标，通常是float2或float4|
  |COLOR|顶点颜色，fixed4或float4|
  |SV_POSITION|裁剪空间中的顶点坐标，结构体中必须包含用该语义修饰的变量，等同于DirectX 9的POSITION|
  |SV_Target|输出值存储到渲染目标(render target)中，等同于DirectX 9中的COLOR|
  |_WorldSpaceCameraPos|相机在世界空间中的位置|
  |unity_CameraProjection|相机的投影矩阵|
  |unity_CameraInvProjection|相机的投影矩阵的逆矩阵|
  |unity_CameraWorldClipPlanes[6]|相机的6个裁剪平面在世界空间下的表示：左右下上近远平面|

[各种光照模型：](https://www.cnblogs.com/cxrs/category/446348.html)

1.  Lambert光照模型
2.  Phong光照模型
3.  Blinng-Phong光照模型

> **BRDF**（Bidirectional Reflectance Distribution Function，双向反射分布函数）  
>   
> **各向同性/各向异性**  
> 各向同性指物体的物理、化学等方面的性质不会因方向的不同而有所变化的特性，即某一物体在不同的方向所测得的性能数值完全相同，亦称均质性。  
> 在shader中，各向同性指随着表面法线与入射（观察）方向的变化，反射的结果不变

# Blender相关

[材质-原理化BSDF](https://docs.blender.org/manual/zh-hans/dev/render/shader_nodes/shader/principled.html)

[三维文件格式说明](https://www.bgteach.com/article/132)
