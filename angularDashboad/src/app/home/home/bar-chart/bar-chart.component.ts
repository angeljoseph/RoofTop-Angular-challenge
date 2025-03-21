import { Component,AfterViewInit, OnInit  } from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit{
  
  patientData: any;
  labelData: any;
  chartData: any;
  daistolic: any;
  constructor(private service:ApiService){};
  
  ngOnInit(){
    this.loadData()
  }
  loadData()
  {
    this.service.getPatientsData().subscribe((data)=>
    {
      this.patientData = data;
      if (this.patientData && this.patientData.length > 0) {
        this.processPatientData(this.patientData[0]);  // Automatically process and display the chart for the first patient
      }
    })

  }
  processPatientData(item: any): void {
    debugger
    if (item) {
      const diagnosisHistory = item.diagnosis_history;
      // this.dataDisplay = item.diagnosis_history.respiratory_rate.value;

      // Extract 'month' for labels
      this.labelData = diagnosisHistory.map((data: any) =>{
        const year = data.year;  // Access year
        const month = data.month;  // Access month (should be a string like 'January', 'February', etc.)
        return `${year}-${month}`;  // Format as '2024-March'
      });

      // Extract 'blood_pressure.systolic.value' for chart data
      this.chartData = diagnosisHistory.map((data: any) => data.blood_pressure.systolic.value); 
      this.daistolic = diagnosisHistory.map((data: any) => data.blood_pressure.diastolic.value)
      // this.dataDisplay = item;
    
    }

    this.createBarChart();  // Create or update the chart with new data
  }
  createBarChart(){
    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.labelData,  // Labels from patient data
        datasets: [
          {
            label: 'Systolic BP',
            data: this.chartData, // Replace with dynamic data
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'Diastolic BP',
            data: this.chartData,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
  

}
