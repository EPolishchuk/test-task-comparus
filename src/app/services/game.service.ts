import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
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

  constructor() {
    this.cellChange.subscribe((value) => {
      this.currentCell = value;
    });
  }

  addPointToUser() {
    if (this.score.user < 10 && this.score.ai < 10) ++this.score.user;
  }

  addPointToAi() {
    if (this.score.user < 10 && this.score.ai < 10) ++this.score.ai;
  }

  getRandomCell(): void {
    let row = this.getRandomIntInclusive(SIZE - SIZE, SIZE - 1);
    let column = this.getRandomIntInclusive(SIZE - SIZE, SIZE - 1);

    this.cellChange.next({ row: row, column: column });
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
