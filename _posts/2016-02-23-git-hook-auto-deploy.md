---
layout: post
title:  "使用Git Hook搭建代码自动检查测试部署环境"
date:   2016-02-20
categories: record
---
{% highlight bash %}
"最近在使用SAE的Docker容器觉得git push hook的部署方式挺不错的，"
"于是开始构建自己的开发环境, 在提交的代码时运行单元测试和Pylint规范检查"
➜  bootcamp git:(master) ✗ git push origin master:1       
Counting objects: 6, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (4/4), done.
Writing objects: 100% (6/6), 482 bytes | 0 bytes/s, done.
Total 6 (delta 2), reused 0 (delta 0)
	remote: Exporting git code...
remote: Uploading...
-----> Python app detected
-----> Installing runtime (python-2.7.11)
-----> Installing dependencies with pip
	Collecting Pillow (from -r requirements.txt (line 1))
	Downloading http://pypi.douban.com/packages/source/P/Pillow/Pillow-3.1.1.tar.gz (10.1MB)
	...
-----> Preparing static assets
       Collectstatic configuration error. To debug, run:
       $ python manage.py collectstatic --noinput
-----> Discovering process types
       Procfile declares types -> web
-----> Compiled slug size is 47M
remote: Generating docker image...
remote: Pushing image registry.docker.sae.sina.com.cn/lichun:61b7d90 .............
remote: Deploy and waiting for app to be ready .......
To https://git.sinacloud.com/lichun/
   3bcde2b..61b7d90  master -> 1
{% endhighlight %}

Git Hooks 文档: <https://www.git-scm.com/book/en/v2/Customizing-Git-Git-Hooks>

### 在对仓库进行操作时会触发.git/hook/目录下对应的可执行文件(启用需移除.sample后缀名)

{% highlight bash %}
$ ls .git/hooks/
applypatch-msg.sample  post-update.sample     pre-commit.sample          pre-push.sample    update.sample
commit-msg.sample      pre-applypatch.sample  prepare-commit-msg.sample  pre-rebase.sample
{% endhighlight %}

这样就可以对commit 和 push 的操作进行扩展


### 我自己会在`pre-commit`添加执行单元测试和代码风格检查的指令
{% highlight bash %}
$ cat .git/hooks/pre-commit
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
$ cat .git/hooks/update
# Create Virtualenv
pyvenv venv & source venv/bin/activate
# Install Requirements
pip install -r requirements.txt
# Restart Super
python manage.py runserver
{% endhighlight %}

这里个脚本的输出内容会返回给客户端显示
