import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterestlistComponent } from './interestlist/interestlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'interestlist' },
  { path: 'interestlist', component: InterestlistComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterestRoutingModule { }
