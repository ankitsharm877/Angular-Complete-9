import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.action';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

const handleAuthentication = (resData) => {
    let expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    let user = new User(
        resData.email, 
        resData.localId,
        resData.idToken, 
        expirationDate
    );
    localStorage.setItem('userData', JSON.stringify(user));
    
        return new AuthActions.AuthenticateSuccess({
            email: resData.email, 
            userId: resData.localId,
            token: resData.idToken, 
            expirationDate: expirationDate,
            redirect: true
        });
}

const handleError = (error) => {
        let errorMsg = 'An unknown error!';
        if (!error.error || !error.error.error) {
            return of(new AuthActions.AuthenticateFail(errorMsg));
        }
        switch (error.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMsg = 'This email already exists!';
                break;
            case 'INVALID_PASSWORD':
                errorMsg = 'Invalid password!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMsg = 'Email not found!';
                break;
        }
        return of(new AuthActions.AuthenticateFail(errorMsg));
}

@Injectable()
export class AuthEffects {
    @Effect()
    authSignUp = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignUpStart) => {
            return this.http.post<AuthResponseData>
            ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + 
            environment.firebaseApiKey,
                {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {
                return handleAuthentication(resData);
            }),catchError(error => {
                return handleError(error);
            }))
        })
    )

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>
            ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + 
            environment.firebaseApiKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {
                return handleAuthentication(resData);
            }),catchError(error => {
                return handleError(error);
            }));
        })
    );

    @Effect({dispatch: false})
    authRedirect = this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS), 
        tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
            if (authSuccessAction.payload.redirect) {
                this.router.navigate(['/']);
            }
    }));

    @Effect()
    autoLogin = this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN), map(() => {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return {type: 'DUMMY'};
        }
        const loadedUser = new User(userData.email, userData.id, userData._token,
             new Date(userData._tokenExpirationDate));
    
        if (loadedUser.token) {
            //this.userSubject.next(loadedUser);
           
            this.authService.setLogoutTimer(+userData._tokenExpirationDate * 1000);
           
           return new AuthActions.AuthenticateSuccess({
                email: userData.email, 
                userId: userData.id,
                token: userData._token, 
                expirationDate: new Date(userData._tokenExpirationDate),
                redirect: false});
           /*  const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - 
                new Date().getTime();
            this.autoLogout(expirationDuration); */
        }
        return {type: 'DUMMY'};
    }));

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT), tap(() => {
        this.authService.clearLogoutTimer();
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
    }));

    constructor(private actions$: Actions, private http: HttpClient, private router: Router,
        private authService: AuthService) {}
}