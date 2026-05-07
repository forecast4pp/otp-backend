import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
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
  AlertController,
  LoadingController
} from '@ionic/angular/standalone';
import { db } from '../../../firebase key';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
export class RegisterPage implements OnInit {
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  suffix: string = '';
  username: string = '';
  phoneNumber: string = '';
  address: string = '';
  age: string = '';
  birthday: string = '';
  email: string = '';
  pin: string = '';
  confirmPin: string = '';

  constructor(
    private router: Router, 
    private alertController: AlertController,
    private loadingController: LoadingController,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

async onRegister() {

  if (!this.firstName || !this.lastName || !this.username || !this.phoneNumber ||
      !this.address || !this.age || !this.birthday ||
      !this.email || !this.pin || !this.confirmPin) {
    this.showAlert('Error', 'Please fill in all fields.');
    return;
  }

  if (this.pin !== this.confirmPin) {
    this.showAlert('Error', 'PINs do not match.');
    return;
  }

  if (this.pin.length !== 6 || !/^\d+$/.test(this.pin)) {
    this.showAlert('Error', 'PIN must be exactly 6 digits.');
    return;
  }

  const loading = await this.loadingController.create({
    message: 'Creating account...',
  });
  await loading.present();

  try {

    // Generate OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save directly to Firestore
    const docRef = await addDoc(collection(db, 'accounts'), {
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      suffix: this.suffix,
      username: this.username,
      phoneNumber: this.phoneNumber,
      address: this.address,
      age: this.age,
      birthday: this.birthday,
      email: this.email,
      pin: this.pin,
      createdAt: serverTimestamp(),
      otp: generatedOtp,
      isVerified: false
    });

    // 🔥 SEND OTP USING RENDER BACKEND
    await lastValueFrom(
      this.http.post('https://otp-backend-5x4t.onrender.com/send-otp', {
        email: this.email,
        otp: generatedOtp,
        firstName: this.firstName
      })
    );

    await loading.dismiss();

    // Redirect to OTP page
    this.router.navigate(['/verify'], { 
  queryParams: { 
    email: this.email, 
    docId: docRef.id 
  } 
});

  } catch (error: any) {
    await loading.dismiss();
    console.error(error);
    this.showAlert('Registration Failed', 'Could not create account or send OTP.');
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