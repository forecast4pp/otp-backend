
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, 
  IonButton, IonSpinner,
  IonMenu, IonMenuButton, IonButtons, IonList, IonItem, IonIcon, IonLabel, IonMenuToggle
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, partlySunnyOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    HttpClientModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonSpinner,
    IonMenu,
    IonMenuButton,
    IonButtons,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonMenuToggle,
  ],
})
export class HomePage implements OnInit {
  weather: any = null;
  isLoading = false;
  error: string | null = null;

  private readonly lat = 15.3061; // Poblacion, San Isidro, Nueva Ecija
  private readonly lon = 120.9069;

  constructor(private http: HttpClient) {
    addIcons({ homeOutline, partlySunnyOutline });
  }

  ngOnInit() {
    this.fetchWeather();
  }

  fetchWeather() {
    this.isLoading = true;
    this.error = null;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`;

    this.http.get(url).subscribe({
      next: (data: any) => {
        const now = new Date();
        this.weather = {
          location: 'Poblacion, San Isidro, Nueva Ecija',
          temperature: Math.round(data.current_weather.temperature),
          description: this.getWeatherDescription(data.current_weather.weathercode),
          climateRoute: this.getClimateRoute(data.current_weather.weathercode),
          weathercode: data.current_weather.weathercode,
          todayDate: now.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' }),
          todayDay: now.toLocaleDateString('en-PH', { weekday: 'long' }),
          forecast: data.daily.time.map((t: string, i: number) => {
            return {
              day: new Date(t).toLocaleDateString('en-PH', { weekday: 'short' }),
              date: new Date(t).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' }),
              maxTemp: Math.round(data.daily.temperature_2m_max[i]),
              minTemp: Math.round(data.daily.temperature_2m_min[i]),
              description: this.getWeatherDescription(data.daily.weathercode[i])
            };
          })
        };
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Unable to load weather. Please check your API key or connection.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Maps WMO Weather interpretation codes to human readable strings.
   * @see https://open-meteo.com/en/docs
   */
  private getWeatherDescription(code: number): string {
    const codes: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow fall',
      73: 'Moderate snow fall',
      75: 'Heavy snow fall',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail',
    };
    return codes[code] || 'Unknown weather condition';
  }

  /**
   * Maps WMO Weather codes to specific climate detail routes.
   */
  private getClimateRoute(code: number): string {
    // Clear sky
    if (code === 0) return '/clear';
    // Sunny / Mainly clear
    if (code === 1 || code === 2) return '/sunny';
    // Cloudy / Fog
    if (code === 3 || code === 45 || code === 48) return '/cloudy';
    // Rain / Drizzle / Showers / Snow
    if (code >= 51 && code <= 82) return '/rainy';
    // Thunderstorm
    if (code >= 95 && code <= 99) return '/stormy';
    return '/home';
  }
}
