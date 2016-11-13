
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './service/logged-in.guard';
import { LoginComponent }       from './components/LoginComponent/login.component';
import { HomeComponent } from "./components/HomeComponent/home.component";
import { AboutComponent } from "./components/AboutComponent/about.component";

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
   {
    path: 'about',
    component: AboutComponent
  },
  {
     path: 'auth/login',
    component: LoginComponent
  }


];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);