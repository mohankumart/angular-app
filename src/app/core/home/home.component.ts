import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { BaconDirective } from './bacon.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  extraIngredient: string;

  constructor() { }

  @ViewChild('someInput')
  someInput: ElementRef;

  @ViewChild(BaconDirective)
  set appBacon(directive: BaconDirective) {
      this.extraIngredient = directive.ingredient;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.someInput.nativeElement.value = 'Hello World !';
    console.log(this.extraIngredient);
  }
}
