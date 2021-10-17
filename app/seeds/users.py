from faker import Faker

from app.models import db, User

DEFAULT_AVATAR_URL = 'https://www.premiumseatsusa.com/special-events/wp-content/uploads/2019/03/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'

# Adds a demo user, you can add other users here if you want

fake = Faker()
# fake.image_url() for random image avatar_url
# fake.user_name() for random username
# fake.free_email() for random email
# use 'password' as password, else use 'aaAA11!!' as password


def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', avatar_url=DEFAULT_AVATAR_URL)
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', avatar_url=DEFAULT_AVATAR_URL)
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', avatar_url=DEFAULT_AVATAR_URL)
    for i in range(0, 10):
        new_user = User(
            username=fake.user_name(),
            email=fake.free_email(), 
            password='password',
            avatar_url=fake.image_url()
        )
        db.session.add(new_user)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
