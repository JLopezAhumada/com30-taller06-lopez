import { Component, computed, input, numberAttribute } from '@angular/core';
import { RouterLink } from '@angular/router';
import { M, TOPE } from '../validadores';

@Component({
  selector: 'app-detalle',
  imports: [RouterLink],
  templateUrl: './detalle.html',
  styleUrl: '../parcial2.css',
})
export class Detalle {
  // Llegan por la ruta (:codigo) y por la query (?cantidad=) gracias a withComponentInputBinding
  readonly codigo = input.required<string>();
  readonly cantidad = input(0, { transform: numberAttribute });

  protected readonly valido = computed(() => /^[A-Z]{2}\d{3}$/.test(this.codigo()));
  protected readonly bloques = computed(() => this.cantidad() / M);
  protected readonly margen = computed(() => TOPE - this.cantidad());
}
