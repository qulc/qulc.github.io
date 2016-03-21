---
layout: post
title:  "Python/C API 的简单使用"
date:   2016-03-20
categories: record
---

<img src="http://7u2knn.com1.z0.glb.clouddn.com/xcode-py-c-api.jpg"/>

示例环境: `Mac OS X, Clang, Python3.5`

## 1. 使用C调用Python

编写一个Python方法代码
{% highlight python %}
# great_module.py
def great_function(a):
    return a + 1
{% endhighlight %}

用C来调用Python的完整的代码如下：
{% highlight c %}
// main.c
#include "Python.h"

long great_function_from_python(long a) {
    
    PyObject *pModule,*pFunc, *pArgs, *pValue;
    
    // 引入上面编写的py文件的moudule名
    pModule = PyImport_ImportModule("great_module");

    /* PyObject_GetAttrString对应中的Python代码 module.method
       可以用来获取模块下的值，这里是获取了一个function对象 */
    pFunc = PyObject_GetAttrString(pModule, "great_function"); 
    
    /* python 中的函数参数都是通过*argv & **kw传入的
       在这里创建一个tuple对象，把要传入的参数放入 */
    pArgs = PyTuple_New(1);
    PyTuple_SetItem(pArgs, 0, PyLong_FromLong(a));
      
    // 调用函数，
    pValue = PyObject_Call(pFunc, pArgs, NULL);

    // 把返回结果转成C对应的数据类型
    long res = PyLong_AsLong(pValue);

    return res;
}

int main(int argc, char *argv[]) {
    // 初始化对应着Py_Finalize结束
    Py_Initialize();
    printf("Out: %ld\n", great_function_from_python(2));

    Py_Finalize();
    return 0;
}

/* 上面的代码都根据Python3来编写的, 
   如果需要兼容Python2需要修改部分代码，
   例如PyLong_FromLong, 在Python2中对应的是PyInt_FromLong */
{% endhighlight %}


## 编译运行
{% highlight bash %}
$ ls -al
   main.c	great_module.py
# 这里在linux中用gcc 编译也没有问题, 需要指定头文件和lib路径
$ clang main.c \
  -I /usr/local/include/python3.5\
  -L /usr/local/lib/python3.5\
  -l python3.5 -o c_call_py_func
# 需要设置环境变量，因为此时的sys.path 内不包含当前路径，所以会造成引入module失败的
$ export PYTHONPATH=.:$PYTHONPATH
$ ./c_call_py_func
Out: 3
{% endhighlight %}


## 从上述代码可以窥见Python内部运行的方式：
* Python的所有元素，`module、function、tuple、string`等等，实际上都是`PyObject`。
* Python的类型与C语言类型可以相互转换。`PyXXX_AsYYY；PyXXX_FromYYY`。
* Python类型的变量可以使用`PyXXX_New`创建, 若a是`Tuple，a[i] = b` 对应 `PyTuple_SetItem(a,i,b)`。
* Python不仅语言很优雅，Python的库函数API也非常优雅。

