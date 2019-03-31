import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

    constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    storeRecipes() {
        const token = this.authService.getToken();
        // return this.httpClient.put('https://udemy-mohan.firebaseio.com//recipes.json', this.recipeService.getRecipes(),
        // {
        //     observe: 'body',
        //     params: new HttpParams().set('auth', token)
        // });
        const req = new HttpRequest('PUT', 'https://udemy-mohan.firebaseio.com//recipes.json', this.recipeService.getRecipes(), {
            reportProgress: true
        });
        return this.httpClient.request(req);

    }

    getRecipes() {
        const token = this.authService.getToken();

        this.httpClient.get<Recipe[]>('https://udemy-mohan.firebaseio.com//recipes.json', {
            observe: 'body',
            responseType: 'json'
        })
            .pipe(
                map((recipes) => {
                    for (const recipe of recipes) {
                        if (!recipe.ingredients) {
                            recipe.ingredients = [];
                        }
                    }
                    return recipes;
                })
            )
            .subscribe((recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            });
    }
}
