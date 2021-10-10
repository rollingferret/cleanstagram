from .db import db


class Following(db.Model):
    __tablename__ = 'following'

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    following_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    # relationships
    following = db.relationship(
        'User', back_populates='following', uselist=False)
    follower = db.relationship(
        'User', back_populates='followers', uselist=False)
