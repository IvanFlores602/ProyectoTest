import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { TesttecnicoComponent } from './testtecnico/testtecnico.component';
import { TestpsicometricoComponent } from './testpsicometrico/testpsicometrico.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ProgramadorComponent } from './elegir/programador/programador.component';
import { DisenadorComponent } from './elegir/disenador/disenador.component';
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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    AboutComponent,
    TesttecnicoComponent,
    TestpsicometricoComponent,
    InicioComponent,
    PerfilComponent,
    ProgramadorComponent,
    DisenadorComponent,
    TecnicoComponent,
    ListaComponent,
    InformacionComponent,
    AlertaPComponent,
    AlertaTComponent,
    EncuestasComponent,
    BuscarComponent,
    PsicometricoComponent,
    BuscarPComponent,
    TestPsicometricoComponent,
    TestTecnicoComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
