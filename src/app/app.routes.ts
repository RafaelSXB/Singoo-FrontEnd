import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { Catalog } from './pages/catalog/catalog';

export const routes: Routes = [
    { path: '', component: LandingPage },
    { path: 'catalog', component: Catalog },
    { path: '**', redirectTo: '' }
];
