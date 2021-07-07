#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Created by PJZero on 2016/6/13
from APP import app, db
from flask import render_template, session, redirect, url_for, request, g, flash, make_response, send_file, \
    send_from_directory
from APP.Models import User, Post
from .forms import *
import os
import chardet
import sys


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/homepage', methods=['GET', 'POST'])
def home_page():
    if not logined(session):
        session.clear()
        return redirect(url_for('index'))
    form = SearchForm(request.form)
    email = session['email']
    posts = Post.query.order_by(Post.timestamp.desc()).filter_by(author=email)
    if form.validate_on_submit():
        res = list()
        for post in posts:
            assert isinstance(post, Post)
            if form.body.data in post.title:
                res.append(post)
        return render_template('Homepage.html', form=form, posts=res)
    return render_template('Homepage.html', form=SearchForm(), posts=posts)


@app.route('/sign_in', methods=['GET', 'POST'])
def sign_in():
    if request.method == 'POST':
        form = signInForm(request.form)
        if form.validate_on_submit():
            email = form.email.data
            user = User.query.filter_by(email=email).first()
            if user is not None:
                if not user.verify_password(form.password.data):
                    form.password.errors.append('password error!')
                    return render_template('SignIn.html', form=form)

                session.clear()
                session['name'] = user.username
                session['email'] = user.email
                form.email.data = ""
                form.password.data = ""
                return redirect(url_for('home_page', name=user.username))
            else:
                form.email.errors.append("User not exist!")
                return render_template('SignIn.html', form=form)
        else:
            return render_template('SignIn.html', form=form)
    return render_template('SignIn.html', form=signInForm())


@app.route('/sign_up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        form = signUpForm(request.form)
        if form.validate_on_submit():

            user_exist = User.query.filter_by(username=form.username.data).first()
            email_exist = User.query.filter_by(email=form.email.data).first()

            if user_exist is not None:
                form.username.errors.append('Username already taken')
            if email_exist is not None:
                form.email.errors.append('Email already taken')
            if email_exist is not None or user_exist is not None:

                return render_template('SignUp.html', form=form)
            else:
                user = User(_username=form.username.data, _email=form.email.data, _password=form.password.data)
                session['username'] = user.username
                db.session.add(user)
                db.session.commit()

                return redirect(url_for('sign_in'))
        else:
            return render_template('SignUp.html', form=form)

    return render_template('SignUp.html', form=signUpForm())


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))


@app.route('/editor', methods=['GET', 'POST'])
def editor():
    if not logined(session):
        session.clear()
        return redirect(url_for('index'))

    form = CKEditorForm(request.form)
    author = session['email']

    if form.validate_on_submit():
        it = request.args.get('id')
        post = Post.query.filter_by(id=it).first()
        if post is not None:
            post.body = form.ckdemo.data
            post.title = form.title.data
            db.session.add(post)
            db.session.commit()
        else:
            post = Post(title=form.title.data, body=form.ckdemo.data, author=author)
            db.session.add(post)
            db.session.commit()
        return redirect(url_for('home_page'))
    return render_template('editor.html', form=form)


file_dir = os.path.join(os.getcwd(), 'tmp')


@app.route('/upload_file', methods=['GET', 'POST'])
def upload_file():
    if not logined(session):
        session.clear()
        return redirect(url_for('index'))

    author = session['email']

    if request.method == 'POST':
        file = request.files['file']
        post = Post(title=file.filename, body=file.read().decode('utf-8', 'ignore'), author=author)
        db.session.add(post)
        db.session.commit()

        return redirect(url_for('view', it=post.id))
    else:
        return render_template('upload_file.html')


@app.errorhandler(404)
def error_404(e):
    return render_template('404Error.html')


@app.errorhandler(500)
def error_500(e):
    return render_template('500Error.html')


@app.errorhandler(410)
def error_410(e):
    return render_template('410Error.html')


@app.errorhandler(403)
def error_403(e):
    return render_template('403Error.html')


@app.route('/download_file/<it>', methods=['GET', 'POST'])
def download_file(it):
    if not logined(session):
        session.clear()
        return redirect(url_for('index'))

    post = Post.query.filter_by(id=it).first()
    filename = "%s.txt" % post.title
    project_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'tmp')
    f_path = os.path.join(project_dir, filename)

    if not os.path.exists(f_path):
        open(f_path, 'w').close()

    with open(f_path, 'w', encoding='utf-8') as f:
        f.write(post.body)

    return send_from_directory('tmp', filename, as_attachment=True)


@app.route('/view/<it>')
def view(it):
    if not logined(session):
        session.clear()
        return redirect(url_for('index'))
    post = Post.query.filter_by(id=it).first()
    form = CKEditorForm()
    form.title.data = post.title
    form.ckdemo.data = post.body
    form.text_id.data = post.get_id()
    return render_template('editor.html', form=form, post=post)


@app.route('/delete_post/<it>', methods=['GET', 'POST'])
def delete_post(it):
    if not logined(session):
        session.clear()
        return redirect(url_for('index'))

    try:
        post = Post.query.filter_by(id=it).first()
        if post:
            db.session.delete(post)
            db.session.commit()
    except Exception as e:
        flash("Delete Failed!")
    finally:
        return redirect(url_for('home_page'))


@app.route('/about')
def about():
    if not logined(session):
        session.clear()
        return render_template('about.html', isin=False)
    return render_template('about.html', isin=True)


@app.route('/test')
def test():
    g.user = User('pj', 'password', 'email')
    return g.user.email


def logined(sess):
    if 'name' in sess and 'email' in sess:
        author = sess['name']
        email = sess['email']
        if author is None or email is None:
            return False
        else:
            return True
    else:
        return False


def get_file_encode(file_path):
    return chardet.detect(open(file_path).read())['encoding']
