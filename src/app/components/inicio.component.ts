import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { CommonModule } from '@angular/common';

const apiUrl = "http://localhost:3000/prendas";


@Component({
  selector: 'app-prendas',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class PrendasComponent implements OnInit {
  prendas: any[] = [];
  prendaNueva: any = { nombre: '', precio: '', talles: { S: 0, M: 0, L: 0, XL: 0 }, categoria: '' };
  prendaEditando: any = null;
  mostrarFormulario: boolean = false;
  categorias: string[] = ['JEAN', 'BUZO', 'CAMPERA', 'REMERA', 'SHORT', 'OTRO'];

  constructor() {}

  async ngOnInit(): Promise<void> {
    await this.cargarPrendas();
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario; 
  }

  async cargarPrendas(): Promise<void> {
    try {
      const response = await axios.get(apiUrl+"/listarPrendas"); 
      this.prendas = response.data;
    } catch (error) {
      console.error("Error al cargar prendas:", error);
    }
  }

  async crearPrenda(): Promise<void> {
    try {
      await axios.post(apiUrl+"/crearPrenda", this.prendaNueva);
      await this.cargarPrendas();
      this.prendaNueva = { nombre: '', precio: '', talles: '', categoria: '' };
      alert(`Prenda creada: ${this.prendaNueva.marca} ${this.prendaNueva.modelo}`);
    } catch (error) {
      console.error("Error al crear prenda:", error);
      alert("Hubo un error al crear el teléfono. Por favor, intenta de nuevo.");
    }
  }
  

  editarPrenda(prenda: any): void {
    this.prendaEditando = { ...prenda, talles: { ...prenda.talles } };
  }

  async guardarCambios(): Promise<void> {
    if (this.prendaEditando?.id !== undefined && this.prendaEditando?.id !== 0) {
      try {
        await axios.put(apiUrl + `/${this.prendaEditando.id}`, {
          nombre: this.prendaEditando.nombre,
          precio: this.prendaEditando.precio,
          talles: this.prendaEditando.talles,
          categoria: this.prendaEditando.categoria
        });
        await this.cargarPrendas();
        this.prendaEditando = null; 
        alert("Prenda editado")
      } catch (error) {
        console.error("Error al guardar cambios:", error);
      }
    } else {
      console.warn("No se puede guardar cambios: ID invalido.");
    }
  }


    async eliminarPrenda(id: number): Promise<void> {
      try {
        await axios.delete(apiUrl + `/${id}`);
        await this.cargarPrendas();
        alert("Prenda eliminado");
      } catch (error) {
        console.error("Error al eliminar telefono:", error);
      }
    }
  }
