from app import create_app

flask_app = create_app()

if __name__ == '__main__':
    flask_app.run(port='8080', debug=True)