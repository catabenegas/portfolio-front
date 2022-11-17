import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill';
import { AuthService } from 'src/app/services/auth.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skillList: Skill[] = [];
  skill: any = {};
  idActual = 0;
  editando = false;
  failCreando = false;
  failActualizado = false;

  constructor(private skillService: SkillService, private authService: AuthService) { }

  ngOnInit() {
    this.cargarTodos();
  }

  ngAfterViewChecked() {
    this.actualizarBarras();
  }

  cargarTodos(): void {
    this.skillService.mostrarTodo().subscribe(data => {
      this.skillList = data;
    },
      (err: any) => {
        console.log(err);
      }
    );
  }

  actualizarBarras(): void {
    var idskill : string;
    var element : HTMLElement | null;
    for (let s of this.skillList) 
    {
      idskill = "skill";
      idskill = idskill.concat(s.id.toString());
      element = document.getElementById(idskill);

      if (element != null) 
      {
        
        var width : string = "width:";
        var onlyper : string = (s.percentage * 100).toString();
        onlyper = onlyper.concat("%")
        width = width.concat(onlyper); 

        element.setAttribute("style",width);
        element.style.width=onlyper;
      }
    }
  }

  activarEdicion(id: number): void {
    this.skillService.mostrar(id).subscribe( data => {
      this.skill.id = data.id;
      this.skill.tag = data.tag;
      this.skill.percentage = data.percentage;
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
    this.skillService.editar(this.skill, id).subscribe( data => {
      this.cancelarEdicion(); 
    },
    (err: any) => {
      this.failActualizado = true;
    }
    );
  }

  crearNuevo(): void {
    var nuevoid = 1;
    for (let e of this.skillList)
    {
      if (e.id > nuevoid) nuevoid = e.id;
    }
    nuevoid++;
    this.skill.id = nuevoid;
    this.skill.tag = "Nuevo";
    this.skill.percentage = 0.0;

    this.skillService.crear(this.skill).subscribe(data=> {
      this.failCreando = false;
      this.activarEdicion(this.skill.id);
      this.cargarTodos();
    },
      (err: any) => {
        this.failCreando = true;}
      );
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta skill?')) {
      this.skillService.borrar(id).subscribe(data => {
        this.cargarTodos();
      });
    }
  }

  isLogged() {
    return this.authService.isLogged
  }
}

