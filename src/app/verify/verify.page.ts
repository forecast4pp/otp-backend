import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonList, IonItem,
  IonInput, IonButton
} from '@ionic/angular/standalone';

import { db } from '../../../firebase key';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonCard, IonCardHeader, IonCardTitle,
    IonCardContent, IonList, IonItem,
    IonInput, IonButton,
    CommonModule, FormsModule
  ]
})
export class VerifyPage implements OnInit {

  otpInput: string = '';
  docId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.docId = params['docId'];
    });
  }

  async verifyOtp() {
    if (!this.otpInput) return;

    const ref = doc(db, 'accounts', this.docId);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      alert('Account not found');
      return;
    }

    const data = snap.data();

    if (data['otp'] === this.otpInput) {

      await updateDoc(ref, {
        isVerified: true
      });

      alert('Verified successfully!');
      this.router.navigate(['/login']);

    } else {
      alert('Invalid OTP');
    }
  }
}