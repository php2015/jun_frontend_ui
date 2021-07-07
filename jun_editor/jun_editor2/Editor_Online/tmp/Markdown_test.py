#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Created by PJZero on 2016/6/15

# We import the markdown library
import markdown
from flask import Flask
from flask import render_template
from flask import Markup

app = Flask(__name__)


@app.route('/')
def index():
    content = """
Chapter
=======

Section
-------

* Item 1
* Item 2
"""
    content = Markup(markdown.markdown(content))
    return render_template('index.html', **locals())


app.run(debug=True)
