import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsComponent } from "./charts/charts.component";
const routes: Routes = [{
  path : '' , component : ChartsComponent 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
