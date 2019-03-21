import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingrediant } from '../../shared/ingrediant.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subsrciption: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingrediant;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subsrciption = this.slService.startedEditing.subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngrediant(index);
        this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
        });
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingrediant(value.name, value.amount);
    if (this.editMode) {
        this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
        this.slService.addIngrediant(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  OnClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    this.slService.deleteIngredint(this.editedItemIndex);
    this.OnClear();
  }

  ngOnDestroy() {
    this.subsrciption.unsubscribe();
  }
}
