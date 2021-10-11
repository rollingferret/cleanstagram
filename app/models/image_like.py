from .db import db


class ImageLike(db.Model):
    __tablename__ = 'image_likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey(
        'images.id'), nullable=False)

    # relationships
    image = db.relationship(
        'Image', back_populates='image_likes', uselist=False)
    user = db.relationship('User', back_populates='image_likes', uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'image_id': self.image_id
        }
