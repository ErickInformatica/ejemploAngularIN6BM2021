import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs';

import { finalize } from 'rxjs/operators'
declare var $: any;

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.scss']
})
export class CiudadesComponent implements OnInit {
  public getCiudades = []; //Almacenar todas las ciudades
  public ciudadesModel = { //Modelo para agregar datos
    nombreCiudad: '',
    habitantes: 0,
    imagenCiudad: ''
  };

  public ciudadId = { //Almacenar Ciudad buscada por ID
    id: String,
    nombreCiudad: String,
    habitantes: Number
  }

  public archivoInput;
  public porcentajeArchivo: Observable<number>;
  public imagenUrl: Observable<string>;

  constructor(
    private firestoreDb: AngularFirestore,
    private _storageFire: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.obtenerCiudades();
  }

  //Subir Imagen Input
  subirImagenInput(event){

    this.archivoInput = event.target.files[0];
    console.log(this.archivoInput);
  }


  //Subir Imagen Function
  subirImagen(){
    if(this.archivoInput !== null){
      const randomId = Math.random().toString(36).substring(7);
      const rutaFirebase = `ciudades/ciudad_${randomId}`;
      const referencia = this._storageFire.ref(rutaFirebase);
      const tareaSubirArchivo = this._storageFire.upload(rutaFirebase, this.archivoInput);
      this.porcentajeArchivo = tareaSubirArchivo.percentageChanges();
      console.log(this.porcentajeArchivo);

      tareaSubirArchivo.snapshotChanges().pipe(finalize(()=>{
        this.imagenUrl = referencia.getDownloadURL();
        this.imagenUrl.subscribe((url)=>{
          this.ciudadesModel.imagenCiudad = url.toString();
          this.firestoreDb.collection('ciudades').add(this.ciudadesModel).then(
            res=>{
              console.log('Ciudad con Imagen agregado correctamente.');
              $('#agregarCanvas').offcanvas('hide')
            }
          )
        })
      })).subscribe((res)=>{})
    }
  }





  obtenerCiudades(){
    this.firestoreDb.collection('ciudades').snapshotChanges().subscribe(
      res =>{
        this.getCiudades = []
        res.forEach(datos =>{
          this.getCiudades.push(
            {
              id: datos.payload.doc.id,
              data: datos.payload.doc.data()
            }
          )
        })
        console.log(this.getCiudades);


      }
    )
  }

  agregarCiudades(){
    this.firestoreDb.collection('ciudades').add(this.ciudadesModel).then(
      res =>{
        console.log('Ciudad Agregada');
      }
    )
  }

  obtenerCiudadPorId(id){
    this.firestoreDb.collection('ciudades').doc(id).get().subscribe(
      (res: any) =>{
        this.ciudadId.id = res.id;
        this.ciudadId.nombreCiudad = res.data().nombreCiudad;
        this.ciudadId.habitantes = res.data().habitantes;
        console.log(this.ciudadId);

      }
    )
  }

  editarCiudad(id){
    this.firestoreDb.collection('ciudades').doc(id).set(this.ciudadId).then(() => {
      console.log('Ciudad Editada');
    })
  }

  eliminarCiudad(id){
    this.firestoreDb.collection('ciudades').doc(id).delete().then(() => {
      console.log('Ciudad eliminada');

    })
  }

}
