from datetime import datetime
from flask import Blueprint, request
from flask_login import login_required, current_user

from app.aws import delete_from_s3, upload_file_to_s3, allowed_file, get_unique_filename
from app.models import Image, ImageLike, User, db
from app.forms import ImageForm

image_routes = Blueprint('images', __name__)


@image_routes.route('')
def get_all_images():
    all_images = Image.query.all()
    return {image.id: image.to_dict() for image in all_images}


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
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if 'image' not in request.files:
            return {'errors': 'Please upload an image.'}, 400

        image = request.files['image']
        if not allowed_file(image.filename):
            return {'errors': 'File type is not supported. Please upload a file of one of these file types: PDF, PNG, JPG, JPEG, GIF'}

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
    else:
        return {'errors': 'missing data'}


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
        print('\n'*5, image_to_delete.to_dict(), '\n'*5)

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
    Get a post's like and comment counts
    '''
    counts = Image.query.with_entities(
        Image.likes_count, Image.comments_count).filter(Image.id == id).first()
    return {'likes': counts[0], 'comments': counts[1]}


@image_routes.route('/<int:id>/is-liked', methods=['GET'])
@login_required
def check_if_liked(id):
    '''
    Check whether a post has been liked by the current user
    '''
    user_id = current_user.get_id()
    isLiked = ImageLike.query.filter(
        ImageLike.image_id == id, ImageLike.user_id == user_id).first()

    if isLiked == None:
        return {"isLiked": False, "id": id}
    else:
        return {"isLiked": True, "id": id}


@image_routes.route('/<int:id>/like', methods=['POST'])
@login_required
def like_image(id):
    '''
    Like a post
    '''
    user_id = current_user.get_id()
    image = Image.query.get(id)
    image.likes_count += 1
    like = ImageLike(user_id=user_id,
                     image_id=id)
    db.session.add(like)
    db.session.commit()
    return like.to_dict()


@image_routes.route('/<int:id>/dislike', methods=['DELETE'])
@login_required
def dislike_image(id):
    '''
    Dislike a post
    '''
    user_id = current_user.get_id()
    image = Image.query.get(id)
    like_to_delete = ImageLike.query.filter(
        ImageLike.image_id == id, ImageLike.user_id == user_id).first()

    if image.likes_count <= 0:
        image.likes_count = 0

    if like_to_delete:
        image.likes_count -= 1

    db.session.delete(like_to_delete)
    db.session.commit()
    return like_to_delete.to_dict()


@image_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_caption(id):
    '''
    Route to edit caption for specfied image.
    '''
    update_image = Image.query.filter(id == Image.id).first()
    # Temporary solution -- * WILL COMEBACK AND REFACTOR *
    update_image.caption = request.data.decode('UTF-8')[1:-1]

    db.session.commit()

    return update_image.to_dict()


@image_routes.route('/feed')
@login_required
def get_feed():
    '''
    Gets a selection of recent images/posts from a the user's that the current user follows
    '''
    user_id = current_user.get_id()
    user = User.query.get(user_id).to_dict()
    followed = user['following']
    followed.append(user_id)
    images = Image.query.filter(Image.user_id.in_(followed)).order_by(
        Image.created_at.desc()).limit(10).all()
    image_list = [image.to_dict() for image in images]
    image_dict = {'ordered_feed': image_list}
    return image_dict
