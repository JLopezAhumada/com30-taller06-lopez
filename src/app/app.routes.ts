import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { NoEncontrado } from './no-encontrado/no-encontrado';
import { Detalle } from './parcial2/detalle/detalle';
import { Parcial2 } from './parcial2/parcial2';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'parcial2', component: Parcial2 },
  { path: 'parcial2/detalle/:codigo', component: Detalle },
  { path: '**', component: NoEncontrado },
];
