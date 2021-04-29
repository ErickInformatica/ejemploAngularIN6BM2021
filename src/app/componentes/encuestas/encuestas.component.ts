import { Component, OnInit } from '@angular/core';
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

  constructor(
    private _encuestaService: EncuestaService,
    private _usuarioService: UsuarioService
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

  agregarEncuestas() {
    this._encuestaService.agregarEncuestas(this.encuestasModelAdd, this.token).subscribe(
      response=>{
        this.encuestasModelAdd.titulo = '';
        console.log(response);
        this.obtenerEncuestas()
      }
    );
  }
}
