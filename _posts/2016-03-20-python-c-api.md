---
layout: post
title:  "Python/C API 的简单使用"
date:   2016-03-20
categories: record
---

<img src="http://7u2knn.com1.z0.glb.clouddn.com/xcode-py-c-api.jpg"/>

示例环境: `macOS, Clang, Python3.5`

## 1. 使用C调用Python

编写一个 Python 方法代码
{% highlight python %}
# great_module.py
def great_function(a):
    return a + 1
{% endhighlight %}

用 C 来调用 Python 的完整的代码如下：
{% highlight c %}
// main.c
#include "Python.h"

long great_function_from_python(long a) {
    
    PyObject *pModule,*pFunc, *pArgs, *pValue;
    
    // 引入上面编写的 py 文件的 moudule 名
    pModule = PyImport_ImportModule("great_module");

    /* PyObject_GetAttrString 对应中的 Python 代码 module.method
       可以用来获取模块下的值，这里是获取了一个 function 对象 */
    pFunc = PyObject_GetAttrString(pModule, "great_function"); 
    
    /* Python 中的函数参数都是通过 *argv & **kw 传入的
       在这里创建一个 tuple 对象，把要传入的参数放入 */
    pArgs = PyTuple_New(1);
    PyTuple_SetItem(pArgs, 0, PyLong_FromLong(a));
      
    // 调用函数，
    pValue = PyObject_Call(pFunc, pArgs, NULL);

    // 把返回结果转成 C 对应的数据类型
    long res = PyLong_AsLong(pValue);

    return res;
}

int main(int argc, char *argv[]) {
    // 初始化对应着 Py_Finalize 结束
    Py_Initialize();
    printf("Out: %ld\n", great_function_from_python(2));

    Py_Finalize();
    return 0;
}

/* 上面的代码都根据 Python3 来编写的,
   如果需要兼容 Python2 需要修改部分代码，
   例如 PyLong_FromLong, 在Python2中对应的是 PyInt_FromLong */
{% endhighlight %}


## 编译运行
{% highlight bash %}
$ ls -al
   main.c	great_module.py
# 这里在 linux 中用 gcc 编译也没有问题, 需要指定头文件和 lib 路径
$ clang main.c \
  -I /usr/local/include/python3.5\
  -L /usr/local/lib/python3.5\
  -l python3.5 -o c_call_py_func
# 需要设置环境变量，因为此时的 sys.path 内不包含当前路径，所以会造成引入 module 失败的
$ export PYTHONPATH=.:$PYTHONPATH
$ ./c_call_py_func
Out: 3
{% endhighlight %}


## 从上述代码可以窥见 Python 内部运行的方式：
* Python 的所有元素，`module、function、tuple、string` 等等，实际上都是 `PyObject`。
* Python 的类型与 C 语言类型可以相互转换。`PyXXX_AsYYY；PyXXX_FromYYY`。
* Python 类型的变量可以使用 `PyXXX_New` 创建, 若 a 是 `Tuple，a[i] = b` 对应 `PyTuple_SetItem(a,i,b)`。
* Python 不仅语言很优雅，Python 的库函数 API 也非常优雅。
