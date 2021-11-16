from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    login_param = form.data['login_param']
    user = User.query.filter(
        User.email == login_param).first() or User.query.filter(User.username == login_param).first()
    # if not user:
    #     raise ValidationError('No such user exists.')
    # more secure? dont let them know whether they are guessing it correctly
    if not user or not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    login_param = StringField(
        'login_param', validators=[DataRequired()])
    password = StringField('password', validators=[
                           DataRequired(), password_matches])
