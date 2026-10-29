import { Injectable, computed, signal } from '@angular/core';
import { EstadoVisita, NuevaVisita, Visita } from '../models/visita';

@Injectable({ providedIn: 'root' })
export class VisitaService {
  private readonly _visitas = signal<Visita[]>([]);
  private siguienteId = 1;

  readonly visitas = this._visitas.asReadonly();
  readonly total = computed(() => this._visitas().length);
  readonly pendientes = computed(
    () => this._visitas().filter((v) => v.estado !== 'Finalizada').length,
  );

  agregar(datos: NuevaVisita): void {
    const visita: Visita = { ...datos, id: this.siguienteId++, estado: 'Programada' };
    this._visitas.update((lista) => [...lista, visita]);
  }

  cambiarEstado(id: number, estado: EstadoVisita): void {
    this._visitas.update((lista) => lista.map((v) => (v.id === id ? { ...v, estado } : v)));
  }

  eliminar(id: number): void {
    this._visitas.update((lista) => lista.filter((v) => v.id !== id));
  }
}
