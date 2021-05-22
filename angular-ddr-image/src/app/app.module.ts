import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AdBannerComponent } from './ad-banner.component';
import { AdDirective } from './ad.directive';
import { AdService } from './ad.service';
import { ResizableDraggableComponent } from './resizable-draggable/resizable-draggable.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  imports: [ BrowserModule ,
            CKEditorModule],
  providers: [AdService],
  declarations: [ AppComponent,
                  AdBannerComponent,
                  AdDirective ,
                  ResizableDraggableComponent],
  entryComponents: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {}
}

