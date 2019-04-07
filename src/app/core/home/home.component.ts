import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, OnDestroy, ViewContainerRef } from '@angular/core';
import { OverlayRef, Overlay, OverlayConfig, OverlayContainer } from '@angular/cdk/overlay';
import { ComponentPortal} from '@angular/cdk/portal';
import { PortalComponent } from '../portal/portal.component';
import { v4 as uuid } from 'uuid';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(TemplateRef) dialogTemplate: TemplateRef<any>;

  private overlayRef: OverlayRef;
  private componentPortal: ComponentPortal<PortalComponent>;
  private counter = 0;
  private componetRef: PortalComponent;

  constructor(private overlay: Overlay, private homeService: HomeService) {}




  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.overlayRef.dispose();
  }

  openDialog() {
    this.componentPortal = new ComponentPortal(PortalComponent);
    const overlayConfig = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: false
    });
    const uniqueId = uuid();
    this.overlayRef = this.overlay.create(overlayConfig);
    this.overlayRef.hostElement.style.zIndex = this.counter.toString();
    this.overlayRef.hostElement.setAttribute('id', uniqueId);
    this.componetRef = this.overlayRef.attach(this.componentPortal).instance as PortalComponent;
    this.componetRef.uuid = uniqueId;
    this.homeService.overlayRefs.push({uuid: this.componetRef.uuid, overlayRef: this.overlayRef});
    this.counter++;
  }

  ngOnInit() {

  }
}

