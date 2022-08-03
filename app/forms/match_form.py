from flask_wtf import FlaskForm
from wtforms import IntegerField, BooleanField
from wtforms.validators import DataRequired

class MatchesForm(FlaskForm):
    first_userId = IntegerField('first_userId', validators=[DataRequired()])
    second_userId = IntegerField('second_userId', validators=[DataRequired()])
    matched = BooleanField('matched', validators=[DataRequired()])
