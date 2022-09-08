from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def put_user(id):
    user = User.query.get(id)
    data = request.json
    user.username = data['username']
    user.full_name = data['full_name']
    user.profile_pic = data['profile_pic']
    user.city = data['city']
    db.session.commit()
    return user.to_dict()
