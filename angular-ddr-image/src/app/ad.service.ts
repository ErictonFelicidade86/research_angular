import { Injectable } from '@angular/core';

import { AdItem } from './ad-item';
import {ResizableDraggableComponent }from './resizable-draggable/resizable-draggable.component'

@Injectable()
export class AdService {
  getAds() {
    return [

      new AdItem(ResizableDraggableComponent,{}),
    ];
  }
}
