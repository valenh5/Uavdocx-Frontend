import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  async registrarUsuario(nombre_usuario: string, email: string, contrasenia: string) {
    const response = await axios.post('http://localhost:3000/usuarios/registro', {
      usuario: nombre_usuario,
      email,
      contrasenia,
    });
    return response.data;
  }
  async comprobarUsuario(usuario_ingreso: string, pass_ingreso: string) {
    const response = await axios.post('http://localhost:3000/usuarios/ingresar', {
      usuario_ingreso,
      pass_ingreso,
    });
    return response.data;
  }
}
