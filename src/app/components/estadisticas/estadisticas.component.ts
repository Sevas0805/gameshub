import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JuegosDataService } from '../../services/juegos-data.service';
import { Juego } from '../../interfaces/juego.interface';



@Component({
  selector: 'app-estadisticas',
  standalone: true,
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
  imports: [CommonModule, FormsModule]
})
export class EstadisticasComponent implements OnInit {
  juegos: Juego[] = [];
  juegosFiltrados: Juego[] = [];
  totalJuegos = 0;
  juegosGratis = 0;
  juegosPago = 0;
  mejorJuego: Juego | null = null;
  promedioPrecio = 0;
  precioMin = 0;
  precioMax = 100;

  constructor(private juegosService: JuegosDataService) {}

  ngOnInit(): void {
    this.juegosService.juegos$.subscribe(juegos => {
      this.juegos = juegos;
      this.totalJuegos = juegos.length;
      this.juegosGratis = juegos.filter(j => j.esGratis).length;
      this.juegosPago = juegos.filter(j => !j.esGratis).length;
      this.mejorJuego = juegos.reduce((a, b) => a.rating > b.rating ? a : b);
      const juegosDePago = juegos.filter(j => !j.esGratis);
      this.promedioPrecio = juegosDePago.reduce((sum, j) => sum + j.precio, 0) / juegosDePago.length;
      this.filtrarPorPrecio();
    });
  }

  filtrarPorPrecio(): void {
    this.juegosFiltrados = this.juegos.filter(j => j.precio >= this.precioMin && j.precio <= this.precioMax);
  }
}


