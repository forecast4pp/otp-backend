import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-sickinfo',
  templateUrl: './sickinfo.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton
  ]
})
export class SickinfoPage implements OnInit {
  sicknessName: string = 'Sickness Detail';
  info: any = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.sicknessName = navigation.extras.state['name'];
      this.info = navigation.extras.state['info'];
    }
  }

  ngOnInit() {
    // If state is lost (e.g. on page refresh), you could redirect or show a message
    if (!this.info) {
      console.warn('No sickness data found in state');
    }
  }

  getEnglish(text: string): string {
    if (text.includes('. ')) return text.split('. ')[0] + '.';
    if (text.includes(' (')) return text.split(' (')[0];
    return text;
  }

  getTagalog(text: string): string {
    if (text.includes('. ')) return text.split('. ').slice(1).join('. ');
    if (text.includes(' (')) return text.split(' (')[1].replace(')', '');
    return '';
  }
}