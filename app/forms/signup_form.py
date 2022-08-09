from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from datetime import date


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def overEighteen(form, field):
    date_of_birth = field.data
    today = date.today()
    age = today.year - date_of_birth.year - ((today.month, today.day) < (date_of_birth.month, date_of_birth.day))
    if(age < 18):
        raise ValidationError('Sorry, you must be 18 years or older to join.')

def imageFile(form, field):
    profile_pic = field.data
    if not (profile_pic.endswith(".jpg") or profile_pic.endswith(".JPG") or profile_pic.endswith(".png") or profile_pic.endswith(".PNG") or profile_pic.endswith(".gif") or profile_pic.endswith(".GIF") ):
        raise ValidationError('Image URLs must end in .jpg, .png, or .gif.')

def nameChecker(form, field):
    full_name = field.data
    if(len(full_name) < 3 ):
        raise ValidationError('Please provide your full name!')

def nameChecker(form, field):
    full_name = field.data
    if(len(full_name) < 3 ):
        raise ValidationError('Please provide your full name.')

def usernameChecker(form, field):
    username = field.data
    if(len(username) < 5 or len(username) > 15):
        raise ValidationError('Please provide a longer username at least over 5 characters.')
    elif(len(username) > 15):
        raise ValidationError('Please provide a username less than 25 characters.')


def cityChecker(form, field):
    city = field.data
    if(city == 'a'):
        raise ValidationError('Please provide a city.')

def passwordChecker(form, field):
    password = field.data
    if(len(password) < 3):
        raise ValidationError('Please provide a longer password.')

def emailCheck(form, field):
    email = field.data
    if(not '@' in email or not '.' in email):
        raise ValidationError('Please provide a valid email')

class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists, usernameChecker])
    email = StringField('email', validators=[DataRequired(), user_exists, emailCheck])
    password = StringField('password', validators=[DataRequired(), passwordChecker])
    full_name = StringField('full_name', validators=[DataRequired(), nameChecker])
    date_of_birth = DateField('date_of_birth', validators=[DataRequired(), overEighteen])
    profile_pic = StringField('profile_pic', validators=[DataRequired(), imageFile])
    city = StringField('city', validators=[DataRequired(), cityChecker])
