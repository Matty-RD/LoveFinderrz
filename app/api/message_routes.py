from flask import Blueprint, request, redirect
from app.models import Message, db
from flask_login import login_required
from app.forms.message_form import MessageForm

message_routes = Blueprint('messages', __name__)



@message_routes.route('/')
@login_required
def messages():
    messages = Message.query.all()
    return {'messages': [message.to_dict() for message in messages]}

@message_routes.route('/new', methods=['POST'])
@login_required
def message_post():
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    message = Message(
        sender=form.data['sender'],
        receiver=form.data['receiver'],
        message=form.data['message']
    )
    db.session.add(message)
    db.session.commit()
    return message.to_dict()

@message_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_message(id):
    message = Message.query.get(id)
    db.session.delete(message)
    db.session.commit()
    return {"deleted": "message"}
