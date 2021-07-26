import { Component, OnInit } from '@angular/core';
import { Cell } from 'src/app/Cell';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  rows: number[][] = Array(this.gameService.gameBoardSize)
    .fill(0)
    .map(() => Array(10).fill(0));

  constructor(private gameService: GameService) {
    this.gameService.cellChange.subscribe((cell: Cell) => {
      this.rows[cell.row][cell.column] = 5;
      setTimeout(() => {
        if (this.rows[cell.row][cell.column] !== 1) {
          this.rows[cell.row][cell.column] = 3;
          this.gameService.addPointToAi();
        }
      }, 1000);
    });
  }

  ngOnInit(): void {}

  cellClick(i: number, j: number) {
    if (this.rows[i][j] === 5) {
      this.rows[i][j] = 1;
      this.gameService.addPointToUser();
    }
  }

  reset() {
    this.rows = Array(this.gameService.gameBoardSize)
      .fill(0)
      .map(() => Array(10).fill(0));
  }
}
