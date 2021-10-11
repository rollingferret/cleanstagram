from flask_wtf import FlaskForm
from wtforms.fields import (
    TextField, StringField, SubmitField
)
from wtforms.validators import DataRequired

class ImageForm(FlaskForm):
    user_id = StringField("User Id", [DataRequired()])
    # image_url = StringField("Image Url", [DataRequired()])
    caption = TextField("Caption")
    submit = SubmitField("Login")
    