from flask_wtf import FlaskForm
from wtforms.fields import (
    TextField, StringField, FileField, SubmitField
)
from wtforms.validators import DataRequired


class ImageForm(FlaskForm):
    user_id = StringField("User Id", [DataRequired()])
    image_url = FileField("Image", [DataRequired()])
    caption = TextField("Caption")
    submit = SubmitField("Login")
