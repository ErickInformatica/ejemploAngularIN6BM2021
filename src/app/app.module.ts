import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EncuestasComponent } from './componentes/encuestas/encuestas.component';
import { DetalleEncuestaComponent } from './componentes/detalle-encuesta/detalle-encuesta.component';
import { environment } from 'src/environments/environment.prod';
import { CiudadesComponent } from './componentes/ciudades/ciudades.component';
import { LoginFirebaseComponent } from './componentes/login-firebase/login-firebase.component';
import { RegistroFirebaseComponent } from './componentes/registro-firebase/registro-firebase.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage"

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    UsuariosComponent,
    EncuestasComponent,
    DetalleEncuestaComponent,
    CiudadesComponent,
    LoginFirebaseComponent,
    RegistroFirebaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfiguracion),
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
