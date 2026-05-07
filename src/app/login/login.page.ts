import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  AlertController
} from '@ionic/angular/standalone';

import { db } from '../../../firebase key';
import { collection, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent, 
    IonList, 
    IonItem, 
    IonInput, 
    IonButton, 
    CommonModule,
    FormsModule,
    RouterLink
  ]
})
export class LoginPage implements OnInit {

  identifier: string = ''; // email OR username
  pin: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async onLogin() {

    if (!this.identifier || !this.pin) {
      this.showAlert('Error', 'Please enter email/username and PIN.');
      return;
    }

    try {
      const accountsRef = collection(db, 'accounts');
      const snapshot = await getDocs(accountsRef);

      let foundUser: any = null;

      snapshot.forEach(doc => {
        const data = doc.data();

        const emailMatch = data['email'] === this.identifier;
        const usernameMatch = data['username'] === this.identifier;
        const pinMatch = data['pin'] === this.pin;

        if ((emailMatch || usernameMatch) && pinMatch) {
          foundUser = data;
        }
      });

      if (!foundUser) {
        this.showAlert('Login Failed', 'Invalid credentials.');
        return;
      }

      if (!foundUser.isVerified) {
        this.showAlert('Not Verified', 'Please verify your account first.');
        return;
      }

      this.router.navigate(['/home']);

    } catch (error: any) {
      this.showAlert('Login Failed', error.message);
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}