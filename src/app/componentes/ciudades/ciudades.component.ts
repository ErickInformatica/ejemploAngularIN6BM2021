import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.scss']
})
export class CiudadesComponent implements OnInit {
  public getCiudades = []; //Almacenar todas las ciudades
  public ciudadesModel = { //Modelo para agregar datos
    nombreCiudad: '',
    habitantes: 0
  };

  public ciudadId = { //Almacenar Ciudad buscada por ID
    id: String,
    nombreCiudad: String,
    habitantes: Number
  }


  constructor(
    private firestoreDb: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.obtenerCiudades();
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
