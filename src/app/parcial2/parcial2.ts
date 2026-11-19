import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
