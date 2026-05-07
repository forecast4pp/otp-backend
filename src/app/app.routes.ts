import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'forgotpass',
    loadComponent: () => import('./forgotpass/forgotpass.page').then( m => m.ForgotpassPage)
  },
  {
    path: 'verify',
    loadComponent: () => import('./verify/verify.page').then( m => m.VerifyPage)
  },
  {
    path: 'climates',
    loadComponent: () => import('./climates/climates.page').then(m => m.ClimatesPage)
  },
  {
    path: 'rainy',
    loadComponent: () => import('./rainy/rainy.page').then( m => m.RainyPage)
  },
  {
    path: 'sunny',
    loadComponent: () => import('./sunny/sunny.page').then( m => m.SunnyPage)
  },
  {
    path: 'cloudy',
    loadComponent: () => import('./cloudy/cloudy.page').then( m => m.CloudyPage)
  },
  {
    path: 'clear',
    loadComponent: () => import('./clear/clear.page').then( m => m.ClearPage)
  },
  {
    path: 'stormy',
    loadComponent: () => import('./stormy/stormy.page').then( m => m.StormyPage)
  },
  {
    path: 'monthly',
    loadComponent: () => import('./monthly/monthly.page').then( m => m.MonthlyPage)
  },
  {
    path: 'sickinfo',
    loadComponent: () => import('./sickinfo/sickinfo.page').then( m => m.SickinfoPage)
  },
];
