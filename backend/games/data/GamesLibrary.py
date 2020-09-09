import csv
import traceback
from datetime import datetime
from typing import List

from games.data.Game import Game


class GamesLibrary:

    def get_all(self):
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
        return games
