import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../api.service';
import { Chart, registerables } from 'chart.js';

// Register all chart components
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: false,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @ViewChild('myChart') myChart: ElementRef | undefined;
  patientData: any;
  labelData: string[] = [];  // Initialize labelData as an empty array
  chartData: any[] = [];     // Initialize chartData as an empty array
  chart: any;  // Define chart instance to manage it
  respiratory_rate: any;
  dataDisplay: any;
  daistolic: any;
  displayChart: any='line';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPatientData();  // Load patient data when component initializes
  }

  // Handle chart update on patient click
  loadchart(item: any): void {
    debugger
    console.log(item);  // Debugging: Log selected item to see the clicked patient
    this.processPatientData(item);  // Process and update chart data based on selected patient
  }

  // Process patient data to extract chart labels and data
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

    this.createChart();  // Create or update the chart with new data
  }

  // Create or update the chart with the latest data
  createChart(): void {
    // If chart exists, destroy it before creating a new one
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = (this.myChart?.nativeElement as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      // Create new chart
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.labelData,  // Labels from patient data
          datasets: [
            {
              label: 'Blood Pressure (Systolic)',
              data: this.chartData,  // Data points for the chart
              borderWidth: 1,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
            },
            {
              label: 'Diastolic Blood Pressure',
              data: this.chartData,  // Diastolic data for the Y-axis
              borderColor: 'rgba(255, 159, 64, 1)',  // Line color for diastolic
              backgroundColor: 'rgba(255, 159, 64, 0.2)',  // Light fill for diastolic line
              fill: true,  // Fill area under the line
              tension: 0.4,  // Smooth the line
              borderWidth: 2,  // Line width
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,  // Start y-axis from zero
            },
          },
        },
      });
    }
  }

  // Fetch patient data from the API
  loadPatientData(): void {
    this.apiService.getPatientsData().subscribe(
      (data) => {
        this.patientData = data;
        console.log(this.patientData);  // Debugging: Check the response data structure
        // Optionally, load the chart with data of the first patient by default
        if (this.patientData && this.patientData.length > 0) {
          this.processPatientData(this.patientData[0]);  // Automatically process and display the chart for the first patient
        }
      },
      (error) => {
        console.error('Error fetching patient data', error);  // Handle error
      }
    );
  }

  selectChart(charts:any)
  {
    debugger
    this.displayChart = charts;
    if (charts === 'line') {
      setTimeout(() => {
        this.loadPatientData(); // Ensure chart loads after view updates
      }, 10);
    }

  }
}
