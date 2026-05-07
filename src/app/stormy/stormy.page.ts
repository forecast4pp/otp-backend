import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonIcon, IonCard, IonCardContent, IonList, IonItem
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { thunderstormOutline } from 'ionicons/icons';

export interface SicknessInfo {
  precautions: string[];
  symptoms: string[];
  remedy: string[];
}

@Component({
  selector: 'app-stormy',
  templateUrl: 'stormy.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonIcon, IonCard, IonCardContent, IonList, IonItem
  ],
})
export class StormyPage {
  sicknessDetails: { [key: string]: SicknessInfo } = {
    'Leptospirosis': {
      precautions: ['Avoid walking in floodwater. Iwasan ang paglusong sa baha.', 'Wear boots and protective gear if unavoidable. Magsuot ng boots at proteksyon kung kailangan lumusong sa baha.', 'Keep wounds covered and clean. Takpan at linisin ang sugat.', 'Avoid contact with dirty water.'],
      symptoms: ['High fever (mataas na lagnat)', 'Muscle pain (pananakit ng kalamnan)', 'Red eyes (pamumula ng mata)', 'Vomiting (pagsusuka)', 'Yellowing of skin/eyes (paninilaw ng balat/mata)'],
      remedy: ['Seek medical attention immediately. Magpatingin agad sa doktor.', 'Start antibiotics as prescribed.', 'Drink plenty of fluids.']
    },
    'Skin Infections': {
      precautions: ['Avoid prolonged contact with dirty water. Iwasan ang matagal na pagkababad sa maruming tubig.', 'Keep skin clean and dry. Panatilihing malinis at tuyo ang balat.', 'Change wet clothes immediately. Magpalit agad ng basang damit.'],
      symptoms: ['Redness (pamumula)', 'Itching (pangangati)', 'Rashes (pantal)', 'Swelling (pamamaga)'],
      remedy: ['Clean affected area with clean water. Linisin ang apektadong bahagi.', 'Apply antiseptic if available.', 'Seek medical help if it worsens.']
    },
    'Tetanus': {
      precautions: ['Avoid stepping on sharp or rusty objects. Iwasan ang matutulis o kalawangin na bagay.', 'Keep wounds clean and covered.', 'Get tetanus vaccination.'],
      symptoms: ['Muscle stiffness (paninigas ng kalamnan)', 'Jaw locking (paninigas ng panga / “lockjaw”)', 'Difficulty swallowing (hirap lumunok)', 'Body spasms (pangingisay)'],
      remedy: ['Go to hospital immediately. Pumunta agad sa ospital.', 'Tetanus treatment and vaccine may be needed.']
    },
    'Diarrheal Diseases': {
      precautions: ['Drink clean or boiled water only. Uminom ng malinis o pinakuluang tubig.', 'Avoid eating contaminated food.', 'Wash hands frequently.'],
      symptoms: ['Frequent loose stool (madalas na pagtatae)', 'Stomach cramps (pananakit ng tiyan)', 'Dehydration (panunuyo ng katawan)', 'Nausea (pagduduwal)'],
      remedy: ['Drink ORS (Oral Rehydration Solution). Uminom ng oresol.', 'Stay hydrated.', 'Seek medical help if severe or persistent.']
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
    addIcons({ thunderstormOutline });
  }
}