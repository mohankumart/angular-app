import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';

import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { AppRoutingModule } from './../app-routing.module';
import { RecipeService } from './../recipes/recipe.service';

import { DataStorageService } from './../shared/data-storage.service';
import { AuthService } from './../auth/auth.service';
import { AuthGuard } from './../auth/auth.guard';

@NgModule({
  declarations: [
      HeaderComponent,
      HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
      AppRoutingModule,
      HeaderComponent
  ],
  providers: [ShoppingListService, RecipeService, DataStorageService, AuthService, AuthGuard],
})
export class CoreModule { }
