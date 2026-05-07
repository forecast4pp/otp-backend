import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonIcon, IonCard, IonCardContent, IonList, IonItem
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cloudOutline } from 'ionicons/icons';

export interface SicknessInfo {
  precautions: string[];
  symptoms: string[];
  remedy: string[];
}

@Component({
  selector: 'app-cloudy',
  templateUrl: 'cloudy.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonIcon, IonCard, IonCardContent, IonList, IonItem
  ],
})
export class CloudyPage {
  sicknessDetails: { [key: string]: SicknessInfo } = {
    'Flu / Common Cold': {
      precautions: ['Wash hands regularly. Madalas maghugas ng kamay.', 'Avoid close contact with sick people. Iwasan ang close contact sa may sakit.', 'Keep the body warm. Panatilihing mainit ang katawan.'],
      symptoms: ['Runny or stuffy nose (sipon / baradong ilong)', 'Sneezing (bahing)', 'Cough (ubo)', 'Mild fever (bahagyang lagnat)', 'Fatigue (panghihina)'],
      remedy: ['Rest and sleep well. Magpahinga at matulog nang maayos.', 'Drink warm fluids. Uminom ng mainit na tubig o sabaw.', 'Take over-the-counter cold medicine if needed.']
    },
    'Migraine': {
      precautions: ['Avoid stress and lack of sleep. Iwasan ang stress at kulang sa tulog.', 'Limit exposure to strong smells or bright screens. Iwasan ang matinding ilaw o screen time.'],
      symptoms: ['Severe headache (matinding sakit ng ulo)', 'Sensitivity to light/sound (sensitibo sa ilaw at ingay)', 'Nausea (pagkahilo o pagsusuka)', 'Blurred vision (panlalabo ng paningin)'],
      remedy: ['Rest in a quiet, dark room. Magpahinga sa tahimik at madilim na lugar.', 'Drink water.', 'Take prescribed pain relievers if needed.']
    },
    'Body Pain': {
      precautions: ['Keep warm during cold/cloudy weather. Panatilihing mainit ang katawan.', 'Do light stretching or exercise. Mag-stretching o light exercise.'],
      symptoms: ['Muscle aches (pananakit ng kalamnan)', 'Joint pain (sakit ng kasu-kasuan)', 'Body stiffness (paninigas ng katawan)', 'Fatigue (panghihina)'],
      remedy: ['Rest and avoid overexertion. Magpahinga at iwasan ang mabibigat na gawain.', 'Warm compress on painful areas. Maglagay ng warm compress.', 'Take pain relievers if needed.']
    },
    'Allergies': {
      precautions: ['Avoid dust and allergens. Iwasan ang alikabok at allergens.', 'Keep windows closed during windy/cloudy weather. Isara ang bintana kapag maalikabok o maulap.', 'Wear mask if needed. Magsuot ng mask kung sensitive sa alikabok.'],
      symptoms: ['Sneezing (bahing)', 'Itchy eyes or nose (makating mata/ilong)', 'Skin rash (pantal)', 'Runny nose (sipon)'],
      remedy: ['Take antihistamines if prescribed. Uminom ng anti-allergy medicine kung inireseta.', 'Avoid triggers.', 'Rest and stay in clean environment.']
    }
  };

  openSicknessInfo(name: string) {
    const details = this.sicknessDetails[name];
    this.router.navigate(['/sickinfo'], { 
      state: { 
        name, 
        info: details 
      } 
    });
  }

  constructor(private router: Router) {
    addIcons({ cloudOutline });
  }
}