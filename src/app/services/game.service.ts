import { Injectable } from '@angular/core';

const SIZE = 10;

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameBoardSize = SIZE;

  constructor() {}

  getRandomCell(): object {
    let row = this.getRandomIntInclusive(SIZE - SIZE, SIZE - 1);
    let column = this.getRandomIntInclusive(SIZE - SIZE, SIZE - 1);

    return { row: row, column: column };
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
