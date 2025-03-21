import { Component, OnInit, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnDestroy {
  patientData: any;
  labelData: any;
  systolicData: any;
  diastolicData: any;
  pieChart: any;

  constructor(private service: ApiService) {}

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    if (this.pieChart) {
      this.pieChart.destroy(); // Clean up chart on component destroy
    }
  }

  loadData() {
    this.service.getPatientsData().subscribe((data) => {
      this.patientData = data;
      if (this.patientData && this.patientData.length > 0) {
        this.processPatientData(this.patientData[0]); // Process first patient initially
      }
    });
  }

  processPatientData(item: any): void {
    if (item) {
      const diagnosisHistory = item.diagnosis_history;

      // Extract month-year labels
      this.labelData = diagnosisHistory.map((data: any) => `${data.year}-${data.month}`);

      // Extract systolic & diastolic values
      this.systolicData = diagnosisHistory.map((data: any) => data.blood_pressure.systolic.value);
      this.diastolicData = diagnosisHistory.map((data: any) => data.blood_pressure.diastolic.value);
    }

    this.createPieChart(); // Update the chart
  }

  createPieChart() {
    if (this.pieChart) {
      this.pieChart.destroy(); // Destroy existing chart before creating a new one
    }

    this.pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: this.labelData, // Months as labels
        datasets: [
          {
            label: 'Systolic Pressure',
            data: this.systolicData,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
            borderWidth: 1
          },
          {
            label: 'Diastolic Pressure',
            data: this.diastolicData,
            backgroundColor: ['#FF5733', '#33FFBD', '#FFC300', '#8E44AD'],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }
}
