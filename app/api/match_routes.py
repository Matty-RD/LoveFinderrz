from flask import Blueprint, request, redirect
from app.models import Match, db
from flask_login import login_required
from app.forms.match_form import MatchesForm

match_routes = Blueprint('matches', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@match_routes.route('/')
@login_required
def matches():
    matches = Match.query.all()
    return {'matches': [match.to_dict() for match in matches]}

@match_routes.route('/create/', methods=['POST'])
@login_required
def match_post():
    form = MatchesForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    match = Match(
        first_userId=form.data['first_userId'],
        second_userId=form.data['second_userId'],
        matched=form.data['matched']
    )
    db.session.add(match)
    db.session.commit()
    return match.to_dict()

@match_routes.route('/<int:id>', methods=['PUT'])
@login_required
def put_match(id):
    match = Match.query.get(id)
    data = request.json
    match.matched = data['matched']
    db.session.commit()
    return match.to_dict()


@match_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_match(id):
    match = Match.query.get(id)
    db.session.delete(match)
    db.session.commit()
    return {"deleted": "match"}
