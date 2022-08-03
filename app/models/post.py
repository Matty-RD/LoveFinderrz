from .db import db
import datetime



class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer,db.ForeignKey("users.id"), nullable=False)
    matchId = db.Column(db.Integer,db.ForeignKey("matches.id"))
    caption = db.Column(db.String(400), nullable=False)
    title = db.Column(db.String(40), nullable=False)
    post_pic = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    userIds = db.relationship("User", back_populates="posts")
    matchIds = db.relationship("Match", back_populates="postIds")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'matchId': self.matchId,
            'caption': self.caption,
            'title': self.title,
            'post_pic': self.post_pic,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.userIds.to_dict(),
        }
