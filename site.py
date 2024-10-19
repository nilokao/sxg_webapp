from flask import Flask

app = Flask(__name__)

#criar pagina
# route + funcao
@app.route("/") #decorator: atribui nova funcionalidade a funcao de baixo
def home():
    return "Home"

app.run()