from .db import db


class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.Text, nullable=True)
    likes_count = db.Column(db.Integer, nullable=False, default=0)
    comments_count = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    # relationships
    user = db.relationship('User', back_populates='images', uselist=False)
    image_likes = db.relationship('ImageLike', back_populates='image')
    comments = db.relationship('Comment', back_populates='image')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user': self.user.to_dict(),
            'image_url': self.image_url,
            'caption': self.caption,
            'likes_count': self.likes_count,
            'comments_count': self.comments_count,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
