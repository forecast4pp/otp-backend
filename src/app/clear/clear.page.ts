import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonIcon, IonCard, IonCardContent, IonList, IonItem
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sunnyOutline } from 'ionicons/icons'; // Using sunnyOutline for clear

export interface SicknessInfo {
  precautions: string[];
  symptoms: string[];
  remedy: string[];
}

@Component({
  selector: 'app-clear',
  templateUrl: 'clear.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonIcon, IonCard, IonCardContent, IonList, IonItem
  ],
})
export class ClearPage {
  sicknessDetails: { [key: string]: SicknessInfo } = {
    'Dry Skin': {
      precautions: ['Moisturize regularly. Maglagay ng moisturizer palagi.', 'Avoid long exposure to sun and wind. Iwasan ang sobrang bilad at hangin.', 'Drink plenty of water. Uminom ng maraming tubig.'],
      symptoms: ['Flaky or rough skin (magaspang o natutuklap na balat)', 'Itching (pangangati)', 'Tight skin feeling (paninikip ng balat)'],
      remedy: ['Apply moisturizer or lotion. Maglagay ng lotion o moisturizer.', 'Stay hydrated.', 'Avoid harsh soaps.']
    },
    'Nosebleed': {
      precautions: ['Avoid dry or very hot environments. Iwasan ang sobrang tuyong o mainit na lugar.', 'Keep nasal passages moist. Panatilihing mamasa-masa ang ilong.', 'Avoid picking the nose. Iwasan ang pagsinghot o pagkamot ng ilong.'],
      symptoms: ['Bleeding from the nose (pagdurugo ng ilong)', 'Dizziness (in some cases) (pagkahilo)'],
      remedy: ['Sit upright and lean forward. Umupo at bahagyang yumuko pasulong.', 'Pinch the nose for a few minutes. Pisilin ang ilong para huminto ang dugo.', 'Seek help if frequent or heavy bleeding.']
    },
    'Sinusitis': {
      precautions: ['Avoid dust and allergens. Iwasan ang alikabok at allergens.', 'Stay hydrated. Uminom ng sapat na tubig.', 'Avoid cold dry air exposure.'],
      symptoms: ['Facial pain or pressure (sakit sa mukha)', 'Nasal congestion (baradong ilong)', 'Headache (sakit ng ulo)', 'Thick nasal discharge (malapot na sipon)'],
      remedy: ['Steam inhalation. Mag-singaw para lumuwag ang ilong.', 'Drink warm fluids.', 'Take prescribed medication if needed.']
    },
    'Dry Cough': {
      precautions: ['Avoid dry air and smoke. Iwasan ang usok at tuyong hangin.', 'Stay hydrated.', 'Wear mask in dusty areas.'],
      symptoms: ['Persistent dry cough (tuyong ubo)', 'Throat irritation (hapdi sa lalamunan)', 'Mild chest discomfort (bahagyang pananakit ng dibdib)'],
      remedy: ['Drink warm water or tea. Uminom ng mainit na tubig o tsaa.', 'Use cough lozenges.', 'Rest your voice.']
    },
    'Eye Irritation': {
      precautions: ['Avoid dust and wind exposure. Iwasan ang alikabok at hangin.', 'Do not rub your eyes. Huwag kuskusin ang mata.', 'Wear protective eyewear if needed.'],
      symptoms: ['Red eyes (pamumula ng mata)', 'Itching (pangangati)', 'Watery eyes (pagluha ng mata)', 'Burning sensation (hapdi sa mata)'],
      remedy: ['Rinse eyes with clean water. Banlawan ang mata ng malinis na tubig.', 'Use eye drops if available.', 'Rest eyes from screens.']
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