#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Created by PJZero on 2016/6/15
from flask_wtf import Form
from wtforms import StringField, SubmitField, PasswordField, TextAreaField
from wtforms.validators import DataRequired, Email
from flaskckeditor import CKEditor


class signInForm(Form):
    email = StringField('email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Submit')


class signUpForm(Form):
    email = StringField('Email: ', validators=[DataRequired(), Email()])
    username = StringField('UserName: ', validators=[DataRequired()])
    password = PasswordField('Password: ', validators=[DataRequired()])
    submit = SubmitField('Submit')


class SearchForm(Form):
    body = StringField("Search", validators=[DataRequired()])
    submit = SubmitField('Submit')


class CKEditorForm(Form, CKEditor):
    title = StringField()
    ckdemo = TextAreaField()
    text_id = StringField()
    submit = SubmitField('submit')
