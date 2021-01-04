import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.action';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    token: string = null;
    private timer : any;

    constructor(private store: Store<fromApp.AppState>) { }

    setLogoutTimer(time: number) {
        this.timer = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout());
        } , time)
    }
    clearLogoutTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

}