#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Created by PJZero on 2016/6/13

a = [[0 for i in range(5)] for j in range(5)]

for i in range(5):
    for j in range(5):
        x = i - 2
        y = j - 2

        if x == y:
            a[i][j] = 0
        elif -x < y and x < y:
            a[i][j] = 4
        elif -x > y and x < y:
            a[i][j] = 1
        elif -x > y and x > y:
            a[i][j] = 2
        elif -x < y and x > y:
            a[i][j] = 3

for i in range(5):
    for j in range(5):
        print(a[i][j], end=" ")
    print()
