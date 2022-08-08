from flask import Blueprint, request, redirect
from app.models import Post, db
from flask_login import login_required
from app.forms.post_form import PostsForm

post_routes = Blueprint('posts', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@post_routes.route('/')
@login_required
def posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/create', methods=['POST'])
@login_required
def post_post():
    form = PostsForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            userId=form.data['userId'],
            title=form.data['title'],
            post_pic=form.data['post_pic'],
            caption=form.data['caption']
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return ('Error')

@post_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def put_post(id):
    post = Post.query.get(id)
    data = request.json
    post.post_pic = data['post_pic']
    post.caption = data['caption']
    post.title = data['title']
    db.session.commit()
    return post.to_dict()

@post_routes.route('/delete/<int:id>', methods=["DELETE"])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return post.to_dict()
