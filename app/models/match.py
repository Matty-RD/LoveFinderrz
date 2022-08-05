from .db import db
import datetime


class Match(db.Model):
    __tablename__ = 'matches'

    id = db.Column(db.Integer, primary_key=True)
    first_userId = db.Column(db.Integer,db.ForeignKey("users.id"), nullable=False)
    second_userId = db.Column(db.Integer,db.ForeignKey("users.id"))
    matched = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    firstUserIds = db.relationship("User", back_populates="matchesOne", foreign_keys=[first_userId])
    secondUserIds = db.relationship("User", back_populates="matchesTwo", foreign_keys=[second_userId])
    postIds = db.relationship("Post", back_populates="matchIds")

    def to_dict(self):
        return {
            'id': self.id,
            'first_userId': self.first_userId,
            'second_userId': self.second_userId,
            'matched': self.matched,
            'liker': self.firstUserIds.to_dict(),
            'liked': self.secondUserIds.to_dict()
        }
