'''
File with functions to seed images
'''
from faker import Faker
from random import randint
from datetime import datetime

from app.models import db, Image

fake = Faker()


def seed_images():
    # around 100 images for 23 users in the seed
    for i in range(0, 100):
        new_image = Image(
            user_id=randint(1, 23),
            image_url=fake.image_url(),
            caption=fake.sentence(nb_words=10),
            likes_count=0,
            comments_count=0,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        db.session.add(new_image)

    db.session.commit()


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE')
    db.session.commit()
