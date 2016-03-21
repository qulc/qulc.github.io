---
layout: post
title:  "酷狗Python后台开发面试题"
date:   2016-03-18
categories: record
---

<img src="http://7u2knn.com1.z0.glb.clouddn.com/kugou-job-question.jpg"/>

## 第1页: 就是图上的基础知识选择&填空题

## 第2页: 写代码输出结果, 就是考验Python容易犯错的陷阱

*酷狗给的示例代码也太丑了点, 不贴上来了.*
*试题上不是这两份代码, 但知识点是这两个*

### 指定一个默认值给函数参数
{% highlight python %}
def foo(bar=[]):
    bar.append('baz')
    return bar

>>> foo()
['baz']
>>> foo()
['baz', 'baz']
>>> foo()
['baz', 'baz', 'baz']
{% endhighlight %}

### 错误地使用类变量
{% highlight python %}
class A(object):
    x = 1

class B(A):
    pass

class C(A):
    pass

>>> print(A.x, B.x, C.x)
1 1 1
>>> B.x = 2
>>> print(A.x, B.x, C.x)
1 2 1
>>> A.x = 2
>>> print(A.x, B.x, C.x)
3 2 3
{% endhighlight %}

## 第3页: 数据库和Linux相关的问题

* 简述数据库的连接查询
* 什么是SQL注入，如何防范
* 数据库索引的优点与不足，建立索引应该遵循哪些规则?
* 内容为Hello World的文件，在执行`echo abc >> file`之后内容为？
* 写一条crontab配置, 每周六，日重启Nginx, 并将执行结果写入`/dev/null`


## 4~5页: 算法题, 代码实现 [下面代码是我的答案]

### 找出数组中出现次数超过数组长度一半的值并打印，例如: [0, 2, 4, 5, 2, 2, 2], 2 出现的次数为4 并超过数组长度一半，则输出2
{% highlight python %}
from collections import Counter

data = [0, 2, 4, 5, 2, 2, 2]

for key, value in Counter(data).items():
    if value > (len(data) / 2):
        print(key)

Out: 2
{% endhighlight %}

### 已知字符串的字符是各不相同的，求任意拼接的所有组合。例：'ab', 则输出'aa', 'ab', 'ba', 'bb'
{% highlight python %}
# 错误答案 当时就是这么在纸上写的，没有验证过
from itertools import permutations

result = [''.join(str_tuple) for str_tuple in permutations('ab')]
print(result)

Out: ['ab', 'ba']

{% endhighlight %}

{% highlight python %}
# 之后才验证的
from itertools import product

result = [''.join(str_tuple) for str_tuple in product('ab', 'ab')]
print(result)

Out: ['aa', 'ab', 'ba', 'bb']
{% endhighlight %}

### 20个降序排列数组, 每个包含500个数字, 找出其中500个最大的数字
{% highlight python %}
# 生成20个包含500个数字倒序排列的list
data = {}

for key in range(20):
    value = list(range(500))
    value.reverse()
    data.update({key: value})

# 找出每个list中最大的数字
max_num_list = []

while len(max_num_list) <= 500:
    for key, value in data.items():
        max_num_index = value.index(max(value))
        max_num_list.append(value.pop(max_num_index))

result = max_num_list[:500]
{% endhighlight %}


## 逻辑试题 (我全选的C，题目都没仔细看过)

在网上也找到了其中一道题目,

#### 怀孕中后期，许多准妈妈都会有肌肉痉挛，小腿抽筋以及手足抽搐等缺钙的症状.但这通常不是由于孕妇的饮食中缺乏钙，而是由于胎儿骨骼形成所需要的钙完全来源于母体，使她们比其他人对钙有更多的需求。

#### 以下哪项对评价上述结论的准确度最为重要(  )

> A．对某个不缺钙的孕妇的日常饮食进行检测，确定其中钙的含量

> B．对孕妇的科学食谱进行研究，以确定有利于孕妇摄入足量钙的最佳选择

> C．对日常饮食中钙量不足的一个孕妇和另一个非孕妇进行检测，并分别确定她们是否缺钙

> D．对日常饮食中钙足量的一个孕妇和一个非孕妇进行检测，并分别确定她们是否缺钙

### 三短一长选最长，额，正确答案是D啊。。。。

就是10道这种类型的题目, 挺耗时间的, 又被催时间到了，索性全填了C

