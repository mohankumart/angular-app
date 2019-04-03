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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { LoggingInterceptor } from '../shared/logging.interceptor';
import { BaconDirective } from './home/bacon.directive';

@NgModule({
  declarations: [
      HeaderComponent,
      HomeComponent,
      BaconDirective
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
  providers: [
      ShoppingListService,
      RecipeService,
      DataStorageService,
      AuthService,
      AuthGuard,
      {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
      {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
    ],
})
export class CoreModule { }
