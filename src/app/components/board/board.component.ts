import { Component, OnInit } from '@angular/core';
import { Cell } from 'src/app/Cell';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  message: string = '';
  userWins: boolean = false;
  aiWins: boolean = false;
  delay: number = 1000;

  rows: number[][] = Array(this.gameService.gameBoardSize)
    .fill(0)
    .map(() => Array(10).fill(0));

  constructor(private gameService: GameService) {
    this.gameService.currentMessage.subscribe((message) => {
      if (message === 'delay') this.delay = this.gameService.delay;
    });

    this.gameService.cellChange.subscribe((cell: Cell) => {
      this.rows[cell.row][cell.column] = 5;
      setTimeout(() => {
        if (this.rows[cell.row][cell.column] !== 1) {
          this.rows[cell.row][cell.column] = 3;
          this.gameService.addPointToAi();
        }
      }, this.delay);
    });

    this.gameService.currentMessage.subscribe((message) => {
      if (message === 'reset') this.reset();
    });

    this.gameService.scoreChange.subscribe((score) => {
      if (score.ai === 10) {
        this.aiWins = true;
      } else if (score.user === 10) {
        this.userWins = true;
      }
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

    this.userWins = false;
    this.aiWins = false;
  }
}
