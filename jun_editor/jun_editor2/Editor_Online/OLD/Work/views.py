#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Created by PJZero on 2016/6/12
from . import app, LoginForm, RegisterForm, db
from flask import Flask, redirect, render_template, url_for, session, flash
from flask import render_template
from .models import User


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template("index.html")


@app.route('/login', methods=['GET', 'POST'])
def sign_in():
    login_form = LoginForm()
    # 在客户端通过验证
    if login_form.validate_on_submit():
        user = User.query.filter_by(username=login_form.username.data).first()
        if user is not None:
            session['username'] = user.username
            login_form.username.data = ""
            return redirect(url_for('homepage', name=user.username))
        else:
            flash("用户名或密码错误!")
    return render_template('SignIn.html', form=login_form, name=session.get('username'))


@app.route('/register')
def sign_up():
    register_from = RegisterForm()
    if register_from.validate_on_submit():
        session['username'] = register_from.username.data
        user = User(_username=register_from.username.data, _password=register_from.password.data,
                    _email=register_from.email.data)
        db.session.add(user)
        db.commit()
    return render_template('SignUp.html', form=register_from, name=session.get('username'))


@app.route('/user/<name>')
def homepage(name):
    pass
