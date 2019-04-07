import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';

import { HeaderComponent } from './header/header.component';
import { HomeComponent} from './home/home.component';
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
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalComponent } from './portal/portal.component';

@NgModule({
  declarations: [
      HeaderComponent,
      PortalComponent,
      HomeComponent,
      BaconDirective,
      PortalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    DragDropModule,
    PortalModule,
    ScrollingModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    OverlayModule

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
    entryComponents: [PortalComponent]
})
export class CoreModule { }
