from datetime import date, datetime
from flask import Blueprint, request
from flask_login import login_required, current_user

from app.aws import delete_from_s3, upload_file_to_s3, allowed_file, get_unique_filename
from app.models import User, Image, db
from app.forms import ImageForm

image_routes = Blueprint('images', __name__)

@image_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_image_by_id(id):
    '''
    Image GET route by ID.
    '''
    image = Image.query.get(id)

    return image.to_dict()


@image_routes.route('', methods=['POST'])
@login_required
def post_image():
    '''
    Image post route. Check the image filenames, and upload to AWS.
    If succeed, return a url to render the picture.
    '''

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
    new_image = Image(user_id=request.form["user_id"],
                      image_url=url,
                      caption=request.form["caption"],
                      created_at=datetime.now(),
                      updated_at=datetime.now()
                      )
    db.session.add(new_image)
    db.session.commit()
    return new_image.to_dict()


@image_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_image(id):
    '''
    Image delete route.
    Work on deleting from AWS bucket and database
    '''
    image_to_delete = Image.query.filter(Image.id == id).first()

    if not image_to_delete:
        return 'Nothing to delete'
    else:

        image_url = image_to_delete.image_url
        bucket_deletion = delete_from_s3(image_url)

        if bucket_deletion['ok']:
            db.session.delete(image_to_delete)
            db.session.commit()
            return {'deleted': True}
        else:
            return bucket_deletion


@image_routes.route('/<int:id>/counts', methods=['GET'])
def get_comment_like_counts(id):
    '''
    Get a posts like and comment counts
    '''
    counts = Image.query.with_entities(Image.likes_count, Image.comments_count).filter(Image.id==id).first()
    return {'likes': counts[0], 'comments': counts[1]}

current_user.get_id()
