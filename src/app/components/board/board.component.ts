import { Component, OnInit } from '@angular/core';
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

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.rows[9][2] = 5;
  }

  cellClick(i: number, j: number) {
    console.log(i, j);
  }
}
