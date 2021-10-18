'''
File with functions to seed images
'''
from faker import Faker
from random import randint
from datetime import datetime

from app.models import db, Image
from app.seeds.image_seed import image_seed

fake = Faker()


def seed_images():
    image_list = list(image_seed)
    # around 100 images for 23 users in the seed
    for i in range(0, 30):
        new_image = Image(
            user_id=randint(1, 13),
            image_url=image_list[i],
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
