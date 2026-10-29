import { Component } from '@angular/core';
import { VisitaForm } from './visita-form/visita-form';
import { VisitaLista } from './visita-lista/visita-lista';

@Component({
  selector: 'app-root',
  imports: [VisitaForm, VisitaLista],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
