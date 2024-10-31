from flask import render_template, request, redirect, url_for, flash
from flask_login import login_user, login_required, logout_user, current_user
from models import News, User
from datetime import datetime
from app import create_app
from werkzeug.security import generate_password_hash, check_password_hash
from flask import abort
from functools import wraps 
from models import News, User

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated or not current_user.is_admin:
            abort(403) #permission denied
        return f(*args, **kwargs)
    return decorated_function

def register_routes(app, db, login_manager):

    @app.route("/")
    def index():
        noticias = News.query.order_by(News.date_published.desc()).limit(3).all()
        return render_template('index.html', noticias=noticias)

    @app.route("/historia")
    def historia():
        return render_template('historia.html')

    @app.route("/players")
    def players():
        return render_template('players.html')

    @app.route("/noticias")
    def noticias():
        noticias = News.query.order_by(News.date_published.desc()).all()
        return render_template('noticias.html', noticias=noticias)
    
    @app.route("/termos")
    def termos():
        return render_template('termos.html')

    @app.route("/adm")
    @login_required
    @admin_required
    def adm():
        noticias = News.query.order_by(News.date_published.desc()).all()
        usuarios = User.query.order_by(User.id).all()
        return render_template('adm.html', noticias=noticias, usuarios=usuarios)
    
    @app.route("/auth", methods=['GET', 'POST'])
    def auth():
        if request.method == 'POST':
            action = request.form['action'] #identifica se é login ou registro
            # logando o usuario
            if action == 'login':
                username = request.form['username']
                password = request.form['password']
                user = User.query.filter_by(username=username).first()

                if user and check_password_hash(user.password, password):
                    login_user(user)
                    flash('Login com sucesso')
                    return redirect(url_for('index'))
                else:
                    flash('Credenciais Inválidas')

            # registrando novo usuario
            elif action == 'register':
                username = request.form['username']
                email = request.form['email']
                password = request.form['password']

                if User.query.filter_by(username=username).first():
                    flash("Nome de usuário indisponível.")
                    return redirect(url_for('auth'))
                if User.query.filter_by(email=email).first():
                    flash("Endereço de email indisponível.")
                    return redirect(url_for('auth'))
                
                hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
                new_user = User(username=username, email=email, password=hashed_password)
                db.session.add(new_user)
                db.session.commit()

                flash("Conta criada com sucesso")
                return redirect(url_for('auth'))
            
        return render_template('auth.html')
        
    @app.route("/logout")
    @login_required
    def logout():
        logout_user()
        return redirect(url_for('index'))

    @app.route("/add_noticia", methods=['GET', 'POST'])
    @login_required
    @admin_required
    def add_noticia():
        if request.method == 'POST':
            title = request.form['titulo']
            resume = request.form['resumo']
            article = request.form['conteudo']
            author_id = current_user.id
            image_link = request.form['img_link']
            date_published = datetime.now()

            nova_noticia = News(title=title, resume=resume, article=article, author_id=author_id, image_link=image_link, date_published=date_published)
            db.session.add(nova_noticia)
            db.session.commit()

            flash("Noticia adicionada com sucesso")
            return redirect(url_for('adm'))

        return render_template('adm.html')

    @app.route("/remover_noticias/<int:item_id>", methods=['DELETE'])
    @login_required
    @admin_required
    def remove_news(item_id):
        noticia = News.query.get(item_id)
        if noticia:
            db.session.delete(noticia)
            db.session.commit()
            return "Notícia removida com sucesso"
        return "Noticia nao encontrada", 404
    
    @app.route("/remover_usuarios/<int:user_id>", methods=['DELETE'])
    @login_required
    @admin_required
    def remove_user(user_id):
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return "Usuario removida com sucesso"
        return "Usuario nao encontrado", 404

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    @app.route("/atualizar_usuario/<int:user_id>", methods=['POST'])
    @login_required
    @admin_required
    def atualizar_usuario(user_id):
        user = User.query.get(user_id)
        if user:
            data = request.get_json()
            user.is_admin = data['is_admin'] 
            db.session.commit()
            return "Usuário atualizado com sucesso"
        return "Usuário não encontrado", 404