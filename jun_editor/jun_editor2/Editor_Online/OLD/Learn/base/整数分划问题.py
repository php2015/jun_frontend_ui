#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Created by PJZero on 2016/6/13
n = int(input("请输入n:"))
m = int(input("请输入m:"))

a = [[1 for j in range(m)] for i in range(n)]


def test(n, m):
    if n == 1 or m == 1:
        return 1
    elif n < m:
        return test(n, n)
    elif n == m:
        return test(n, n - 1) + 1
    else:
        return test(n, m - 1) + test(n - m, m)


print("划分数为:" + str(test(n, m)))
