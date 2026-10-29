import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validador propio de control: el documento solo puede tener números.
// No revisa el campo vacío, eso ya lo hace Validators.required.
export function soloDigitos(): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null =>
    typeof c.value === 'string' && c.value !== '' && !/^[0-9]+$/.test(c.value)
      ? { soloDigitos: true }
      : null;
}

// Rechaza textos que solo tienen espacios ("   "), que required deja pasar
export function sinSoloEspacios(): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null =>
    typeof c.value === 'string' && c.value !== '' && c.value.trim() === ''
      ? { soloEspacios: true }
      : null;
}

// Validador de grupo: la hora de salida tiene que ser posterior a la de ingreso.
// Si falta alguna de las dos horas no marca error.
export const salidaPosterior: ValidatorFn = (g: AbstractControl): ValidationErrors | null => {
  const ingreso = g.get('horaIngreso')?.value;
  const salida = g.get('horaSalida')?.value;
  return ingreso && salida && salida <= ingreso ? { salidaNoPosterior: true } : null;
};

// Para el FormArray: exige un mínimo de filas
export function minimoFilas(n: number): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null =>
    (c as FormArray).length >= n ? null : { minimoFilas: { requerido: n } };
}
