#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Created by PJZero on 2016/6/12
from flask import Flask, redirect, render_template, url_for, session
from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap
from flask_wtf import Form
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, EqualTo, Email

app = Flask(__name__)
db = SQLAlchemy(app)
bootstrap = Bootstrap(app)
app.config['SECRET_KEY'] = 'hard to guess string'

from . import views


if __name__ == "__main__":
    app.run(debug=True)


class LoginForm(Form):
    email = StringField('email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Submit')


class RegisterForm(Form):
    username = StringField('UserName: ', validators=[DataRequired()])
    password = PasswordField('Password: ', validators=[DataRequired()])
    confirm_password = PasswordField('confirm_password', validators=[DataRequired(), EqualTo(password)])
    email = StringField('Email: ', validators=[DataRequired(), Email()])
    submit = SubmitField('Submit')
