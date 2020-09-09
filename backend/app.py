import csv
import random
import traceback
from dataclasses import dataclass
from datetime import date, datetime
from typing import List

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@dataclass
class Game:
    title: str
    summary: str
    platforms: List[str]
    criticsScore: int
    developers: List[str]
    publishers: List[str]
    genres: List[str]
    themes: List[str]
    releaseDate: date
    gameMinutes: int
    backgroundImage: str
    squareIcon: str
    verticalCover: str


games: List[Game] = []
with open('../gameDB.csv', mode='r', encoding='UTF8') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        try:
            games.append(
                Game(
                    title=row['title'],
                    summary=row['summary'],
                    platforms=eval(row['platformList']),
                    criticsScore=int(row['criticsScore']) if row['criticsScore'] else 0,
                    developers=eval(row['developers']) if row['developers'] else [],
                    publishers=eval(row['publishers']) if row['publishers'] else [],
                    genres=eval(row['genres']) if row['genres'] else [],
                    themes=eval(row['themes']) if row['themes'] else [],
                    releaseDate=datetime.fromisoformat(row['releaseDate']),
                    gameMinutes=int(row['gameMins']) if row['gameMins'] else 0,
                    backgroundImage=row['backgroundImage'],
                    squareIcon=row['squareIcon'],
                    verticalCover=row['verticalCover'],
                )
            )
        except ValueError as e:
            print(f'{row["title"]} failed to parse, traceback: {traceback.print_tb(e.__traceback__)}')
        except SyntaxError as e:
            print(f'Syntax error, {traceback.print_exc(limit=1)}')

# random_game = Game(
#     title='Kerbal Space Program',
#     summary="In KSP, you must build space-worthy craft, capable of flying your crew out into space, without killing them. At your disposal is a collection of parts, which must be assembled to create a functional ship. Each part has its own function and will affect the way a ship flies (or doesn't). So strap yourself in, and get ready to try some Rocket Science!\n\nThe game has different game modes, you can play the Career Mode if you want to expand and manage your own Space Center, taking on missions and researching new technologies. Or you can play Sandbox mode if you're only interested in flying and discovering the Kerbal universe without restrictions. There is even a mid point between these two, Science mode.",
#     platforms=['Steam'],
#     criticsScore=87,
#     developers=['Flying Tiger Developments', 'Squad'],
#     publishers=['Deported B.V.', 'Squad'],
#     genres=['Indie', 'Simulator'],
#     themes=['Educational', 'Open world', 'Sandbox', 'Science fiction'],
#     releaseDate=datetime.fromisoformat('2015-04-27'),
#     gameMinutes=223,
#     backgroundImage='https://images.gog.com/4d2680caf0bda7eeb4f90e3d9bccba500629cb0ec267dd1ec15bd38c9edcfec0_glx_bg_top_padding_7.webp?namespace=gamesdb',
#     squareIcon='https://images.gog.com/2f6964251817bcc0e4044de681f9cc40fa399f8bf39f16d98b6ba7d199bae2da_glx_square_icon_v2.webp?namespace=gamesdb',
#     verticalCover='https://images.gog.com/2f6964251817bcc0e4044de681f9cc40fa399f8bf39f16d98b6ba7d199bae2da_glx_vertical_cover.webp?namespace=gamesdb',
# )

random_game = random.choice(games)

@app.route('/random', methods=['GET'])
def hello_world():
    return jsonify(random_game)


if __name__ == "__main__":
    app.run()
