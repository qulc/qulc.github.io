---
layout: post
title:  "一维数组分组成二维数组"
date:   2016-10-28
categories: record
---


今天写代码过程中遇到这么个问题，需要将一个长 List 按指定数量分组为二维 List

{% highlight python %}
# input
>>> n = 3
>>> one_array = (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11)

# output
[(1, 2, 3), (4, 5, 6), (7, 8, 9), (10, 11)]
{% endhighlight %}


最初写的实现

{% highlight python %}
def group_array(one_array, group_num):
    group_list = []
    start, end = 0, group_num

    # 使用了 Range 的 step (步长) 来记下标, 切片
    for _ in range(start, len(one_array), group_num):
        group_list.append(one_array[start: end])

        start = end
        end += group_num

    return group_list
{% endhighlight %}

运行结果

{% highlight python %}
>>> group_long_list(one_array, n)
[[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11]]
{% endhighlight %}

结果的对的，实现应该还可以优化

{% highlight python %}
# 切片的下标值是可以根据 range 的数值计算出来的
>>> [one_array[i: i+n] for i in range(0, len(one_array), n)]

[[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11]]
{% endhighlight %}

变成了一行代码解决系列



{% highlight python %}
# 在网上看到有个相关的问题, 分成 n*n 的二维数组
>>> [one_array[n*i: n*(i+1)] for i in range(n)]
[(1, 2, 3), (4, 5, 6), (7, 8, 9)]

# 这个实现很有意思
>>> list(zip(*[iter(one_array)]*n))
[(1, 2, 3), (4, 5, 6), (7, 8, 9)]
{% endhighlight %}

