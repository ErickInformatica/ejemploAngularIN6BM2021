import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { UsuarioService } from "../../servicios/usuario.service";
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [UsuarioService]
})
export class RegistroComponent implements OnInit {
  public usuario: Usuario;



  constructor(private _usuarioService: UsuarioService) {
    this.usuario = new Usuario("","","","","","","");
   }

  ngOnInit(): void {

  }

  registrar(){
    console.log(this.usuario)

    this._usuarioService.registro(this.usuario).subscribe(
      response=>{
        console.log(response);

      },
      error=>{
        console.log(<any>error);

      }
    )
  }

}
