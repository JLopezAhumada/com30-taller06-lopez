import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { Parcial2 } from './parcial2/parcial2';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'parcial2', component: Parcial2 },
];
