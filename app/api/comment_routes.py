from datetime import date, datetime
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Comment, db
from app.forms import EditCommentForm
from app.forms import NewCommentForm
# from flask_wtf.csrf import generate_csrf
# import os


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/')
def comments_route():
    '''
    Comment GET route for ALL.
    '''
    comments = Comment.query.limit(20).all()
    return{
        'comments': {comment.id: comment.to_dict() for comment in comments}
    }


@comment_routes.route('/<int:id>')
def comment_route(id):
    '''
    Comment GET route by ID.
    '''
    comments = Comment.query.filter(Comment.image_id == id).all()
    if not comments:
        return {}
    else:
        return {comment.id: comment.to_dict() for comment in comments}


@ comment_routes.route('/new', methods=['POST'])
@ login_required
def add_new_comment():
    '''
    Comment POST route.
    '''
    userId = current_user.get_id()
    form = NewCommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        comment = Comment(
            user_id = userId,
            image_id = form.data['image_id'],
            content = form.data['content'],
            created_at = datetime.now(),
            updated_at = datetime.now()
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    else:

        return form.errors


@ comment_routes.route('/edit/<int:id>', methods = ['PATCH'])
@ login_required
def edit(id):
    '''
    Comment PATCH route.
    '''
    userId=current_user.get_id()
    form=EditCommentForm()
    form["csrf_token"].data=request.cookies["csrf_token"]
    if form.validate_on_submit():
        edited_comment=Comment.query.get(id)
        if int(userId) == int(edited_comment.user_id):
            print('-'*100, userId)
            print('='*100, edited_comment.user_id)
            edited_comment.content=form.data['content']
            edited_comment.updated_at=datetime.now()
            db.session.commit()

            return edited_comment.to_dict()
        else:
            return 'You do not have access to edit this comment!'
    else:

        return form.errors


@ comment_routes.route('/delete/<int:id>', methods = ['DELETE'])
@ login_required
def delete(id):
    '''
    Comment DELETE route.
    '''
    comment_to_delete=Comment.query.filter(Comment.id == id).first()

    if not comment_to_delete:
        return 'Nothing to delete'
    else:
        db.session.delete(comment_to_delete)
        db.session.commit()
        return comment_to_delete.to_dict()
