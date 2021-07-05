import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app'

@Component({
  selector: 'app-login-firebase',
  templateUrl: './login-firebase.component.html',
  styleUrls: ['./login-firebase.component.scss']
})
export class LoginFirebaseComponent implements OnInit {
  public usuarioFirebase = {
    email: '',
    password: ''
  }

  constructor(
    private _fireAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this._fireAuth.onAuthStateChanged(datos =>{
      console.log(datos);

    })
  }

  login(){
    this._fireAuth.signInWithEmailAndPassword(this.usuarioFirebase.email, this.usuarioFirebase.password).then((respuesta)=>{
      if(respuesta.user.emailVerified === false){
        console.log('No puede ingresar hasta verificar su correo.');
      }else{
        console.log('Ingreso a la plataforma con exito.');
        console.log(respuesta);

      }
    })
  }

  loginGoogle(){
    this._fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((resultado)=>{
      console.log(resultado);
    })
  }


}
