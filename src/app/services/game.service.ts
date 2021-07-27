import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cell, Score } from '../Cell';

const SIZE = 10;

@Injectable({
  providedIn: 'root',
})
export class GameService {
  score: Score = { user: 0, ai: 0 };
  gameBoardSize = SIZE;
  currentCell: Cell = { row: NaN, column: NaN };
  cellChange: Subject<Cell> = new Subject<Cell>();
  scoreChange: Subject<Score> = new Subject<Score>();
  cellList: Cell[] = [];

  constructor() {
    this.cellChange.subscribe((value) => {
      this.currentCell = value;
    });

    this.scoreChange.subscribe((value) => {
      this.score = value;
    });
  }

  addPointToUser() {
    if (this.score.user < 10 && this.score.ai < 10) {
      let newScore = { ...this.score };
      ++newScore.user;
      this.scoreChange.next(newScore);
    }
  }

  addPointToAi() {
    if (this.score.user < 10 && this.score.ai < 10) {
      let newScore = { ...this.score };
      ++newScore.ai;
      this.scoreChange.next(newScore);
    }
  }

  getRandomCell(): void {
    let row = this.getRandomIntInclusive(SIZE - SIZE, SIZE - 1);
    let column = this.getRandomIntInclusive(SIZE - SIZE, SIZE - 1);

    let randomCell = { row: row, column: column };

    let duplicate = this.cellList.filter(
      (el) => el.row === randomCell.row && el.column === randomCell.column
    );

    if (duplicate.length > 0) {
      this.getRandomCell();
    } else {
      this.cellList.push(randomCell);
      this.cellChange.next(randomCell);
    }
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
