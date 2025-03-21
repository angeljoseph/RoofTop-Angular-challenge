import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { ChartComponent } from './chart/chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ChartComponent,
    BarChartComponent,
    PieChartComponent
   
   
  ],
  imports: [
    CommonModule
  ],
  exports:[HomeComponent,HeaderComponent,ChartComponent]
})
export class HomeModule { }
