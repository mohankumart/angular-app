import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
      this.route.params
        .subscribe((params: Params) => {
            this.id = +params.id;
            this.editMode = params.id != null;
            this.initForm();
        });
  }

  onSubmit() {
    if (this.editMode) {
        this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
        this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

   private initForm() {
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        const recipeIngrediants = new FormArray([]);

        if  (this.editMode) {
            const recipe = this.recipeService.getRecipe(this.id);
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;
            if (recipe.ingredients) {
                for (const ingrediant of recipe.ingredients) {
                    recipeIngrediants.push(
                        new FormGroup({
                            name: new FormControl(ingrediant.name, Validators.required),
                            amount: new FormControl(ingrediant.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                        })
                    );
                }

            }
        }

        this.recipeForm = new FormGroup({
            name : new FormControl(recipeName, Validators.required),
            imagePath : new FormControl(recipeImagePath),
            description : new FormControl(recipeDescription, Validators.required),
            ingrediants: recipeIngrediants
        });
    }

    getControls() {
        return (this.recipeForm.get('ingrediants') as FormArray).controls;
    }

    addIngrediant() {
        (this.recipeForm.get('ingrediants') as FormArray).push(
            new FormGroup({
                name: new FormControl(null, Validators.required),
                amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
        );
    }

    onCancel() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    onIngrediantDelete(index: number) {
        (this.recipeForm.get('ingrediants') as FormArray).removeAt(index);
    }
}
