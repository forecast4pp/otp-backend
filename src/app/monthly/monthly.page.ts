import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonDatetimeButton, IonModal, IonCard, IonCardContent,
  IonIcon, IonLabel, IonButtons, IonBackButton, IonDatetime,
  IonMenu, IonMenuToggle, IonList, IonItem, IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  calendarOutline, partlySunnyOutline, sunnyOutline,
  cloudOutline, rainyOutline, thunderstormOutline, snowOutline
} from 'ionicons/icons';

interface WeeklyForecast {
  label: string;
  avgTemp: number;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.page.html',
  styleUrls: ['./monthly.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonDatetimeButton,
    IonModal,
    IonCard,
    IonDatetime,
    IonCardContent,
    IonIcon,
    IonLabel,
    IonButtons,
    IonBackButton,
    IonMenu,
    IonMenuToggle,
    IonList,
    IonItem,
    IonSpinner
  ]
})
export class MonthlyPage implements OnInit {
  weeksForecast: WeeklyForecast[] | null = null;
  selectedMonth: string = new Date().toISOString(); // Default to current month
  isLoading = false;
  error: string | null = null;

  constructor() {
    addIcons({
      calendarOutline, partlySunnyOutline, sunnyOutline,
      cloudOutline, rainyOutline, thunderstormOutline, snowOutline
    });
  }

  ngOnInit() {
    // Initialize with the current month's forecast
    const today = new Date();
    this.fetchWeeklyForecast(today.getFullYear(), today.getMonth() + 1);
  }

  onMonthChange(event: CustomEvent) {
    const dateString = event.detail.value;
    if (dateString) {
      this.selectedMonth = dateString;
      const date = new Date(dateString);
      this.fetchWeeklyForecast(date.getFullYear(), date.getMonth() + 1);
    }
  }

  fetchWeeklyForecast(year: number, month: number) {
    this.isLoading = true;
    this.error = null;

    // Simulate API call delay
    setTimeout(() => {
      const forecast: WeeklyForecast[] = [];
      try {
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const lastDayOfMonth = new Date(year, month, 0);

        // Find the start of the first week to display (Sunday of the week containing the 1st of the month)
        const startDayOfGrid = new Date(firstDayOfMonth);
        startDayOfGrid.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay()); // Adjust to Sunday (0)

        let currentWeekStart = new Date(startDayOfGrid);
        let weekCounter = 1;

        // Iterate for a maximum of 6 weeks to cover all possible month layouts
        for (let i = 0; i < 6; i++) {
          const weekEnd = new Date(currentWeekStart);
          weekEnd.setDate(currentWeekStart.getDate() + 6);

          // Check if this week has any overlap with the target month
          const weekHasOverlap = (currentWeekStart <= lastDayOfMonth && weekEnd >= firstDayOfMonth);

          if (weekHasOverlap) {
            // Clamp the display dates to the actual month boundaries for the label
            const displayStart = new Date(Math.max(firstDayOfMonth.getTime(), currentWeekStart.getTime()));
            const displayEnd = new Date(Math.min(lastDayOfMonth.getTime(), weekEnd.getTime()));

            const weekLabel = `Week ${weekCounter} (${displayStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${displayEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;

            // Simulate weather data for the week
            const randomWeatherCode = Math.floor(Math.random() * 100); // Random code for description/icon
            const avgTemp = Math.floor(Math.random() * (35 - 15 + 1)) + 15; // Temp between 15 and 35

            forecast.push({
              label: weekLabel,
              avgTemp: avgTemp,
              description: this.getWeatherDescription(randomWeatherCode),
              icon: this.getWeatherIcon(randomWeatherCode)
            });
            weekCounter++;
          }

          // Move to the start of the next week
          currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        }
        this.weeksForecast = forecast;
        this.isLoading = false;
      } catch (e) {
        console.error('Error fetching weekly forecast:', e);
        this.error = 'Failed to load monthly forecast.';
        this.isLoading = false;
      }
    }, 500); // Simulate network delay
  }

  /**
   * Maps WMO Weather interpretation codes to human readable strings.
   * @see https://open-meteo.com/en/docs
   */
  private getWeatherDescription(code: number): string {
    const codes: { [key: number]: string } = {
      0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Fog', 48: 'Depositing rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle',
      55: 'Dense drizzle', 61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
      71: 'Slight snow fall', 73: 'Moderate snow fall', 75: 'Heavy snow fall',
      80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
      95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail',
    };
    return codes[code] || 'Unknown weather condition';
  }

  /**
   * Maps WMO Weather codes to Ionicons names.
   */
  private getWeatherIcon(code: number): string {
    // Clear sky
    if (code === 0) return 'sunny-outline';
    // Sunny / Mainly clear / Partly cloudy
    if (code >= 1 && code <= 2) return 'partly-sunny-outline';
    // Overcast / Fog
    if (code === 3 || code === 45 || code === 48) return 'cloud-outline';
    // Drizzle / Rain / Rain showers
    if ((code >= 51 && code <= 65) || (code >= 80 && code <= 82)) return 'rainy-outline';
    // Snow
    if (code >= 71 && code <= 75) return 'snow-outline';
    // Thunderstorm
    if (code >= 95 && code <= 99) return 'thunderstorm-outline';
    return 'partly-sunny-outline'; // Default icon
  }
}
