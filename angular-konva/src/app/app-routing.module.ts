import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Editor2Component } from './editor2/editor2.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'editor',
    component: Editor2Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
