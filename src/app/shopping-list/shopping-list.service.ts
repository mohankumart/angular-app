import { Ingrediant } from '../shared/ingrediant.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    ingrediantsChanged = new EventEmitter<Ingrediant[]>();
    private ingrediants: Ingrediant[] = [
        new Ingrediant('Apples', 5),
        new Ingrediant('Tomatoes', 2)
    ];

    getIngrediants() {
        return this.ingrediants.slice();
    }

    addIngrediant(ingrediant: Ingrediant) {
        this.ingrediants.push(ingrediant);
        this.ingrediantsChanged.emit(this.ingrediants.slice());
    }

    addIngredients(ingrediants: Ingrediant[]) {
        this.ingrediants.push(...ingrediants);
        this.ingrediantsChanged.emit(this.ingrediants.slice());
    }
}

