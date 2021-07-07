#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Created by PJZero on 2016/6/13

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_pagedown import PageDown
from flaskckeditor import CKEditor


basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SECRET_KEY'] = 'hard to guess string'
app.config['CSRF_ENABLED'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
pagedown = PageDown(app=app)
db = SQLAlchemy(app)

from APP import views
from APP.views import User, Post

if __name__ == "__main__":
    app.run(debug=True)
