import { Component } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true, 
  imports: [FormsModule], 
  templateUrl: './registro.component.html',
})
export class RegistroComponent {
  nombre_usuario = '';
  contrasenia = '';

  constructor(private usuarioService: UsuarioService) {}

  async registrar() {
    try {
      const respuesta = await this.usuarioService.registrarUsuario(this.nombre_usuario, this.contrasenia);
      alert(respuesta.mensaje);
    } catch (error) {
      alert('Error al registrar usuario');
    }
  }
}
