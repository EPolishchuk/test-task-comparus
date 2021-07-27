import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent implements OnInit {
  user: number = 0;
  ai: number = 0;

  constructor(private gameService: GameService) {
    this.gameService.scoreChange.subscribe((value) => {
      this.ai = value.ai;
      this.user = value.user;
    });
  }

  ngOnInit(): void {}
}
