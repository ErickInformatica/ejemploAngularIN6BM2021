import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-registro-firebase',
  templateUrl: './registro-firebase.component.html',
  styleUrls: ['./registro-firebase.component.scss']
})
export class RegistroFirebaseComponent implements OnInit {
  public usuarioFirebase = {
    email: '',
    password: ''
  }

  constructor(
    private _fireAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }

  registro(){
    this._fireAuth.createUserWithEmailAndPassword(this.usuarioFirebase.email, this.usuarioFirebase.password).then((usuario)=>{
      usuario.user.sendEmailVerification();
      console.log(usuario);
    }).catch((error)=>{
      console.log(error);
    })
  }

}
