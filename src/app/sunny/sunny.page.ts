import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonIcon, IonCard, IonCardContent, IonList, IonItem
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sunnyOutline } from 'ionicons/icons';

export interface SicknessInfo {
  precautions: string[];
  symptoms: string[];
  remedy: string[];
}

@Component({
  selector: 'app-sunny',
  templateUrl: 'sunny.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonIcon, IonCard, IonCardContent, IonList, IonItem
  ],
})
export class SunnyPage {
  sicknessDetails: { [key: string]: SicknessInfo } = {
    'Heat Exhaustion': {
      precautions: ['Avoid staying under the sun for too long. Iwasan ang matagal na pagbibilad sa araw.', 'Drink plenty of water. Uminom ng maraming tubig.', 'Wear light and breathable clothing. Magsuot ng preskong damit.'],
      symptoms: ['Heavy sweating (sobrang pagpapawis)', 'Weakness (panghihina)', 'Dizziness (nahihilo)', 'Headache (sakit ng ulo)', 'Nausea (pagduduwal)'],
      remedy: ['Rest in a cool place. Magpahinga sa malamig na lugar.', 'Drink water or electrolyte drinks.', 'Loosen clothing.']
    },
    'Heat Stroke (Life-Threatening)': {
      precautions: ['Avoid direct sunlight during peak hours (10AM–3PM). Iwasan ang init ng araw sa tanghali.', 'Stay hydrated at all times.', 'Never leave people inside hot vehicles.'],
      symptoms: ['High body temperature (sobrang taas na lagnat)', 'No sweating (hindi pinagpapawisan)', 'Confusion (pagkalito)', 'Rapid heartbeat (mabilis na tibok ng puso)', 'Fainting (nahihimatay)'],
      remedy: ['Call emergency help immediately. Magpa-emergency agad.', 'Move the person to a cool place.', 'Cool the body with wet cloth or ice packs.']
    },
    'Dehydration': {
      precautions: ['Drink water regularly. Uminom ng tubig palagi.', 'Avoid too much caffeine or alcohol.'],
      symptoms: ['Dry mouth (tuyong bibig)', 'Dark urine (maitim na ihi)', 'Dizziness (pagkahilo)', 'Fatigue (panghihina)'],
      remedy: ['Drink water immediately. Uminom agad ng tubig.', 'Take oral rehydration solution if needed.']
    },
    'Sunburn': {
      precautions: ['Use sunscreen. Maglagay ng sunscreen.', 'Wear hats or protective clothing. Magsuot ng sombrero o proteksyon sa balat.'],
      symptoms: ['Red skin (pamumula ng balat)', 'Pain or burning sensation (hapdi sa balat)', 'Blisters (severe cases)'],
      remedy: ['Apply aloe vera or cooling lotion. Maglagay ng pampalamig sa balat.', 'Avoid further sun exposure.']
    },
    'Heat Rash (Bungang Araw)': {
      precautions: ['Stay in cool and ventilated places. Manatili sa preskong lugar.', 'Wear loose clothing.'],
      symptoms: ['Small red bumps (maliliit na pantal)', 'Itchy skin (makating balat)', 'Irritation (hapdi)'],
      remedy: ['Keep skin cool and dry. Panatilihing malamig at tuyo ang balat.', 'Avoid scratching.']
    },
    'Food Poisoning': {
      precautions: ['Eat freshly cooked food. Kumain ng bagong lutong pagkain.', 'Avoid spoiled or uncovered food.', 'Wash hands before eating.'],
      symptoms: ['Nausea (pagduduwal)', 'Vomiting (pagsusuka)', 'Diarrhea (pagtatae)', 'Stomach pain (sakit ng tiyan)'],
      remedy: ['Drink lots of fluids. Uminom ng maraming tubig.', 'Rest the stomach (avoid heavy food).', 'Seek medical help if severe.']
    },
    'Headaches / Migraine': {
      precautions: ['Avoid extreme heat exposure. Iwasan ang sobrang init.', 'Stay hydrated.', 'Get enough sleep.'],
      symptoms: ['Head pain (sakit ng ulo)', 'Sensitivity to light (sensitibo sa ilaw)', 'Nausea (pagkahilo)'],
      remedy: ['Rest in a cool, quiet place. Magpahinga sa malamig at tahimik na lugar.', 'Drink water.', 'Take pain relievers if needed.']
    },
    'Low Blood Pressure': {
      precautions: ['Stay hydrated. Uminom ng sapat na tubig.', 'Avoid standing up too quickly. Iwasang biglang tumayo.'],
      symptoms: ['Dizziness (nahihilo)', 'Fainting (himatay)', 'Weakness (panghihina)', 'Blurred vision (panlalabo ng paningin)'],
      remedy: ['Lie down and elevate legs. Humiga at itaas ang paa.', 'Drink fluids.', 'Eat salty snacks if needed (if allowed by doctor).']
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
    addIcons({ sunnyOutline });
  }
}