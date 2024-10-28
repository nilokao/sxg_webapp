from flask import render_template, request, redirect, url_for, flash
from flask_login import login_user, login_required, logout_user, current_user
from models import News, User
from datetime import datetime
from app import create_app

def register_routes(app, db, login_manager):

    @app.route("/")
    def index():
        return render_template('index.html')

    @app.route("/historia")
    def historia():
        return render_template('historia.html')

    @app.route("/players")
    def players():
        return render_template('players.html')

    @app.route("/noticias")
    def noticias():
        return render_template('noticias.html')
    
    @app.route("/termos")
    def termos():
        return render_template('termos.html')

    @app.route("/adm")
    @login_required
    def adm():
        return render_template('adm.html')
    
    @app.route("/login", methods=['GET', 'POST'])
    def login():
        if request.method == 'POST':
            username = request.form['username']
            password = request.form['password']
            user = User.query.filter_by(username=username).first()
            if user and user.password == password:
                login_user(user)
            else:
                flash('Credenciais Inválidas')
            return render_template('login.html')
        
    @app.route("/logout")
    @login_required
    def logout():
        logout_user()
        return redirect(url_for('index'))

    @app.route("/add_noticia", methods=['GET', 'POST'])
    @login_required
    def add_noticia():
        if request.method == 'POST':
            title = request.form['titulo']
            article = request.form['conteudo']
            image_link = request.form['img_link']
            date_published = datetime.now()

            nova_noticia = News(title=title, article=article, image_link=image_link, date_published=date_published)
            db.session.add(nova_noticia)
            db.session.commit()

            return redirect(url_for('adm'))

        return render_template('add_noticia.html')

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    #cria páginas para cada usuário
    #@app.route("/user/<username>")
    #def users(username):
    #    return render_template("users.html", username=username)