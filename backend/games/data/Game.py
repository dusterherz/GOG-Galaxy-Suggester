from dataclasses import dataclass
from datetime import date
from typing import List


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
