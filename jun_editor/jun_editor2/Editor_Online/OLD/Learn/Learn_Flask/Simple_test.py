#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Created by PJZero on 2016/6/13
from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    return "test"


if __name__ == "__main__":
    app.run(debug=True)
