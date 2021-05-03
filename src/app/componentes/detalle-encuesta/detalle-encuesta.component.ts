import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Encuesta } from 'src/app/modelos/encuestas.model';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-detalle-encuesta',
  templateUrl: './detalle-encuesta.component.html',
  styleUrls: ['./detalle-encuesta.component.scss'],
  providers: [UsuarioService, EncuestaService],
})
export class DetalleEncuestaComponent implements OnInit {
  public encuestaModel;
  public token;
  public idEncuestaRuta: string;
  constructor(
    public _usuarioService: UsuarioService,
    public _encuestaService: EncuestaService,
    public _activatedRoute: ActivatedRoute
  ) {
    this.token = this._usuarioService.getToken();
    this.encuestaModel = new Encuesta(
      '',
      '',
      '',
      { si: 0, no: 0, ninguna: 0, usuarioEncuestados: [] },
      [{ textoComentario: '', idUsuarioComentario: '' }],
      ''
    );
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idEncuestaRuta = dataRuta.get('idEncuesta');
    });
    this.obtenerEncuestaId(this.idEncuestaRuta);
  }

  obtenerEncuestaId(idEncuesta) {
    this._encuestaService
      .obtenerEncuestaId(this.token, idEncuesta)
      .subscribe((response) => {
        this.encuestaModel = response.encuestaEncontrada;
        console.log(response);
      });
  }
}
