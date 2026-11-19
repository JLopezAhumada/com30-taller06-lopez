import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { VisitaService } from '../services/visita.service';
import { M, TOPE, hastaMayor, multiplo } from './validadores';

@Component({
  selector: 'app-parcial2',
  imports: [ReactiveFormsModule],
  templateUrl: './parcial2.html',
  styleUrl: './parcial2.css',
})
export class Parcial2 {
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly router = inject(Router);
  private readonly servicio = inject(VisitaService);

  protected readonly m = M;
  protected readonly tope = TOPE;
  protected enviado = false;

  protected readonly form = this.fb.group(
    {
      codigo: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{3}$/)]],
      cantidad: [M, [Validators.required, Validators.min(1), Validators.max(TOPE), multiplo(M)]],
      desde: [10, Validators.required],
      hasta: [11, Validators.required],
    },
    { validators: [hastaMayor] },
  );

  // R2: búsqueda reactiva sobre el listado de visitas
  protected readonly buscar = new FormControl('', { nonNullable: true });
  protected readonly ultimo = signal('');
  protected readonly emisiones = signal(0);

  protected readonly filtradas = computed(() => {
    const texto = this.ultimo().toLowerCase();
    return this.servicio
      .visitas()
      .filter((v) => `${v.visitante} ${v.anfitrion} ${v.motivo}`.toLowerCase().includes(texto));
  });

  constructor() {
    this.buscar.valueChanges
      .pipe(
        map((texto) => texto.trim()),
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
      .subscribe((valor) => {
        this.ultimo.set(valor);
        this.emisiones.update((n) => n + 1);
      });
  }

  protected mostrar(campo: 'codigo' | 'cantidad' | 'desde' | 'hasta'): boolean {
    const control = this.form.controls[campo];
    return control.invalid && (control.touched || control.dirty || this.enviado);
  }

  protected enviar(): void {
    this.enviado = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const { codigo, cantidad } = this.form.getRawValue();
    this.router.navigate(['/parcial2/detalle', codigo], { queryParams: { cantidad } });
  }
}
