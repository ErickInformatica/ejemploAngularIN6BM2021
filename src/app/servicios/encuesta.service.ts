import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Encuesta } from '../modelos/encuestas.model';

@Injectable({
  providedIn: 'root',
})
export class EncuestaService {
  public url: String;
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  obtenerEncuestas(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/obtenerEncuestas', {
      headers: headersToken,
    });
  }

  agregarEncuestas(encuesta: Encuesta, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let params = JSON.stringify(encuesta);

    return this._http.post(this.url + '/agregarEncuesta', params, {
      headers: headersToken,
    });
  }

  obtenerEncuestaId(token, id: string): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/obtenerEncuestaId/' + id, {
      headers: headersToken,
    });
  }

  agregarComentario(token, modeloComentario): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let params = JSON.stringify(modeloComentario);

    return this._http.put(
      this.url + '/agregarComentario/' + modeloComentario.idEncuesta,
      params,
      { headers: headersToken }
    );
  }
}
