import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingrediant } from '../shared/ingrediant.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
      new Recipe('A Test Recipe', 'This is simply a test', '', [
          new Ingrediant('Meat', 1),
          new Ingrediant('Milk', 2)
      ]),
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
}

