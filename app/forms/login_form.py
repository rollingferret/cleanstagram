from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    login_param = field.data
    user = User.query.filter(
        User.email == login_param).first() or User.query.filter(User.username == login_param)
    if not user:
        raise ValidationError('Email provided not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    login_param = form.data['login_param']
    user = User.query.filter(
        User.email == login_param).first() or User.query.filter(User.username == login_param).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    login_param = StringField(
        'login_param', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[
                           DataRequired(), password_matches])
