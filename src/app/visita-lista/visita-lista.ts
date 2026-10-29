import { Component, inject } from '@angular/core';
import { VisitaService } from '../services/visita.service';
import { ResumenVisitas } from '../resumen-visitas/resumen-visitas';

@Component({
  selector: 'app-visita-lista',
  imports: [ResumenVisitas],
  templateUrl: './visita-lista.html',
  styleUrl: './visita-lista.css',
})
export class VisitaLista {
  protected readonly servicio = inject(VisitaService);
}
