---
layout: post
title:  "Python Pickle 的不安全性"
date:   2016-03-20
categories: record
---

{% highlight python %}
# pickle 可以序列化 Python 的任何数据结构. 包括 Class & Function
# `Celery` 的默认序列化机制就是 pickle
>>> import pickle
>>> 
>>> class Fuck(object):
...    foo = 'shit'
...    
...    def run(self):
...        print(self.foo)
... 
>>> 
>>> pickle.dumps(Fuck())
# b'\x80\x03c__main__\nFuck\nq\x00)\x81q\x01.'
>>>
{% endhighlight %}

`Warning: The pickle module is not secure against erroneous or maliciously constructed data. Never unpickle data received from an untrusted or unauthenticated source.`

<https://docs.python.org/3/library/pickle.html>

### 在 Python 文档上看到这么一句警告，想想这个不安全的特性应该是怎么利用的

<https://docs.python.org/3.5/library/pickle.html?highlight=__reduce__#pickling-class-instances>

### 通过文档发现 pickle 在序列化`Class`时会执行`__reduce__`函数, 且不止这一个


{% highlight python %}
>>> import pickle
>>> 
>>> class Fuck(object):
...    foo = 'shit'
...    
...    # `__reduce__`按要求时需要返回一个 tuple
...    # 返回结果第一个元素为可调用的对象，第二个元素是参数以 tuple 方式传入，
...    def __reduce__(self):
...        print('reduce runing')
...	   return (print, (self.foo,))
... 
# dumps 序列化操作时会执行`__reduce__`函数, 
>>> packed = pickle.dumps(Fuck())
reduce runing
# 在进行 loads 反序列化操作时会执行`__reduce__`返回的函数
>>> pickle.loads(packed)
shit
{% endhighlight %}


### 所以知道为什么不要用 pickle 反序列化未知来源的数据了

{% highlight python %}
import pickle
from django.http import HttpResponse

def python_app_rpc(request):
    # 内部的程序远程调用还可以考虑
    # 暴露给外部的程序也用那就是作了
    data = pickle.loads(request.body)
    # 还有一种 eval(request.body) 更作
    result = do_something(data)

    return HttpResponse(result)
{% endhighlight %}

### 下面没了
