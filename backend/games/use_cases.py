import random

from games.data.GamesLibrary import GamesLibrary


def get_random_game():
    games_library = GamesLibrary()
    games = games_library.get_all()
    return random.choice(games)
