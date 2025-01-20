import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {
  constructor(private http: HttpClient) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.fetchLoginData();
  }

  fetchLoginData(): void {
    this.http.get<any[]>('http://localhost:8080/api/auth/login-count').subscribe(data => {
      const labels = data.map(item => item.login_date);
      const loginCounts = data.map(item => item.login_count);
      this.createChart(labels, loginCounts);
    });
  }

  createChart(labels: string[], loginCounts: number[]): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'User Logins',
          data: loginCounts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: 'black', // Text color
              font: {
                size: 14, // Font size
                weight: 'bold', // Font weight
                style: 'italic' // Font style
              }
            }
          },
          x: {
            ticks: {
              color: 'black', // Text color
              font: {
                size: 14, // Font size
                weight: 'bold', // Font weight
                style: 'italic' // Font style
              }
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'black', // Text color
              font: {
                size: 14, // Font size
                weight: 'bold' // Font weight
              }
            }
          }
        }
      }
    });
  }
}
