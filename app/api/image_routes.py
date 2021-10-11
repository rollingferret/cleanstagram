from datetime import date, datetime
from flask import Blueprint, request
from flask_login import login_required

from app.aws import upload_file_to_s3, allowed_file, get_unique_filename
from app.models import Image
from app.forms import ImageForm
from app.models import db

image_routes = Blueprint('images', __name__)

@image_routes.route('')
# @login_required
def get_image():
    return "We've hit the GET route"


@image_routes.route('', methods=['POST'])
@login_required
def post_image():
    '''
    Image post route. Check the image filenames, and upload to AWS.
    If succeed, return a url to render the picture.
    '''

    print("SURE KENNETH ------>", request)
    print("THIS IS THE FORM KENNETH ------>", request.form)
    print("THESE ARE THE REQUEST FILES ------->", request.files)

    if 'image' not in request.files:
        return {'errors': 'image required'}, 400

    image = request.files['image']
    if not allowed_file(image.filename):
        return {'errors': 'file type not permitted'}

    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)

    if 'url' not in upload:
        return upload, 400

    url = upload['url']
    # testing, need to add caption from form
    new_image = Image(user_id=request.form["user_id"],
                      image_url=url,
                      caption=request.form["caption"],
                      created_at=datetime.now(),
                      updated_at=datetime.now()
                      )
    db.session.add(new_image)
    db.session.commit()
    return {'url': url}
