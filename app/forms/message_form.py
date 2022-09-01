from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class MessageForm(FlaskForm):
    sender = IntegerField('sender', validators=[DataRequired()])
    receiver = IntegerField('receiver', validators=[DataRequired()])
    message = StringField('message', validators=[DataRequired()])
