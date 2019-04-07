import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {
   @Input() uuid: string;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
  }

  movePortalOnTop() {
      this.homeService.moveOverlayOnTop(this.uuid);
      console.log('hello--->' + this.uuid);
  }

  close() {
    this.homeService.closeOverlay(this.uuid);
  }

}
