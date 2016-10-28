---
layout: post
title:  "一维数组分组成二维数组, 感觉自己没学会 Python"
date:   2016-10-28
categories: record
---


今天写代码过程中遇到这么个问题，需要将一个长 List 按指定数量分组为二维 List

{% highlight python %}
# input
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

# output
[[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11]]
{% endhighlight %}


不是什么大问题，开始写

{% highlight python %}
def group_long_list(long_list, group_num):
    group_list = []
    start, end = 0, group_num

    for _ in range(start, len(long_list), group_num):
        group_list.append(long_list[start: end])

        start = end
        end += group_num

    return group_list

# output
>>> group_long_list(one_array, 3)
[[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11]]
{% endhighlight %}

想想还有没有其它更好的实现, 搜索一番得到的结果很 exciting
{% highlight python %}
# 一行代码就能做系列
>>> [array[n*i: n*(i+1)] for i in range(n+1)]
[[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11]]
{% endhighlight %}

