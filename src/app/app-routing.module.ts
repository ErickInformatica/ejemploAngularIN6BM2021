import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuestasComponent } from './componentes/encuestas/encuestas.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'encuestas', component: EncuestasComponent },
  { path: '**', component: LoginComponent }
  // { path: '**', redictTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
