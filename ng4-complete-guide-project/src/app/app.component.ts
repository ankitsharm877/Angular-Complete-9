import { LoggingService } from './logging.service';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.action';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ng4-complete-guide-project';

  constructor(private store:Store<fromApp.AppState>, private loggingService: LoggingService,
    @Inject(PLATFORM_ID) private platformId ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new AuthActions.AutoLogin());
    }
    this.loggingService.printLog('Hello from App Component!');
  }
  
}
