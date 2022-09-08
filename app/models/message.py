from .db import db
import datetime


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.Integer,db.ForeignKey("users.id"), nullable=False)
    receiver = db.Column(db.Integer,db.ForeignKey("users.id"), nullable=False)
    message = db.Column(db.String(5000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    senders = db.relationship("User", back_populates="senderId", foreign_keys=[sender])
    receivers = db.relationship("User", back_populates="receiverId", foreign_keys=[receiver])

    def to_dict(self):
        return {
            "id": self.id,
            "sender": self.sender,
            "receiver": self.receiver,
            "message": self.message,
            "created_at": self.created_at,
            "senderInfo": self.senders.to_dict()
        }
