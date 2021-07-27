import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Score } from 'src/app/Cell';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  gameTimer: null | ReturnType<typeof setTimeout> = null;

  constructor(private gameService: GameService) {
    this.gameService.scoreChange.subscribe((score: Score) => {
      if ((score.user >= 10 || score.ai >= 10) && this.gameTimer) {
        clearInterval(this.gameTimer);
      }
    });
  }

  ngOnInit(): void {}

  onClick() {
    this.gameTimer = setInterval(() => this.gameService.getRandomCell(), 1000);
  }

  start(): void {
    this.gameTimer = setInterval(() => this.gameService.getRandomCell(), 1000);
  }
}
