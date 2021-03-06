import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable({providedIn:'root'})
export class RecipesEffects {

    @Effect()
    fetchRecipes = this.action$.pipe(ofType(RecipesActions.FETCH_RECIPES),
    switchMap( () => {
        return this.http
            .get<Recipe[]>('https://angular-demo-ef444-default-rtdb.firebaseio.com/recipes.json');
    }),
    map(recipes => {
        return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        })
    }),
    map(recipes => {
        return new RecipesActions.SetRecipes(recipes);
    })
    );

    @Effect({dispatch:false})
    storeRecipes = this.action$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            return this.http.put('https://angular-demo-ef444-default-rtdb.firebaseio.com/recipes.json',
            recipesState.recipes);
        })
    )

    constructor(private action$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}