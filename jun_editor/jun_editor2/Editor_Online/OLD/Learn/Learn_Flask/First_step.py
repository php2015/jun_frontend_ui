from flask import Flask, render_template, session, url_for, flash, redirect, make_response
from flask_bootstrap import Bootstrap
from flask_moment import Moment
from flask_wtf import Form
from wtforms import StringField, SubmitField, PasswordField
from wtforms.validators import DataRequired
from flask_sqlalchemy import SQLAlchemy
from flask_script import Shell
import os

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
boots = Bootstrap(app)
moment = Moment(app)
app.config['SECRET_KEY'] = 'hard to guess string'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
# app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True)
    email = db.Column(db.String(120), unique=True)

    # role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))

    def __init__(self, username, email):
        self.username = username
        self.email = email

    def __repr__(self):
        return "<User %r>" % self.username


class NameForm(Form):
    name = StringField('What is your name?', validators=[DataRequired()])
    pwd = PasswordField("Password?", validators=[DataRequired()])
    submit = SubmitField('Submit')


@app.route('/', methods=['GET', 'POST'])
def index():
    form = NameForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.name.data).first()
        if user is None:
            user = User(username=form.name.data)
            db.session.add(user)
            session['known'] = False
        else:
            session['known'] = True
        session['name'] = form.name.data
        form.name.data = ""
        return redirect(url_for('index'))
    return render_template('index.html', form=form, name=session.get('name'), known=session.get('known', False))


@app.route('/user/<name>')
def user(name):
    return '<h1> Hello, %s!</h1>' % name


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500


def ex_template():
    name = "PJZero"
    return render_template('index.html', form=NameForm())


def ex_redirect():
    # 不加 http:// 则认为是相对目录
    return redirect("http://www.baidu.com")


def ex_set_cookie():
    response = make_response("hello world!")
    # cookie 的值只能是字符串
    response.set_cookie('PJZero', "90")
    return response


if __name__ == "__main__":
    app.run(debug=True)
