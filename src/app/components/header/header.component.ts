import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Score } from 'src/app/Cell';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  message: string = '';
  gameTimer: null | ReturnType<typeof setTimeout> = null;

  delayOption: FormGroup = new FormGroup({
    delay: new FormControl('', [Validators.required]),
  });

  get delay() {
    return this.delayOption.get('delay');
  }

  constructor(private gameService: GameService) {
    this.gameService.scoreChange.subscribe((score: Score) => {
      if ((score.user >= 10 || score.ai >= 10) && this.gameTimer) {
        clearInterval(this.gameTimer);
      }
    });

    this.gameService.currentMessage.subscribe(
      (message) => (this.message = message)
    );
  }

  ngOnInit(): void {}

  onClick(): void {
    if (this.delayOption.valid) {
      this.gameService.changeMessage('reset');
      if (this.gameTimer) clearInterval(this.gameTimer);

      this.gameTimer = setInterval(
        () => this.gameService.getRandomCell(),
        Number(this.delay?.value)
      );
    }
  }
}
