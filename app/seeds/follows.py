'''
seed follows with faker
'''

from faker import Faker
from random import randint

from app.models import db, User

fake = Faker()


def seed_follows():
    for i in range(0, 150):
        current_user_id = randint(1, 53)
        following_id = randint(1, 53)
        if current_user_id != following_id:
            current_user = User.query.get(current_user_id)
            following_user = User.query.get(following_id)
            current_user.following.append(following_user)
            db.session.commit()


def undo_follows():
    db.session.execute('TRUNCATE image_likes RESTART IDENTITY CASCADE')
    db.session.commit()
