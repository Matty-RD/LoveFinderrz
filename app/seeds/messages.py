from app.models import db, Message


def seed_messages():

    message = Message(sender=1, receiver=3, message="Test 1")
    message2 = Message(sender=1, receiver=3, message="Test 2")
    message3 = Message(sender=1, receiver=3, message="Test 3")
    message4 = Message(sender=3, receiver=1, message="Test 4")
    message5 = Message(sender=3, receiver=1, message="Test 5")
    message6 = Message(sender=3, receiver=1, message="Test 6")


    db.session.add(message)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.add(message6)

    db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
