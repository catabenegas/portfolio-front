import { Educacion } from '../../../models/educacion';
import { Component, OnInit } from '@angular/core';
import { EduService } from 'src/app/services/edu.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edu',
  templateUrl: './edu.component.html',
  styleUrls: ['../entry.component.css']
})
export class EduComponent implements OnInit {
  eduList: Educacion[] = [];
  edu: any = {};
  idActual = 0;
  editando = false;
  failCreando = false;
  failActualizado = false;

  constructor(private eduService: EduService, private authService: AuthService) { }

  ngOnInit() {
    this.cargarTodos();
  }

  cargarTodos(): void {
    this.eduService.mostrarTodo().subscribe(data => {
      this.eduList = data;
    },
      (err: any) => {
        console.log(err);
      }
    );
  }

  activarEdicion(id: number): void {
    this.eduService.mostrar(id).subscribe( data => {
      this.edu.id = data.id;
      this.edu.title = data.title;
      this.edu.content = data.content;
      this.edu.logo = data.logo;
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
    this.eduService.editar(this.edu, id).subscribe( data => {
      this.cancelarEdicion();
    },
    (err: any) => {
      this.failActualizado = true;
    }
    );
  }

  crearNuevo(): void {
    var nuevoid = 0;
    for (let e of this.eduList)
    {
      if (e.id > nuevoid) nuevoid = e.id;
    }
    nuevoid++;
    this.edu.id = nuevoid;
    this.edu.title = "Titulo";
    this.edu.content = "Descripcion";
    this.edu.logo = "";

    this.eduService.crear(this.edu).subscribe(data=> {
      this.failCreando = false;
      this.activarEdicion(this.edu.id);
      this.cargarTodos();
    },
      (err: any) => {
        this.failCreando = true;}
      );
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta entrada?')) {
      this.eduService.borrar(id).subscribe(data => {
        this.cargarTodos();
      });
    }
  }

  isLogged() {
    return this.authService.isLogged
  }
}
