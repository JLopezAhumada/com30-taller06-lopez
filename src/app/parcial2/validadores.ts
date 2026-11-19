import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Parámetros de la fila d = 9
export const M = 6;
export const TOPE = 24;

export function multiplo(m: number): ValidatorFn {
  return (control: AbstractControl<number>): ValidationErrors | null =>
    control.value % m === 0 ? null : { multiplo: { m, actual: control.value } };
}

// Validador de grupo: hasta debe ser mayor que desde (la igualdad no pasa)
export const hastaMayor: ValidatorFn = (grupo: AbstractControl): ValidationErrors | null => {
  const desde = grupo.get('desde')?.value;
  const hasta = grupo.get('hasta')?.value;
  return hasta > desde ? null : { hastaMayor: { desde, hasta } };
};
