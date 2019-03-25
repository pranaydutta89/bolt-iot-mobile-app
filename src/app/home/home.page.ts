import { Component } from '@angular/core';
import { ILineChartData } from '../interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  chartData: ILineChartData = {
    xAxis: ['Jan', 'Feb', 'Mar'],
    yAxis: [1, 2, 3, 4, 5]
  };

}
