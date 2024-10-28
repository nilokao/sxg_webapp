from app import create_app, db
from flask_login import UserMixin

class News(db.Model):
    __tablename__ = 'noticias'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    article = db.Column(db.Text, nullable=False)
    image_link = db.Column(db.Text)
    date_published = db.Column(db.DateTime, nullable=False)
    
    def __repr__(self):
        return f'ID: {self.id}, Title: {self.title}, Date Published: {self.date_published}'

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.String(150), nullable=False)