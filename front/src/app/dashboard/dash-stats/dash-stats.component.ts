import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-dash-stats',
  templateUrl: './dash-stats.component.html',
  styleUrls: ['./dash-stats.component.css']
})
export class DashStatsComponent implements OnInit {
  loadCounter = 0;
  centerText = "wow";
  driveAccessToken = localStorage.getItem('driveAccessToken');
  sheetId = localStorage.getItem('sheetId')
  selectedAnul = '';
  Anul = [];
  tableData = [];
  tableClicked = false;
  public pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      arc: {
        borderWidth: 0,
      },
      center: {
        text: this.centerText
      }
    },
    legend: {
      display: true,
      position: 'top',

    },
    tooltips: {
      enabled: true,
      mode: 'label',
      callbacks: {
        label: function (tooltipItem, data) {
          var indice = tooltipItem.index;
          return data.datasets[0].data[indice] + " %";
        }
      }
    },
    cutoutPercentage: 35,
  };
  public pieChartLabels: Label[] = ['Avizate', 'Respinse'];
  public pieChartData = [];
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public doughnutColors: Array<any> = [
    {
      // all colors in order
      backgroundColor: [
        'green',
        '#e62a2a',
      ],
    },
  ];
  constructor(private http: HttpClient, private authService: AuthService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.getAnul();
  }

  getAnul() {
    for (let index = 2021; index >= 2006; index--) {
      this.Anul.push(index);
    }
    this.selectedAnul = this.Anul[0];
    this.getChartDataFromYear(this.selectedAnul);
  }
  YearChanged() {
    this.getChartDataFromYear(this.selectedAnul);
  }

  getChartDataFromYear(y) {
    this.loadCounter += 1;
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.driveAccessToken}`)
    }
    const payload = {
      sheetId: this.sheetId,
      workSheetName: 'Sheet1',
      year: String(y)
    }
    this.http.post(environment.baseUrl + 'statistics/count', payload, header).subscribe(
      (res: any) => {
        this.loadCounter -= 1;
        if (res) {
          const data = Object.values(res);
          let sum = 0;
          data.forEach(element => {
            sum += Number(element);
          });
          if (sum > 0) {
            data.forEach(o => {
              this.pieChartData.push(((Number(o) / sum) * 100));
            })
          } else {
            this.pieChartData = [];
          }
        }
      },
      err => {
        this.loadCounter -= 1;
        if(err.status === 401) {
          this.authService.renewToken.subscribe(
            (res: any) => {
              this.getChartDataFromYear(y);
            },
            err => {
              // this.authService.logout();
              console.log(err);
            }
          )         }
      }
    )
  }
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    if (active[0]) {
      this.tableClicked = true;
      const model = active[0]['_model'];
      this.centerText = model.label;
      this.getTableData(this.centerText);
    }
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }


  getTableData(label) {
    let labelQuery = '';
    if (label === 'Avizate') {
      labelQuery = 'Admitere';
    } else {
      labelQuery = 'Respingere';
    }
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.driveAccessToken}`)
    }
    const payload = {
      sheetId: this.sheetId,
      workSheetName: 'Sheet1',
      stareCurrenta: 'Solutionata - ' + labelQuery
    }
    this.http.post(environment.baseUrl + 'statistics/record', payload, header).subscribe(
      (res: any) => {
        this.tableData = res.data;
      },
      err => {
        if(err.status === 401) {
          this.authService.renewToken.subscribe(
            (res: any) => {
              this.getTableData(label);
            },
            err => {
              // this.authService.logout();
              console.log(err);
            }
          )         }
      }
    )
  }

}
