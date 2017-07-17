---
layout: post
title:  "酷狗 Python 后台开发面试题"
date:   2016-03-18
categories: record
---

<img src="http://7u2knn.com1.z0.glb.clouddn.com/kugou-job-question.jpg"/>

## 第1页: 就是图上的基础知识选择&填空题

## 第2页: 写代码输出结果, 就是考验 Python 容易犯错的陷阱

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
2 2 2
{% endhighlight %}

## 第 3 页: 数据库和 Linux 相关的问题

* 简述数据库的连接查询
* 什么是 SQL 注入，如何防范
* 数据库索引的优点与不足，建立索引应该遵循哪些规则?
* 内容为 Hello World 的文件，在执行`echo abc >> file`之后内容为？
* 写一条 crontab 配置, 每周六，日重启 Nginx, 并将执行结果写入`/dev/null`


## 4~5 页: 算法题, 代码实现 [下面代码是我的答案]

### 找出数组中出现次数超过数组长度一半的值并打印，例如: [0, 2, 4, 5, 2, 2, 2], 2 出现的次数为 4 并超过数组长度一半，则输出 2
{% highlight python %}
from collections import Counter

data = [0, 2, 4, 5, 2, 2, 2]
max_len = len(data) / 2

for value, count in Counter(data).items():
    if count > max_len:
        print(value)

# Out:
2
{% endhighlight %}

### 已知字符串的字符是各不相同的，求任意拼接的所有组合。例：'ab', 则输出'aa', 'ab', 'ba', 'bb'
{% highlight python %}
# 错误答案 当时就是这么在纸上写的，没有验证过
from itertools import permutations

result = [''.join(str_tuple) for str_tuple in permutations('ab')]
print(result)

# Out:
['ab', 'ba']

{% endhighlight %}

{% highlight python %}
# 之后才验证的
from itertools import product

result = [''.join(str_tuple) for str_tuple in product('ab', 'ab')]
print(result)

# Out:
['aa', 'ab', 'ba', 'bb']
{% endhighlight %}

### 20 个降序排列数组, 每个包含 500 个数字, 找出其中 500 个最大的数字
{% highlight python %}
# 生成 20 个包含 500 个数字倒序排列的 list
twenty_five_hundred_numbers = [list(range(500, 0, -1))]  * 20

# 已经降序排列的结果，可以直接取前面的值
end = int(500 / 20)

result = []
for numbers in twenty_five_hundred_numbers:
    result += numbers[:end]

print(result)

# Out:
[500, 499, 498, 497, 496...]
{% endhighlight %}


## 逻辑试题 (我全选的 C，题目都没仔细看过)

在网上也找到了其中一道题目,

#### 怀孕中后期，许多准妈妈都会有肌肉痉挛，小腿抽筋以及手足抽搐等缺钙的症状.但这通常不是由于孕妇的饮食中缺乏钙，而是由于胎儿骨骼形成所需要的钙完全来源于母体，使她们比其他人对钙有更多的需求。

#### 以下哪项对评价上述结论的准确度最为重要(  )

> A．对某个不缺钙的孕妇的日常饮食进行检测，确定其中钙的含量

> B．对孕妇的科学食谱进行研究，以确定有利于孕妇摄入足量钙的最佳选择

> C．对日常饮食中钙量不足的一个孕妇和另一个非孕妇进行检测，并分别确定她们是否缺钙

> D．对日常饮食中钙足量的一个孕妇和一个非孕妇进行检测，并分别确定她们是否缺钙

### 三短一长选最长，额，正确答案是 D 啊

就是 10 道这种类型的题目, 挺耗时间的, 又被催时间到了，索性全填了 C
