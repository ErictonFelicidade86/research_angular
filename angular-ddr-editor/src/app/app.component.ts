import { Component, OnInit } from '@angular/core';

import { AdService } from './ad.service';
import { AdItem } from './ad-item';
import {ResizableDraggableComponent }from './resizable-draggable/resizable-draggable.component'

@Component({
  selector: 'app-root',
  template: ` 
    <div>
      <app-ad-banner [ads]="ads"></app-ad-banner>
    </div>
  `
})
export class AppComponent implements OnInit {
  ads: AdItem[];

  constructor(private adService: AdService) {}

  ngOnInit() {
    //this.ads = this.adService.getAds();
    this.ads = [new AdItem(ResizableDraggableComponent,{})];
  }


}

