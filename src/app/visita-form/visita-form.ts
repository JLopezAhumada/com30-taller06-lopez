import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VisitaService } from '../services/visita.service';
import { minimoFilas, salidaPosterior, sinSoloEspacios, soloDigitos } from '../validators/validadores';

@Component({
  selector: 'app-visita-form',
  imports: [ReactiveFormsModule],
  templateUrl: './visita-form.html',
  styleUrl: './visita-form.css',
})
export class VisitaForm {
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly servicio = inject(VisitaService);

  protected readonly motivos = ['Reunión', 'Entrevista', 'Entrega', 'Mantenimiento', 'Otro'];

  protected readonly form = this.fb.group(
    {
      visitante: ['', [Validators.required, Validators.minLength(3), sinSoloEspacios()]],
      documento: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10), soloDigitos()]],
      anfitrion: ['', [Validators.required, sinSoloEspacios()]],
      motivo: ['', Validators.required],
      fecha: [this.hoy(), Validators.required],
      horaIngreso: ['', Validators.required],
      horaSalida: ['', Validators.required],
      acompanantes: this.fb.array([this.nuevoAcompanante()], [minimoFilas(1)]),
    },
    { validators: [salidaPosterior] },
  );

  get acompanantes() {
    return this.form.controls.acompanantes;
  }

  private nuevoAcompanante() {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), sinSoloEspacios()]],
      documento: ['', [Validators.required, soloDigitos()]],
    });
  }

  private hoy(): string {
    const d = new Date();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mes}-${dia}`;
  }

  agregarAcompanante(): void {
    this.acompanantes.push(this.nuevoAcompanante());
  }

  quitarAcompanante(i: number): void {
    this.acompanantes.removeAt(i);
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.servicio.agregar(this.form.getRawValue());

    // la lista vuelve a quedar con una sola fila vacía
    this.acompanantes.clear();
    this.acompanantes.push(this.nuevoAcompanante());
    this.form.reset();
  }
}
