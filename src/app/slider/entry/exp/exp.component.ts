import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';
import { AuthService } from 'src/app/services/auth.service';
import { ExpService } from 'src/app/services/exp.service';

@Component({
  selector: 'app-exp',
  templateUrl: './exp.component.html',
  styleUrls: ['../entry.component.css']
})
export class ExpComponent implements OnInit {
  expList: Experiencia[] = [];
  exp: any = {};
  idActual = 0;
  editando = false;
  failCreando = false;
  failActualizado = false;

  constructor(private expService: ExpService, private authService: AuthService) { }

  ngOnInit() {
    this.cargarTodos();
  }

  cargarTodos(): void {
    this.expService.mostrarTodo().subscribe(data => {
      this.expList = data;
    },
      (err: any) => {
        console.log(err);
      }
    );
  }

  activarEdicion(id: number): void {
    this.expService.mostrar(id).subscribe( data => {
      this.exp.id = data.id;
      this.exp.title = data.title;
      this.exp.content = data.content;
      this.exp.logo = data.logo;
      this.editando = true;
      this.idActual = id;
    }
    );
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.idActual = 0;
    this.cargarTodos();
  }

  editar(id: number): void {
    this.expService.editar(this.exp, id).subscribe( data => {
      this.failActualizado = false;
      this.cancelarEdicion(); 
    },
    (err: any) => {
      this.failActualizado = true;
    }
    );
  }

  crearNuevo(): void {
    var nuevoid = 0;
    for (let e of this.expList)
    {
      if (e.id > nuevoid) nuevoid = e.id;
    }
    nuevoid++;
    this.exp.id = nuevoid;
    this.exp.title = "Titulo";
    this.exp.content = "Descripcion";
    this.exp.logo = 0;

    this.expService.crear(this.exp).subscribe(data=> {
      this.failCreando = false;
      this.activarEdicion(this.exp.id);
      this.cargarTodos();
    },
      (err: any) => {
        this.failCreando = true;}
      );
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta entrada?')) {
      this.expService.borrar(id).subscribe(data => {
        this.cargarTodos();
      });
    }
  }

  isLogged() {
    return this.authService.isLogged
  }
}
