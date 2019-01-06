import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {  NgxEchartsModule } from 'ngx-echarts';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ChartsComponent } from './charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
