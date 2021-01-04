import { Store} from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.action';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router,
        private store:Store<fromApp.AppState>) { }

    ngOnInit(): void {
        this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
        });
    }
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }
    onHandleError() {
       this.store.dispatch(new AuthActions.ClearError());
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = true;
        if (this.isLoginMode) {
            this.store.dispatch(new AuthActions.LoginStart({email: email, password:password}))
        } else {
            this.store.dispatch(new AuthActions.SignUpStart({email: email, password:password}))
        }
       
        form.reset();
    }
}