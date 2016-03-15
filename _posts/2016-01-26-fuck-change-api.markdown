---
layout: post
title:  "fuck 那些瞎改API的蠢货"
date:   2016-01-26
categories: record
---

<img src="http://7u2knn.com1.z0.glb.clouddn.com/json_format.png"/>

上图是改过的Json结构，下面是原先定义的结构 

{% highlight python %}
{
    "cut_order_list": [
        [
            {"sku_id": "abc123", "num": 3}
        ],
        [
            {"sku_id": "abc123", "num": 1},
            {"sku_id": "xyz123", "num": 2}
        ]
    ],
    "order_id": "DC123456"
}
{% endhighlight %}

把`cut_order_list`改成 `dict` 的发上来让我改接口, 问其原因:

### 说怕`list`在迭代中顺序变了。。。。

<img src="http://7u2knn.com1.z0.glb.clouddn.com/532EC2F3-A3BC-4F8F-87C1-0C7E0AEED6A1.jpg"/>

所以要把`list` 改成`dict`, 然后拿1, 2, 3, ... 9, 当`key`


