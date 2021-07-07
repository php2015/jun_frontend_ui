#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Created by PJZero on 2016/6/13

m = 100

n = 100

a = [0 for i in range(100)]

p = 1
add = 0

a[1] = 1
for i in range(2, n+1):
    for j in range(1, p+1):
        a[j] = a[j] * i + add
        add = a[j] / 10
        a[j] %= 10
    while add > 0:
        a[j] = add % 10
        add