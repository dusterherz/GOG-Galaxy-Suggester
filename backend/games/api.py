from flask import Blueprint, jsonify

from games.use_cases import get_random_game

games = Blueprint('games', 'games', url_prefix='/games')


@games.route('/random', methods=['GET'])
def random():
    random_game = get_random_game()
    return jsonify(random_game)
