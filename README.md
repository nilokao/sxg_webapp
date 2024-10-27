# SX Gaming 
Aqui serão armazenados e documentados todos os passos do site da SX Gaming, a nossa __amada__ organização.

<!-- <img src="static/media/img/logo.png" alt="Logo SXG" style="width: 200px;"> -->
## Índice
1. [Instalação do Ambiente virtual](#instalação-do-ambiente-virtual)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Créditos](#créditos)
 

## Instalação do *ambiente virtual*
**Obs**: Foi adicionado um **.gitignore**, então agora as **venv** não serão versionadas no github.
1. Mude o diretório do terminal para o do projeto
```bash
cd ../sxg_webapp
```
2. Crie o *ambiente virtual*: (Obs: em alguns sistemas, o comando para executar o python pode ser diferente: python, python3, py).  
```bash
py -m venv venv
```
3. Ative o *ambiente virtual*:
```bash
# Windows
.\venv\Scripts\activate

# Linux/MacOS (eu acho nao uso mac)
source venv/bin/activate
```
4. Instale as dependências no *ambiente virtual*:
```bash
pip install -r requirements.txt
```

## Tecnologias Utilizadas 
- Tecnologias de Front-end: CSS 3, HTML 5, Javascript.
- Tecnologias de Back-end: Python, Flask, SQLite, SQLAlchemy. 

## Créditos

- Nicolas Monteiro Longo: desenvolvedor front-end, idealizador, designer, CEO, top laner.

- Miguel Avila de Oliveira: desenvolvedor back-end, acessor de ideias, CEO, jungler.

- *Menções Desonrosas*: Gunicorn (deu erro umas 10 vezes pq o dev back-end é burro kkkk), Akkinory (maior chocker da organização), IGG (organização falida), ******** (você sabe quem é).