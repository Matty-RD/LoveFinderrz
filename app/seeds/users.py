from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', full_name="Demo Dimadoom", date_of_birth=0, city='new york', state='new york')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', full_name="Marnie Piers ", date_of_birth=1, city='spikemuth', state='galar')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', full_name="bobbie hill", date_of_birth=2, city='arlen', state='texas')
    ally = User(
        username='Ally', email='ally@aa.io', password='password', full_name="Ally", date_of_birth=3, city='arizona', state='arizona')
    matty = User(
        username='Matty', email='matty@aa.io', password='password', full_name="Matty", date_of_birth=4, city='prattville', state='alabama')
    kaite = User(
        username='Katie', email='katie@aa.io', password='password', full_name="Katie", date_of_birth=5, city='atlanta', state='georgia')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(matty)
    db.session.add(ally)
    db.session.add(kaite)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
