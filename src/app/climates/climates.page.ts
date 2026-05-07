import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButtons, IonBackButton, IonCard, IonIcon, IonList, IonItem, IonLabel 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { rainyOutline, sunnyOutline, cloudOutline, thunderstormOutline } from 'ionicons/icons';
 
@Component({
  selector: 'app-climates',
  templateUrl: 'climates.page.html',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonButtons, IonBackButton, IonCard, IonIcon, IonList, IonItem, IonLabel
  ],
})
export class ClimatesPage {
  climates = [
    { name: 'Rainy', icon: 'rainy-outline', color: '#41a0ae', description: 'Expect persistent rainfall and overcast skies. Perfect for a cozy day indoors.' },
    { name: 'Sunny', icon: 'sunny-outline', color: '#ffce00', description: 'Bright and clear skies with plenty of sunlight. Ideal for outdoor activities.' },
    { name: 'Cloudy', icon: 'cloud-outline', color: '#a2a2a2', description: 'Skies covered with clouds, limiting direct sunlight. A cool and pleasant atmosphere.' },
    { name: 'Stormy', icon: 'thunderstorm-outline', color: '#7b68ee', description: 'Severe weather with thunder, lightning, and heavy rain. Stay safe and avoid travel.' },
    { name: 'Clear', icon: 'sunny-outline', color: '#3ec995', description: 'Unobstructed views with no clouds in sight. Crisp air and great visibility.' }
  ];

  constructor() {
    addIcons({ rainyOutline, sunnyOutline, cloudOutline, thunderstormOutline });
  }
}