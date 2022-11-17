import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { AuthService } from 'src/app/services/auth.service';
import { ProyService } from 'src/app/services/proy.service';

@Component({
  selector: 'app-proy',
  templateUrl: './proy.component.html',
  styleUrls: ['../entry.component.css']
})
export class ProyComponent implements OnInit {
  proyList: Proyecto[] = [];
  proy: any = {};
  idActual = 0;
  editando = false;
  failCreando = false;
  failActualizado = false;

  constructor(private proyService: ProyService, private authService: AuthService) { }

  ngOnInit() {
    this.cargarTodos();
  }

  cargarTodos(): void {
    this.proyService.mostrarTodo().subscribe(data => {
      this.proyList = data;
    },
      (err: any) => {
        console.log(err);
      }
    );
  }

  activarEdicion(id: number): void {
    this.proyService.mostrar(id).subscribe( data => {
      this.proy.id = data.id;
      this.proy.title = data.title;
      this.proy.content = data.content;
      this.proy.logo = data.logo;
      this.editando = true;
      this.idActual = id;
    }
    );
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.failCreando = false;
    this.failActualizado = false;
    this.idActual = 0;
    this.cargarTodos();
  }

  editar(id: number): void {
    this.proyService.editar(this.proy, id).subscribe( data => {
      this.cancelarEdicion();
    },
    (err: any) => {
      this.failActualizado = true;
    }
    );
  }

  crearNuevo(): void {
    var nuevoid = 0;
    for (let e of this.proyList)
    {
      if (e.id > nuevoid) nuevoid = e.id;
    }
    nuevoid++;
    this.proy.id = nuevoid;
    this.proy.title = "Titulo";
    this.proy.content = "Descripcion";
    this.proy.logo = 0;

    this.proyService.crear(this.proy).subscribe(data=> {
      this.failCreando = false;
      this.activarEdicion(this.proy.id);
      this.cargarTodos();
    },
      (err: any) => {
        this.failCreando = true;}
      );
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta entrada?')) {
      this.proyService.borrar(id).subscribe(data => {
        this.cargarTodos();
      });
    }
  }

  isLogged() {
    return this.authService.isLogged
  }
}
