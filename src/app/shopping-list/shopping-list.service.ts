import { Ingrediant } from '../shared/ingrediant.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService {
    ingrediantsChanged = new EventEmitter<Ingrediant[]>();
    startedEditing = new Subject<number>();

    private ingrediants: Ingrediant[] = [
        new Ingrediant('Apples', 5),
        new Ingrediant('Tomatoes', 2)
    ];

    getIngrediants() {
        return this.ingrediants.slice();
    }

    getIngrediant(index: number) {
        return this.ingrediants[index];
    }

    addIngrediant(ingrediant: Ingrediant) {
        this.ingrediants.push(ingrediant);
        this.ingrediantsChanged.emit(this.ingrediants.slice());
    }

    addIngredients(ingrediants: Ingrediant[]) {
        this.ingrediants.push(...ingrediants);
        this.ingrediantsChanged.emit(this.ingrediants.slice());
    }

    updateIngredient(index: number, newIngredient: Ingrediant) {
        this.ingrediants[index] = newIngredient;
        this.ingrediantsChanged.emit(this.ingrediants.slice());
    }

    deleteIngredint(index: number) {
        this.ingrediants.splice(index, 1);
        this.ingrediantsChanged.emit(this.ingrediants.slice());
    }
}

