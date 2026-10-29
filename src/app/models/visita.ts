export type EstadoVisita = 'Programada' | 'En sitio' | 'Finalizada';

export interface Acompanante {
  nombre: string;
  documento: string;
}

export interface Visita {
  id: number;
  visitante: string;
  documento: string;
  anfitrion: string;
  motivo: string;
  fecha: string;
  horaIngreso: string;
  horaSalida: string;
  acompanantes: Acompanante[];
  estado: EstadoVisita;
}

// Lo que entrega el formulario: el servicio asigna id y estado
export type NuevaVisita = Omit<Visita, 'id' | 'estado'>;
