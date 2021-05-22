import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Editor2Component } from './editor2/editor2.component';
import { KonvaModule } from 'ng2-konva';
import { TextNodeService } from './services/text-node.service';
import { ShapeService } from './services/shape.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, Editor2Component],
  imports: [BrowserModule, AppRoutingModule, CKEditorModule, BrowserAnimationsModule, DragDropModule, KonvaModule],
  providers: [TextNodeService, ShapeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
