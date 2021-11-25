#!/bin/sh

# 确保脚本抛出遇到的错误
set -e

# 开始提交源码

git add .
git commit -m '提交了源码'
git push origin master

#提交源码到github结束

