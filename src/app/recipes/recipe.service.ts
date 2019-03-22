import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingrediant } from '../shared/ingrediant.model';
import { Subject } from 'rxjs/Subject';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
      new Recipe('A Test Recipe', 'This is simply a test', '', [
          new Ingrediant('Meat', 1),
          new Ingrediant('Milk', 2)
      ]),
      new Recipe('Fine Recipe', 'This is Fine a test', '', [
          new Ingrediant('Brocilli', 6),
          new Ingrediant('Tea', 4)
      ])
    ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addIngrediantsToShoppingList(ingrediants: Ingrediant[]) {
        this.slService.addIngredients(ingrediants);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}

