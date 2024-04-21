import {Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {PopupRedirectComponent} from "./components/login/popup-redirect/popup-redirect.component";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'popup-redirect',
    loadComponent: () => PopupRedirectComponent
  },
  {
    path: 'login',
    loadComponent: () => LoginComponent
  },
  {
    path: 'dashboard',
    loadComponent: () => DashboardComponent
  },
  {
    path: 'user',
    loadComponent: () => DashboardComponent
  }
];
