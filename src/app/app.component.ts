import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
        apiKey: 'AIzaSyCK4RE8FQte4DP6BT_D-60MyiHCX7Pc9mw',
        authDomain: 'udemy-mohan.firebaseapp.com'
    });
  }

  onNavidate(feature: string) {
    this.loadedFeature = feature;
  }
}
