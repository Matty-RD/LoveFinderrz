from app.models import db, Post


def seed_posts():

    post = Post(
        caption='cooked this myself, :(', title='I miss my family', post_pic='https://c.tenor.com/Q1w6-K_MZyUAAAAC/sad-hungry.gif', userId=1)
    post2 = Post(
        caption='No pain or gains', title='Looking for a gym buddy', post_pic='https://images7.alphacoders.com/655/655653.jpg', userId=2)
    post3 = Post(
        caption='so flashy!', title='Isnt this crazy', post_pic='https://64.media.tumblr.com/7f0b9046acc2010e26ca7f89572170ac/06ac4dfc86e3a263-e2/s640x960/26ef83f98b68c110e1851fed502bd46d3398625a.pnj', userId=3)
    post4 = Post(
        caption='Space might be to big!', title='Space just how big is it?', post_pic="https://www.nasa.gov/sites/default/files/thumbnails/image/web_first_images_release.png", userId=4)
    post5 = Post(
        caption='You should always try to recycle!', title='Did you know', post_pic='https://m.media-amazon.com/images/M/MV5BYmIwZjE2YTctNDY4OS00ZDQ1LWE3YTctOWFjZmYzNjA3NWM0XkEyXkFqcGdeQXVyMTI5NTQ3MjEx._V1_.jpg', userId=5)
    post6 = Post(
        caption='maybe?', title='Are cats bread?', post_pic='https://sadanduseless.b-cdn.net/wp-content/uploads/2019/06/cat-breading7.jpg', userId=6)


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
