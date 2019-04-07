import { Injectable } from '@angular/core';
import { Overlay, OverlayRef, OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  overlayRefs: { uuid: string, overlayRef: OverlayRef }[] = [];
  constructor(private overlayContainer: OverlayContainer) { }

  deleteOverlay(uuid: string) {
    this.overlayRefs = this.overlayRefs.filter((obj) => {
       return obj.uuid !== uuid;
    });
  }

  getOverlayRef(uuid: string) {
    return this.overlayRefs.filter((obj) => {
        return obj.uuid === uuid;
    })[0].overlayRef;
  }

  moveOverlayOnTop(uuid: string) {
    const currentZIndex = parseInt(document.getElementById(uuid).style.zIndex, 10);
    const maxZIndex = this.getMaxZindexofOverlays();

    if (currentZIndex <= maxZIndex) {
        this.getOverlayRef(uuid).hostElement.style.zIndex = (maxZIndex + 1).toString();
    }
  }

  getMaxZindexofOverlays() {
    let zIndex = 0;
    const overlayHostElements = this.overlayContainer.getContainerElement().children;

    const overlayHostElementsArray = Array.from(overlayHostElements);
    overlayHostElementsArray.forEach((overlayHostElement) => {
        const elementZIndex = parseInt((overlayHostElement as HTMLElement).style.zIndex, 10);
        if (elementZIndex > zIndex) {
            zIndex = elementZIndex;
        }
    });
    return zIndex;
  }

  closeOverlay(uuid: string) {
    this.getOverlayRef(uuid).detach();
    this.deleteOverlay(uuid);
  }

}
