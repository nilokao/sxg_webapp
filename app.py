from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

db = SQLAlchemy()

def create_app():
    app = Flask(__name__, template_folder='templates')

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./sxgaming.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.secret_key = '123'
    
    login_manager = LoginManager(app)
    login_manager.login_view = 'login'

    db.init_app(app)

    #importando as rotas
    from routes import register_routes
    register_routes(app, db, login_manager)

    migrate = Migrate(app, db)

    return app