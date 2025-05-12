import { Component } from '@angular/core';
import { RegistroComponent } from './components/registro.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegistroComponent, FormsModule],
  template: `<app-registro></app-registro>`
})
export class AppComponent {}
