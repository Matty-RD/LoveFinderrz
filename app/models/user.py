from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(40), nullable=False)
    date_of_birth = db.Column(db.Integer, nullable=False)
    profile_pic = db.Column(db.String(255), default='https://pbs.twimg.com/media/EAmSLPPU4AADHjj.png')
    city = db.Column(db.String(40), nullable=False)
    state = db.Column(db.String(40), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    matchesOne = db.relationship("Match", back_populates="firstUserIds", foreign_keys="Match.first_userId")
    matchesTwo = db.relationship("Match", back_populates="secondUserIds", foreign_keys="Match.second_userId")
    posts = db.relationship("Post", back_populates="userIds")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
