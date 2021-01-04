import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription, TimeInterval } from 'rxjs';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  count = 0;
  @Output() countEvent = new EventEmitter<number>();
  ref: any;
  constructor() { }

  ngOnInit(): void {
  }

  onStart() {
    this.ref = setInterval(() => {
      this.count = this.count + 1;
      this.countEvent.emit(this.count);
    }, 1000)
  }

  onEnd() {
    clearTimeout(this.ref);
    this.count = 0;
  }

}
