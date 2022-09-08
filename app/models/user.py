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
    date_of_birth = db.Column(db.DateTime, nullable=False)
    profile_pic = db.Column(db.String(255), default='https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/9afd3b92ab41ffca7f368a8fcbd6d39a75894efe0edbc14cf1f067cf625e6678.png')
    city = db.Column(db.String(40), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    matchesOne = db.relationship("Match", back_populates="firstUserIds", foreign_keys="Match.first_userId")
    matchesTwo = db.relationship("Match", back_populates="secondUserIds", foreign_keys="Match.second_userId")

    senderId = db.relationship("Message", back_populates="senders", foreign_keys="Message.sender")
    receiverId = db.relationship("Message", back_populates="receivers", foreign_keys="Message.receiver")
    
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
            'email': self.email,
            'profile_pic': self.profile_pic,
            'full_name': self.full_name,
            'date_of_birth': self.date_of_birth,
            'city': self.city,
        }
