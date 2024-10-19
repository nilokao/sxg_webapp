from flask import Flask, render_template
import sqlite3

app = Flask(__name__)

#rotas
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

if __name__ == '__main__':
    app.run(debug=True, port=8080)