import { Component, computed, inject } from '@angular/core';
import { VisitaService } from '../services/visita.service';

@Component({
  selector: 'app-resumen-visitas',
  templateUrl: './resumen-visitas.html',
  styleUrl: './resumen-visitas.css',
})
export class ResumenVisitas {
  private readonly servicio = inject(VisitaService);

  protected readonly programadas = computed(
    () => this.servicio.visitas().filter((v) => v.estado === 'Programada').length,
  );
  protected readonly enSitio = computed(
    () => this.servicio.visitas().filter((v) => v.estado === 'En sitio').length,
  );
  protected readonly finalizadas = computed(
    () => this.servicio.visitas().filter((v) => v.estado === 'Finalizada').length,
  );
  // visitante + sus acompañantes, de las visitas que siguen dentro
  protected readonly personasDentro = computed(() =>
    this.servicio
      .visitas()
      .filter((v) => v.estado === 'En sitio')
      .reduce((suma, v) => suma + 1 + v.acompanantes.length, 0),
  );
}
