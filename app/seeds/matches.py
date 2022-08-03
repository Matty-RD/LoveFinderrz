from app.models import db, Match


def seed_matches():

    match = Match(first_userId= 1, second_userId= 6, matched=False)
    match2 = Match(first_userId= 2, second_userId= 5, matched=False)
    match3 = Match(first_userId= 3, second_userId= 4, matched=False)
    match4 = Match(first_userId= 4, second_userId= 3, matched=False)
    match5 = Match(first_userId= 5, second_userId= 2, matched=False)
    match6 = Match(first_userId= 6, second_userId= 1, matched=False)


    db.session.add(match)
    db.session.add(match2)
    db.session.add(match3)
    db.session.add(match4)
    db.session.add(match5)
    db.session.add(match6)

    db.session.commit()

def undo_matches():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
