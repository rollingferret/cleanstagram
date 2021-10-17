'''
seed likes with faker
'''

from faker import Faker
from random import randint

from app.models import db, ImageLike, Image

fake = Faker()


def seed_likes():
    user_likes = {}
    for i in range(0, 7000):
        user = randint(1, 53)
        image = randint(1, 250)
        if (user, image) not in user_likes:
            new_comment = ImageLike(
                user_id=user,
                image_id=image,
            )
            current_image = Image.query.get(image)
            current_image.likes_count += 1

            db.session.add(new_comment)
    db.session.commit()


def undo_likes():
    db.session.execute('TRUNCATE image_likes RESTART IDENTITY CASCADE')
    db.session.commit()
