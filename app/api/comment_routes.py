from datetime import date, datetime
from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Comment, db
from app.forms import EditCommentForm
from app.forms import NewCommentForm

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/')
def comments_route():
    '''
    Comment GET route for ALL.
    '''
    comments = Comment.query.all()
    return{
        'comments': {comment.id:comment.to_dict() for comment in comments}
    }

@comment_routes.route('/<int:id>')
def comment_route(id):
    '''
    Comment GET route by ID.
    '''
    comment = Comment.query.filter(Comment.id == id).first()
    if not comment:
        return 'No comment here!'
    else:
        return comment.to_dict()


@comment_routes.route('/new/<int:id>', methods=['POST'])
@login_required
def add_new_comment(id):
    '''
    Comment POST route.
    '''
    userId = current_user.get_id()
    form = NewCommentForm()
    if form.validate_on_submit():
        comment = Comment(
            user_id=userId,
            image_id=id,
            content=form.data['content'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    else:
    
        return form.errors

@comment_routes.route('/edit/<int:id>', methods=['PATCH'])
@login_required
def edit(id):
    '''
    Comment PATCH route.
    '''
    userId = current_user.get_id()
    form = EditCommentForm()
    if form.validate_on_submit():
        edited_comment = Comment.query.get(id)
        if userId == edited_comment.user_id:
            # db.session.delete(edited_comment)
            # db.session.add(comment)
            # db.session.commit()
            edited_comment.content = form.data['content']
            edited_comment.updated_at = datetime.now()
            db.session.commit()

            return edited_comment.to_dict()
        else:
            return 'You do not have access to edit this comment!'
    else:

        return form.errors

    # edited_comment = Comment.query.filter(Comment.id == id).first()
    # Comment.query.filter(Comment.id == id).update()
    # db.session.commit()


@comment_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete(id):
    '''
    Comment DELETE route.
    '''
    comment_to_delete = Comment.query.filter(Comment.id == id).first()

    if not comment_to_delete:
        return 'Nothing to delete'
    else:
        db.session.delete(comment_to_delete)
        db.session.commit()
        return {'deleted': True}

    # deleted_comment = Comment.query.filter(Comment.id == id).first()
    # Comment.query.filter(Comment.id == id).delete()
    # db.session.commit()
    # return {
    #     'deleted_comment': deleted_comment.to_dict()
    # }

