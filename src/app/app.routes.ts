import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { Catalog } from './pages/catalog/catalog';
import { Stage } from './pages/stage/stage';

export const routes: Routes = [
    { path: '', component: LandingPage },
    { path: 'catalog', component: Catalog },
     { path: 'stage/:id/:nameSong', component: Stage },
    { path: '**', redirectTo: '' },
   
];
