from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', full_name="Demo Dimadoom", date_of_birth='01/01/2002', city='new york', profile_pic='https://i.pinimg.com/originals/72/c3/3b/72c33b5df086100cfcd1c29aa02020b6.png')
    rick = User(
        username='Rick', email='rick@aa.io', password='password', full_name="Rick Sanchez", date_of_birth='01/01/2002', city='spikemuth', profile_pic='https://i.pinimg.com/originals/ac/51/52/ac5152b9f7f50781b2b01e35463fc4e6.jpg')
    gojo = User(
        username='Gojo', email='Gojo@aa.io', password='password', full_name="Satoru Gojo", date_of_birth='01/01/2002', city='Tokyo', profile_pic='https://www.tonica.la/__export/1620853539620/sites/debate/img/2021/05/12/5-curiosidades-que-no-sabias-de-satoru-gojo.jpg_242310155.jpg')
    kasumi = User(
        username='Kasumi', email='Kasumi@aa.io', password='password', full_name="Kasumi Miwa", date_of_birth='01/01/2002', city='Tokyo', profile_pic='https://64.media.tumblr.com/a0fe11091e581643ff169ca874326456/5c0c1dc1515e4bea-66/s1280x1920/1a10dea99c7d95e286bb11e1b1259d02a281f593.jpg')
    unity = User(
        username='Unity', email='Unity@aa.io', password='password', full_name="Unity", date_of_birth='01/01/2002', city='Everywhere', profile_pic='https://images.hobbydb.com/processed_uploads/subject_photo/subject_photo/image/37008/1518460561-29733-1441/unity-rick-and-morty-58.2_large.jpg')
    kaite = User(
        username='Yor', email='yor@aa.io', password='password', full_name="Yor Forger", date_of_birth='01/01/2002', city='Tokyo', profile_pic='https://nntheblog.b-cdn.net/wp-content/uploads/2022/05/Yor-Forger-__-SPYxFAMILY.jpg')

    db.session.add(demo)
    db.session.add(rick)
    db.session.add(gojo)
    db.session.add(unity)
    db.session.add(kasumi)
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
