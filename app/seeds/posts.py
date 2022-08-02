from app.models import db, Post


def seed_posts():

    post = Post(
        caption='cooked this myself', title='Proud of me', post_pic='https://i.imgur.com/v1BpKVW.jpg', userId=1)
    post2 = Post(
        caption='No pain or gains', title='Looking for a gym buddy', userId=2)
    post3 = Post(
        caption='rawrxd', title='Isnt this crazy', post_pic='https://i.imgur.com/s7gnF0I.png', userId=3)
    post4 = Post(
        caption='No Waifu, No Lifu', title='Looking for a 2D waifu', userId=4)
    post5 = Post(
        caption='@sushisimpin is my dad', title='Did you know', post_pic='https://i.imgur.com/QcsgWNC.png', userId=5)
    post6 = Post(
        caption='eat your greens!', title='Im vegan', userId=6)


    db.session.add(post)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
