import { Injectable, computed, signal } from '@angular/core';
import { EstadoVisita, NuevaVisita, Visita } from '../models/visita';

@Injectable({ providedIn: 'root' })
export class VisitaService {
  // Datos de ejemplo para que el listado y la búsqueda tengan algo que mostrar
  private readonly _visitas = signal<Visita[]>([
    { id: 1, visitante: 'Carlos Pérez', documento: '1044556677', anfitrion: 'Sede norte', motivo: 'Reunión', fecha: '2026-11-18', horaIngreso: '08:00', horaSalida: '09:00', acompanantes: [], estado: 'Programada' },
    { id: 2, visitante: 'Laura Gómez', documento: '1001234567', anfitrion: 'Sede centro', motivo: 'Entrevista', fecha: '2026-11-18', horaIngreso: '10:00', horaSalida: '11:00', acompanantes: [], estado: 'En sitio' },
    { id: 3, visitante: 'Andrés Ruiz', documento: '72123456', anfitrion: 'Bodega sur', motivo: 'Entrega', fecha: '2026-11-18', horaIngreso: '14:00', horaSalida: '14:30', acompanantes: [], estado: 'Programada' },
  ]);
  private siguienteId = 4;

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
