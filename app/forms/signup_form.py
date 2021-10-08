from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def check_password(form, field):
    # Checking if password is longer than or equal to 8 chars
    # Checking if password contains !@#$%^&*(),./?
    special_sym = '!@#$%^&*(),./?'
    password = field.data

    # if none of the chars in password is in special_sym
    if not any(char for char in password if char in special_sym):
        raise ValidationError(
            'Password must contain at least one of these following characters: !@#$%^&*(),./?')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[
                        DataRequired(), user_exists, Email()])
    password = StringField('password', validators=[
                           DataRequired(), check_password])
