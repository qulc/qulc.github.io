---
layout: post
title:  "使用Git Hook搭建代码自动检查测试部署环境"
date:   2016-02-20
categories: record
---

我用`git hook`来限制我提交的代码需要通过单元测试和编码规范

Git Hooks 文档: https://www.git-scm.com/book/en/v2/Customizing-Git-Git-Hooks

### 在对仓库进行操作时会触发.git/hook/目录下对应的可执行文件(启用需移除.sample后缀名)

{% highlight bash %}
$ ls .git/hooks/
applypatch-msg.sample  post-update.sample     pre-commit.sample          pre-push.sample    update.sample
commit-msg.sample      pre-applypatch.sample  prepare-commit-msg.sample  pre-rebase.sample
{% endhighlight %}

这样就可以对commit 和 push 的操作进行扩展


### 我自己会在`pre-commit`添加执行单元测试和代码风格检查的指令
{% highlight bash %}
# Create Virtualenv
pyvenv venv & source venv/bin/activate
# Install Requirements
pip install -r requirements.txt
# Django Unit Test
python manage.py test
# Code Pep8 Sytle Check
pylint --load-plugins pylint_django .
{% endhighlight %}

这个脚本将在`commit`之前执行, 如果脚本是以非0的状态码退出的, 将不能完成`commit`操作

以保证提交的代码是经过单元测试并符合编码规范的, 


### `update` 是在远程仓库执行的, 可以用来做测试环境的自动部署
{% highlight bash %}
# Create Virtualenv
pyvenv venv & source venv/bin/activate
# Install Requirements
pip install -r requirements.txt
# Restart Super
python manage.py runserver
{% endhighlight %}

这里个脚本的输出内容会返回给客户端显示
