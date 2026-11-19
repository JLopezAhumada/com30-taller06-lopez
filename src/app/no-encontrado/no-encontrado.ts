import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-encontrado',
  imports: [RouterLink],
  template: `
    <main class="vacio">
      <h1>404</h1>
      <p>La página que busca no existe.</p>
      <a routerLink="/">Ir al inicio</a>
    </main>
  `,
  styles: `.vacio { max-width: 640px; margin: 0 auto; padding: 2.5rem 1.25rem; }`,
})
export class NoEncontrado {}
