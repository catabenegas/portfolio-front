import { Component, OnInit } from '@angular/core';
import { AboutmeService } from 'src/app/services/aboutme.service';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit {

  aboutme: any = {};
  editando = false;
  failActualizado = false;

  constructor(private aboutmeService: AboutmeService) { }

  ngOnInit() {
    this.cargarAboutMe();
  }

  cargarAboutMe(): void {
    this.aboutmeService.mostrar().subscribe(data => {
      this.aboutme = data;
    },
      (err: any) => {
        console.log(err);
      }
    );
  }

  editar(): void {
      this.aboutmeService.editar(this.aboutme, 1).subscribe( data => {
      this.failActualizado = false;
      this.cancelarEdicion();
    },
    (err: any) => {
      this.failActualizado = true;
    }
    );
  }

  activarEdicion(): void {
    this.editando = true;
  }
  cancelarEdicion(): void {
    this.editando = false;
  }
}