from flask import render_template
from models import News

def register_routes(app, db):

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

    #cria páginas para cada usuário
    #@app.route("/user/<username>")
    #def users(username):
    #    return render_template("users.html", username=username) 