import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { TesttecnicoComponent } from './testtecnico/testtecnico.component';
import { TestpsicometricoComponent } from './testpsicometrico/testpsicometrico.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DisenadorComponent } from './elegir/disenador/disenador.component';
import { ProgramadorComponent } from './elegir/programador/programador.component';
import { TecnicoComponent } from './elegir/tecnico/tecnico.component';
import { ListaComponent } from './administrador/lista/lista.component';
import { InformacionComponent } from './administrador/informacion/informacion.component';
import { AlertaPComponent } from './alerta/alerta-p/alerta-p.component';
import { AlertaTComponent } from './alerta/alerta-t/alerta-t.component';
import { EncuestasComponent } from './administrador/encuestas/encuestas.component';
import { BuscarComponent } from './administrador/buscar/buscar.component';
import { PsicometricoComponent } from './administrador/psicometrico/psicometrico.component';
import { BuscarPComponent } from './administrador/buscar-p/buscar-p.component';
import { TestPsicometricoComponent } from './components/test-psicometrico/test-psicometrico.component';
import { TestTecnicoComponent } from './components/test-tecnico/test-tecnico.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '', component: HomeComponent},
  { path: 'inicio', component: InicioComponent},
  { path: 'testt', component: TesttecnicoComponent},
  { path: 'testp', component: TestpsicometricoComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'about', component: AboutComponent },
  { path: 'disenador', component: DisenadorComponent},
  { path: 'programador', component: ProgramadorComponent},
  { path: 'tecnico', component: TecnicoComponent},
  { path: 'listas', component: ListaComponent},
  { path: 'informacionUsuario', component: InformacionComponent},
  { path: 'alertp', component: AlertaPComponent},
  {path: 'alertT', component: AlertaTComponent},
  {path: 'encuestas', component: EncuestasComponent},
  {path: 'buscar', component: BuscarComponent},
  { path: 'crearpsicometrico', component: PsicometricoComponent},
  {path: 'buscarP', component:BuscarPComponent},
  {path: 'Psicometrico', component: TestPsicometricoComponent},
  {path: 'Tecnico', component: TestTecnicoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
