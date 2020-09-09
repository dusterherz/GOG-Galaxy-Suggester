from flask import Flask
from flask_cors import CORS

from games.api import games

app = Flask(__name__)
CORS(app)

app.register_blueprint(games)

if __name__ == "__main__":
    app.run()
