import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonIcon, IonCard, IonCardContent, IonList, IonItem
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { rainyOutline } from 'ionicons/icons';

export interface SicknessInfo {
  precautions: string[];
  symptoms: string[];
  remedy: string[];
}

@Component({
  selector: 'app-rainy',
  templateUrl: 'rainy.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonIcon, IonCard, IonCardContent, IonList, IonItem
  ],
})
export class RainyPage {
  sicknessDetails: { [key: string]: SicknessInfo } = {
    'Leptospirosis': {
      precautions: ['Avoid walking or swimming in floodwater. Iwasan ang paglusong o paglangoy sa baha.', 'Wear boots and gloves if exposure is unavoidable. Magsuot ng boots at gloves kung hindi maiwasan ang baha.', 'Clean and cover wounds properly. Linisin at takpan ang sugat.', 'Control rats around your area. Panatilihing malinis ang paligid at iwasan ang daga.'],
      symptoms: ['High fever (mataas na lagnat)', 'Muscle pain, especially calves (pananakit ng kalamnan lalo sa binti)', 'Red eyes (pamumula ng mata)', 'Vomiting (pagsusuka)', 'Yellowing of skin/eyes (paninilaw)'],
      remedy: ['Seek medical help immediately. Magpatingin agad sa doktor.', 'Antibiotics are needed. Kailangan ng antibiotic.', 'Drink plenty of fluids. Uminom ng maraming tubig.']
    },
    'Dengue Fever': {
      precautions: ['Remove stagnant water. Tanggalin ang naipong tubig sa paligid.', 'Use mosquito repellent. Gumamit ng mosquito repellent.', 'Wear long sleeves and pants. Magsuot ng mahahabang damit.'],
      symptoms: ['Sudden high fever (biglaang mataas na lagnat)', 'Severe headache (matinding sakit ng ulo)', 'Joint and muscle pain (pananakit ng kasu-kasuan at kalamnan)', 'Skin rash (pantal)', 'Nose or gum bleeding (pagdurugo ng ilong/gilagid – warning sign)'],
      remedy: ['See a doctor immediately. Magpatingin agad sa doktor.', 'Drink lots of fluids. Uminom ng maraming tubig.', 'Take paracetamol only (avoid ibuprofen/aspirin).']
    },
    'Malaria': {
      precautions: ['Use mosquito nets. Gumamit ng kulambo.', 'Apply insect repellent. Maglagay ng insect repellent.'],
      symptoms: ['Fever with chills (lagnat na may panginginig)', 'Sweating (pagpapawis)', 'Headache (sakit ng ulo)', 'Fatigue (panghihina)'],
      remedy: ['Get tested immediately. Magpa-blood test agad.', 'Take prescribed antimalarial medicines fully.']
    },
    'Chikungunya': {
      precautions: ['Avoid mosquito bites. Iwasan ang kagat ng lamok.', 'Remove standing water.'],
      symptoms: ['Fever (lagnat)', 'Severe joint pain (matinding pananakit ng kasu-kasuan)', 'Rash (pantal)', 'Fatigue (panghihina)'],
      remedy: ['Rest and hydrate. Magpahinga at uminom ng tubig.', 'Take paracetamol.', 'Consult a doctor.']
    },
    'Common Cold': {
      precautions: ['Wash hands regularly. Madalas maghugas ng kamay.', 'Avoid close contact with sick people.'],
      symptoms: ['Runny/stuffy nose (sipon)', 'Sneezing (bahing)', 'Mild cough (ubo)', 'Sore throat (masakit na lalamunan)'],
      remedy: ['Rest. Magpahinga.', 'Drink warm fluids. Uminom ng mainit na sabaw o tsaa.']
    },
    'Flu (Influenza)': {
      precautions: ['Get vaccinated yearly. Magpa-flu vaccine taon-taon.', 'Wash hands often.'],
      symptoms: ['High fever (mataas na lagnat)', 'Body aches (pananakit ng katawan)', 'Chills (ginaw)', 'Dry cough (tuyong ubo)'],
      remedy: ['Rest and hydrate.', 'Take paracetamol.', 'Seek medical care if breathing becomes difficult.']
    },
    'Sore Throat': {
      precautions: ['Avoid sharing utensils. Huwag mag-share ng kutsara/baso.', 'Wash hands regularly.'],
      symptoms: ['Throat pain (masakit na lalamunan)', 'Difficulty swallowing (hirap lumunok)', 'Swollen glands (namamagang kulani)'],
      remedy: ['Gargle warm salt water. Magmumog ng maligamgam na tubig na may asin.', 'Drink warm tea with honey.']
    },
    'Diarrhea': {
      precautions: ['Drink clean or boiled water. Uminom ng pinakuluang o malinis na tubig.', 'Practice proper handwashing.'],
      symptoms: ['Loose watery stool (malabnaw na pagdumi)', 'Stomach cramps (pananakit ng tiyan)', 'Dehydration (panunuyo ng bibig, bihirang pag-ihi)'],
      remedy: ['Drink ORS (Oral Rehydration Solution). Uminom ng oresol.', 'Stay hydrated.', 'Seek doctor if severe.']
    },
    'Cholera': {
      precautions: ['Drink safe water only.', 'Avoid raw seafood.'],
      symptoms: ['Severe watery diarrhea', 'Vomiting', 'Rapid dehydration'],
      remedy: ['Seek emergency medical care immediately.', 'Drink ORS while going to hospital.']
    },
    'Typhoid Fever': {
      precautions: ['Eat well-cooked food. Siguraduhing lutong mabuti ang pagkain.', 'Avoid untreated water.'],
      symptoms: ['Persistent high fever (tuloy-tuloy na lagnat)', 'Weakness (panghihina)', 'Stomach pain (sakit ng tiyan)'],
      remedy: ['See a doctor for antibiotics.', 'Complete full medication course.', 'Rest and hydrate.']
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
    addIcons({ rainyOutline });
  }
}