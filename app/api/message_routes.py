from flask import Blueprint, request, redirect
from app.models import Message, db
from flask_login import login_required

message_routes = Blueprint('messages', __name__)



@message_routes.route('/')
@login_required
def messages():
    messages = Message.query.all()
    return {'messages': [message.to_dict() for message in messages]}
