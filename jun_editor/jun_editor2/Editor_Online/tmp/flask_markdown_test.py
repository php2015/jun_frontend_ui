#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Created by PJZero on 2016/6/15


from flaskext.markdown import Markdown
from flask import Flask, render_template

app = Flask(__name__)

markdown = Markdown(app)


@app.route('/')
def index():
    return render_template('markdown_test.html')

if __name__ == '__main__':
    app.run(debug=True)
