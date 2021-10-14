from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey(
        'images.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    # relationships
    image = db.relationship(
        'Image', back_populates='comments', uselist=False)
    user = db.relationship('User', back_populates='comments', uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user': self.user.to_dict(),
            'image_id': self.image_id,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
