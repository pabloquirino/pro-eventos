import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  public eventos: any[] = [];
  public eventosFiltrados: any[] = [];

  widthImg: number = 150;
  marginImg: number = 2;
  toggleImg: boolean = true;
  private _filtroLista: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      (response: any) => {
        this.eventos = response;
        this.eventosFiltrados = response;
      },
      (error) => console.log(error),
    );
  }

  public showAndHideImg(): void {
    this.toggleImg = !this.toggleImg;
  }

  get filtroLista(): string {
    return this._filtroLista;
  }

  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtrarEventos(value);
  }

  public filtrarEventos(filtro: string): any[] {
    filtro = filtro.toLowerCase();

    return this.eventos.filter(
      (evento: any) =>
        evento.tema.toLowerCase().indexOf(filtro) !== -1 ||
        evento.local.toLowerCase().indexOf(filtro) !== -1,
    );
  }
}
