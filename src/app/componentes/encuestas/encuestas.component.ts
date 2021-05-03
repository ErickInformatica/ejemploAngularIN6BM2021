import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Encuesta } from 'src/app/modelos/encuestas.model';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss'],
  providers: [EncuestaService, UsuarioService],
})
export class EncuestasComponent implements OnInit {
  public token;
  public encuestasModelGet: Encuesta;
  public encuestasModelAdd: Encuesta;
  public encuestasModelGetId: Encuesta;
  public modeloComentario = {
    idEncuesta: '',
    textoComentario: ''
  }


  constructor(
    private _encuestaService: EncuestaService,
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.token = this._usuarioService.getToken();
    this.encuestasModelAdd = new Encuesta(
      '',
      '',
      '',
      { si: 0, no: 0, ninguna: 0, usuarioEncuestados: [] },
      [{ textoComentario: '', idUsuarioComentario: '' }],
      ''
    );
  }

  ngOnInit(): void {
    this.obtenerEncuestas();
  }

  obtenerEncuestas() {
    this._encuestaService.obtenerEncuestas(this.token).subscribe(
      (response) => {
        this.encuestasModelGet = response.encuestasEncontradas;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  obtenerEncuesta(idEncuesta){
    this._encuestaService.obtenerEncuestaId(this.token, idEncuesta).subscribe(
      response => {
        this.encuestasModelGetId =response.encuestaEncontrada;
        console.log(response);
      }
    )
  }

  agregarEncuestas() {
    this._encuestaService.agregarEncuestas(this.encuestasModelAdd, this.token).subscribe(
      response=>{
        this.encuestasModelAdd.titulo = '';
        this.encuestasModelAdd.descripcion ='';
        console.log(response);
        this.obtenerEncuestas()
      }
    );
  }

  agregarComentario(){
    this.modeloComentario.idEncuesta = String(this.encuestasModelGetId._id);
    this._encuestaService.agregarComentario(this.token, this.modeloComentario).subscribe(
      response=>{
        console.log(response);

      }
    )
  }


  //Otra manera de Navegar con Parametros
  navegarDetalleEncuesta(idEncuesta) {
    this._router.navigate(['/detalleEncuesta', idEncuesta]);
  }
}
