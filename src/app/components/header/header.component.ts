import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  point: number = 0;
  constructor(private gameService: GameService) {}

  ngOnInit(): void {}

  onClick() {
    this.gameService.getRandomCell();
    for (let i = 1; i <= 10; i++) {
      setTimeout(() => this.gameService.getRandomCell(), i * 500);
      this.point++;
    }
  }
}
