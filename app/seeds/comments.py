'''
seed comments with faker
'''

from faker import Faker
from random import randint
from datetime import datetime

from app.models import db, Comment

fake = Faker()


def seed_comments():
    for i in range(0, 60):
        new_comment = Comment(
            user_id=randint(1, 13),
            image_id=randint(1, 30),
            content=fake.sentence(),
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(new_comment)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE')
    db.session.commit()
