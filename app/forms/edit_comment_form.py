from flask_wtf import FlaskForm
from wtforms.fields import (
    TextField, StringField, SubmitField
)
from wtforms.validators import DataRequired


class EditCommentForm(FlaskForm):
    content = TextField("Content", [DataRequired()])
    submit = SubmitField("Edit")