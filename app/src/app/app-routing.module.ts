import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchPageComponent} from './search-page/search-page.component';
import {TeamPageComponent} from './team-page/team-page.component';


const routes: Routes = [
  {
    path: '',
    component: SearchPageComponent,
  },
  {
    path: 'team/:teamName',
    component: TeamPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
