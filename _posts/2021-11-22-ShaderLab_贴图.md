---
layout: post
date: 2021-11-22 21:54:20
title:  "Shader Lab-贴图"
author: yaoz
excerpt: 整理中
tag: ShaderLab Code
---

#  将贴图引入shader  

![](https://user-images.githubusercontent.com/28333452/143772451-16052ddf-4c5d-45a6-8c65-2f64c3c35a04.jpg)
<details>
<summary>实现（代码）</summary>

```
Shader"name"{
    Properties{
        _NameName("显示在面板上的名称",2D)="white"{}
        _NameProp("泛泛无名之图",2D)="bump"{}
    }
    pass{
        sampler2D _NameName;
        sampler2D _NameProp;
        struct a2v{
            float4 name0:TEXCOORD0;
            float3 name1:TEXCOORD1;
        }
    }
}
```

</details>

# 进行简单的diffuse漫反射运算  

![](https://user-images.githubusercontent.com/28333452/143772469-b2b28a81-ef7f-419e-a28b-0b23f0b6959e.jpg)
<details>
<summary>实现（代码）</summary>

```
vertex(){
    vertex2fragment o;
    o.pos = UnityObjectToClipPos(v.vertex);
    o.worldNormal = UnityObjectToWorldNormal(v.normal);
    o.worldPos = mul(unity_ObjectToWorld, v.vertex).xyz;
    o.uv = TRANSFORM_TEX(v.texcoord,_MainTex);
}
fragment(){
    fixed3 worldNormal = normalize(f.worldNormal);
    fixed3 worldLightDir = normalize(UnityWorldSpaceLightDir(f.worldPos));
    fixed3 albedo = tex2D(_MainTex, f.uv).rgb * _Color.rgb;
    fixed3 ambient = UNITY_LIGHTMODEL_AMBIENT.xyz * albedo;
    fixed3 diffuse = _LightColor0.rgb * albedo * max(0, dot(WorldNormal, WorldLightDir));
    fixed3 viewDir = normalize(UnityWorldSpaceViewDir(f.worldPos));
    fixed3 halfDir = normalize(WorldLightDir + ViewDir);
    fixed3 specular = _LightColor0.rgb * _Specular.rgb * pow(max(0, dot(WorldNormal, halfDir)), _Gloss);
    return fixed4(ambient + diffuse + specular, 1.0);
}
```

</details>

# 更简单的diffuse  

![](https://user-images.githubusercontent.com/28333452/143772454-882bb26e-4f2a-4fdc-9223-541835ba487e.jpg)
<details>
<summary>长代码块</summary>

```
Pass
{
CGPROGRAM
#pragma vertex vert
#pragma fragment frag
// make fog work
#pragma multi_compile_fog

#include "UnityCG.cginc"

struct appdata
{
    float4 vertex : POSITION;
    float2 uv : TEXCOORD0;
    float3 normal:NORMAL;
};

struct v2f
{
    float2 uv : TEXCOORD0;
    UNITY_FOG_COORDS(1)
    float4 vertex : SV_POSITION;
    float3 normal:NORMAL;
};

sampler2D _MainTex;
float4 _MainTex_ST;
v2f vert(appdata v)
{
    v2f o;
    o.vertex = UnityObjectToClipPos(v.vertex);
    o.uv = TRANSFORM_TEX(v.uv, _MainTex);
    o.normal = v.normal;
    //UNITY_TRANSFER_FOG(o,o.vertex);
    return o;
}

fixed4 frag(v2f i) : SV_Target
{
    // sample the texture
    fixed4 col = tex2D(_MainTex, i.uv);
    // apply fog
    //UNITY_APPLY_FOG(i.fogCoord, col);

    float intensity = dot(_WorldSpaceLightPos0, i.normal);
    intensity = smoothstep(0.125, 0.5, intensity);
    intensity = clamp(intensity,0.375,1);
    col *= intensity;

    return col;
}
```

</details>

# 引入高度图/法线贴图  

**高度图&法线贴图**本质上都是描述平面的高度信息，高度图更加直观，但法线贴图的效率更高  
![法线贴图](https://bkimg.cdn.bcebos.com/pic/8718367adab44aed1ab35a3bb91c8701a08bfb74?x-bce-process=image/resize,m_lfit,h_150,limit_1/format,f_jpg)
![使用了凹凸贴图|位移置换贴图的模型](https://bkimg.cdn.bcebos.com/pic/267f9e2f07082838b59b8bd3b599a9014d08f167?x-bce-process=image/resize,m_lfit,w_250,h_250,limit_1/format,f_auto)  
![](https://user-images.githubusercontent.com/28333452/143772477-fa46e73d-d87c-4cab-8f17-85d48ea1c233.jpg)
<details>
<summary>实现（代码）</summary>

```
Properties
{
    _Color("Color", Color) = (1,1,1,1)
    _MainTex("Albedo (RGB)", 2D) = "white" {}
    _BumpMap("Normal Map", 2D) = "bump"{}
    _BumpScale("Bump Scale", Float) = 1.0
    _Specular("Specular",Color) = (1,1,1,1)
    _Gloss("Gloss",Range(37.0,256.0)) = 37.0
}
SubShader
{
    Tags { "LightMode" = "ForwardBase" }
    LOD 200
    pass {
        CGPROGRAM
        #pragma vertex vert
        #pragma fragment frag
        #include "Lighting.cginc"
        // 声明properties里对应的变量，从而和材质面板里的属性建立联系
        fixed4 _Color;
        sampler2D _MainTex;
        float4 _MainTex_ST; // 纹理名_ST  （缩放-平移）
        sampler2D _BumpMap;
        float4 _BumpMap_ST; // 纹理名_ST  （缩放-平移）
        float _BumpScale;
        fixed4 _Specular;
        float _Gloss;

        struct application2vertex
        {
            float4 vertex:POSITION;
            float3 normal:NORMAL;
            float4 tangent:TANGENT;
            float4 texcoord:TEXCOORD0;
        };

        struct vertex2fragment
        {
            float4 pos:SV_POSITION;
            float3 worldNormal:TEXCOORD0;
            float3 worldPos:TEXCOORD1;
            float4 uv:TEXCOORD2;
            float3 lightDir:TEXCOORD3;
            float3 viewDir:TEXCOORD4;
        };

        vertex2fragment vert(application2vertex v)
        {
            vertex2fragment o;
            o.pos = UnityObjectToClipPos(v.vertex);
            o.worldNormal = UnityObjectToWorldNormal(v.normal);
            o.worldPos = mul(unity_ObjectToWorld, v.vertex).xyz;
            //o.uv = v.texcoord.xy * _MainTex_ST.xy + _MainTex_ST.zw;
            // o.uv=TRANSFORM_TEX(v.texcoord,_MainTex);
            // 凹凸贴图
            o.uv.xy = v.texcoord.xy * _MainTex_ST.xy + _MainTex_ST.zw;
            o.uv.zw = v.texcoord.xy * _BumpMap_ST.xy + _BumpMap_ST.zw;
            TANGENT_SPACE_ROTATION;
            o.lightDir = mul(rotation, ObjSpaceLightDir(v.vertex)).xyz;
            o.viewDir = mul(rotation, ObjSpaceViewDir(v.vertex)).xyz;
            return o;
        }

        fixed4 frag(vertex2fragment f) :SV_Target
        {
            fixed3 worldNormal = normalize(f.worldNormal);
            fixed3 worldLightDir = normalize(UnityWorldSpaceLightDir(f.worldPos));
            // 凹凸贴图
            fixed3 tangentLightDir = normalize(f.lightDir);
            fixed3 tangentViewDir = normalize(f.viewDir);
            fixed4 packedNormal = tex2D(_BumpMap, f.uv.zw);
            fixed3 tangentNormal;
            tangentNormal.xy = (packedNormal.xy * 2 - 1) * _BumpScale;
            tangentNormal.z = sqrt(1.0 - saturate(dot(tangentNormal.xy, tangentNormal.xy)));
            // 移动到底部
            fixed3 albedo = tex2D(_MainTex, f.uv).rgb * _Color.rgb;
            fixed3 ambient = UNITY_LIGHTMODEL_AMBIENT.xyz * albedo;
            fixed3 diffuse = _LightColor0.rgb * albedo * max(0, dot(tangentNormal, tangentLightDir));
            fixed3 viewDir = normalize(UnityWorldSpaceViewDir(f.worldPos));
            fixed3 halfDir = normalize(tangentLightDir + tangentViewDir);
            fixed3 specular = _LightColor0.rgb * _Specular.rgb * pow(max(0, dot(tangentNormal, halfDir)), _Gloss);
            return fixed4(ambient + diffuse + specular, 1.0);
        }
        ENDCG
    }
}
```

</details>

# 其他

如果必须使用分支判断语句：
- 尽量使条件变量为常数
- 减少分支中的操作指令数
- 减少分支的嵌套层数