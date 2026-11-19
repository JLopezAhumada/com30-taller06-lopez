import { Component } from '@angular/core';
import { VisitaForm } from '../visita-form/visita-form';
import { VisitaLista } from '../visita-lista/visita-lista';

@Component({
  selector: 'app-inicio',
  imports: [VisitaForm, VisitaLista],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {}
